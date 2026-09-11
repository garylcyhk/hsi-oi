#!/usr/bin/env python3
"""Build morning-brief/data.js from existing site feeds + Yahoo US overnight.

Run weekday 09:00 HKT (01:00 UTC). Never invents walls, prices, or stock picks.
Missing / stale feeds become ok=False with status 未能核實／未更新.
"""
from __future__ import annotations

import json
import re
import urllib.parse
import urllib.request
from datetime import datetime, timedelta, timezone
from pathlib import Path
from zoneinfo import ZoneInfo

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "morning-brief" / "data.js"
HIST = ROOT / "morning-brief" / "history"
HKT = timezone(timedelta(hours=8))
ET = ZoneInfo("America/New_York")
UA = "Mozilla/5.0 (compatible; ExodusMorningBrief/1.0; +https://garylcyhk.github.io/hsi-oi/)"

HK_HOLIDAYS = {
    "2026-01-01", "2026-02-17", "2026-02-18", "2026-02-19",
    "2026-04-03", "2026-04-06", "2026-04-07",
    "2026-05-01", "2026-05-25", "2026-06-19", "2026-07-01",
    "2026-10-01", "2026-10-19", "2026-12-25", "2026-12-28",
    "2027-01-01",
}

YAHOO = [
    ("^GSPC", "標普 S&P 500", "%"),
    ("^DJI", "道指 Dow", "%"),
    ("^IXIC", "納指 Nasdaq", "%"),
    ("^VIX", "VIX", "pt"),
    ("CL=F", "WTI 原油", "%"),
    ("^TNX", "美10年期債 Yahoo ^TNX", "raw"),
]

STOCK_ORDER = ["TCH", "ALB", "MIU", "MET", "HEX", "KST"]


def now_hkt() -> datetime:
    return datetime.now(HKT)


def ymd(dt: datetime) -> str:
    return dt.strftime("%Y-%m-%d")


def et_ymd(ts: int) -> str:
    return datetime.fromtimestamp(ts, tz=timezone.utc).astimezone(ET).strftime("%Y-%m-%d")


def is_hk_session(d: datetime) -> bool:
    if d.weekday() >= 5:
        return False
    return ymd(d) not in HK_HOLIDAYS


def prev_hk_session(d: datetime) -> datetime:
    x = d - timedelta(days=1)
    while not is_hk_session(x):
        x -= timedelta(days=1)
        if (d - x).days > 14:
            break
    return x


def prev_us_session_date(hk_session: datetime) -> str:
    x = hk_session - timedelta(days=1)
    while x.weekday() >= 5:
        x -= timedelta(days=1)
    return ymd(x)


def load_js_object(path: Path, assign: str):
    if not path.exists():
        return None
    text = path.read_text(encoding="utf-8")
    i = text.find(assign)
    if i < 0:
        return None
    i = text.find("{", i)
    if i < 0:
        return None
    depth = 0
    in_str = False
    esc = False
    quote = ""
    for j, ch in enumerate(text[i:], i):
        if in_str:
            if esc:
                esc = False
            elif ch == "\\":
                esc = True
            elif ch == quote:
                in_str = False
            continue
        if ch in "\"'":
            in_str = True
            quote = ch
            continue
        if ch == "{":
            depth += 1
        elif ch == "}":
            depth -= 1
            if depth == 0:
                raw = text[i : j + 1]
                try:
                    return json.loads(raw)
                except json.JSONDecodeError:
                    return None
    return None


def latest_dated(bag: dict | None):
    if not isinstance(bag, dict):
        return None, None
    keys = sorted([k for k in bag.keys() if re.match(r"\d{4}-\d{2}-\d{2}$", k)])
    if not keys:
        return None, None
    k = keys[-1]
    rec = bag.get(k)
    if isinstance(rec, dict):
        rec = dict(rec)
        rec.setdefault("date", k)
    return k, rec


def stale(got: str | None, expected: str) -> bool:
    if not got:
        return True
    return got < expected


