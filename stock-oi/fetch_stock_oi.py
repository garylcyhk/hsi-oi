#!/usr/bin/env python3
"""
HKEX Stock Options Daily Report — watchlist OI walls
Watchlist: 700 Tencent, 9988 Alibaba, 1810 Xiaomi, 3690 Meituan, 388 HKEX
"""
import re, json, sys
from datetime import datetime, timedelta
from pathlib import Path
from urllib.request import Request, urlopen

DATA_JS = Path(__file__).parent / "data.js"
HEADERS = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"}

# SEHK code -> HKATS code in report
WATCHLIST = [
    {"code": "00700", "hkats": "TCH", "name": "騰訊 Tencent"},
    {"code": "09988", "hkats": "ALB", "name": "阿里巴巴 Alibaba"},
    {"code": "01810", "hkats": "MIU", "name": "小米 Xiaomi"},
    {"code": "03690", "hkats": "MET", "name": "美團 Meituan"},
    {"code": "00388", "hkats": "HEX", "name": "港交所 HKEX"},
]

def to_code(date_str: str) -> str:
    return date_str.replace("-", "")[2:]

def fetch(date_str: str) -> str:
    code = to_code(date_str)
    url = f"https://www.hkex.com.hk/eng/stat/dmstat/dayrpt/dqe{code}.htm"
    print(f"Fetching {url} ...")
    req = Request(url, headers=HEADERS)
    with urlopen(req, timeout=60) as resp:
        raw = resp.read()
    text = raw.decode("latin-1", errors="replace")
    print(f"  OK ({len(text)} chars)")
    return text

def _f(x: str) -> float:
    try:
        return float(x.replace(",", "").replace("+", ""))
    except Exception:
        return 0.0

def _i(x: str) -> int:
    try:
        return int(float(x.replace(",", "").replace("+", "")))
    except Exception:
        return 0

def parse_summary(text: str) -> dict:
    """SUMMARY lines for our watchlist"""
    out = {}
    for w in WATCHLIST:
        # e.g. TCH TENCENT ... (00700)  vol call put  oi call put iv
        # Match (00388) or (388) etc.
        code_num = w["code"].lstrip("0") or "0"
        pat = re.compile(
            rf"{w['hkats']}\s+[A-Z0-9 &.\-]+?\s*\(0*{code_num}\)\s+"
            rf"([\d,]+)\s+([\d,]+)\s+([\d,]+)\s+([\d,]+)\s+([\d,]+)\s+([\d,]+)",
            re.I,
        )
        m = pat.search(text)
        if m:
            out[w["hkats"]] = {
                "volume": _i(m.group(1)),
                "callVol": _i(m.group(2)),
                "putVol": _i(m.group(3)),
                "oi": _i(m.group(4)),
                "callOI": _i(m.group(5)),
                "putOI": _i(m.group(6)),
            }
    return out

