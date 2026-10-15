/* Exodus morning brief — generated, do not edit by hand.
   Builder: scripts/update_morning_brief.py
   Schedule: weekday 09:00 Asia/Hong_Kong (cron 0 1 * * 1-5).
   Missing feeds stay empty with 未能核實／未更新. Never invents walls or prices.
*/
window.MORNING_BRIEF = {
  "asOf": "2026-10-15 13:45",
  "sessionDate": "2026-10-15",
  "usSessionDate": "2026-10-14",
  "expectedOiDate": "2026-10-14",
  "tz": "HKT",
  "title": "香港早晨 · 美股收市／小恒早盤",
  "disclaimer": "研究用，非買賣建議。牆與街貨為對沖地圖，不構成投資建議。",
  "pipeline": "GitHub Action 平日 09:00 HKT（cron 0 1 * * 1-5）由 scripts/update_morning_brief.py 寫入 morning-brief/data.js。",
  "closed": false,
  "oneLiner": "標普 -1.11% · VIX 16.87 · 恒指認購牆 26000 · 認沽牆 22000 · 小恒認購牆 26000 · 街貨現價 24314 · 近收回 牛5173/熊4749",
  "us": {
    "ok": true,
    "stale": false,
    "asOf": "2026-10-14",
    "source": "https://query1.finance.yahoo.com/v8/finance/chart",
    "sourceNote": "Yahoo Finance 日線收市（美東日期）",
    "items": [
      {
        "symbol": "^GSPC",
        "name": "標普 S&P 500",
        "ok": true,
        "stale": false,
        "last": 7718.9399,
        "prev": 7805.4502,
        "chg": -86.5103,
        "pct": -1.11,
        "date": "2026-10-14",
        "kind": "%"
      },
      {
        "symbol": "^DJI",
        "name": "道指 Dow",
        "ok": true,
        "stale": false,
        "last": 51621.4805,
        "prev": 51670.1016,
        "chg": -48.6211,
        "pct": -0.09,
        "date": "2026-10-14",
        "kind": "%"
      },
      {
        "symbol": "^IXIC",
        "name": "納指 Nasdaq",
        "ok": true,
        "stale": false,
        "last": 26692.8691,
        "prev": 27204.3809,
        "chg": -511.5117,
        "pct": -1.88,
        "date": "2026-10-14",
        "kind": "%"
      },
      {
        "symbol": "^VIX",
        "name": "VIX",
        "ok": true,
        "stale": false,
        "last": 16.87,
        "prev": 15.27,
        "chg": 1.6,
        "pct": 10.48,
        "date": "2026-10-14",
        "kind": "pt"
      },
      {
        "symbol": "CL=F",
        "name": "WTI 原油",
        "ok": true,
        "stale": false,
        "last": 94.34,
        "prev": 95.09,
        "chg": -0.75,
        "pct": -0.79,
        "date": "2026-10-15",
        "kind": "%"
      },
      {
        "symbol": "^TNX",
        "name": "美10年期債 Yahoo ^TNX",
        "ok": true,
        "stale": false,
        "last": 5.19,
        "prev": 5.217,
        "chg": -0.027,
        "pct": -0.52,
        "date": "2026-10-14",
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
    "date": "2026-10-14",
    "sourceUrl": "https://www.hkex.com.hk/chi/stat/dmstat/dayrpt/hsioc261014.htm",
    "frontMonth": "2026-10",
    "nextMonth": "2026-11",
    "callOI": 15553,
    "putOI": 18759,
    "callOIChange": 692,
    "putOIChange": -413,
    "callPct": 45.3,
    "putPct": 54.7,
    "totalOI": 34312,
    "totalOIChange": 279,
    "pcRatio": 1.21,
    "settle": 24333,
    "settleChange": -24,
    "callWalls": [
      {
        "strike": 26000,
        "oi": 1792,
        "oiChange": -7
      },
      {
        "strike": 24400,
        "oi": 1187,
        "oiChange": -32
      },
      {
        "strike": 25000,
        "oi": 906,
        "oiChange": 105
      },
      {
        "strike": 24600,
        "oi": 780,
        "oiChange": 53
      },
      {
        "strike": 24800,
        "oi": 672,
        "oiChange": 52
      }
    ],
    "putWalls": [
      {
        "strike": 22000,
        "oi": 968,
        "oiChange": 20
      },
      {
        "strike": 24000,
        "oi": 907,
        "oiChange": 48
      },
      {
        "strike": 23000,
        "oi": 901,
        "oiChange": 4
      },
      {
        "strike": 20200,
        "oi": 855,
        "oiChange": 9
      },
      {
        "strike": 23800,
        "oi": 852,
        "oiChange": -251
      }
    ]
  },
  "mini": {
    "ok": true,
    "stale": false,
    "status": null,
    "label": "小型恒指 Mini-HSI",
    "date": "2026-10-14",
    "sourceUrl": "https://www.hkex.com.hk/chi/stat/dmstat/dayrpt/mhioc261014.htm",
    "frontMonth": "2026-10",
    "nextMonth": "2026-11",
    "callOI": 9528,
    "putOI": 12527,
    "callOIChange": 6,
    "putOIChange": -102,
    "callPct": 43.2,
    "putPct": 56.8,
    "totalOI": 22055,
    "totalOIChange": -96,
    "pcRatio": 1.31,
    "settle": 24333,
    "settleChange": -24,
    "callWalls": [
      {
        "strike": 26000,
        "oi": 664,
        "oiChange": 0
      },
      {
        "strike": 25600,
        "oi": 647,
        "oiChange": 35
      },
      {
        "strike": 25400,
        "oi": 625,
        "oiChange": 7
      },
      {
        "strike": 24800,
        "oi": 601,
        "oiChange": -29
      },
      {
        "strike": 24400,
        "oi": 593,
        "oiChange": -29
      }
    ],
    "putWalls": [
      {
        "strike": 24000,
        "oi": 947,
        "oiChange": 68
      },
      {
        "strike": 23800,
        "oi": 893,
        "oiChange": -40
      },
      {
        "strike": 24600,
        "oi": 854,
        "oiChange": 38
      },
      {
        "strike": 23600,
        "oi": 790,
        "oiChange": -5
      },
      {
        "strike": 25000,
        "oi": 778,
        "oiChange": 18
      }
    ]
  },
  "cbbc": {
    "ok": true,
    "stale": false,
    "status": null,
    "asOf": "2026-10-14",
    "published": "2026-10-15 08:05",
    "spot": 24314,
    "prevClose": 24345,
    "bullFut": 8828,
    "bearFut": 9830,
    "bullPct": 47.3,
    "bearPct": 52.7,
    "ratio": 0.9,
    "nearKoPts": 1000,
    "nearKoBull": 5173,
    "nearKoBear": 4749,
    "flow1d": {
      "bullM": null,
      "bearM": null,
      "bullFut": 75,
      "bearFut": 485
    },
    "calledNote": "自動更新自高盛 · 圖表 2026-10-15 08:05 · 街貨欄 10-14",
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
        "lo": 24700,
        "hi": 24899,
        "call": 24700,
        "fut": 1677,
        "chg": 496
      },
      {
        "lo": 24900,
        "hi": 25099,
        "call": 24900,
        "fut": 1293,
        "chg": 210
      },
      {
        "lo": 24500,
        "hi": 24699,
        "call": 24500,
        "fut": 1278,
        "chg": -195
      },
      {
        "lo": 25300,
        "hi": 25499,
        "call": 25300,
        "fut": 755,
        "chg": 92
      }
    ],
    "nearBull": [
      {
        "lo": 23600,
        "hi": 23799,
        "call": 23600,
        "fut": 1922,
        "chg": -195
      },
      {
        "lo": 23400,
        "hi": 23599,
        "call": 23400,
        "fut": 1423,
        "chg": -73
      },
      {
        "lo": 23800,
        "hi": 23999,
        "call": 23800,
        "fut": 1232,
        "chg": 91
      },
      {
        "lo": 23200,
        "hi": 23399,
        "call": 23200,
        "fut": 400,
        "chg": -41
      }
    ],
    "note": "僅作對沖地圖，並非買賣牛熊證。"
  },
  "stocks": {
    "ok": true,
    "stale": false,
    "date": "2026-10-14",
    "sourceUrl": "https://www.hkex.com.hk/eng/stat/dmstat/dayrpt/dqe261014.htm",
    "status": null,
    "items": [
      {
        "hkats": "TCH",
        "code": "00700",
        "name": "騰訊 Tencent",
        "close": 423.4,
        "volume": 85705,
        "callOI": 1025679,
        "putOI": 995909,
        "callWall": 430.0,
        "putWall": 415.0,
        "reason": "收市 423.4 · 認購牆 430.0 OI 3691 · 距認購牆 6.6 · 認沽牆 415.0 OI 3677 · 距認沽牆 8.4 · 成交 85705"
      },
      {
        "hkats": "ALB",
        "code": "09988",
        "name": "阿里巴巴 Alibaba",
        "close": 110.5,
        "volume": 91130,
        "callOI": 946080,
        "putOI": 976830,
        "callWall": 109.0,
        "putWall": 107.0,
        "reason": "收市 110.5 · 認購牆 109.0 OI 2475 · 距認購牆 -1.5 · 認沽牆 107.0 OI 1239 · 距認沽牆 3.5 · 成交 91130"
      },
      {
        "hkats": "MIU",
        "code": "01810",
        "name": "小米 Xiaomi",
        "close": 26.38,
        "volume": 86199,
        "callOI": 524432,
        "putOI": 508201,
        "callWall": 24.5,
        "putWall": 24.0,
        "reason": "收市 26.38 · 認購牆 24.5 OI 1437 · 距認購牆 -1.88 · 認沽牆 24.0 OI 2438 · 距認沽牆 2.38 · 成交 86199"
      },
      {
        "hkats": "MET",
        "code": "03690",
        "name": "美團 Meituan",
        "close": 77.1,
        "volume": 75133,
        "callOI": 402830,
        "putOI": 461426,
        "callWall": 73.0,
        "putWall": 70.0,
        "reason": "收市 77.1 · 認購牆 73.0 OI 1340 · 距認購牆 -4.1 · 認沽牆 70.0 OI 1178 · 距認沽牆 7.1 · 成交 75133"
      },
      {
        "hkats": "HEX",
        "code": "00388",
        "name": "港交所 HKEX",
        "close": 373.6,
        "volume": 13828,
        "callOI": 164535,
        "putOI": 168447,
        "callWall": 380.0,
        "putWall": 370.0,
        "reason": "收市 373.6 · 認購牆 380.0 OI 1102 · 距認購牆 6.4 · 認沽牆 370.0 OI 647 · 距認沽牆 3.6 · 成交 13828"
      },
      {
        "hkats": "KST",
        "code": "01024",
        "name": "快手 Kuaishou",
        "close": 29.52,
        "volume": 12217,
        "callOI": 248594,
        "putOI": 230702,
        "callWall": 31.0,
        "putWall": 29.5,
        "reason": "收市 29.52 · 認購牆 31.0 OI 890 · 距認購牆 1.48 · 認沽牆 29.5 OI 930 · 距認沽牆 0.02 · 成交 12217"
      }
    ]
  },
  "calendar": {
    "ok": true,
    "asOf": "2026-10-15 09:26",
    "source": "https://www.forexfactory.com/calendar",
    "items": [
      {
        "date": "2026-10-15",
        "time": "08:30",
        "ccy": "AUD",
        "impact": "high",
        "name": "Employment Change",
        "actual": "",
        "forecast": "19.6K",
        "previous": "39.5K"
      },
      {
        "date": "2026-10-15",
        "time": "08:30",
        "ccy": "AUD",
        "impact": "high",
        "name": "Unemployment Rate",
        "actual": "",
        "forecast": "4.6%",
        "previous": "4.6%"
      },
      {
        "date": "2026-10-15",
        "time": "20:30",
        "ccy": "USD",
        "impact": "high",
        "name": "Core PPI m/m",
        "actual": "",
        "forecast": "0.3%",
        "previous": "0.2%"
      },
      {
        "date": "2026-10-15",
        "time": "20:30",
        "ccy": "USD",
        "impact": "high",
        "name": "Core Retail Sales m/m",
        "actual": "",
        "forecast": "0.6%",
        "previous": "1.4%"
      },
      {
        "date": "2026-10-15",
        "time": "20:30",
        "ccy": "USD",
        "impact": "high",
        "name": "PPI m/m",
        "actual": "",
        "forecast": "0.6%",
        "previous": "0.4%"
      },
      {
        "date": "2026-10-15",
        "time": "20:30",
        "ccy": "USD",
        "impact": "high",
        "name": "Retail Sales m/m",
        "actual": "",
        "forecast": "0.3%",
        "previous": "1.2%"
      },
      {
        "date": "2026-10-15",
        "time": "20:30",
        "ccy": "USD",
        "impact": "med",
        "name": "Philly Fed Manufacturing Index",
        "actual": "",
        "forecast": "28.2",
        "previous": "37.8"
      },
      {
        "date": "2026-10-15",
        "time": "20:30",
        "ccy": "USD",
        "impact": "med",
        "name": "Unemployment Claims",
        "actual": "",
        "forecast": "199K",
        "previous": "197K"
      }
    ],
    "status": null
  },
  "implications": [
    "牆、街貨與隔夜僅作地圖與濾鏡，不構成方向或進場訊號。",
    "隔夜標普下跌超過 0.8%，開市區間或較闊；無方向優勢。",
    "恒指即月認購牆 24400 接近結算 24333，先當阻力地圖。",
    "小恒牆位已核實，與恒指一併讀，不因單一牆位預測開市方向。",
    "近收回牛／熊未見明顯單邊堆疊。"
  ],
  "missing": []
};
