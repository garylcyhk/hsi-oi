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


def parse_front_month(text: str) -> dict:
    """
    Parse month1 (front month) Call + Put tables.
    Returns strikes list, callOI, putOI, changes, heavy zones.
    """
    # Isolate month1 section (from <A NAME="month1"> to <A NAME="month2"> or end of first totals)
    m1 = re.search(r'<A NAME="month1"></A>(.*?)(?:<A NAME="month2">|$)', text, re.S)
    if not m1:
        return {}

    section = m1.group(1)

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
            nums = re.findall(r"[+\-]?\d+", parts[-1])
            if len(nums) < 3:
                continue
            # last three: volume, OI, change
            oi = int(nums[-2])
            chg = int(nums[-1])
            if oi == 0 and chg == 0:
                continue  # skip empty strikes to keep list clean
            rows.append({
                "strike": int(strike),
                "oi": oi,
                "oiChange": chg,
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
        strike_map.setdefault(c["strike"], {"callOI": 0, "callChange": 0, "putOI": 0, "putChange": 0})
        strike_map[c["strike"]]["callOI"] = c["oi"]
        strike_map[c["strike"]]["callChange"] = c["oiChange"]
    for p in puts:
        strike_map.setdefault(p["strike"], {"callOI": 0, "callChange": 0, "putOI": 0, "putChange": 0})
        strike_map[p["strike"]]["putOI"] = p["oi"]
        strike_map[p["strike"]]["putChange"] = p["oiChange"]

    strikes = [
        {"strike": k, **v}
        for k, v in sorted(strike_map.items())
        if v["callOI"] > 0 or v["putOI"] > 0
    ]

    # Heavy zones = top OI strikes
    call_walls = sorted(
        [{"strike": s["strike"], "oi": s["callOI"], "oiChange": s["callChange"]} for s in strikes if s["callOI"] > 0],
        key=lambda x: x["oi"], reverse=True
    )[:6]
    put_walls = sorted(
        [{"strike": s["strike"], "oi": s["putOI"], "oiChange": s["putChange"]} for s in strikes if s["putOI"] > 0],
        key=lambda x: x["oi"], reverse=True
    )[:6]

    total_oi = call_oi + put_oi
    call_pct = round(call_oi / total_oi * 100, 1) if total_oi else 0
    put_pct = round(100 - call_pct, 1)

    return {
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
    front = parse_front_month(text)

    # Front month string from first top item or default
    front_month = top[0]["month"] if top else curr[:7]

    return {
        "date": curr,
        "prevDate": prev,
        "sourceUrl": f"https://www.hkex.com.hk/chi/stat/dmstat/dayrpt/hsioc{to_hkex_code(curr)}.htm",
        "summary": {
            "frontMonth": front_month,
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
        },
        "strikes": front.get("strikes", []),
        "topVolume": top,
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
