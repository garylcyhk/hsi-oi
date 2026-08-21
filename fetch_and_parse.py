#!/usr/bin/env python3
"""
HKEX Hang Seng Index Options Daily Report Fetcher & Parser
---------------------------------------------------------
Usage:
  python3 fetch_and_parse.py              # fetch latest trading day
  python3 fetch_and_parse.py 2026-08-18   # fetch specific date

After running, it updates data.js which the HTML dashboard reads.
"""

import re
import json
import sys
from datetime import datetime, timedelta
from pathlib import Path
from urllib.request import urlopen, Request
from urllib.error import HTTPError, URLError

DATA_JS = Path(__file__).parent / "data.js"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
}


def to_hkex_code(date_str: str) -> str:
    """2026-08-18 → 260818"""
    return date_str.replace("-", "")[2:]


def fetch_report(date_str: str) -> str:
    code = to_hkex_code(date_str)
    url = f"https://www.hkex.com.hk/chi/stat/dmstat/dayrpt/hsioc{code}.htm"
    print(f"Fetching {url} ...")
    req = Request(url, headers=HEADERS)
    with urlopen(req, timeout=30) as resp:
        raw = resp.read()
    # Big5 → UTF-8
    text = raw.decode("big5", errors="replace")
    print(f"  OK ({len(text)} chars)")
    return text





def fetch_futures(date_str: str, product: str) -> str:
    """product: hsif or mhif (English PRE report)"""
    code = to_hkex_code(date_str)
    url = f"https://www.hkex.com.hk/eng/stat/dmstat/dayrpt/{product}{code}.htm"
    print(f"Fetching {url} ...")
    req = Request(url, headers=HEADERS)
    with urlopen(req, timeout=30) as resp:
        raw = resp.read()
    text = raw.decode("latin-1", errors="replace")
    print(f"  OK ({len(text)} chars)")
    return text


def _num(x: str) -> int:
    return int(x.replace(",", "").replace("+", "") or "0")


def parse_futures(text: str, product: str, date_str: str) -> dict:
    """Parse front-month + totals from HSI/MHI futures daily report."""
    line_re = re.compile(
        r"([A-Z]{3})-(\d{2})\s+"
        r"[\d,]+\s+[\d,]+\s+[\d,]+\s+[\d,]+\s+[\d,]+\s*\|\s*"
        r"([\d,]+)\s+([\d,]+)\s+([\d,]+)\s+([\d,]+)\s+([\d,]+)\s+([+\-]?[\d,]+)\s*\|\s*"
        r"[\d,]+\s+[\d,]+\s+([\d,]+)\s+([\d,]+)\s+([+\-]?[\d,]+)"
    )
    months = []
    for m in line_re.finditer(text):
        mon, yy, d_open, d_high, d_low, d_vol, settle, set_chg, c_vol, oi, oi_chg = m.groups()
        months.append({
            "month": f"{mon}-20{yy}",
            "open": _num(d_open),
            "high": _num(d_high),
            "low": _num(d_low),
            "settle": _num(settle),
            "settleChange": _num(set_chg),
            "volume": _num(c_vol),
            "oi": _num(oi),
            "oiChange": _num(oi_chg),
        })

    tot = re.search(r"All Contracts Total\s+([\d,]+)\s+([\d,]+)\s+([+\-]?[\d,]+)", text)
    total = {}
    if tot:
        total = {
            "volume": _num(tot.group(1)),
            "oi": _num(tot.group(2)),
            "oiChange": _num(tot.group(3)),
        }

    front = months[0] if months else {}
    return {
        "product": product.upper(),
        "name": "HSI Futures" if product == "hsif" else "MHI Futures",
        "front": front,
        "months": months[:4],
        "total": total,
        "sourceUrl": f"https://www.hkex.com.hk/eng/stat/dmstat/dayrpt/{product}{to_hkex_code(date_str)}.htm",
    }


