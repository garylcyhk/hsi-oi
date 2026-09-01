#!/usr/bin/env python3
"""Refresh cbbc/data.js from Goldman Sachs HSI CBBC outstanding distribution."""
from __future__ import annotations
import json, re, urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "cbbc" / "data.js"
SRC = "https://www.gswarrants.com.hk/en/market/hsi-cbbc-outstanding-distribution"
FOOT = """setTimeout(function(){
  if(document.getElementById("cbbcCallCol")) return;
  var s=document.createElement("script");
  s.id="cbbcCallCol";
  s.src="call-col.js";
  document.body.appendChild(s);
},0);
"""

def to_int(s):
    return int(re.sub(r"[^0-9-]", "", str(s) or "0") or 0)

def fetch():
    req = urllib.request.Request(SRC, headers={"User-Agent": "ExodusCbbcBot/1.0 (+github.com/garylcyhk/hsi-oi)"})
    with urllib.request.urlopen(req, timeout=45) as resp:
        return resp.read().decode("utf-8", "replace")

def parse(html: str) -> dict:
    pub_m = re.search(r"Last Update[：:]\s*(\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2})", html)
    if not pub_m:
        raise RuntimeError("no last-update stamp")
    published = pub_m.group(1)
    pairs = re.findall(r"Bull\(([0-9,]+)\):Bear\(([0-9,]+)\)", html)
    if len(pairs) < 2:
        raise RuntimeError("missing bull/bear totals")
    nk_b, nk_r = to_int(pairs[0][0]), to_int(pairs[0][1])
    bull_tot, bear_tot = to_int(pairs[-1][0]), to_int(pairs[-1][1])
    spot_m = re.search(r"HSI Spot:\s*([0-9,]+)", html)
    if not spot_m:
        raise RuntimeError("no HSI spot")
    spot = to_int(spot_m.group(1))
    past = re.findall(r"cbbc-os-map__past-close[^>]*>([0-9,]+)", html)
    prev = to_int(past[1]) if len(past) > 1 else spot
    dates = re.findall(r"cbbc-os-map__date[^>]*>([0-9]{2}-[0-9]{2})", html)[:5]
    year = int(published[:4])
    as_of = f"{year}-{dates[0]}" if dates else published[:10]
    flow = re.search(
        r"Bull\s*:\s*<i class=\"icon-(up|down)[^"]*\"></i>\s*([0-9,]+)\s*Bear\s*:\s*<i class=\"icon-(up|down)[^"]*\"></i>\s*([0-9,]+)",
        html,
    )
    if flow:
        bull_chg = to_int(flow.group(2)) * (1 if flow.group(1) == "up" else -1)
        bear_chg = to_int(flow.group(4)) * (1 if flow.group(3) == "up" else -1)
    else:
        bull_chg = bear_chg = None
    bins = []
    for rowm in re.finditer(r"<tr tooltip-data='([^']+)'>(.*?)</tr>", html, re.S):
        tip, inner = rowm.group(1), rowm.group(2)
        rng = re.search(r"([\d,]+)\s*-\s*([\d,]+)", tip)
        if not rng:
            continue
        lo, hi = to_int(rng.group(1)), to_int(rng.group(2))
        text = re.sub(r"<[^>]+>", "|", inner)
        parts = [p.strip() for p in text.split("|") if p.strip()]
        bar = next((p for p in parts if re.match(r"^[\d,]+\([+-]?\d+\)$", p)), None)
        if not bar:
            continue
        bm = re.match(r"([\d,]+)\(([+-]?\d+)\)", bar)
        fut, chg = to_int(bm.group(1)), int(bm.group(2))
        hist = []
        for p in parts:
            if re.fullmatch(r"\d+", p.replace(",", "")) and "(" not in p:
                hist.append(to_int(p))
        hist = hist[:5]
        side = "bear" if lo >= spot else "bull"
        mid = (lo + hi) / 2
        ko = round(abs(mid - spot) / spot * 100, 1) if spot else None
        bins.append({"lo": lo, "hi": hi, "side": side, "fut": fut, "chg": chg, "hist": hist, "call": lo, "koPct": ko})
    if len(bins) < 8:
        raise RuntimeError(f"too few bins: {len(bins)}")
    totn = bull_tot + bear_tot
    return {
        "asOf": as_of,
        "published": published,
        "spot": spot,
        "prevClose": prev,
        "source": "Issuer CBBC outstanding distribution (GS market-wide, HKEX-reported street qty)",
        "sourcePages": [
            {"name": "GS HSI CBBC OS", "url": SRC},
            {"name": "SG 法興 街貨分佈", "url": "https://hk.warrants.com/tc/cbbc/outstanding-distribution"},
            {"name": "UBS Index CBBC OS", "url": "https://warrants.ubs.com/en/cbbc/index-cbbc-outstanding"},
        ],
        "bullFut": bull_tot,
        "bearFut": bear_tot,
        "bullPct": round(bull_tot / totn * 100, 1) if totn else None,
        "bearPct": round(bear_tot / totn * 100, 1) if totn else None,
        "nearKoPts": 1000,
        "nearKoBull": nk_b,
        "nearKoBear": nk_r,
        "flow1d": {"bullM": None, "bearM": None, "bullFut": bull_chg, "bearFut": bear_chg},
        "flow5d": {"bullM": None, "bearM": None},
        "flow5dSeries": {"dates": dates},
        "calledNote": f"自動更新自高盛 · 圖表 {published} · 街貨欄 {dates[0] if dates else as_of}",
        "bins": bins,
    }

def main():
    try:
        html = fetch()
        payload = parse(html)
    except Exception as exc:
        print("cbbc update failed:", exc)
        return 1
    OUT.parent.mkdir(parents=True, exist_ok=True)
    body = (
        "/* HSI CBBC outstanding by call-level bin.\n"
        "   Auto-updated from Goldman Sachs HSI CBBC outstanding distribution.\n"
        "   Units: futures-equivalent contracts.\n"
        "*/\n"
        "window.CBBC_HSI = "
        + json.dumps(payload, ensure_ascii=False, indent=2)
        + ";\n"
        + FOOT
    )
    OUT.write_text(body, encoding="utf-8")
    print(
        f"wrote {OUT} asOf={payload['asOf']} pub={payload['published']} "
        f"bins={len(payload['bins'])} bull={payload['bullFut']} bear={payload['bearFut']}"
    )
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
