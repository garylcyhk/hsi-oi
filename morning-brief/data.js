/* Exodus morning brief — generated, do not edit by hand.
   Builder: scripts/update_morning_brief.py
   Schedule: weekday 09:00 Asia/Hong_Kong (cron 0 1 * * 1-5).
   Missing feeds stay empty with 未能核實／未更新. Never invents walls or prices.
*/
window.MORNING_BRIEF = {
  "asOf": "2026-10-14 13:59",
  "sessionDate": "2026-10-14",
  "usSessionDate": "2026-10-13",
  "expectedOiDate": "2026-10-13",
  "tz": "HKT",
  "title": "香港早晨 · 美股收市／小恒早盤",
  "disclaimer": "研究用，非買賣建議。牆與街貨為對沖地圖，不構成投資建議。",
  "pipeline": "GitHub Action 平日 09:00 HKT（cron 0 1 * * 1-5）由 scripts/update_morning_brief.py 寫入 morning-brief/data.js。",
  "closed": false,
  "oneLiner": "標普 -0.02% · VIX 15.27 · 恒指認購牆 26000 · 認沽牆 23800 · 街貨現價 24345 · 近收回 牛4909/熊4484",
  "us": {
    "ok": true,
    "stale": false,
    "asOf": "2026-10-13",
    "source": "https://query1.finance.yahoo.com/v8/finance/chart",
    "sourceNote": "Yahoo Finance 日線收市（美東日期）",
    "items": [
      {
        "symbol": "^GSPC",
        "name": "標普 S&P 500",
        "ok": true,
        "stale": false,
        "last": 7805.4502,
        "prev": 7807.2402,
        "chg": -1.79,
        "pct": -0.02,
        "date": "2026-10-13",
        "kind": "%"
      },
      {
        "symbol": "^DJI",
        "name": "道指 Dow",
        "ok": true,
        "stale": false,
        "last": 51670.1016,
        "prev": 51850.5508,
        "chg": -180.4492,
        "pct": -0.35,
        "date": "2026-10-13",
        "kind": "%"
      },
      {
        "symbol": "^IXIC",
        "name": "納指 Nasdaq",
        "ok": true,
        "stale": false,
        "last": 27204.3809,
        "prev": 27245.9004,
        "chg": -41.5195,
        "pct": -0.15,
        "date": "2026-10-13",
        "kind": "%"
      },
      {
        "symbol": "^VIX",
        "name": "VIX",
        "ok": true,
        "stale": false,
        "last": 15.27,
        "prev": 15.21,
        "chg": 0.06,
        "pct": 0.39,
        "date": "2026-10-13",
        "kind": "pt"
      },
      {
        "symbol": "CL=F",
        "name": "WTI 原油",
        "ok": true,
        "stale": false,
        "last": 94.62,
        "prev": 94.14,
        "chg": 0.48,
        "pct": 0.51,
        "date": "2026-10-14",
        "kind": "%"
      },
      {
        "symbol": "^TNX",
        "name": "美10年期債 Yahoo ^TNX",
        "ok": true,
        "stale": false,
        "last": 5.217,
        "prev": 5.24,
        "chg": -0.023,
        "pct": -0.44,
        "date": "2026-10-13",
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
    "date": "2026-10-13",
    "sourceUrl": "https://www.hkex.com.hk/chi/stat/dmstat/dayrpt/hsioc261013.htm",
    "frontMonth": "2026-10",
    "nextMonth": "2026-11",
    "callOI": 14861,
    "putOI": 19172,
    "callOIChange": 201,
    "putOIChange": 239,
    "callPct": 43.7,
    "putPct": 56.3,
    "totalOI": 34033,
    "totalOIChange": 440,
    "pcRatio": 1.29,
    "settle": 24357,
    "settleChange": 111,
    "callWalls": [
      {
        "strike": 26000,
        "oi": 1799,
        "oiChange": 11
      },
      {
        "strike": 24400,
        "oi": 1219,
        "oiChange": -59
      },
      {
        "strike": 25000,
        "oi": 801,
        "oiChange": 173
      },
      {
        "strike": 24600,
        "oi": 727,
        "oiChange": 68
      },
      {
        "strike": 24800,
        "oi": 620,
        "oiChange": 48
      }
    ],
    "putWalls": [
      {
        "strike": 23800,
        "oi": 1103,
        "oiChange": 71
      },
      {
        "strike": 22000,
        "oi": 948,
        "oiChange": 31
      },
      {
        "strike": 23000,
        "oi": 897,
        "oiChange": 22
      },
      {
        "strike": 24000,
        "oi": 859,
        "oiChange": -76
      },
      {
        "strike": 20200,
        "oi": 846,
        "oiChange": 5
      }
    ]
  },
  "mini": {
    "ok": false,
    "stale": true,
    "date": "2026-10-08",
    "label": "小型恒指 Mini-HSI",
    "status": "未能核實／未更新",
    "sourceUrl": "https://www.hkex.com.hk/chi/stat/dmstat/dayrpt/mhioc261008.htm",
    "note": "最新檔為 2026-10-08，預期 2026-10-13"
  },
  "cbbc": {
    "ok": true,
    "stale": false,
    "status": null,
    "asOf": "2026-10-13",
    "published": "2026-10-14 08:06",
    "spot": 24345,
    "prevClose": 24271,
    "bullFut": 8753,
    "bearFut": 9345,
    "bullPct": 48.4,
    "bearPct": 51.6,
    "ratio": 0.94,
    "nearKoPts": 1000,
    "nearKoBull": 4909,
    "nearKoBear": 4484,
    "flow1d": {
      "bullM": null,
      "bearM": null,
      "bullFut": 542,
      "bearFut": -8
    },
    "calledNote": "自動更新自高盛 · 圖表 2026-10-14 08:06 · 街貨欄 10-13",
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
    "nearBear": [
      {
        "lo": 24600,
        "hi": 24799,
        "call": 24600,
        "fut": 1372,
        "chg": -128
      },
      {
        "lo": 24800,
        "hi": 24999,
        "call": 24800,
        "fut": 1278,
        "chg": 86
      },
      {
        "lo": 24400,
        "hi": 24599,
        "call": 24400,
        "fut": 950,
        "chg": -35
      },
      {
        "lo": 25000,
        "hi": 25199,
        "call": 25000,
        "fut": 605,
        "chg": 57
      }
    ],
    "nearBull": [
      {
        "lo": 23600,
        "hi": 23799,
        "call": 23600,
        "fut": 2117,
        "chg": 304
      },
      {
        "lo": 23400,
        "hi": 23599,
        "call": 23400,
        "fut": 1496,
        "chg": 54
      },
      {
        "lo": 23800,
        "hi": 23999,
        "call": 23800,
        "fut": 1140,
        "chg": 720
      },
      {
        "lo": 23200,
        "hi": 23399,
        "call": 23200,
        "fut": 442,
        "chg": 8
      }
    ],
    "note": "僅作對沖地圖，並非買賣牛熊證。"
  },
  "stocks": {
    "ok": true,
    "stale": false,
    "date": "2026-10-13",
    "sourceUrl": "https://www.hkex.com.hk/eng/stat/dmstat/dayrpt/dqe261013.htm",
    "status": null,
    "items": [
      {
        "hkats": "TCH",
        "code": "00700",
        "name": "騰訊 Tencent",
        "close": 425.2,
        "volume": 57405,
        "callOI": 1014715,
        "putOI": 986446,
        "callWall": 430.0,
        "putWall": 415.0,
        "reason": "收市 425.2 · 認購牆 430.0 OI 2708 · 距認購牆 4.8 · 認沽牆 415.0 OI 3266 · 距認沽牆 10.2 · 成交 57405"
      },
      {
        "hkats": "ALB",
        "code": "09988",
        "name": "阿里巴巴 Alibaba",
        "close": 107.2,
        "volume": 53285,
        "callOI": 932269,
        "putOI": 964230,
        "callWall": 109.0,
        "putWall": 107.0,
        "reason": "收市 107.2 · 認購牆 109.0 OI 3173 · 距認購牆 1.8 · 認沽牆 107.0 OI 1152 · 距認沽牆 0.2 · 成交 53285"
      },
      {
        "hkats": "MIU",
        "code": "01810",
        "name": "小米 Xiaomi",
        "close": 25.04,
        "volume": 44983,
        "callOI": 508423,
        "putOI": 503371,
        "callWall": 24.5,
        "putWall": 24.0,
        "reason": "收市 25.04 · 認購牆 24.5 OI 1467 · 距認購牆 -0.54 · 認沽牆 24.0 OI 2212 · 距認沽牆 1.04 · 成交 44983"
      },
      {
        "hkats": "MET",
        "code": "03690",
        "name": "美團 Meituan",
        "close": 72.3,
        "volume": 14037,
        "callOI": 403033,
        "putOI": 453381,
        "callWall": 73.0,
        "putWall": 70.0,
        "reason": "收市 72.3 · 認購牆 73.0 OI 1434 · 距認購牆 0.7 · 認沽牆 70.0 OI 1207 · 距認沽牆 2.3 · 成交 14037"
      },
      {
        "hkats": "HEX",
        "code": "00388",
        "name": "港交所 HKEX",
        "close": 379.6,
        "volume": 10936,
        "callOI": 159922,
        "putOI": 168220,
        "callWall": 380.0,
        "putWall": 365.0,
        "reason": "收市 379.6 · 認購牆 380.0 OI 1057 · 距認購牆 0.4 · 認沽牆 365.0 OI 584 · 距認沽牆 14.6 · 成交 10936"
      },
      {
        "hkats": "KST",
        "code": "01024",
        "name": "快手 Kuaishou",
        "close": 29.16,
        "volume": 10769,
        "callOI": 246378,
        "putOI": 230102,
        "callWall": 31.0,
        "putWall": 29.5,
        "reason": "收市 29.16 · 認購牆 31.0 OI 878 · 距認購牆 1.84 · 認沽牆 29.5 OI 883 · 距認沽牆 -0.34 · 成交 10769"
      }
    ]
  },
  "calendar": {
    "ok": true,
    "asOf": "2026-10-14 09:53",
    "source": "https://www.forexfactory.com/calendar",
    "items": [
      {
        "date": "2026-10-14",
        "time": "20:30",
        "ccy": "USD",
        "impact": "high",
        "name": "Core CPI m/m",
        "actual": "",
        "forecast": "0.2%",
        "previous": "0.3%"
      },
      {
        "date": "2026-10-14",
        "time": "20:30",
        "ccy": "USD",
        "impact": "high",
        "name": "Core CPI y/y",
        "actual": "",
        "forecast": "2.5%",
        "previous": "2.4%"
      },
      {
        "date": "2026-10-14",
        "time": "20:30",
        "ccy": "USD",
        "impact": "high",
        "name": "CPI m/m",
        "actual": "",
        "forecast": "0.6%",
        "previous": "0.4%"
      },
      {
        "date": "2026-10-14",
        "time": "20:30",
        "ccy": "USD",
        "impact": "high",
        "name": "CPI y/y",
        "actual": "",
        "forecast": "3.6%",
        "previous": "3.4%"
      }
    ],
    "status": null
  },
  "implications": [
    "牆、街貨與隔夜僅作地圖與濾鏡，不構成方向或進場訊號。",
    "隔夜標普波幅不大，不把隔夜當今日方向。",
    "恒指即月認購牆 24400 接近結算 24357，先當阻力地圖。",
    "近收回牛／熊未見明顯單邊堆疊。"
  ],
  "missing": [
    "小恒期權：未能核實／未更新（最新檔為 2026-10-08，預期 2026-10-13）"
  ]
};
