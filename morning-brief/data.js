/* Exodus morning brief — generated, do not edit by hand.
   Builder: scripts/update_morning_brief.py
   Schedule: weekday 09:00 Asia/Hong_Kong (cron 0 1 * * 1-5).
   Missing feeds stay empty with 未能核實／未更新. Never invents walls or prices.
*/
window.MORNING_BRIEF = {
  "asOf": "2026-11-26 17:19",
  "sessionDate": "2026-11-26",
  "usSessionDate": "2026-11-25",
  "expectedOiDate": "2026-11-25",
  "tz": "HKT",
  "title": "香港早晨 · 美股收市／小恒早盤",
  "disclaimer": "研究用，非買賣建議。牆與街貨為對沖地圖，不構成投資建議。",
  "pipeline": "GitHub Action 平日 09:00 HKT（cron 0 1 * * 1-5）由 scripts/update_morning_brief.py 寫入 morning-brief/data.js。",
  "closed": false,
  "oneLiner": "標普 -0.25% · VIX 27.01 · 恒指認購牆 22600 · 認沽牆 21400",
  "us": {
    "ok": true,
    "stale": false,
    "asOf": "2026-11-25",
    "source": "https://query1.finance.yahoo.com/v8/finance/chart",
    "sourceNote": "Yahoo Finance 日線收市（美東日期）",
    "items": [
      {
        "symbol": "^GSPC",
        "name": "標普 S&P 500",
        "ok": true,
        "stale": false,
        "last": 7182.7798,
        "prev": 7201.0898,
        "chg": -18.3101,
        "pct": -0.25,
        "date": "2026-11-25",
        "kind": "%"
      },
      {
        "symbol": "^DJI",
        "name": "道指 Dow",
        "ok": true,
        "stale": false,
        "last": 50182.9492,
        "prev": 50018.6992,
        "chg": 164.25,
        "pct": 0.33,
        "date": "2026-11-25",
        "kind": "%"
      },
      {
        "symbol": "^IXIC",
        "name": "納指 Nasdaq",
        "ok": true,
        "stale": false,
        "last": 23585.8008,
        "prev": 23733.5391,
        "chg": -147.7383,
        "pct": -0.62,
        "date": "2026-11-25",
        "kind": "%"
      },
      {
        "symbol": "^VIX",
        "name": "VIX",
        "ok": true,
        "stale": false,
        "last": 27.01,
        "prev": 28.29,
        "chg": -1.28,
        "pct": -4.52,
        "date": "2026-11-26",
        "kind": "pt"
      },
      {
        "symbol": "CL=F",
        "name": "WTI 原油",
        "ok": true,
        "stale": false,
        "last": 83.47,
        "prev": 83.68,
        "chg": -0.21,
        "pct": -0.25,
        "date": "2026-11-26",
        "kind": "%"
      },
      {
        "symbol": "^TNX",
        "name": "美10年期債 Yahoo ^TNX",
        "ok": true,
        "stale": false,
        "last": 4.848,
        "prev": 4.904,
        "chg": -0.056,
        "pct": -1.14,
        "date": "2026-11-25",
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
    "date": "2026-11-25",
    "sourceUrl": "https://www.hkex.com.hk/chi/stat/dmstat/dayrpt/hsioc261125.htm",
    "frontMonth": "2026-11",
    "nextMonth": "2026-12",
    "callOI": 29616,
    "putOI": 33188,
    "callOIChange": 895,
    "putOIChange": -159,
    "callPct": 47.2,
    "putPct": 52.8,
    "totalOI": 62804,
    "totalOIChange": 736,
    "pcRatio": 1.12,
    "settle": 21939,
    "settleChange": -274,
    "callWalls": [
      {
        "strike": 22600,
        "oi": 3706,
        "oiChange": 210
      },
      {
        "strike": 23400,
        "oi": 3005,
        "oiChange": -5
      },
      {
        "strike": 23600,
        "oi": 2360,
        "oiChange": -145
      },
      {
        "strike": 23200,
        "oi": 1785,
        "oiChange": -71
      },
      {
        "strike": 23000,
        "oi": 1349,
        "oiChange": 203
      }
    ],
    "putWalls": [
      {
        "strike": 21400,
        "oi": 2466,
        "oiChange": 0
      },
      {
        "strike": 21200,
        "oi": 2320,
        "oiChange": -58
      },
      {
        "strike": 22000,
        "oi": 1833,
        "oiChange": 314
      },
      {
        "strike": 21600,
        "oi": 1734,
        "oiChange": 153
      },
      {
        "strike": 22400,
        "oi": 1087,
        "oiChange": -88
      }
    ]
  },
  "mini": {
    "ok": false,
    "stale": true,
    "date": "2026-11-24",
    "label": "小型恒指 Mini-HSI",
    "status": "未能核實／未更新",
    "sourceUrl": "https://www.hkex.com.hk/chi/stat/dmstat/dayrpt/mhioc261124.htm",
    "note": "最新檔為 2026-11-24，預期 2026-11-25"
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
    "note": "最新街貨欄 2026-10-27，預期 2026-11-25"
  },
  "stocks": {
    "ok": true,
    "stale": false,
    "date": "2026-11-25",
    "sourceUrl": "https://www.hkex.com.hk/eng/stat/dmstat/dayrpt/dqe261125.htm",
    "status": null,
    "items": [
      {
        "hkats": "TCH",
        "code": "00700",
        "name": "騰訊 Tencent",
        "close": 337.4,
        "volume": 96983,
        "callOI": 1423318,
        "putOI": 968426,
        "callWall": 430.0,
        "putWall": 370.0,
        "reason": "收市 337.4 · 認購牆 430.0 OI 15414 · 距認購牆 92.6 · 認沽牆 370.0 OI 8637 · 距認沽牆 -32.6 · 成交 96983"
      },
      {
        "hkats": "ALB",
        "code": "09988",
        "name": "阿里巴巴 Alibaba",
        "close": 81.2,
        "volume": 84490,
        "callOI": 1098166,
        "putOI": 1025004,
        "callWall": 110.0,
        "putWall": 90.0,
        "reason": "收市 81.2 · 認購牆 110.0 OI 18397 · 距認購牆 28.8 · 認沽牆 90.0 OI 14096 · 距認沽牆 -8.8 · 成交 84490"
      },
      {
        "hkats": "MIU",
        "code": "01810",
        "name": "小米 Xiaomi",
        "close": 26.56,
        "volume": 61852,
        "callOI": 656439,
        "putOI": 594084,
        "callWall": 30.0,
        "putWall": 25.0,
        "reason": "收市 26.56 · 認購牆 30.0 OI 15675 · 距認購牆 3.44 · 認沽牆 25.0 OI 17265 · 距認沽牆 1.56 · 成交 61852"
      },
      {
        "hkats": "MET",
        "code": "03690",
        "name": "美團 Meituan",
        "close": 61.45,
        "volume": 48993,
        "callOI": 506062,
        "putOI": 502723,
        "callWall": 80.0,
        "putWall": 70.0,
        "reason": "收市 61.45 · 認購牆 80.0 OI 7538 · 距認購牆 18.55 · 認沽牆 70.0 OI 8306 · 距認沽牆 -8.55 · 成交 48993"
      },
      {
        "hkats": "HEX",
        "code": "00388",
        "name": "港交所 HKEX",
        "close": 346.8,
        "volume": 19064,
        "callOI": 224548,
        "putOI": 179859,
        "callWall": 430.0,
        "putWall": 380.0,
        "reason": "收市 346.8 · 認購牆 430.0 OI 5152 · 距認購牆 83.2 · 認沽牆 380.0 OI 6286 · 距認沽牆 -33.2 · 成交 19064"
      },
      {
        "hkats": "KST",
        "code": "01024",
        "name": "快手 Kuaishou",
        "close": 19.52,
        "volume": 20860,
        "callOI": 318669,
        "putOI": 206416,
        "callWall": 30.0,
        "putWall": 22.0,
        "reason": "收市 19.52 · 認購牆 30.0 OI 8588 · 距認購牆 10.48 · 認沽牆 22.0 OI 1887 · 距認沽牆 -2.48 · 成交 20860"
      }
    ]
  },
  "calendar": {
    "ok": true,
    "asOf": "2026-11-26 12:59",
    "source": "https://www.forexfactory.com/calendar",
    "items": [],
    "status": null
  },
  "implications": [
    "牆、街貨與隔夜僅作地圖與濾鏡，不構成方向或進場訊號。",
    "隔夜標普波幅不大，不把隔夜當今日方向。"
  ],
  "missing": [
    "小恒期權：未能核實／未更新（最新檔為 2026-11-24，預期 2026-11-25）",
    "牛熊街貨：未能核實／未更新（最新街貨欄 2026-10-27，預期 2026-11-25）"
  ]
};
