/* Exodus morning brief — generated, do not edit by hand.
   Builder: scripts/update_morning_brief.py
   Schedule: weekday 09:00 Asia/Hong_Kong (cron 0 1 * * 1-5).
   Missing feeds stay empty with 未能核實／未更新. Never invents walls or prices.
*/
window.MORNING_BRIEF = {
  "asOf": "2026-10-16 13:42",
  "sessionDate": "2026-10-16",
  "usSessionDate": "2026-10-15",
  "expectedOiDate": "2026-10-15",
  "tz": "HKT",
  "title": "香港早晨 · 美股收市／小恒早盤",
  "disclaimer": "研究用，非買賣建議。牆與街貨為對沖地圖，不構成投資建議。",
  "pipeline": "GitHub Action 平日 09:00 HKT（cron 0 1 * * 1-5）由 scripts/update_morning_brief.py 寫入 morning-brief/data.js。",
  "closed": false,
  "oneLiner": "標普 +0.33% · VIX 16.46 · 恒指認購牆 26000 · 認沽牆 23600 · 小恒認購牆 24600 · 街貨現價 24063 · 近收回 牛5558/熊3617",
  "us": {
    "ok": true,
    "stale": false,
    "asOf": "2026-10-15",
    "source": "https://query1.finance.yahoo.com/v8/finance/chart",
    "sourceNote": "Yahoo Finance 日線收市（美東日期）",
    "items": [
      {
        "symbol": "^GSPC",
        "name": "標普 S&P 500",
        "ok": true,
        "stale": false,
        "last": 7744.0601,
        "prev": 7718.9399,
        "chg": 25.1201,
        "pct": 0.33,
        "date": "2026-10-15",
        "kind": "%"
      },
      {
        "symbol": "^DJI",
        "name": "道指 Dow",
        "ok": true,
        "stale": false,
        "last": 52177.6914,
        "prev": 51621.4805,
        "chg": 556.2109,
        "pct": 1.08,
        "date": "2026-10-15",
        "kind": "%"
      },
      {
        "symbol": "^IXIC",
        "name": "納指 Nasdaq",
        "ok": true,
        "stale": false,
        "last": 26713.0293,
        "prev": 26692.8691,
        "chg": 20.1602,
        "pct": 0.08,
        "date": "2026-10-15",
        "kind": "%"
      },
      {
        "symbol": "^VIX",
        "name": "VIX",
        "ok": true,
        "stale": false,
        "last": 16.46,
        "prev": 16.87,
        "chg": -0.41,
        "pct": -2.43,
        "date": "2026-10-15",
        "kind": "pt"
      },
      {
        "symbol": "CL=F",
        "name": "WTI 原油",
        "ok": true,
        "stale": false,
        "last": 95.82,
        "prev": 97.97,
        "chg": -2.15,
        "pct": -2.19,
        "date": "2026-10-16",
        "kind": "%"
      },
      {
        "symbol": "^TNX",
        "name": "美10年期債 Yahoo ^TNX",
        "ok": true,
        "stale": false,
        "last": 5.089,
        "prev": 5.19,
        "chg": -0.101,
        "pct": -1.95,
        "date": "2026-10-15",
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
    "date": "2026-10-15",
    "sourceUrl": "https://www.hkex.com.hk/chi/stat/dmstat/dayrpt/hsioc261015.htm",
    "frontMonth": "2026-10",
    "nextMonth": "2026-11",
    "callOI": 16132,
    "putOI": 19921,
    "callOIChange": 579,
    "putOIChange": 1162,
    "callPct": 44.7,
    "putPct": 55.3,
    "totalOI": 36053,
    "totalOIChange": 1741,
    "pcRatio": 1.23,
    "settle": 24063,
    "settleChange": -270,
    "callWalls": [
      {
        "strike": 26000,
        "oi": 1806,
        "oiChange": 14
      },
      {
        "strike": 24400,
        "oi": 1193,
        "oiChange": 6
      },
      {
        "strike": 24600,
        "oi": 979,
        "oiChange": 199
      },
      {
        "strike": 25000,
        "oi": 928,
        "oiChange": 22
      },
      {
        "strike": 24800,
        "oi": 705,
        "oiChange": 33
      }
    ],
    "putWalls": [
      {
        "strike": 23600,
        "oi": 1315,
        "oiChange": 575
      },
      {
        "strike": 22000,
        "oi": 984,
        "oiChange": 16
      },
      {
        "strike": 24000,
        "oi": 922,
        "oiChange": 15
      },
      {
        "strike": 23000,
        "oi": 911,
        "oiChange": 10
      },
      {
        "strike": 23800,
        "oi": 878,
        "oiChange": 26
      }
    ]
  },
  "mini": {
    "ok": true,
    "stale": false,
    "status": null,
    "label": "小型恒指 Mini-HSI",
    "date": "2026-10-15",
    "sourceUrl": "https://www.hkex.com.hk/chi/stat/dmstat/dayrpt/mhioc261015.htm",
    "frontMonth": "2026-10",
    "nextMonth": "2026-11",
    "callOI": 10186,
    "putOI": 12305,
    "callOIChange": 658,
    "putOIChange": -222,
    "callPct": 45.3,
    "putPct": 54.7,
    "totalOI": 22491,
    "totalOIChange": 436,
    "pcRatio": 1.21,
    "settle": 24063,
    "settleChange": -270,
    "callWalls": [
      {
        "strike": 24600,
        "oi": 850,
        "oiChange": 344
      },
      {
        "strike": 24400,
        "oi": 834,
        "oiChange": 241
      },
      {
        "strike": 25600,
        "oi": 669,
        "oiChange": 22
      },
      {
        "strike": 25000,
        "oi": 662,
        "oiChange": 83
      },
      {
        "strike": 26000,
        "oi": 623,
        "oiChange": -41
      }
    ],
    "putWalls": [
      {
        "strike": 24000,
        "oi": 895,
        "oiChange": -52
      },
      {
        "strike": 24600,
        "oi": 849,
        "oiChange": -5
      },
      {
        "strike": 23600,
        "oi": 827,
        "oiChange": 37
      },
      {
        "strike": 25000,
        "oi": 767,
        "oiChange": -11
      },
      {
        "strike": 23000,
        "oi": 751,
        "oiChange": -18
      }
    ]
  },
  "cbbc": {
    "ok": true,
    "stale": false,
    "status": null,
    "asOf": "2026-10-15",
    "published": "2026-10-16 08:06",
    "spot": 24063,
    "prevClose": 24314,
    "bullFut": 8905,
    "bearFut": 8977,
    "bullPct": 49.8,
    "bearPct": 50.2,
    "ratio": 0.99,
    "nearKoPts": 1000,
    "nearKoBull": 5558,
    "nearKoBear": 3617,
    "flow1d": {
      "bullM": null,
      "bearM": null,
      "bullFut": 77,
      "bearFut": -853
    },
    "calledNote": "自動更新自高盛 · 圖表 2026-10-16 08:06 · 街貨欄 10-15",
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
        "fut": 1408,
        "chg": -384
      },
      {
        "lo": 24800,
        "hi": 24999,
        "call": 24800,
        "fut": 1010,
        "chg": -659
      },
      {
        "lo": 24400,
        "hi": 24599,
        "call": 24400,
        "fut": 646,
        "chg": 332
      },
      {
        "lo": 25000,
        "hi": 25199,
        "call": 25000,
        "fut": 445,
        "chg": -253
      }
    ],
    "nearBull": [
      {
        "lo": 23600,
        "hi": 23799,
        "call": 23600,
        "fut": 2258,
        "chg": 336
      },
      {
        "lo": 23400,
        "hi": 23599,
        "call": 23400,
        "fut": 1612,
        "chg": 190
      },
      {
        "lo": 23800,
        "hi": 23999,
        "call": 23800,
        "fut": 857,
        "chg": -375
      },
      {
        "lo": 23000,
        "hi": 23199,
        "call": 23000,
        "fut": 652,
        "chg": 65
      }
    ],
    "note": "僅作對沖地圖，並非買賣牛熊證。"
  },
  "stocks": {
    "ok": true,
    "stale": false,
    "date": "2026-10-15",
    "sourceUrl": "https://www.hkex.com.hk/eng/stat/dmstat/dayrpt/dqe261015.htm",
    "status": null,
    "items": [
      {
        "hkats": "TCH",
        "code": "00700",
        "name": "騰訊 Tencent",
        "close": 417.8,
        "volume": 119031,
        "callOI": 1041252,
        "putOI": 1003691,
        "callWall": 430.0,
        "putWall": 415.0,
        "reason": "收市 417.8 · 認購牆 430.0 OI 3752 · 距認購牆 12.2 · 認沽牆 415.0 OI 4584 · 距認沽牆 2.8 · 成交 119031"
      },
      {
        "hkats": "ALB",
        "code": "09988",
        "name": "阿里巴巴 Alibaba",
        "close": 106.4,
        "volume": 68782,
        "callOI": 958577,
        "putOI": 990144,
        "callWall": 109.0,
        "putWall": 107.0,
        "reason": "收市 106.4 · 認購牆 109.0 OI 2490 · 距認購牆 2.6 · 認沽牆 107.0 OI 1320 · 距認沽牆 -0.6 · 成交 68782"
      },
      {
        "hkats": "MIU",
        "code": "01810",
        "name": "小米 Xiaomi",
        "close": 27.08,
        "volume": 59380,
        "callOI": 530598,
        "putOI": 514134,
        "callWall": 24.5,
        "putWall": 24.0,
        "reason": "收市 27.08 · 認購牆 24.5 OI 1437 · 距認購牆 -2.58 · 認沽牆 24.0 OI 2379 · 距認沽牆 3.08 · 成交 59380"
      },
      {
        "hkats": "MET",
        "code": "03690",
        "name": "美團 Meituan",
        "close": 75.45,
        "volume": 28540,
        "callOI": 405679,
        "putOI": 462163,
        "callWall": 73.0,
        "putWall": 70.0,
        "reason": "收市 75.45 · 認購牆 73.0 OI 1327 · 距認購牆 -2.45 · 認沽牆 70.0 OI 1061 · 距認沽牆 5.45 · 成交 28540"
      },
      {
        "hkats": "HEX",
        "code": "00388",
        "name": "港交所 HKEX",
        "close": 371.4,
        "volume": 9076,
        "callOI": 166872,
        "putOI": 169294,
        "callWall": 380.0,
        "putWall": 370.0,
        "reason": "收市 371.4 · 認購牆 380.0 OI 1102 · 距認購牆 8.6 · 認沽牆 370.0 OI 722 · 距認沽牆 1.4 · 成交 9076"
      },
      {
        "hkats": "KST",
        "code": "01024",
        "name": "快手 Kuaishou",
        "close": 28.58,
        "volume": 14105,
        "callOI": 252159,
        "putOI": 232131,
        "callWall": 29.0,
        "putWall": 29.5,
        "reason": "收市 28.58 · 認購牆 29.0 OI 1150 · 距認購牆 0.42 · 認沽牆 29.5 OI 874 · 距認沽牆 -0.92 · 成交 14105"
      }
    ]
  },
  "calendar": {
    "ok": true,
    "asOf": "2026-10-16 09:18",
    "source": "https://www.forexfactory.com/calendar",
    "items": [
      {
        "date": "2026-10-16",
        "time": "11:30",
        "ccy": "USD",
        "impact": "high",
        "name": "Fed Chairman Warsh Speaks",
        "actual": "",
        "forecast": "—",
        "previous": "—"
      }
    ],
    "status": null
  },
  "implications": [
    "牆、街貨與隔夜僅作地圖與濾鏡，不構成方向或進場訊號。",
    "隔夜標普波幅不大，不把隔夜當今日方向。",
    "恒指即月認沽牆 24000 接近結算 24063，先當支持地圖。",
    "小恒牆位已核實，與恒指一併讀，不因單一牆位預測開市方向。",
    "現價之下近收回牛證較重，屬對沖流動性地圖；屠牛進行中不要 fade。"
  ],
  "missing": []
};
