/* Exodus morning brief — generated, do not edit by hand.
   Builder: scripts/update_morning_brief.py
   Schedule: weekday 09:00 Asia/Hong_Kong (cron 0 1 * * 1-5).
   Missing feeds stay empty with 未能核實／未更新. Never invents walls or prices.
*/
window.MORNING_BRIEF = {
  "asOf": "2026-10-12 15:11",
  "sessionDate": "2026-10-12",
  "usSessionDate": "2026-10-09",
  "expectedOiDate": "2026-10-09",
  "tz": "HKT",
  "title": "香港早晨 · 美股收市／小恒早盤",
  "disclaimer": "研究用，非買賣建議。牆與街貨為對沖地圖，不構成投資建議。",
  "pipeline": "GitHub Action 平日 09:00 HKT（cron 0 1 * * 1-5）由 scripts/update_morning_brief.py 寫入 morning-brief/data.js。",
  "closed": false,
  "oneLiner": "標普 +0.59% · VIX 14.84 · 恒指認購牆 26000 · 認沽牆 23800 · 街貨現價 24211 · 近收回 牛3883/熊4614",
  "us": {
    "ok": true,
    "stale": false,
    "asOf": "2026-10-09",
    "source": "https://query1.finance.yahoo.com/v8/finance/chart",
    "sourceNote": "Yahoo Finance 日線收市（美東日期）",
    "items": [
      {
        "symbol": "^GSPC",
        "name": "標普 S&P 500",
        "ok": true,
        "stale": false,
        "last": 7811.54,
        "prev": 7765.3599,
        "chg": 46.1802,
        "pct": 0.59,
        "date": "2026-10-09",
        "kind": "%"
      },
      {
        "symbol": "^DJI",
        "name": "道指 Dow",
        "ok": true,
        "stale": false,
        "last": 51654.9492,
        "prev": 51231.6406,
        "chg": 423.3086,
        "pct": 0.83,
        "date": "2026-10-09",
        "kind": "%"
      },
      {
        "symbol": "^IXIC",
        "name": "納指 Nasdaq",
        "ok": true,
        "stale": false,
        "last": 27366.1699,
        "prev": 27193.3398,
        "chg": 172.8301,
        "pct": 0.64,
        "date": "2026-10-09",
        "kind": "%"
      },
      {
        "symbol": "^VIX",
        "name": "VIX",
        "ok": true,
        "stale": false,
        "last": 14.84,
        "prev": 15.41,
        "chg": -0.57,
        "pct": -3.7,
        "date": "2026-10-09",
        "kind": "pt"
      },
      {
        "symbol": "CL=F",
        "name": "WTI 原油",
        "ok": true,
        "stale": false,
        "last": 90.94,
        "prev": 91.85,
        "chg": -0.91,
        "pct": -0.99,
        "date": "2026-10-12",
        "kind": "%"
      },
      {
        "symbol": "^TNX",
        "name": "美10年期債 Yahoo ^TNX",
        "ok": true,
        "stale": false,
        "last": 5.244,
        "prev": 5.231,
        "chg": 0.013,
        "pct": 0.25,
        "date": "2026-10-09",
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
    "date": "2026-10-09",
    "sourceUrl": "https://www.hkex.com.hk/chi/stat/dmstat/dayrpt/hsioc261009.htm",
    "frontMonth": "2026-10",
    "nextMonth": "2026-11",
    "callOI": 14392,
    "putOI": 18475,
    "callOIChange": -497,
    "putOIChange": 988,
    "callPct": 43.8,
    "putPct": 56.2,
    "totalOI": 32867,
    "totalOIChange": 491,
    "pcRatio": 1.28,
    "settle": 24192,
    "settleChange": 419,
    "callWalls": [
      {
        "strike": 26000,
        "oi": 1758,
        "oiChange": 8
      },
      {
        "strike": 24400,
        "oi": 1216,
        "oiChange": -11
      },
      {
        "strike": 24600,
        "oi": 664,
        "oiChange": 141
      },
      {
        "strike": 27000,
        "oi": 611,
        "oiChange": 5
      },
      {
        "strike": 25000,
        "oi": 608,
        "oiChange": -47
      }
    ],
    "putWalls": [
      {
        "strike": 23800,
        "oi": 1004,
        "oiChange": 9
      },
      {
        "strike": 22000,
        "oi": 913,
        "oiChange": 54
      },
      {
        "strike": 24000,
        "oi": 836,
        "oiChange": -7
      },
      {
        "strike": 20200,
        "oi": 818,
        "oiChange": 72
      },
      {
        "strike": 23000,
        "oi": 807,
        "oiChange": 124
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
    "note": "最新檔為 2026-10-08，預期 2026-10-09"
  },
  "cbbc": {
    "ok": true,
    "stale": false,
    "status": null,
    "asOf": "2026-10-09",
    "published": "2026-10-12 08:07",
    "spot": 24211,
    "prevClose": 23786,
    "bullFut": 7564,
    "bearFut": 9576,
    "bullPct": 44.1,
    "bearPct": 55.9,
    "ratio": 0.79,
    "nearKoPts": 1000,
    "nearKoBull": 3883,
    "nearKoBear": 4614,
    "flow1d": {
      "bullM": null,
      "bearM": null,
      "bullFut": -924,
      "bearFut": 1599
    },
    "calledNote": "自動更新自高盛 · 圖表 2026-10-12 08:07 · 街貨欄 10-09",
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
        "lo": 24400,
        "hi": 24599,
        "call": 24400,
        "fut": 1385,
        "chg": 356
      },
      {
        "lo": 24600,
        "hi": 24799,
        "call": 24600,
        "fut": 1017,
        "chg": 389
      },
      {
        "lo": 24800,
        "hi": 24999,
        "call": 24800,
        "fut": 965,
        "chg": 468
      },
      {
        "lo": 25000,
        "hi": 25199,
        "call": 25000,
        "fut": 433,
        "chg": 151
      }
    ],
    "nearBull": [
      {
        "lo": 23500,
        "hi": 23699,
        "call": 23500,
        "fut": 1943,
        "chg": -330
      },
      {
        "lo": 23700,
        "hi": 23899,
        "call": 23700,
        "fut": 942,
        "chg": 299
      },
      {
        "lo": 23300,
        "hi": 23499,
        "call": 23300,
        "fut": 931,
        "chg": -335
      },
      {
        "lo": 23100,
        "hi": 23299,
        "call": 23100,
        "fut": 443,
        "chg": -121
      }
    ],
    "note": "僅作對沖地圖，並非買賣牛熊證。"
  },
  "stocks": {
    "ok": true,
    "stale": false,
    "date": "2026-10-09",
    "sourceUrl": "https://www.hkex.com.hk/eng/stat/dmstat/dayrpt/dqe261009.htm",
    "status": null,
    "items": [
      {
        "hkats": "TCH",
        "code": "00700",
        "name": "騰訊 Tencent",
        "close": 424.8,
        "volume": 122239,
        "callOI": 1016698,
        "putOI": 979997,
        "callWall": 425.0,
        "putWall": 420.0,
        "reason": "收市 424.8 · 認購牆 425.0 OI 5483 · 距認購牆 0.2 · 認沽牆 420.0 OI 11023 · 距認沽牆 4.8 · 成交 122239"
      },
      {
        "hkats": "ALB",
        "code": "09988",
        "name": "阿里巴巴 Alibaba",
        "close": 107.0,
        "volume": 85372,
        "callOI": 925172,
        "putOI": 950846,
        "callWall": 108.0,
        "putWall": 103.0,
        "reason": "收市 107.0 · 認購牆 108.0 OI 2031 · 距認購牆 1.0 · 認沽牆 103.0 OI 1490 · 距認沽牆 4.0 · 成交 85372"
      },
      {
        "hkats": "MIU",
        "code": "01810",
        "name": "小米 Xiaomi",
        "close": 25.96,
        "volume": 98437,
        "callOI": 493486,
        "putOI": 488535,
        "callWall": 26.0,
        "putWall": 25.5,
        "reason": "收市 25.96 · 認購牆 26.0 OI 1137 · 距認購牆 0.04 · 認沽牆 25.5 OI 1194 · 距認沽牆 0.46 · 成交 98437"
      },
      {
        "hkats": "MET",
        "code": "03690",
        "name": "美團 Meituan",
        "close": 71.5,
        "volume": 22350,
        "callOI": 401903,
        "putOI": 452703,
        "callWall": 72.0,
        "putWall": 70.0,
        "reason": "收市 71.5 · 認購牆 72.0 OI 2174 · 距認購牆 0.5 · 認沽牆 70.0 OI 1568 · 距認沽牆 1.5 · 成交 22350"
      },
      {
        "hkats": "HEX",
        "code": "00388",
        "name": "港交所 HKEX",
        "close": 377.8,
        "volume": 12216,
        "callOI": 157780,
        "putOI": 168568,
        "callWall": 385.0,
        "putWall": 375.0,
        "reason": "收市 377.8 · 認購牆 385.0 OI 778 · 距認購牆 7.2 · 認沽牆 375.0 OI 1364 · 距認沽牆 2.8 · 成交 12216"
      },
      {
        "hkats": "KST",
        "code": "01024",
        "name": "快手 Kuaishou",
        "close": 30.1,
        "volume": 27141,
        "callOI": 244509,
        "putOI": 232002,
        "callWall": 31.0,
        "putWall": 29.0,
        "reason": "收市 30.1 · 認購牆 31.0 OI 1402 · 距認購牆 0.9 · 認沽牆 29.0 OI 885 · 距認沽牆 1.1 · 成交 27141"
      }
    ]
  },
  "calendar": {
    "ok": true,
    "asOf": "2026-10-12 10:22",
    "source": "https://www.forexfactory.com/calendar",
    "items": [],
    "status": null
  },
  "implications": [
    "牆、街貨與隔夜僅作地圖與濾鏡，不構成方向或進場訊號。",
    "隔夜標普波幅不大，不把隔夜當今日方向。",
    "恒指即月認購牆 24400 接近結算 24192，先當阻力地圖。",
    "恒指即月認沽牆 24000 接近結算 24192，先當支持地圖。",
    "現價之上近收回熊證較重，屬對沖流動性地圖；屠熊進行中不要 fade。"
  ],
  "missing": [
    "小恒期權：未能核實／未更新（最新檔為 2026-10-08，預期 2026-10-09）"
  ]
};