def parse_top_volume(text: str) -> list:
    """Parse 十大成交 section"""
    items = []
    # Match lines like: 26 年 08 月  25200 認沽       695          175 ...
    pattern = re.compile(
        r"(\d{2})\s*年\s*(\d{2})\s*月\s+(\d+)\s+(認購|認沽)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+([+\-]?\d+)"
    )
    section = text.split("恒生指數期權每指數點")[0]
    for m in pattern.finditer(section):
        yy, mm, strike, typ, vol, settle, iv, high, low, oi, chg = m.groups()
        items.append({
            "month": f"20{yy}-{mm}",
            "strike": int(strike),
            "type": "Call" if typ == "認購" else "Put",
            "volume": int(vol),
            "settle": int(settle),
            "iv": int(iv),
            "oi": int(oi),
            "oiChange": int(chg),
        })
    return items[:10]


def parse_month(text: str, month_n: int = 1) -> dict:
    """
    Parse monthN Call + Put tables (month1 = front, month2 = next, ...).
    Returns strikes list, callOI, putOI, changes, heavy zones, monthLabel.
    """
    nxt = month_n + 1
    m1 = re.search(
        rf'<A NAME="month{month_n}"></A>(.*?)(?:<A NAME="month{nxt}">|$)',
        text, re.S
    )
    if not m1:
        return {}

    section = m1.group(1)
    # Month label e.g. 26 年 09 月
    lab = re.search(r"(\d{2})\s*年\s*(\d{2})\s*月", section)
    month_label = f"20{lab.group(1)}-{lab.group(2)}" if lab else f"M{month_n}"

    # Split Call and Put parts (Call comes first, then 認購總計, then Put header, then 認沽總計)
    call_part = section
    put_part = ""
    if "認沽總計" in section:
        # Find the second 合約月份 header after first 認購總計
        parts = re.split(r"認購總計.*?合約月份", section, maxsplit=1, flags=re.S)
        if len(parts) == 2:
            call_part = parts[0]
            put_part = parts[1]

    def parse_side(part: str, is_call: bool) -> list:
        rows = []
        # Combined section (after 2nd |) has 5 numbers:
        # contract_high contract_low volume OI OI_change
        for line in part.splitlines():
            line = line.strip()
            if not line or "合約月份" in line or "總計" in line or "NAME=" in line:
                continue
            head = re.search(r"(\d{2})\s*年\s*(\d{2})\s*月\s+(\d+)\s+(認購|認沽)", line)
            if not head:
                continue
            yy, mm, strike, typ = head.groups()
            if not ((is_call and typ == "認購") or (not is_call and typ == "認沽")):
                continue
            parts = line.split("|")
            if len(parts) < 3:
                continue
            # Combined section (last): high, low, volume, OI, OI_change
            nums = re.findall(r"[+\-]?\d+", parts[-1])
            if len(nums) < 3:
                continue
            vol = int(nums[-3]) if len(nums) >= 3 else 0
            oi = int(nums[-2])
            chg = int(nums[-1])
            # Day session section (middle): open, high, low, settle, settle_chg, iv, volume
            settle = 0
            mid = re.findall(r"[+\-]?\d+", parts[1]) if len(parts) >= 2 else []
            if len(mid) >= 4:
                settle = int(mid[3])
            if oi == 0 and chg == 0 and vol == 0 and settle == 0:
                continue
            rows.append({
                "strike": int(strike),
                "volume": vol,
                "oi": oi,
                "oiChange": chg,
                "settle": settle,
            })
        return rows

    calls = parse_side(call_part, True)
    puts = parse_side(put_part, False)

    # Totals from the report
    call_total = re.search(r"認購總計\s+\d+\s+\|\s+認購總計\s+\d+\s+\|\s+認購總計\s+(\d+)\s+(\d+)\s+([+\-]?\d+)", section)
    put_total = re.search(r"認沽總計\s+\d+\s+\|\s+認沽總計\s+\d+\s+\|\s*認沽總計\s+(\d+)\s+(\d+)\s+([+\-]?\d+)", section)

    call_oi = int(call_total.group(2)) if call_total else sum(c["oi"] for c in calls)
    call_chg = int(call_total.group(3)) if call_total else 0
    put_oi = int(put_total.group(2)) if put_total else sum(p["oi"] for p in puts)
    put_chg = int(put_total.group(3)) if put_total else 0

    # Build strike map
    strike_map = {}
    for c in calls:
        strike_map.setdefault(c["strike"], {"callOI": 0, "callChange": 0, "callVol": 0, "callSettle": 0, "putOI": 0, "putChange": 0, "putVol": 0, "putSettle": 0})
        strike_map[c["strike"]]["callOI"] = c["oi"]
        strike_map[c["strike"]]["callChange"] = c["oiChange"]
        strike_map[c["strike"]]["callVol"] = c["volume"]
        strike_map[c["strike"]]["callSettle"] = c.get("settle", 0)
    for p in puts:
        strike_map.setdefault(p["strike"], {"callOI": 0, "callChange": 0, "callVol": 0, "callSettle": 0, "putOI": 0, "putChange": 0, "putVol": 0, "putSettle": 0})
        strike_map[p["strike"]]["putOI"] = p["oi"]
        strike_map[p["strike"]]["putChange"] = p["oiChange"]
        strike_map[p["strike"]]["putVol"] = p["volume"]
        strike_map[p["strike"]]["putSettle"] = p.get("settle", 0)

    strikes = [
        {"strike": k, **v}
        for k, v in sorted(strike_map.items())
        if v["callOI"] > 0 or v["putOI"] > 0 or v["callVol"] > 0 or v["putVol"] > 0
    ]

    # Heavy OI zones
    call_walls = sorted(
        [{"strike": s["strike"], "oi": s["callOI"], "oiChange": s["callChange"]} for s in strikes if s["callOI"] > 0],
        key=lambda x: x["oi"], reverse=True
    )[:6]
    put_walls = sorted(
        [{"strike": s["strike"], "oi": s["putOI"], "oiChange": s["putChange"]} for s in strikes if s["putOI"] > 0],
        key=lambda x: x["oi"], reverse=True
    )[:6]

    # Heavy Volume zones
    call_vol_walls = sorted(
        [{"strike": s["strike"], "volume": s["callVol"]} for s in strikes if s["callVol"] > 0],
        key=lambda x: x["volume"], reverse=True
    )[:6]
    put_vol_walls = sorted(
        [{"strike": s["strike"], "volume": s["putVol"]} for s in strikes if s["putVol"] > 0],
        key=lambda x: x["volume"], reverse=True
    )[:6]

    total_oi = call_oi + put_oi
    call_pct = round(call_oi / total_oi * 100, 1) if total_oi else 0
    put_pct = round(100 - call_pct, 1)

    return {
        "monthLabel": month_label,
        "callOI": call_oi,
        "putOI": put_oi,
        "callOIChange": call_chg,
        "putOIChange": put_chg,
        "callPct": call_pct,
        "putPct": put_pct,
        "totalOI": total_oi,
        "totalOIChange": call_chg + put_chg,
        "strikes": strikes,
        "callWalls": call_walls,
        "putWalls": put_walls,
        "callVolWalls": call_vol_walls,
        "putVolWalls": put_vol_walls,
    }