def fetch_yahoo_symbol(symbol: str) -> dict | None:
    q = urllib.parse.quote(symbol, safe="")
    url = f"https://query1.finance.yahoo.com/v8/finance/chart/{q}?interval=1d&range=10d"
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            data = json.loads(resp.read().decode("utf-8", "replace"))
    except Exception as exc:
        print("yahoo fail", symbol, exc)
        return None
    try:
        res = data["chart"]["result"][0]
        meta = res.get("meta") or {}
        ts = res["timestamp"]
        quote = (res.get("indicators") or {}).get("quote") or [{}]
        closes = quote[0].get("close") or []
        rows = [(ts[i], closes[i]) for i in range(min(len(ts), len(closes))) if closes[i] is not None]
        if len(rows) < 2:
            px = meta.get("regularMarketPrice")
            prev = meta.get("chartPreviousClose") or meta.get("previousClose")
            if px is None or prev is None:
                return None
            last_ts = meta.get("regularMarketTime")
            last_d = et_ymd(last_ts) if last_ts else None
            chg = px - prev
            pct = (chg / prev * 100) if prev else None
            return {"last": px, "prev": prev, "chg": chg, "pct": pct, "date": last_d}
        last_ts, last = rows[-1]
        _prev_ts, prev = rows[-2]
        last_d = et_ymd(last_ts)
        chg = last - prev
        pct = (chg / prev * 100) if prev else None
        return {"last": last, "prev": prev, "chg": chg, "pct": pct, "date": last_d}
    except Exception as exc:
        print("yahoo parse fail", symbol, exc)
        return None


def us_block(expected_us: str) -> dict:
    src = "https://query1.finance.yahoo.com/v8/finance/chart"
    items = []
    for symbol, name, kind in YAHOO:
        row = fetch_yahoo_symbol(symbol)
        if not row:
            items.append({
                "symbol": symbol, "name": name, "ok": False,
                "status": "未能核實／未更新",
            })
            continue
        stale_row = bool(row.get("date") and row["date"] < expected_us)
        items.append({
            "symbol": symbol,
            "name": name,
            "ok": True,
            "stale": stale_row,
            "last": round(row["last"], 4) if row["last"] is not None else None,
            "prev": round(row["prev"], 4) if row["prev"] is not None else None,
            "chg": round(row["chg"], 4) if row["chg"] is not None else None,
            "pct": round(row["pct"], 2) if row["pct"] is not None else None,
            "date": row.get("date"),
            "kind": kind,
        })
    ok_n = sum(1 for x in items if x.get("ok") and not x.get("stale"))
    cash_dates = [x.get("date") for x in items if x.get("symbol") in ("^GSPC", "^DJI", "^IXIC") and x.get("date")]
    us_date = max(cash_dates) if cash_dates else None
    return {
        "ok": ok_n >= 3,
        "stale": bool(us_date and us_date < expected_us),
        "asOf": us_date,
        "source": src,
        "sourceNote": "Yahoo Finance 日線收市（美東日期）",
        "items": items if ok_n else [],
        "status": None if ok_n >= 3 else "未能核實／未更新",
    }


def walls_pack(rec: dict | None, expected: str, label: str, source_fallback: str) -> dict:
    if not rec:
        return {"ok": False, "stale": True, "status": "未能核實／未更新", "label": label}
    got = rec.get("date") or rec.get("asOf")
    is_stale = stale(got, expected)
    if is_stale:
        return {
            "ok": False, "stale": True, "date": got, "label": label,
            "status": "未能核實／未更新",
            "sourceUrl": rec.get("sourceUrl") or source_fallback,
            "note": f"最新檔為 {got}，預期 {expected}",
        }
    sm = rec.get("summary") or {}
    hz = rec.get("heavyZones") or {}
    fut = (((rec.get("futures") or {}).get("mhif") or {}).get("front")
           or ((rec.get("futures") or {}).get("hsif") or {}).get("front") or {})
    calls = (hz.get("callWalls") or [])[:5]
    puts = (hz.get("putWalls") or [])[:5]
    settle = fut.get("settle")
    return {
        "ok": True,
        "stale": False,
        "status": None,
        "label": label,
        "date": got,
        "sourceUrl": rec.get("sourceUrl") or source_fallback,
        "frontMonth": sm.get("frontMonth"),
        "nextMonth": sm.get("nextMonth"),
        "callOI": sm.get("callOI"),
        "putOI": sm.get("putOI"),
        "callOIChange": sm.get("callOIChange"),
        "putOIChange": sm.get("putOIChange"),
        "callPct": sm.get("callPct"),
        "putPct": sm.get("putPct"),
        "totalOI": sm.get("totalOI"),
        "totalOIChange": sm.get("totalOIChange"),
        "pcRatio": round(sm["putOI"] / sm["callOI"], 2) if sm.get("callOI") else None,
        "settle": settle,
        "settleChange": fut.get("settleChange"),
        "callWalls": [{"strike": z.get("strike"), "oi": z.get("oi"), "oiChange": z.get("oiChange")} for z in calls],
        "putWalls": [{"strike": z.get("strike"), "oi": z.get("oi"), "oiChange": z.get("oiChange")} for z in puts],
    }


