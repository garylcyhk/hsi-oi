/* Exodus morning brief — generated, do not edit by hand.
   Builder: scripts/update_morning_brief.py
   Schedule: weekday 09:00 Asia/Hong_Kong (cron 0 1 * * 1-5).
   Missing feeds stay empty with 未能核實／未更新. Never invents walls or prices.
*/
window.MORNING_BRIEF = {
  "asOf": "2026-11-03 15:46",
  "sessionDate": "2026-11-03",
  "usSessionDate": "2026-11-02",
  "expectedOiDate": "2026-11-02",
  "tz": "HKT",
  "title": "香港早晨 · 美股收市／小恒早盤",
  "disclaimer": "研究用，非買賣建議。牆與街貨為對沖地圖，不構成投資建議。",
  "pipeline": "GitHub Action 平日 09:00 HKT（cron 0 1 * * 1-5）由 scripts/update_morning_brief.py 寫入 morning-brief/data.js。",
  "closed": false,
  "oneLiner": "標普 -0.51% · VIX 21.15 · 恒指認購牆 24000 · 認沽牆 22400 · 小恒認購牆 24000",
  "us": {
    "ok": true,
    "stale": false,
    "asOf": "2026-11-02",
    "source": "https://query1.finance.yahoo.com/v8/finance/chart",
    "sourceNote": "Yahoo Finance 日線收市（美東日期）",
    "items": [
      {
        "symbol": "^GSPC",
        "name": "標普 S&P 500",
        "ok": true,
        "stale": false,
        "last": 7541.3999,
        "prev": 7580.0698,
        "chg": -38.6699,
        "pct": -0.51,
        "date": "2026-11-02",
        "kind": "%"
      },
      {
        "symbol": "^DJI",
        "name": "道指 Dow",
        "ok": true,
        "stale": false,
        "last": 51983.9805,
        "prev": 51770.3086,
        "chg": 213.6719,
        "pct": 0.41,
        "date": "2026-11-02",
        "kind": "%"
      },
      {
        "symbol": "^IXIC",
        "name": "納指 Nasdaq",
        "ok": true,
        "stale": false,
        "last": 25164.3105,
        "prev": 25437.0,
        "chg": -272.6895,
        "pct": -1.07,
        "date": "2026-11-02",
        "kind": "%"
      },
      {
        "symbol": "^VIX",
        "name": "VIX",
        "ok": true,
        "stale": false,
        "last": 21.15,
        "prev": 19.42,
        "chg": 1.73,
        "pct": 8.91,
        "date": "2026-11-02",
        "kind": "pt"
      },
      {
        "symbol": "CL=F",
        "name": "WTI 原油",
        "ok": true,
        "stale": false,
        "last": 98.14,
        "prev": 96.46,
        "chg": 1.68,
        "pct": 1.74,
        "date": "2026-11-03",
        "kind": "%"
      },
      {
        "symbol": "^TNX",
        "name": "美10年期債 Yahoo ^TNX",
        "ok": true,
        "stale": false,
        "last": 4.894,
        "prev": 4.929,
        "chg": -0.035,
        "pct": -0.71,
        "date": "2026-11-02",
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
    "date": "2026-11-02",
    "sourceUrl": "https://www.hkex.com.hk/chi/stat/dmstat/dayrpt/hsioc261102.htm",
    "frontMonth": "2026-11",
    "nextMonth": "2026-12",
    "callOI": 12706,
    "putOI": 18293,
    "callOIChange": 399,
    "putOIChange": 1241,
    "callPct": 41.0,
    "putPct": 59.0,
    "totalOI": 30999,
    "totalOIChange": 1640,
    "pcRatio": 1.44,
    "settle": 23364,
    "settleChange": 77,
    "callWalls": [
      {
        "strike": 24000,
        "oi": 1327,
        "oiChange": 9
      },
      {
        "strike": 23200,
        "oi": 874,
        "oiChange": 1
      },
      {
        "strike": 23800,
        "oi": 747,
        "oiChange": 49
      },
      {
        "strike": 24400,
        "oi": 729,
        "oiChange": 65
      },
      {
        "strike": 25000,
        "oi": 629,
        "oiChange": 25
      }
    ],
    "putWalls": [
      {
        "strike": 22400,
        "oi": 1353,
        "oiChange": 23
      },
      {
        "strike": 17000,
        "oi": 844,
        "oiChange": 9
      },
      {
        "strike": 21200,
        "oi": 828,
        "oiChange": 9
      },
      {
        "strike": 23000,
        "oi": 789,
        "oiChange": 268
      },
      {
        "strike": 22800,
        "oi": 782,
        "oiChange": -111
      }
    ]
  },
  "mini": {
    "ok": true,
    "stale": false,
    "status": null,
    "label": "小型恒指 Mini-HSI",
    "date": "2026-11-02",
    "sourceUrl": "https://www.hkex.com.hk/chi/stat/dmstat/dayrpt/mhioc261102.htm",
    "frontMonth": "2026-11",
    "nextMonth": "2026-12",
    "callOI": 7123,
    "putOI": 7884,
    "callOIChange": 537,
    "putOIChange": 683,
    "callPct": 47.5,
    "putPct": 52.5,
    "totalOI": 15007,
    "totalOIChange": 1220,
    "pcRatio": 1.11,
    "settle": 23364,
    "settleChange": 77,
    "callWalls": [
      {
        "strike": 24000,
        "oi": 700,
        "oiChange": 26
      },
      {
        "strike": 25000,
        "oi": 623,
        "oiChange": -8
      },
      {
        "strike": 23600,
        "oi": 526,
        "oiChange": 141
      },
      {
        "strike": 23800,
        "oi": 472,
        "oiChange": 138
      },
      {
        "strike": 23400,
        "oi": 459,
        "oiChange": 39
      }
    ],
    "putWalls": [
      {
        "strike": 21600,
        "oi": 593,
        "oiChange": 45
      },
      {
        "strike": 22400,
        "oi": 580,
        "oiChange": 121
      },
      {
        "strike": 21400,
        "oi": 543,
        "oiChange": 12
      },
      {
        "strike": 22600,
        "oi": 468,
        "oiChange": 91
      },
      {
        "strike": 22800,
        "oi": 467,
        "oiChange": 26
      }
    ]
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
    "note": "最新街貨欄 2026-10-27，預期 2026-11-02"
  },
  "stocks": {
    "ok": true,
    "stale": false,
    "date": "2026-11-02",
    "sourceUrl": "https://www.hkex.com.hk/eng/stat/dmstat/dayrpt/dqe261102.htm",
    "status": null,
    "items": [
      {
        "hkats": "TCH",
        "code": "00700",
        "name": "騰訊 Tencent",
        "close": 392.2,
        "volume": 109613,
        "callOI": 1123608,
        "putOI": 917907,
        "callWall": 400.0,
        "putWall": 385.0,
        "reason": "收市 392.2 · 認購牆 400.0 OI 5930 · 距認購牆 7.8 · 認沽牆 385.0 OI 4172 · 距認沽牆 7.2 · 成交 109613"
      },
      {
        "hkats": "ALB",
        "code": "09988",
        "name": "阿里巴巴 Alibaba",
        "close": 99.45,
        "volume": 56769,
        "callOI": 838618,
        "putOI": 956055,
        "callWall": 100.0,
        "putWall": 95.0,
        "reason": "收市 99.45 · 認購牆 100.0 OI 2256 · 距認購牆 0.55 · 認沽牆 95.0 OI 1548 · 距認沽牆 4.45 · 成交 56769"
      },
      {
        "hkats": "MIU",
        "code": "01810",
        "name": "小米 Xiaomi",
        "close": 28.1,
        "volume": 95879,
        "callOI": 560156,
        "putOI": 516365,
        "callWall": 26.0,
        "putWall": 27.0,
        "reason": "收市 28.1 · 認購牆 26.0 OI 1610 · 距認購牆 -2.1 · 認沽牆 27.0 OI 620 · 距認沽牆 1.1 · 成交 95879"
      },
      {
        "hkats": "MET",
        "code": "03690",
        "name": "美團 Meituan",
        "close": 73.05,
        "volume": 23403,
        "callOI": 411792,
        "putOI": 457937,
        "callWall": 75.0,
        "putWall": 71.0,
        "reason": "收市 73.05 · 認購牆 75.0 OI 796 · 距認購牆 1.95 · 認沽牆 71.0 OI 506 · 距認沽牆 2.05 · 成交 23403"
      },
      {
        "hkats": "HEX",
        "code": "00388",
        "name": "港交所 HKEX",
        "close": 372.8,
        "volume": 41291,
        "callOI": 182182,
        "putOI": 153253,
        "callWall": 380.0,
        "putWall": 360.0,
        "reason": "收市 372.8 · 認購牆 380.0 OI 890 · 距認購牆 7.2 · 認沽牆 360.0 OI 646 · 距認沽牆 12.8 · 成交 41291"
      },
      {
        "hkats": "KST",
        "code": "01024",
        "name": "快手 Kuaishou",
        "close": 27.44,
        "volume": 29726,
        "callOI": 238031,
        "putOI": 214029,
        "callWall": 28.5,
        "putWall": 26.5,
        "reason": "收市 27.44 · 認購牆 28.5 OI 874 · 距認購牆 1.06 · 認沽牆 26.5 OI 608 · 距認沽牆 0.94 · 成交 29726"
      }
    ]
  },
  "calendar": {
    "ok": true,
    "asOf": "2026-11-03 11:55",
    "source": "https://www.forexfactory.com/calendar",
    "items": [
      {
        "date": "2026-11-03",
        "time": "11:30",
        "ccy": "AUD",
        "impact": "high",
        "name": "Cash Rate",
        "actual": "",
        "forecast": "4.85%",
        "previous": "4.60%"
      },
      {
        "date": "2026-11-03",
        "time": "11:30",
        "ccy": "AUD",
        "impact": "high",
        "name": "RBA Monetary Policy Statement",
        "actual": "",
        "forecast": "—",
        "previous": "—"
      },
      {
        "date": "2026-11-03",
        "time": "11:30",
        "ccy": "AUD",
        "impact": "high",
        "name": "RBA Rate Statement",
        "actual": "",
        "forecast": "—",
        "previous": "—"
      },
      {
        "date": "2026-11-03",
        "time": "12:30",
        "ccy": "AUD",
        "impact": "high",
        "name": "RBA Press Conference",
        "actual": "",
        "forecast": "—",
        "previous": "—"
      },
      {
        "date": "2026-11-03",
        "time": "23:00",
        "ccy": "USD",
        "impact": "med",
        "name": "JOLTS Job Openings",
        "actual": "",
        "forecast": "7.15M",
        "previous": "7.08M"
      },
      {
        "date": "2026-11-03",
        "time": "23:16",
        "ccy": "USD",
        "impact": "high",
        "name": "Congressional Elections",
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
    "小恒牆位已核實，與恒指一併讀，不因單一牆位預測開市方向。"
  ],
  "missing": [
    "牛熊街貨：未能核實／未更新（最新街貨欄 2026-10-27，預期 2026-11-02）"
  ]
};