def parse_dates(text: str) -> tuple:
    """Extract trading day and previous day"""
    m = re.search(
        r"交易所的前交易日.*?(\d{4})\s*年\s*(\d{1,2})\s*月\s*(\d{1,2})\s*日.*?交易所的交易日.*?(\d{4})\s*年\s*(\d{1,2})\s*月\s*(\d{1,2})\s*日",
        text, re.S
    )
    if m:
        prev = f"{m.group(1)}-{int(m.group(2)):02d}-{int(m.group(3)):02d}"
        curr = f"{m.group(4)}-{int(m.group(5)):02d}-{int(m.group(6)):02d}"
        return curr, prev
    return None, None


def parse_report(text: str, date_str: str) -> dict:
    curr, prev = parse_dates(text)
    if not curr:
        curr = date_str
        prev = (datetime.strptime(date_str, "%Y-%m-%d") - timedelta(days=1)).strftime("%Y-%m-%d")

    top = parse_top_volume(text)
    front = parse_month(text, 1)
    next_m = parse_month(text, 2)

    front_month = front.get("monthLabel") or (top[0]["month"] if top else curr[:7])
    next_month = next_m.get("monthLabel") or ""

    return {
        "date": curr,
        "prevDate": prev,
        "sourceUrl": f"https://www.hkex.com.hk/chi/stat/dmstat/dayrpt/hsioc{to_hkex_code(curr)}.htm",
        "summary": {
            "frontMonth": front_month,
            "nextMonth": next_month,
            "callOI": front.get("callOI", 0),
            "putOI": front.get("putOI", 0),
            "callOIChange": front.get("callOIChange", 0),
            "putOIChange": front.get("putOIChange", 0),
            "callPct": front.get("callPct", 0),
            "putPct": front.get("putPct", 0),
            "totalOI": front.get("totalOI", 0),
            "totalOIChange": front.get("totalOIChange", 0),
        },
        "heavyZones": {
            "callWalls": front.get("callWalls", []),
            "putWalls": front.get("putWalls", []),
            "callVolWalls": front.get("callVolWalls", []),
            "putVolWalls": front.get("putVolWalls", []),
        },
        "nextMonthZones": {
            "month": next_month,
            "callOI": next_m.get("callOI", 0),
            "putOI": next_m.get("putOI", 0),
            "callWalls": next_m.get("callWalls", []),
            "putWalls": next_m.get("putWalls", []),
            "callVolWalls": next_m.get("callVolWalls", []),
            "putVolWalls": next_m.get("putVolWalls", []),
        },
        "strikes": front.get("strikes", []),
        "topVolume": top,
        "futures": {},  # filled by main()
    }