def cbbc_block(d: dict | None, expected: str) -> dict:
    src = "https://www.gswarrants.com.hk/en/market/hsi-cbbc-outstanding-distribution"
    if not d:
        return {"ok": False, "stale": True, "status": "未能核實／未更新", "source": src}
    got = d.get("asOf")
    if stale(got, expected):
        return {
            "ok": False, "stale": True, "asOf": got, "published": d.get("published"),
            "status": "未能核實／未更新",
            "source": d.get("source") or src,
            "sourcePages": d.get("sourcePages") or [],
            "note": f"最新街貨欄 {got}，預期 {expected}",
        }
    spot = d.get("spot")
    bins = d.get("bins") or []
    near = d.get("nearKoPts") or 1000
    bear = [b for b in bins if b.get("side") == "bear" and spot is not None
            and b.get("lo") is not None and b["lo"] >= spot and b["lo"] <= spot + near]
    bull = [b for b in bins if b.get("side") == "bull" and spot is not None
            and b.get("hi") is not None and b["hi"] <= spot and b["hi"] >= spot - near]
    bear.sort(key=lambda b: -(b.get("fut") or 0))
    bull.sort(key=lambda b: -(b.get("fut") or 0))

    def slim(b):
        return {"lo": b.get("lo"), "hi": b.get("hi"), "call": b.get("call"), "fut": b.get("fut"), "chg": b.get("chg")}

    return {
        "ok": True, "stale": False, "status": None,
        "asOf": got,
        "published": d.get("published"),
        "spot": spot,
        "prevClose": d.get("prevClose"),
        "bullFut": d.get("bullFut"),
        "bearFut": d.get("bearFut"),
        "bullPct": d.get("bullPct"),
        "bearPct": d.get("bearPct"),
        "ratio": round(d["bullFut"] / d["bearFut"], 2) if d.get("bearFut") else None,
        "nearKoPts": near,
        "nearKoBull": d.get("nearKoBull"),
        "nearKoBear": d.get("nearKoBear"),
        "flow1d": d.get("flow1d") or {},
        "calledNote": d.get("calledNote"),
        "source": d.get("source") or src,
        "sourcePages": d.get("sourcePages") or [],
        "nearBear": [slim(b) for b in bear[:4]],
        "nearBull": [slim(b) for b in bull[:4]],
        "note": "僅作對沖地圖，並非買賣牛熊證。",
    }


def stock_block(bag: dict | None, expected: str) -> dict:
    src = "https://www.hkex.com.hk/eng/stat/dmstat/dayrpt/"
    k, rec = latest_dated(bag)
    if not rec or stale(k, expected):
        return {
            "ok": False, "stale": True, "date": k,
            "status": "未能核實／未更新",
            "sourceUrl": (rec or {}).get("sourceUrl") or src,
            "items": [],
            "note": f"最新檔為 {k}，預期 {expected}" if k else None,
        }
    und = rec.get("underlyings") or {}
    items = []
    for hkats in STOCK_ORDER:
        u = und.get(hkats)
        if not u:
            continue
        close = u.get("close")
        cw = (u.get("callWalls") or [{}])[0]
        pw = (u.get("putWalls") or [{}])[0]
        bits = []
        if close is not None:
            bits.append(f"收市 {close}")
        if cw.get("strike") is not None:
            bits.append(f"認購牆 {cw['strike']} OI {cw.get('oi', '—')}")
            if close is not None:
                bits.append(f"距認購牆 {round(cw['strike'] - close, 2)}")
        if pw.get("strike") is not None:
            bits.append(f"認沽牆 {pw['strike']} OI {pw.get('oi', '—')}")
            if close is not None:
                bits.append(f"距認沽牆 {round(close - pw['strike'], 2)}")
        vol = u.get("volume")
        if vol is not None:
            bits.append(f"成交 {vol}")
        items.append({
            "hkats": hkats,
            "code": u.get("code"),
            "name": u.get("name"),
            "close": close,
            "volume": vol,
            "callOI": u.get("callOI"),
            "putOI": u.get("putOI"),
            "callWall": cw.get("strike"),
            "putWall": pw.get("strike"),
            "reason": " · ".join(bits) if bits else "有檔但欄位不足",
        })
    items = items[:6]
    return {
        "ok": bool(items),
        "stale": False,
        "date": k,
        "sourceUrl": rec.get("sourceUrl") or src,
        "status": None if items else "未能核實／未更新",
        "items": items,
    }


