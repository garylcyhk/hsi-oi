/* Exodus morning brief — generated, do not edit by hand.
   Builder: scripts/update_morning_brief.py
   Schedule: weekday 09:00 Asia/Hong_Kong (cron 0 1 * * 1-5).
   Missing feeds stay empty with 未能核實／未更新. Never invents walls or prices.
*/
window.MORNING_BRIEF = {
  "asOf": "2026-11-24 18:47",
  "sessionDate": "2026-11-24",
  "usSessionDate": "2026-11-23",
  "expectedOiDate": "2026-11-23",
  "tz": "HKT",
  "title": "香港早晨 · 美股收市／小恒早盤",
  "disclaimer": "研究用，非買賣建議。牆與街貨為對沖地圖，不構成投資建議。",
  "pipeline": "GitHub Action 平日 09:00 HKT（cron 0 1 * * 1-5）由 scripts/update_morning_brief.py 寫入 morning-brief/data.js。",
  "closed": false,
  "oneLiner": "標普 +4.73% · VIX 27.90 · 恒指認購牆 22600 · 認沽牆 21400",
  "us": {
    "ok": true,
    "stale": false,
    "asOf": "2026-11-23",
    "source": "https://query1.finance.yahoo.com/v8/finance/chart",
    "sourceNote": "Yahoo Finance 日線收市（美東日期）",
    "items": [
      {
        "symbol": "^GSPC",
        "name": "標普 S&P 500",
        "ok": true,
        "stale": false,
        "last": 7237.1699,
        "prev": 6910.3901,
        "chg": 326.7798,
        "pct": 4.73,
        "date": "2026-11-23",
        "kind": "%"
      },
      {
        "symbol": "^DJI",
        "name": "道指 Dow",
        "ok": true,
        "stale": false,
        "last": 49595.3086,
        "prev": 48147.3281,
        "chg": 1447.9805,
        "pct": 3.01,
        "date": "2026-11-23",
        "kind": "%"
      },
      {
        "symbol": "^IXIC",
        "name": "納指 Nasdaq",
        "ok": true,
        "stale": false,
        "last": 24089.5605,
        "prev": 22617.7305,
        "chg": 1471.8301,
        "pct": 6.51,
        "date": "2026-11-23",
        "kind": "%"
      },
      {
        "symbol": "^VIX",
        "name": "VIX",
        "ok": true,
        "stale": false,
        "last": 27.9,
        "prev": 26.62,
        "chg": 1.28,
        "pct": 4.81,
        "date": "2026-11-24",
        "kind": "pt"
      },
      {
        "symbol": "CL=F",
        "name": "WTI 原油",
        "ok": true,
        "stale": false,
        "last": 80.09,
        "prev": 80.17,
        "chg": -0.08,
        "pct": -0.1,
        "date": "2026-11-24",
        "kind": "%"
      },
      {
        "symbol": "^TNX",
        "name": "美10年期債 Yahoo ^TNX",
        "ok": true,
        "stale": false,
        "last": 4.918,
        "prev": 4.912,
        "chg": 0.006,
        "pct": 0.12,
        "date": "2026-11-23",
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
    "date": "2026-11-23",
    "sourceUrl": "https://www.hkex.com.hk/chi/stat/dmstat/dayrpt/hsioc261123.htm",
    "frontMonth": "2026-11",
    "nextMonth": "2026-12",
    "callOI": 27958,
    "putOI": 34575,
    "callOIChange": 2015,
    "putOIChange": 2193,
    "callPct": 44.7,
    "putPct": 55.3,
    "totalOI": 62533,
    "totalOIChange": 4208,
    "pcRatio": 1.24,
    "settle": 22371,
    "settleChange": -59,
    "callWalls": [
      {
        "strike": 22600,
        "oi": 3416,
        "oiChange": 148
      },
      {
        "strike": 23400,
        "oi": 3005,
        "oiChange": 824
      },
      {
        "strike": 23600,
        "oi": 2425,
        "oiChange": 783
      },
      {
        "strike": 23200,
        "oi": 1789,
        "oiChange": 108
      },
      {
        "strike": 24000,
        "oi": 1335,
        "oiChange": -1
      }
    ],
    "putWalls": [
      {
        "strike": 21400,
        "oi": 2497,
        "oiChange": 542
      },
      {
        "strike": 21200,
        "oi": 2425,
        "oiChange": 838
      },
      {
        "strike": 21600,
        "oi": 1976,
        "oiChange": 663
      },
      {
        "strike": 22000,
        "oi": 1472,
        "oiChange": -620
      },
      {
        "strike": 21800,
        "oi": 1400,
        "oiChange": 203
      }
    ]
  },
  "mini": {
    "ok": false,
    "stale": true,
    "date": "2026-11-19",
    "label": "小型恒指 Mini-HSI",
    "status": "未能核實／未更新",
    "sourceUrl": "https://www.hkex.com.hk/chi/stat/dmstat/dayrpt/mhioc261119.htm",
    "note": "最新檔為 2026-11-19，預期 2026-11-23"
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
    "note": "最新街貨欄 2026-10-27，預期 2026-11-23"
  },
  "stocks": {
    "ok": true,
    "stale": false,
    "date": "2026-11-23",
    "sourceUrl": "https://www.hkex.com.hk/eng/stat/dmstat/dayrpt/dqe261123.htm",
    "status": null,
    "items": [
      {
        "hkats": "TCH",
        "code": "00700",
        "name": "騰訊 Tencent",
        "close": 344.0,
        "volume": 202327,
        "callOI": 1391399,
        "putOI": 1006200,
        "callWall": 430.0,
        "putWall": 380.0,
        "reason": "收市 344.0 · 認購牆 430.0 OI 15478 · 距認購牆 86.0 · 認沽牆 380.0 OI 17324 · 距認沽牆 -36.0 · 成交 202327"
      },
      {
        "hkats": "ALB",
        "code": "09988",
        "name": "阿里巴巴 Alibaba",
        "close": 83.05,
        "volume": 100285,
        "callOI": 1071159,
        "putOI": 1083975,
        "callWall": 100.0,
        "putWall": 100.0,
        "reason": "收市 83.05 · 認購牆 100.0 OI 18792 · 距認購牆 16.95 · 認沽牆 100.0 OI 20052 · 距認沽牆 -16.95 · 成交 100285"
      },
      {
        "hkats": "MIU",
        "code": "01810",
        "name": "小米 Xiaomi",
        "close": 27.52,
        "volume": 37784,
        "callOI": 642665,
        "putOI": 585487,
        "callWall": 30.0,
        "putWall": 25.0,
        "reason": "收市 27.52 · 認購牆 30.0 OI 14848 · 距認購牆 2.48 · 認沽牆 25.0 OI 15279 · 距認沽牆 2.52 · 成交 37784"
      },
      {
        "hkats": "MET",
        "code": "03690",
        "name": "美團 Meituan",
        "close": 66.4,
        "volume": 46768,
        "callOI": 467985,
        "putOI": 478412,
        "callWall": 80.0,
        "putWall": 70.0,
        "reason": "收市 66.4 · 認購牆 80.0 OI 7539 · 距認購牆 13.6 · 認沽牆 70.0 OI 8324 · 距認沽牆 -3.6 · 成交 46768"
      },
      {
        "hkats": "HEX",
        "code": "00388",
        "name": "港交所 HKEX",
        "close": 351.4,
        "volume": 37656,
        "callOI": 215239,
        "putOI": 178754,
        "callWall": 430.0,
        "putWall": 380.0,
        "reason": "收市 351.4 · 認購牆 430.0 OI 5152 · 距認購牆 78.6 · 認沽牆 380.0 OI 8106 · 距認沽牆 -28.6 · 成交 37656"
      },
      {
        "hkats": "KST",
        "code": "01024",
        "name": "快手 Kuaishou",
        "close": 20.1,
        "volume": 30653,
        "callOI": 310835,
        "putOI": 223997,
        "callWall": 30.0,
        "putWall": 24.0,
        "reason": "收市 20.1 · 認購牆 30.0 OI 8592 · 距認購牆 9.9 · 認沽牆 24.0 OI 3387 · 距認沽牆 -3.9 · 成交 30653"
      }
    ]
  },
  "calendar": {
    "ok": true,
    "asOf": "2026-11-24 14:56",
    "source": "https://www.forexfactory.com/calendar",
    "items": [
      {
        "date": "2026-11-24",
        "time": "23:00",
        "ccy": "USD",
        "impact": "med",
        "name": "CB Consumer Confidence",
        "actual": "",
        "forecast": "92.4",
        "previous": "91.7"
      }
    ],
    "status": null
  },
  "implications": [
    "牆、街貨與隔夜僅作地圖與濾鏡，不構成方向或進場訊號。",
    "隔夜標普上升超過 0.8%，開市或有跳空；先讀牆位，不追第一跳。",
    "恒指即月認購牆 22600 接近結算 22371，先當阻力地圖。"
  ],
  "missing": [
    "小恒期權：未能核實／未更新（最新檔為 2026-11-19，預期 2026-11-23）",
    "牛熊街貨：未能核實／未更新（最新街貨欄 2026-10-27，預期 2026-11-23）"
  ]
};
