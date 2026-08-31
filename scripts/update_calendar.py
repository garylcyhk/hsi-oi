#!/usr/bin/env python3
"""Refresh calendar/data.js from Forex Factory this-week JSON."""
from __future__ import annotations
import json, re, urllib.request
from datetime import datetime, timedelta
from pathlib import Path
from zoneinfo import ZoneInfo

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "calendar" / "data.js"
FEED = "https://nfs.faireconomy.media/ff_calendar_thisweek.json"
KEEP_CCY = {"USD", "CNY", "JPY", "HKD", "AUD"}
HKT = ZoneInfo("Asia/Hong_Kong")
IMPACT_MAP = {"High": "high", "Medium": "med", "Low": "low", "Holiday": "low"}

def fetch_feed():
    req = urllib.request.Request(FEED, headers={"User-Agent": "ExodusCalendarBot/1.0 (+github.com/garylcyhk/hsi-oi)"})
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.loads(resp.read().decode("utf-8"))

def load_existing():
    if not OUT.exists():
        return {"lastWeek": [], "thisWeek": []}
    text = OUT.read_text(encoding="utf-8")
    m = re.search(r"window\.FF_CAL\s*=\s*(\{.*\})\s*;?\s*$", text, re.S)
    if not m:
        return {"lastWeek": [], "thisWeek": []}
    try:
        return json.loads(m.group(1))
    except json.JSONDecodeError:
        return {"lastWeek": [], "thisWeek": []}

def parse_event(row):
    ccy = (row.get("country") or "").strip()
    if ccy not in KEEP_CCY:
        return None
    impact = IMPACT_MAP.get(row.get("impact") or "", "low")
    if impact == "low":
        return None
    try:
        dt = datetime.fromisoformat(row["date"]).astimezone(HKT)
    except Exception:
        return None
    return {
        "date": dt.strftime("%Y-%m-%d"),
        "time": dt.strftime("%H:%M"),
        "ccy": ccy,
        "impact": impact,
        "name": (row.get("title") or "").strip(),
        "actual": (row.get("actual") or "").strip(),
        "forecast": (row.get("forecast") or "").strip() or "\u2014",
        "previous": (row.get("previous") or "").strip() or "\u2014",
    }

def key(ev):
    return (ev.get("date"), ev.get("ccy"), ev.get("name"))

def merge_unique(old, new):
    seen, out = set(), []
    for ev in list(new) + list(old):
        if not ev or not ev.get("name"):
            continue
        k = key(ev)
        if k in seen:
            continue
        seen.add(k)
        out.append(ev)
    out.sort(key=lambda e: (e.get("date") or "", e.get("time") or "", e.get("ccy") or ""))
    return out

def main():
    now = datetime.now(HKT)
    today = now.date()
    week_start = today - timedelta(days=today.weekday())
    last_start = week_start - timedelta(days=7)
    existing = load_existing()
    try:
        rows = fetch_feed()
    except Exception as exc:
        print("feed failed:", exc)
        return 1
    parsed = [p for p in (parse_event(r) for r in rows) if p]
    live_this, live_last = [], []
    for ev in parsed:
        d = datetime.strptime(ev["date"], "%Y-%m-%d").date()
        if d >= week_start:
            live_this.append(ev)
        elif d >= last_start:
            live_last.append(ev)
    last_week = merge_unique(existing.get("lastWeek") or existing.get("thisWeek") or [], live_last)
    last_week = [e for e in last_week if last_start <= datetime.strptime(e["date"], "%Y-%m-%d").date() < week_start]
    this_week = merge_unique([], live_this)
    if this_week:
        range_label = f"{this_week[0]['date'][5:]}\u2013{this_week[-1]['date'][5:]} \u672c\u9031"
    else:
        range_label = "\u672c\u9031"
    payload = {
        "asOf": now.strftime("%Y-%m-%d %H:%M"),
        "tz": "HKT",
        "source": "https://www.forexfactory.com/calendar",
        "sourceRange": "https://www.forexfactory.com/calendar?week=this",
        "rangeLabel": range_label + " \u00b7 \u81ea\u52d5\u66f4\u65b0",
        "note": "\u6bcf\u65e5\u81ea\u52d5\u66f4\u65b0\u672c\u9031\uff08FF this-week JSON\uff09\u3002\u4e0b\u9031\u6703\u5728\u9031\u65e5\uff0f\u4e00\u63db\u9031\u5f8c\u51fa\u73fe\u3002\u7cbe\u9078 USD/CNY/JPY/HKD/AUD \u4e2d\u9ad8\u5f71\u97ff\u3002",
        "lastWeek": last_week,
        "thisWeek": this_week,
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text("window.FF_CAL = " + json.dumps(payload, ensure_ascii=False, indent=2) + ";\n", encoding="utf-8")
    print(f"wrote {OUT} last={len(last_week)} this={len(this_week)}")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
