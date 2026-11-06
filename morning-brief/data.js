/* Exodus morning brief — generated, do not edit by hand.
   Builder: scripts/update_morning_brief.py
   Schedule: weekday 09:00 Asia/Hong_Kong (cron 0 1 * * 1-5).
   Missing feeds stay empty with 未能核實／未更新. Never invents walls or prices.
*/
window.MORNING_BRIEF = {
  "asOf": "2026-11-06 15:50",
  "sessionDate": "2026-11-06",
  "usSessionDate": "2026-11-05",
  "expectedOiDate": "2026-11-05",
  "tz": "HKT",
  "title": "香港早晨 · 美股收市／小恒早盤",
  "disclaimer": "研究用，非買賣建議。牆與街貨為對沖地圖，不構成投資建議。",
  "pipeline": "GitHub Action 平日 09:00 HKT（cron 0 1 * * 1-5）由 scripts/update_morning_brief.py 寫入 morning-brief/data.js。",
  "closed": false,
  "oneLiner": "標普 -4.36% · VIX 28.18 · 恒指認購牆 25800 · 認沽牆 23400",
  "us": {
    "ok": true,
    "stale": false,
    "asOf": "2026-11-05",
    "source": "https://query1.finance.yahoo.com/v8/finance/chart",
    "sourceNote": "Yahoo Finance 日線收市（美東日期）",
    "items": [
      {
        "symbol": "^GSPC",
        "name": "標普 S&P 500",
        "ok": true,
        "stale": false,
        "last": 7353.73,
        "prev": 7688.6201,
        "chg": -334.8901,
        "pct": -4.36,
        "date": "2026-11-05",
        "kind": "%"
      },
      {
        "symbol": "^DJI",
        "name": "道指 Dow",
        "ok": true,
        "stale": false,
        "last": 51523.0586,
        "prev": 53356.1211,
        "chg": -1833.0625,
        "pct": -3.44,
        "date": "2026-11-05",
        "kind": "%"
      },
      {
        "symbol": "^IXIC",
        "name": "納指 Nasdaq",
        "ok": true,
        "stale": false,
        "last": 24315.0,
        "prev": 25736.5098,
        "chg": -1421.5098,
        "pct": -5.52,
        "date": "2026-11-05",
        "kind": "%"
      },
      {
        "symbol": "^VIX",
        "name": "VIX",
        "ok": true,
        "stale": false,
        "last": 28.18,
        "prev": 16.61,
        "chg": 11.57,
        "pct": 69.66,
        "date": "2026-11-05",
        "kind": "pt"
      },
      {
        "symbol": "CL=F",
        "name": "WTI 原油",
        "ok": true,
        "stale": false,
        "last": 91.39,
        "prev": 90.52,
        "chg": 0.87,
        "pct": 0.96,
        "date": "2026-11-06",
        "kind": "%"
      },
      {
        "symbol": "^TNX",
        "name": "美10年期債 Yahoo ^TNX",
        "ok": true,
        "stale": false,
        "last": 4.837,
        "prev": 4.894,
        "chg": -0.057,
        "pct": -1.16,
        "date": "2026-11-05",
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
    "date": "2026-11-05",
    "sourceUrl": "https://www.hkex.com.hk/chi/stat/dmstat/dayrpt/hsioc261105.htm",
    "frontMonth": "2026-11",
    "nextMonth": "2026-12",
    "callOI": 15877,
    "putOI": 22551,
    "callOIChange": 1799,
    "putOIChange": 3106,
    "callPct": 41.3,
    "putPct": 58.7,
    "totalOI": 38428,
    "totalOIChange": 4905,
    "pcRatio": 1.42,
    "settle": 24886,
    "settleChange": 964,
    "callWalls": [
      {
        "strike": 25800,
        "oi": 1205,
        "oiChange": 876
      },
      {
        "strike": 24800,
        "oi": 1199,
        "oiChange": 328
      },
      {
        "strike": 24000,
        "oi": 1156,
        "oiChange": -8
      },
      {
        "strike": 26000,
        "oi": 1072,
        "oiChange": 648
      },
      {
        "strike": 25600,
        "oi": 861,
        "oiChange": 444
      }
    ],
    "putWalls": [
      {
        "strike": 23400,
        "oi": 1153,
        "oiChange": 169
      },
      {
        "strike": 22800,
        "oi": 959,
        "oiChange": -151
      },
      {
        "strike": 17000,
        "oi": 933,
        "oiChange": 10
      },
      {
        "strike": 22000,
        "oi": 912,
        "oiChange": 304
      },
      {
        "strike": 22600,
        "oi": 881,
        "oiChange": 153
      }
    ]
  },
  "mini": {
    "ok": false,
    "stale": true,
    "date": "2026-11-02",
    "label": "小型恒指 Mini-HSI",
    "status": "未能核實／未更新",
    "sourceUrl": "https://www.hkex.com.hk/chi/stat/dmstat/dayrpt/mhioc261102.htm",
    "note": "最新檔為 2026-11-02，預期 2026-11-05"
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
    "note": "最新街貨欄 2026-10-27，預期 2026-11-05"
  },
  "stocks": {
    "ok": true,
    "stale": false,
    "date": "2026-11-05",
    "sourceUrl": "https://www.hkex.com.hk/eng/stat/dmstat/dayrpt/dqe261105.htm",
    "status": null,
    "items": [
      {
        "hkats": "TCH",
        "code": "00700",
        "name": "騰訊 Tencent",
        "close": 430.4,
        "volume": 308262,
        "callOI": 1172701,
        "putOI": 943935,
        "callWall": 400.0,
        "putWall": 385.0,
        "reason": "收市 430.4 · 認購牆 400.0 OI 6331 · 距認購牆 -30.4 · 認沽牆 385.0 OI 4029 · 距認沽牆 45.4 · 成交 308262"
      },
      {
        "hkats": "ALB",
        "code": "09988",
        "name": "阿里巴巴 Alibaba",
        "close": 109.1,
        "volume": 142365,
        "callOI": 875555,
        "putOI": 1004059,
        "callWall": 100.0,
        "putWall": 95.0,
        "reason": "收市 109.1 · 認購牆 100.0 OI 2125 · 距認購牆 -9.1 · 認沽牆 95.0 OI 1569 · 距認沽牆 14.1 · 成交 142365"
      },
      {
        "hkats": "MIU",
        "code": "01810",
        "name": "小米 Xiaomi",
        "close": 31.3,
        "volume": 124760,
        "callOI": 606569,
        "putOI": 551587,
        "callWall": 26.0,
        "putWall": 25.0,
        "reason": "收市 31.3 · 認購牆 26.0 OI 1599 · 距認購牆 -5.3 · 認沽牆 25.0 OI 742 · 距認沽牆 6.3 · 成交 124760"
      },
      {
        "hkats": "MET",
        "code": "03690",
        "name": "美團 Meituan",
        "close": 80.3,
        "volume": 70229,
        "callOI": 434769,
        "putOI": 469761,
        "callWall": 78.0,
        "putWall": 76.0,
        "reason": "收市 80.3 · 認購牆 78.0 OI 1514 · 距認購牆 -2.3 · 認沽牆 76.0 OI 715 · 距認沽牆 4.3 · 成交 70229"
      },
      {
        "hkats": "HEX",
        "code": "00388",
        "name": "港交所 HKEX",
        "close": 394.6,
        "volume": 35182,
        "callOI": 194065,
        "putOI": 159683,
        "callWall": 380.0,
        "putWall": 360.0,
        "reason": "收市 394.6 · 認購牆 380.0 OI 1008 · 距認購牆 -14.6 · 認沽牆 360.0 OI 632 · 距認沽牆 34.6 · 成交 35182"
      },
      {
        "hkats": "KST",
        "code": "01024",
        "name": "快手 Kuaishou",
        "close": 29.4,
        "volume": 35073,
        "callOI": 263890,
        "putOI": 220478,
        "callWall": 28.5,
        "putWall": 26.5,
        "reason": "收市 29.4 · 認購牆 28.5 OI 942 · 距認購牆 -0.9 · 認沽牆 26.5 OI 603 · 距認沽牆 2.9 · 成交 35073"
      }
    ]
  },
  "calendar": {
    "ok": true,
    "asOf": "2026-11-06 11:25",
    "source": "https://www.forexfactory.com/calendar",
    "items": [
      {
        "date": "2026-11-06",
        "time": "21:30",
        "ccy": "USD",
        "impact": "high",
        "name": "Average Hourly Earnings m/m",
        "actual": "",
        "forecast": "0.3%",
        "previous": "0.1%"
      },
      {
        "date": "2026-11-06",
        "time": "21:30",
        "ccy": "USD",
        "impact": "high",
        "name": "Non-Farm Employment Change",
        "actual": "",
        "forecast": "65K",
        "previous": "29K"
      },
      {
        "date": "2026-11-06",
        "time": "21:30",
        "ccy": "USD",
        "impact": "high",
        "name": "Unemployment Rate",
        "actual": "",
        "forecast": "4.2%",
        "previous": "4.2%"
      },
      {
        "date": "2026-11-06",
        "time": "23:00",
        "ccy": "USD",
        "impact": "med",
        "name": "Prelim UoM Consumer Sentiment",
        "actual": "",
        "forecast": "48.1",
        "previous": "46.3"
      },
      {
        "date": "2026-11-06",
        "time": "23:00",
        "ccy": "USD",
        "impact": "med",
        "name": "Prelim UoM Inflation Expectations",
        "actual": "",
        "forecast": "—",
        "previous": "4.7%"
      }
    ],
    "status": null
  },
  "implications": [
    "牆、街貨與隔夜僅作地圖與濾鏡，不構成方向或進場訊號。",
    "隔夜標普下跌超過 0.8%，開市區間或較闊；無方向優勢。"
  ],
  "missing": [
    "小恒期權：未能核實／未更新（最新檔為 2026-11-02，預期 2026-11-05）",
    "牛熊街貨：未能核實／未更新（最新街貨欄 2026-10-27，預期 2026-11-05）"
  ]
};
