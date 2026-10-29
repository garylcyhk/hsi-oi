/* Exodus morning brief — generated, do not edit by hand.
   Builder: scripts/update_morning_brief.py
   Schedule: weekday 09:00 Asia/Hong_Kong (cron 0 1 * * 1-5).
   Missing feeds stay empty with 未能核實／未更新. Never invents walls or prices.
*/
window.MORNING_BRIEF = {
  "asOf": "2026-10-29 14:54",
  "sessionDate": "2026-10-29",
  "usSessionDate": "2026-10-28",
  "expectedOiDate": "2026-10-28",
  "tz": "HKT",
  "title": "香港早晨 · 美股收市／小恒早盤",
  "disclaimer": "研究用，非買賣建議。牆與街貨為對沖地圖，不構成投資建議。",
  "pipeline": "GitHub Action 平日 09:00 HKT（cron 0 1 * * 1-5）由 scripts/update_morning_brief.py 寫入 morning-brief/data.js。",
  "closed": false,
  "oneLiner": "標普 +0.28% · VIX 16.91 · 恒指認購牆 26000 · 認沽牆 18200",
  "us": {
    "ok": true,
    "stale": false,
    "asOf": "2026-10-28",
    "source": "https://query1.finance.yahoo.com/v8/finance/chart",
    "sourceNote": "Yahoo Finance 日線收市（美東日期）",
    "items": [
      {
        "symbol": "^GSPC",
        "name": "標普 S&P 500",
        "ok": true,
        "stale": false,
        "last": 7743.98,
        "prev": 7722.6001,
        "chg": 21.3799,
        "pct": 0.28,
        "date": "2026-10-28",
        "kind": "%"
      },
      {
        "symbol": "^DJI",
        "name": "道指 Dow",
        "ok": true,
        "stale": false,
        "last": 52475.1016,
        "prev": 52377.5703,
        "chg": 97.5312,
        "pct": 0.19,
        "date": "2026-10-28",
        "kind": "%"
      },
      {
        "symbol": "^IXIC",
        "name": "納指 Nasdaq",
        "ok": true,
        "stale": false,
        "last": 26549.8496,
        "prev": 26477.8105,
        "chg": 72.0391,
        "pct": 0.27,
        "date": "2026-10-28",
        "kind": "%"
      },
      {
        "symbol": "^VIX",
        "name": "VIX",
        "ok": true,
        "stale": false,
        "last": 16.91,
        "prev": 17.52,
        "chg": -0.61,
        "pct": -3.48,
        "date": "2026-10-28",
        "kind": "pt"
      },
      {
        "symbol": "CL=F",
        "name": "WTI 原油",
        "ok": true,
        "stale": false,
        "last": 101.58,
        "prev": 102.78,
        "chg": -1.2,
        "pct": -1.17,
        "date": "2026-10-29",
        "kind": "%"
      },
      {
        "symbol": "^TNX",
        "name": "美10年期債 Yahoo ^TNX",
        "ok": true,
        "stale": false,
        "last": 5.045,
        "prev": 4.993,
        "chg": 0.052,
        "pct": 1.04,
        "date": "2026-10-28",
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
    "date": "2026-10-28",
    "sourceUrl": "https://www.hkex.com.hk/chi/stat/dmstat/dayrpt/hsioc261028.htm",
    "frontMonth": "2026-10",
    "nextMonth": "2026-11",
    "callOI": 20121,
    "putOI": 26938,
    "callOIChange": -552,
    "putOIChange": 67,
    "callPct": 42.8,
    "putPct": 57.2,
    "totalOI": 47059,
    "totalOIChange": -485,
    "pcRatio": 1.34,
    "settle": 23074,
    "settleChange": 47,
    "callWalls": [
      {
        "strike": 26000,
        "oi": 1692,
        "oiChange": 0
      },
      {
        "strike": 23600,
        "oi": 1365,
        "oiChange": -7
      },
      {
        "strike": 23400,
        "oi": 1245,
        "oiChange": -15
      },
      {
        "strike": 24400,
        "oi": 1136,
        "oiChange": -25
      },
      {
        "strike": 24600,
        "oi": 1062,
        "oiChange": -2
      }
    ],
    "putWalls": [
      {
        "strike": 18200,
        "oi": 2205,
        "oiChange": 0
      },
      {
        "strike": 19000,
        "oi": 2006,
        "oiChange": 0
      },
      {
        "strike": 22400,
        "oi": 1351,
        "oiChange": 21
      },
      {
        "strike": 22800,
        "oi": 1224,
        "oiChange": -84
      },
      {
        "strike": 23000,
        "oi": 1174,
        "oiChange": 453
      }
    ]
  },
  "mini": {
    "ok": false,
    "stale": true,
    "date": "2026-10-27",
    "label": "小型恒指 Mini-HSI",
    "status": "未能核實／未更新",
    "sourceUrl": "https://www.hkex.com.hk/chi/stat/dmstat/dayrpt/mhioc261027.htm",
    "note": "最新檔為 2026-10-27，預期 2026-10-28"
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
    "note": "最新街貨欄 2026-10-27，預期 2026-10-28"
  },
  "stocks": {
    "ok": true,
    "stale": false,
    "date": "2026-10-28",
    "sourceUrl": "https://www.hkex.com.hk/eng/stat/dmstat/dayrpt/dqe261028.htm",
    "status": null,
    "items": [
      {
        "hkats": "TCH",
        "code": "00700",
        "name": "騰訊 Tencent",
        "close": 387.6,
        "volume": 88352,
        "callOI": 1218306,
        "putOI": 1007268,
        "callWall": 460.0,
        "putWall": 420.0,
        "reason": "收市 387.6 · 認購牆 460.0 OI 15517 · 距認購牆 72.4 · 認沽牆 420.0 OI 21148 · 距認沽牆 -32.4 · 成交 88352"
      },
      {
        "hkats": "ALB",
        "code": "09988",
        "name": "阿里巴巴 Alibaba",
        "close": 98.9,
        "volume": 134553,
        "callOI": 1032239,
        "putOI": 1027952,
        "callWall": 125.0,
        "putWall": 100.0,
        "reason": "收市 98.9 · 認購牆 125.0 OI 21384 · 距認購牆 26.1 · 認沽牆 100.0 OI 15324 · 距認沽牆 -1.1 · 成交 134553"
      },
      {
        "hkats": "MIU",
        "code": "01810",
        "name": "小米 Xiaomi",
        "close": 25.62,
        "volume": 18999,
        "callOI": 592762,
        "putOI": 539279,
        "callWall": 27.0,
        "putWall": 23.0,
        "reason": "收市 25.62 · 認購牆 27.0 OI 8707 · 距認購牆 1.38 · 認沽牆 23.0 OI 9013 · 距認沽牆 2.62 · 成交 18999"
      },
      {
        "hkats": "MET",
        "code": "03690",
        "name": "美團 Meituan",
        "close": 71.2,
        "volume": 26625,
        "callOI": 441525,
        "putOI": 490977,
        "callWall": 72.5,
        "putWall": 70.0,
        "reason": "收市 71.2 · 認購牆 72.5 OI 6832 · 距認購牆 1.3 · 認沽牆 70.0 OI 8412 · 距認沽牆 1.2 · 成交 26625"
      },
      {
        "hkats": "HEX",
        "code": "00388",
        "name": "港交所 HKEX",
        "close": 365.0,
        "volume": 10838,
        "callOI": 188697,
        "putOI": 168803,
        "callWall": 400.0,
        "putWall": 380.0,
        "reason": "收市 365.0 · 認購牆 400.0 OI 5813 · 距認購牆 35.0 · 認沽牆 380.0 OI 5102 · 距認沽牆 -15.0 · 成交 10838"
      },
      {
        "hkats": "KST",
        "code": "01024",
        "name": "快手 Kuaishou",
        "close": 27.08,
        "volume": 22305,
        "callOI": 292526,
        "putOI": 228042,
        "callWall": 38.0,
        "putWall": 30.0,
        "reason": "收市 27.08 · 認購牆 38.0 OI 6424 · 距認購牆 10.92 · 認沽牆 30.0 OI 6133 · 距認沽牆 -2.92 · 成交 22305"
      }
    ]
  },
  "calendar": {
    "ok": true,
    "asOf": "2026-10-29 10:25",
    "source": "https://www.forexfactory.com/calendar",
    "items": [
      {
        "date": "2026-10-29",
        "time": "02:00",
        "ccy": "USD",
        "impact": "high",
        "name": "Federal Funds Rate",
        "actual": "",
        "forecast": "4.00%",
        "previous": "4.00%"
      },
      {
        "date": "2026-10-29",
        "time": "02:00",
        "ccy": "USD",
        "impact": "high",
        "name": "FOMC Statement",
        "actual": "",
        "forecast": "—",
        "previous": "—"
      },
      {
        "date": "2026-10-29",
        "time": "02:30",
        "ccy": "USD",
        "impact": "high",
        "name": "FOMC Press Conference",
        "actual": "",
        "forecast": "—",
        "previous": "—"
      },
      {
        "date": "2026-10-29",
        "time": "20:30",
        "ccy": "USD",
        "impact": "high",
        "name": "Advance GDP q/q",
        "actual": "",
        "forecast": "3.2%",
        "previous": "1.5%"
      },
      {
        "date": "2026-10-29",
        "time": "20:30",
        "ccy": "USD",
        "impact": "high",
        "name": "Core PCE Price Index m/m",
        "actual": "",
        "forecast": "0.3%",
        "previous": "0.2%"
      },
      {
        "date": "2026-10-29",
        "time": "20:30",
        "ccy": "USD",
        "impact": "med",
        "name": "Advance GDP Price Index q/q",
        "actual": "",
        "forecast": "3.2%",
        "previous": "6.2%"
      },
      {
        "date": "2026-10-29",
        "time": "20:30",
        "ccy": "USD",
        "impact": "med",
        "name": "Unemployment Claims",
        "actual": "",
        "forecast": "198K",
        "previous": "194K"
      }
    ],
    "status": null
  },
  "implications": [
    "牆、街貨與隔夜僅作地圖與濾鏡，不構成方向或進場訊號。",
    "隔夜標普波幅不大，不把隔夜當今日方向。",
    "恒指即月認沽牆 22800 接近結算 23074，先當支持地圖。"
  ],
  "missing": [
    "小恒期權：未能核實／未更新（最新檔為 2026-10-27，預期 2026-10-28）",
    "牛熊街貨：未能核實／未更新（最新街貨欄 2026-10-27，預期 2026-10-28）"
  ]
};
