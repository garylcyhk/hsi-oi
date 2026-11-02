/* Exodus morning brief — generated, do not edit by hand.
   Builder: scripts/update_morning_brief.py
   Schedule: weekday 09:00 Asia/Hong_Kong (cron 0 1 * * 1-5).
   Missing feeds stay empty with 未能核實／未更新. Never invents walls or prices.
*/
window.MORNING_BRIEF = {
  "asOf": "2026-11-02 15:32",
  "sessionDate": "2026-11-02",
  "usSessionDate": "2026-10-30",
  "expectedOiDate": "2026-10-30",
  "tz": "HKT",
  "title": "香港早晨 · 美股收市／小恒早盤",
  "disclaimer": "研究用，非買賣建議。牆與街貨為對沖地圖，不構成投資建議。",
  "pipeline": "GitHub Action 平日 09:00 HKT（cron 0 1 * * 1-5）由 scripts/update_morning_brief.py 寫入 morning-brief/data.js。",
  "closed": false,
  "oneLiner": "標普 -1.82% · VIX 19.42 · 恒指認購牆 24000 · 認沽牆 22400",
  "us": {
    "ok": true,
    "stale": false,
    "asOf": "2026-10-30",
    "source": "https://query1.finance.yahoo.com/v8/finance/chart",
    "sourceNote": "Yahoo Finance 日線收市（美東日期）",
    "items": [
      {
        "symbol": "^GSPC",
        "name": "標普 S&P 500",
        "ok": true,
        "stale": false,
        "last": 7580.0698,
        "prev": 7720.3901,
        "chg": -140.3203,
        "pct": -1.82,
        "date": "2026-10-30",
        "kind": "%"
      },
      {
        "symbol": "^DJI",
        "name": "道指 Dow",
        "ok": true,
        "stale": false,
        "last": 51770.3086,
        "prev": 52342.5586,
        "chg": -572.25,
        "pct": -1.09,
        "date": "2026-10-30",
        "kind": "%"
      },
      {
        "symbol": "^IXIC",
        "name": "納指 Nasdaq",
        "ok": true,
        "stale": false,
        "last": 25437.0,
        "prev": 26184.7207,
        "chg": -747.7207,
        "pct": -2.86,
        "date": "2026-10-30",
        "kind": "%"
      },
      {
        "symbol": "^VIX",
        "name": "VIX",
        "ok": true,
        "stale": false,
        "last": 19.42,
        "prev": 17.2,
        "chg": 2.22,
        "pct": 12.91,
        "date": "2026-10-30",
        "kind": "pt"
      },
      {
        "symbol": "CL=F",
        "name": "WTI 原油",
        "ok": true,
        "stale": false,
        "last": 100.59,
        "prev": 104.12,
        "chg": -3.53,
        "pct": -3.39,
        "date": "2026-11-02",
        "kind": "%"
      },
      {
        "symbol": "^TNX",
        "name": "美10年期債 Yahoo ^TNX",
        "ok": true,
        "stale": false,
        "last": 4.929,
        "prev": 4.989,
        "chg": -0.06,
        "pct": -1.2,
        "date": "2026-10-30",
        "kind": "raw"
      }
    ],
    "status": null
  },
  "hsi": {
    "ok": true,
    "stale": false,
    "status": null,
    "label": "恒指期權 HSI",
    "date": "2026-10-30",
    "sourceUrl": "https://www.hkex.com.hk/chi/stat/dmstat/dayrpt/hsioc261030.htm",
    "frontMonth": "2026-11",
    "nextMonth": "2026-12",
    "callOI": 12307,
    "putOI": 17052,
    "callOIChange": 780,
    "putOIChange": 1574,
    "callPct": 41.9,
    "putPct": 58.1,
    "totalOI": 29359,
    "totalOIChange": 2354,
    "pcRatio": 1.39,
    "settle": 23287,
    "settleChange": 263,
    "callWalls": [
      {
        "strike": 24000,
        "oi": 1318,
        "oiChange": 234
      },
      {
        "strike": 23200,
        "oi": 873,
        "oiChange": 247
      },
      {
        "strike": 23800,
        "oi": 698,
        "oiChange": -91
      },
      {
        "strike": 24400,
        "oi": 664,
        "oiChange": 68
      },
      {
        "strike": 25000,
        "oi": 604,
        "oiChange": 24
      }
    ],
    "putWalls": [
      {
        "strike": 22400,
        "oi": 1330,
        "oiChange": 7
      },
      {
        "strike": 22800,
        "oi": 893,
        "oiChange": 28
      },
      {
        "strike": 17000,
        "oi": 835,
        "oiChange": 103
      },
      {
        "strike": 21200,
        "oi": 819,
        "oiChange": 23
      },
      {
        "strike": 22600,
        "oi": 776,
        "oiChange": -4
      }
    ]
  },
  "mini": {
    "ok": false,
    "stale": true,
    "date": "2026-10-29",
    "label": "小型恒指 Mini-HSI",
    "status": "未能核實／未更新",
    "sourceUrl": "https://www.hkex.com.hk/chi/stat/dmstat/dayrpt/mhioc261029.htm",
    "note": "最新檔為 2026-10-29，預期 2026-10-30"
  },
  "cbbc": {
    "ok": false,
    "stale": true,
    "asOf": "2026-10-27",
    "published": "2026-10-28 08:05",
    "status": "未能核實／未更新",
    "source": "Issuer CBBC outstanding distribution (GS market-wide, HKEX-reported street qty)",
    "sourcePages": [
      {
        "name": "GS HSI CBBC OS",
        "url": "https://www.gswarrants.com.hk/en/market/hsi-cbbc-outstanding-distribution"
      },
      {
        "name": "SG 法興 街貨分佈",
        "url": "https://hk.warrants.com/tc/cbbc/outstanding-distribution"
      },
      {
        "name": "UBS Index CBBC OS",
        "url": "https://warrants.ubs.com/en/cbbc/index-cbbc-outstanding"
      }
    ],
    "note": "最新街貨欄 2026-10-27，預期 2026-10-30"
  },
  "stocks": {
    "ok": true,
    "stale": false,
    "date": "2026-10-30",
    "sourceUrl": "https://www.hkex.com.hk/eng/stat/dmstat/dayrpt/dqe261030.htm",
    "status": null,
    "items": [
      {
        "hkats": "TCH",
        "code": "00700",
        "name": "騰訊 Tencent",
        "close": 383.6,
        "volume": 109591,
        "callOI": 1110203,
        "putOI": 921921,
        "callWall": 400.0,
        "putWall": 380.0,
        "reason": "收市 383.6 · 認購牆 400.0 OI 4901 · 距認購牆 16.4 · 認沽牆 380.0 OI 6589 · 距認沽牆 3.6 · 成交 109591"
      },
      {
        "hkats": "ALB",
        "code": "09988",
        "name": "阿里巴巴 Alibaba",
        "close": 97.05,
        "volume": 90519,
        "callOI": 834732,
        "putOI": 953245,
        "callWall": 101.0,
        "putWall": 97.0,
        "reason": "收市 97.05 · 認購牆 101.0 OI 1863 · 距認購牆 3.95 · 認沽牆 97.0 OI 2297 · 距認沽牆 0.05 · 成交 90519"
      },
      {
        "hkats": "MIU",
        "code": "01810",
        "name": "小米 Xiaomi",
        "close": 26.48,
        "volume": 59753,
        "callOI": 541249,
        "putOI": 502293,
        "callWall": 27.0,
        "putWall": 25.5,
        "reason": "收市 26.48 · 認購牆 27.0 OI 1015 · 距認購牆 0.52 · 認沽牆 25.5 OI 899 · 距認沽牆 0.98 · 成交 59753"
      },
      {
        "hkats": "MET",
        "code": "03690",
        "name": "美團 Meituan",
        "close": 71.6,
        "volume": 49112,
        "callOI": 409492,
        "putOI": 455285,
        "callWall": 80.0,
        "putWall": 71.0,
        "reason": "收市 71.6 · 認購牆 80.0 OI 1077 · 距認購牆 8.4 · 認沽牆 71.0 OI 415 · 距認沽牆 0.6 · 成交 49112"
      },
      {
        "hkats": "HEX",
        "code": "00388",
        "name": "港交所 HKEX",
        "close": 367.4,
        "volume": 16157,
        "callOI": 162701,
        "putOI": 151313,
        "callWall": 380.0,
        "putWall": 360.0,
        "reason": "收市 367.4 · 認購牆 380.0 OI 621 · 距認購牆 12.6 · 認沽牆 360.0 OI 936 · 距認沽牆 7.4 · 成交 16157"
      },
      {
        "hkats": "KST",
        "code": "01024",
        "name": "快手 Kuaishou",
        "close": 26.52,
        "volume": 23813,
        "callOI": 239424,
        "putOI": 199424,
        "callWall": 27.0,
        "putWall": 26.0,
        "reason": "收市 26.52 · 認購牆 27.0 OI 4348 · 距認購牆 0.48 · 認沽牆 26.0 OI 194 · 距認沽牆 0.52 · 成交 23813"
      }
    ]
  },
  "calendar": {
    "ok": true,
    "asOf": "2026-11-02 10:28",
    "source": "https://www.forexfactory.com/calendar",
    "items": [
      {
        "date": "2026-11-02",
        "time": "23:00",
        "ccy": "USD",
        "impact": "med",
        "name": "ISM Manufacturing PMI",
        "actual": "",
        "forecast": "54.5",
        "previous": "54.5"
      }
    ],
    "status": null
  },
  "implications": [
    "牆、街貨與隔夜僅作地圖與濾鏡，不構成方向或進場訊號。",
    "隔夜標普下跌超過 0.8%，開市區間或較闊；無方向優勢。"
  ],
  "missing": [
    "小恒期權：未能核實／未更新（最新檔為 2026-10-29，預期 2026-10-30）",
    "牛熊街貨：未能核實／未更新（最新街貨欄 2026-10-27，預期 2026-10-30）"
  ]
};