def parse_class(text: str, hkats: str) -> dict:
    m = re.search(rf'<A NAME="{hkats}">(.*?)(?:<A NAME="|$)', text, re.S | re.I)
    if not m:
        return {}
    section = m.group(1)
    close_m = re.search(r"CLOSING PRICE HK\$\s*([\d,\.]+)", section, re.I)
    close = _f(close_m.group(1)) if close_m else 0

    # 21AUG26   340.00 C   ... settle ... iv vol oi chg
    line_re = re.compile(
        r"(\d{2}[A-Z]{3}\d{2})\s+([\d\.]+)\s+([CP])\s+"
        r"[\d\.]+\s+[\d\.]+\s+[\d\.]+\s+"
        r"([\d\.]+)\s+([+\-]?[\d\.]+)\s+(\d+)\s+"
        r"([\d,]+)\s+([\d,]+)\s+([+\-]?[\d,]+)"
    )
    by_expiry = {}
    for lm in line_re.finditer(section):
        expiry, strike, cp, settle, schg, iv, vol, oi, ochg = lm.groups()
        strike = _f(strike)
        row = {
            "strike": strike,
            "settle": _f(settle),
            "volume": _i(vol),
            "oi": _i(oi),
            "oiChange": _i(ochg),
            "iv": _i(iv),
        }
        bucket = by_expiry.setdefault(expiry, {"calls": [], "puts": []})
        if cp == "C":
            bucket["calls"].append(row)
        else:
            bucket["puts"].append(row)

    if not by_expiry:
        return {"close": close, "expiries": [], "front": {}}

    # front = nearest expiry with any OI or volume
    def score(exp, data):
        total = sum(x["oi"] + x["volume"] for x in data["calls"] + data["puts"])
        return total

    ordered = sorted(by_expiry.items(), key=lambda kv: (-score(kv[0], kv[1]), kv[0]))
    # prefer chronological: parse month
    months = {"JAN":1,"FEB":2,"MAR":3,"APR":4,"MAY":5,"JUN":6,"JUL":7,"AUG":8,"SEP":9,"OCT":10,"NOV":11,"DEC":12}
    def exp_key(e):
        # 21AUG26
        d, mon, y = int(e[:2]), e[2:5], int(e[5:])
        return (2000+y, months.get(mon, 0), d)
    ordered = sorted(by_expiry.items(), key=lambda kv: exp_key(kv[0]))

    front_exp, front_data = ordered[0]
    calls = front_data["calls"]
    puts = front_data["puts"]

    call_walls = sorted(
        [{"strike": c["strike"], "oi": c["oi"], "oiChange": c["oiChange"], "volume": c["volume"]} for c in calls if c["oi"] > 0],
        key=lambda x: x["oi"], reverse=True
    )[:8]
    put_walls = sorted(
        [{"strike": p["strike"], "oi": p["oi"], "oiChange": p["oiChange"], "volume": p["volume"]} for p in puts if p["oi"] > 0],
        key=lambda x: x["oi"], reverse=True
    )[:8]
    call_vol = sorted(
        [{"strike": c["strike"], "volume": c["volume"]} for c in calls if c["volume"] > 0],
        key=lambda x: x["volume"], reverse=True
    )[:6]
    put_vol = sorted(
        [{"strike": p["strike"], "volume": p["volume"]} for p in puts if p["volume"] > 0],
        key=lambda x: x["volume"], reverse=True
    )[:6]

    strikes = {}
    for c in calls:
        strikes.setdefault(c["strike"], {"strike": c["strike"], "callOI":0,"callChange":0,"callVol":0,"putOI":0,"putChange":0,"putVol":0})
        strikes[c["strike"]]["callOI"] = c["oi"]
        strikes[c["strike"]]["callChange"] = c["oiChange"]
        strikes[c["strike"]]["callVol"] = c["volume"]
    for p in puts:
        strikes.setdefault(p["strike"], {"strike": p["strike"], "callOI":0,"callChange":0,"callVol":0,"putOI":0,"putChange":0,"putVol":0})
        strikes[p["strike"]]["putOI"] = p["oi"]
        strikes[p["strike"]]["putChange"] = p["oiChange"]
        strikes[p["strike"]]["putVol"] = p["volume"]
    strike_list = sorted(
        [v for v in strikes.values() if v["callOI"] or v["putOI"] or v["callVol"] or v["putVol"]],
        key=lambda x: x["strike"]
    )

    return {
        "close": close,
        "frontExpiry": front_exp,
        "callWalls": call_walls,
        "putWalls": put_walls,
        "callVolWalls": call_vol,
        "putVolWalls": put_vol,
        "strikes": strike_list,
        "expiries": [e for e, _ in ordered[:4]],
    }

def parse_report(text: str, date_str: str) -> dict:
    summary = parse_summary(text)
    underlyings = {}
    for w in WATCHLIST:
        detail = parse_class(text, w["hkats"])
        underlyings[w["hkats"]] = {
            **w,
            **summary.get(w["hkats"], {}),
            **detail,
        }
        print(f"  {w['hkats']}: close={detail.get('close')} front={detail.get('frontExpiry')} "
              f"callWalls={len(detail.get('callWalls') or [])}")
    return {
        "date": date_str,
        "sourceUrl": f"https://www.hkex.com.hk/eng/stat/dmstat/dayrpt/dqe{to_code(date_str)}.htm",
        "underlyings": underlyings,
    }

def load_existing():
    if not DATA_JS.exists():
        return {}
    m = re.search(r"window\.STOCK_OI\s*=\s*(\{.*\});", DATA_JS.read_text(encoding="utf-8"), re.S)
    if not m:
        return {}
    return json.loads(m.group(1))

def save(reports):
    # keep last 10 dates
    keys = sorted(reports.keys())[-10:]
    trimmed = {k: reports[k] for k in keys}
    js = "window.STOCK_OI = " + json.dumps(trimmed, ensure_ascii=False, separators=(",", ":")) + ";\n"
    DATA_JS.write_text(js, encoding="utf-8")
    print(f"Saved {len(trimmed)} day(s) → {DATA_JS}")

def main():
    if len(sys.argv) > 1:
        date_str = sys.argv[1]
    else:
        now = datetime.utcnow() + timedelta(hours=8)
        date_str = now.strftime("%Y-%m-%d")
    reports = load_existing()
    text = fetch(date_str)
    report = parse_report(text, date_str)
    # use report date from content if possible
    reports[report["date"]] = report
    save(reports)

if __name__ == "__main__":
    main()