def calendar_today(cal: dict | None, session: str) -> dict:
    src = "https://www.forexfactory.com/calendar"
    if not cal:
        return {"ok": False, "status": "未能核實／未更新", "source": src, "items": []}
    rows = (cal.get("thisWeek") or []) + (cal.get("lastWeek") or [])
    today = [e for e in rows if e.get("date") == session and e.get("impact") in ("high", "med")]
    return {
        "ok": True,
        "asOf": cal.get("asOf"),
        "source": cal.get("source") or src,
        "items": today[:8],
        "status": None,
    }


def one_liner(us, hsi, mini, cbbc) -> str:
    parts = []
    if us.get("ok"):
        spx = next((x for x in us.get("items") or [] if x.get("symbol") == "^GSPC" and x.get("ok")), None)
        vix = next((x for x in us.get("items") or [] if x.get("symbol") == "^VIX" and x.get("ok")), None)
        if spx and spx.get("pct") is not None:
            sign = "+" if spx["pct"] > 0 else ""
            parts.append(f"標普 {sign}{spx['pct']}%")
        if vix and vix.get("last") is not None:
            parts.append(f"VIX {vix['last']:.2f}")
    if hsi.get("ok") and hsi.get("callWalls"):
        parts.append(f"恒指認購牆 {hsi['callWalls'][0]['strike']}")
    if hsi.get("ok") and hsi.get("putWalls"):
        parts.append(f"認沽牆 {hsi['putWalls'][0]['strike']}")
    if mini.get("ok") and mini.get("callWalls"):
        parts.append(f"小恒認購牆 {mini['callWalls'][0]['strike']}")
    if cbbc.get("ok") and cbbc.get("spot") is not None:
        parts.append(f"街貨現價 {cbbc['spot']}")
        if cbbc.get("nearKoBear") is not None and cbbc.get("nearKoBull") is not None:
            parts.append(f"近收回 牛{cbbc['nearKoBull']}/熊{cbbc['nearKoBear']}")
    if not parts:
        return "今日數據未齊，不下結論。"
    return " · ".join(parts)


def implications(us, hsi, mini, cbbc) -> list[str]:
    lines = ["牆、街貨與隔夜僅作地圖與濾鏡，不構成方向或進場訊號。"]
    if us.get("ok"):
        spx = next((x for x in us.get("items") or [] if x.get("symbol") == "^GSPC" and x.get("ok")), None)
        if spx and spx.get("pct") is not None:
            if spx["pct"] <= -0.8:
                lines.append("隔夜標普下跌超過 0.8%，開市區間或較闊；無方向優勢。")
            elif spx["pct"] >= 0.8:
                lines.append("隔夜標普上升超過 0.8%，開市或有跳空；先讀牆位，不追第一跳。")
            else:
                lines.append("隔夜標普波幅不大，不把隔夜當今日方向。")
    settle = hsi.get("settle") if hsi.get("ok") else None
    if hsi.get("ok") and settle is not None:
        band = max(abs(settle) * 0.01, 150)
        for cw in hsi.get("callWalls") or []:
            if cw and cw.get("strike") is not None and 0 <= cw["strike"] - settle <= band * 1.2:
                lines.append(f"恒指即月認購牆 {cw['strike']} 接近結算 {settle}，先當阻力地圖。")
                break
        for pw in hsi.get("putWalls") or []:
            if pw and pw.get("strike") is not None and 0 <= settle - pw["strike"] <= band * 1.2:
                lines.append(f"恒指即月認沽牆 {pw['strike']} 接近結算 {settle}，先當支持地圖。")
                break
    if mini.get("ok"):
        lines.append("小恒牆位已核實，與恒指一併讀，不因單一牆位預測開市方向。")
    if cbbc.get("ok"):
        nb, nu = cbbc.get("nearKoBear"), cbbc.get("nearKoBull")
        if nb is not None and nu is not None:
            if nb > nu * 1.15:
                lines.append("現價之上近收回熊證較重，屬對沖流動性地圖；屠熊進行中不要 fade。")
            elif nu > nb * 1.15:
                lines.append("現價之下近收回牛證較重，屬對沖流動性地圖；屠牛進行中不要 fade。")
            else:
                lines.append("近收回牛／熊未見明顯單邊堆疊。")
    return lines