def load_existing() -> dict:
    if not DATA_JS.exists():
        return {}
    content = DATA_JS.read_text(encoding="utf-8")
    # data.js format: window.HSI_REPORTS = { ... };
    m = re.search(r"window\.HSI_REPORTS\s*=\s*(\{.*\});?\s*$", content, re.S)
    if m:
        try:
            return json.loads(m.group(1))
        except json.JSONDecodeError:
            pass
    return {}


def save_data(reports: dict):
    # Keep only last ~90 trading days
    dates = sorted(reports.keys(), reverse=True)[:90]
    trimmed = {d: reports[d] for d in dates}
    js = "window.HSI_REPORTS = " + json.dumps(trimmed, ensure_ascii=False, indent=2) + ";\n"
    DATA_JS.write_text(js, encoding="utf-8")
    print(f"Saved {len(trimmed)} report(s) → {DATA_JS}")


def main():
    if len(sys.argv) > 1:
        date_str = sys.argv[1]
    else:
        # Default: try today, then yesterday (HK time approx)
        now = datetime.utcnow() + timedelta(hours=8)
        date_str = now.strftime("%Y-%m-%d")

    reports = load_existing()

    try:
        text = fetch_report(date_str)
        report = parse_report(text, date_str)
        # Futures: HSI + MHI
        futures = {}
        for product in ("hsif", "mhif"):
            try:
                ftext = fetch_futures(date_str, product)
                futures[product] = parse_futures(ftext, product, date_str)
                f = futures[product].get("front") or {}
                print(f"  {product}: settle={f.get('settle')} vol={f.get('volume')} OI={f.get('oi')} chg={f.get('oiChange')}")
            except Exception as fe:
                print(f"  {product} skip: {fe}")
        report["futures"] = futures
        reports[report["date"]] = report
        print(f"Parsed {report['date']}: Call OI={report['summary']['callOI']}, Put OI={report['summary']['putOI']}, strikes={len(report['strikes'])}")
        save_data(reports)
    except HTTPError as e:
        print(f"HTTP Error {e.code}: Report for {date_str} not available yet (or wrong date).")
        print("Try a previous trading day, e.g. python3 fetch_and_parse.py 2026-08-18")
    except Exception as e:
        print(f"Error: {e}")
        raise


if __name__ == "__main__":
    main()