def missing_notes(us, hsi, mini, cbbc, stocks) -> list[str]:
    out = []
    for name, blk in [("美股隔夜", us), ("恒指期權", hsi), ("小恒期權", mini), ("牛熊街貨", cbbc), ("股票期權", stocks)]:
        if not blk.get("ok"):
            note = blk.get("note")
            extra = f"（{note}）" if note else ""
            out.append(f"{name}：{blk.get('status') or '未能核實／未更新'}{extra}")
    return out


def build(session: datetime | None = None) -> dict:
    session = session or now_hkt()
    session_d = ymd(session)
    built_at = session.strftime("%Y-%m-%d %H:%M")
    closed = not is_hk_session(session)
    expected = ymd(prev_hk_session(session))
    us_exp = prev_us_session_date(session)

    base = {
        "asOf": built_at,
        "sessionDate": session_d,
        "usSessionDate": us_exp,
        "expectedOiDate": expected,
        "tz": "HKT",
        "title": "香港早晨 · 美股收市／小恒早盤",
        "disclaimer": "研究用，非買賣建議。牆與街貨為對沖地圖，不構成投資建議。",
        "pipeline": "GitHub Action 平日 09:00 HKT（cron 0 1 * * 1-5）由 scripts/update_morning_brief.py 寫入 morning-brief/data.js。",
    }
    if closed:
        reason = "週末" if session.weekday() >= 5 else "香港公眾假期／休市"
        base.update({
            "closed": True,
            "closedReason": reason,
            "oneLiner": f"今日{reason}，不下完整早盤簡報。",
            "us": {"ok": False, "status": "休市不編製"},
            "hsi": {"ok": False, "status": "休市不編製"},
            "mini": {"ok": False, "status": "休市不編製"},
            "cbbc": {"ok": False, "status": "休市不編製"},
            "stocks": {"ok": False, "status": "休市不編製", "items": []},
            "calendar": {"ok": False, "items": []},
            "implications": ["休市日不編製開市濾鏡。"],
            "missing": [],
        })
        return base

    hsi_bag = load_js_object(ROOT / "data.js", "window.HSI_REPORTS")
    mini_bag = load_js_object(ROOT / "data-mini.js", "window.MINI_HSI_REPORTS")
    stock_bag = load_js_object(ROOT / "stock-oi" / "data.js", "window.STOCK_OI")
    cbbc_raw = load_js_object(ROOT / "cbbc" / "data.js", "window.CBBC_HSI")
    cal_raw = load_js_object(ROOT / "calendar" / "data.js", "window.FF_CAL")

    _, hsi_rec = latest_dated(hsi_bag)
    _, mini_rec = latest_dated(mini_bag)

    us = us_block(us_exp)
    hsi = walls_pack(hsi_rec, expected, "恒指期權 HSI", "https://www.hkex.com.hk/chi/stat/dmstat/dayrpt/")
    mini = walls_pack(mini_rec, expected, "小型恒指 Mini-HSI", "https://www.hkex.com.hk/chi/stat/dmstat/dayrpt/")
    cbbc = cbbc_block(cbbc_raw, expected)
    stocks = stock_block(stock_bag, expected)
    cal = calendar_today(cal_raw, session_d)

    if us.get("asOf"):
        base["usSessionDate"] = us["asOf"]

    base.update({
        "closed": False,
        "oneLiner": one_liner(us, hsi, mini, cbbc),
        "us": us,
        "hsi": hsi,
        "mini": mini,
        "cbbc": cbbc,
        "stocks": stocks,
        "calendar": cal,
        "implications": implications(us, hsi, mini, cbbc),
        "missing": missing_notes(us, hsi, mini, cbbc, stocks),
    })
    return base


def write_js(payload: dict) -> None:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    HIST.mkdir(parents=True, exist_ok=True)
    day = payload.get("sessionDate") or "unknown"
    (HIST / f"{day}.json").write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    body = (
        "/* Exodus morning brief — generated, do not edit by hand.\n"
        "   Builder: scripts/update_morning_brief.py\n"
        "   Schedule: weekday 09:00 Asia/Hong_Kong (cron 0 1 * * 1-5).\n"
        "   Missing feeds stay empty with 未能核實／未更新. Never invents walls or prices.\n"
        "*/\n"
        "window.MORNING_BRIEF = "
        + json.dumps(payload, ensure_ascii=False, indent=2)
        + ";\n"
    )
    OUT.write_text(body, encoding="utf-8")
    print(
        f"wrote {OUT} session={payload.get('sessionDate')} closed={payload.get('closed')} "
        f"oneLiner={payload.get('oneLiner')}"
    )


def main() -> int:
    payload = build()
    write_js(payload)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
