/* Exodus morning brief — generated, do not edit by hand.
   Builder: scripts/update_morning_brief.py
   Schedule: weekday 09:00 Asia/Hong_Kong (cron 0 1 * * 1-5).
   Missing feeds stay empty with 未能核實／未更新. Never invents walls or prices.
*/
window.MORNING_BRIEF = {
  "asOf": "2026-10-30 14:57",
  "sessionDate": "2026-10-30",
  "usSessionDate": "2026-10-29",
  "expectedOiDate": "2026-10-29",
  "tz": "HKT",
  "title": "香港早晨 · 美股收市／小恒早盤",
  "disclaimer": "研究用，非買賣建議。牆與街貨為對沖地圖，不構成投資建議。",
  "pipeline": "GitHub Action 平日 09:00 HKT（cron 0 1 * * 1-5）由 scripts/update_morning_brief.py 寫入 morning-brief/data.js。",
  "closed": false,
  "oneLiner": "標普 -0.3% · VIX 17.20 · 恒指認購牆 26000 · 認沽牆 18200 · 小恒認購牆 24400",
  "us": {
    "ok": true,
    "stale": false,
    "asOf": "2026-10-29",
    "source": "https://query1.finance.yahoo.com/v8/finance/chart",
    "sourceNote": "Yahoo Finance 日線收市（美東日期）",
    "items": [
      {
        "symbol": "^GSPC",
        "name": "標普 S&P 500",
        "ok": true,
        "stale": false,
        "last": 7720.3901,
        "prev": 7743.98,
        "chg": -23.5898,
        "pct": -0.3,
        "date": "2026-10-29",
        "kind": "%"
      },
      {
        "symbol": "^DJI",
        "name": "道指 Dow",
        "ok": true,
        "stale": false,
        "last": 52342.5586,
        "prev": 52475.1016,
        "chg": -132.543,
        "pct": -0.25,
        "date": "2026-10-29",
        "kind": "%"
      },
      {
        "symbol": "^IXIC",
        "name": "納指 Nasdaq",
        "ok": true,
        "stale": false,
        "last": 26184.7207,
        "prev": 26549.8496,
        "chg": -365.1289,
        "pct": -1.38,
        "date": "2026-10-29",
        "kind": "%"
      },
      {
        "symbol": "^VIX",
        "name": "VIX",
        "ok": true,
        "stale": false,
        "last": 17.2,
        "prev": 16.91,
        "chg": 0.29,
        "pct": 1.71,
        "date": "2026-10-29",
        "kind": "pt"
      },
      {
        "symbol": "CL=F",
        "name": "WTI 原油",
        "ok": true,
        "stale": false,
        "last": 102.91,
        "prev": 102.0,
        "chg": 0.91,
        "pct": 0.89,
        "date": "2026-10-30",
        "kind": "%"
      },
      {
        "symbol": "^TNX",
        "name": "美10年期債 Yahoo ^TNX",
        "ok": true,
        "stale": false,
        "last": 4.989,
        "prev": 5.045,
        "chg": -0.056,
        "pct": -1.11,
        "date": "2026-10-29",
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
    "date": "2026-10-29",
    "sourceUrl": "https://www.hkex.com.hk/chi/stat/dmstat/dayrpt/hsioc261029.htm",
    "frontMonth": "2026-10",
    "nextMonth": "2026-11",
    "callOI": 19882,
    "putOI": 21186,
    "callOIChange": -239,
    "putOIChange": -5752,
    "callPct": 48.4,
    "putPct": 51.6,
    "totalOI": 41068,
    "totalOIChange": -5991,
    "pcRatio": 1.07,
    "settle": 23087,
    "settleChange": 13,
    "callWalls": [
      {
        "strike": 26000,
        "oi": 1692,
        "oiChange": 0
      },
      {
        "strike": 23200,
        "oi": 1467,
        "oiChange": 673
      },
      {
        "strike": 23600,
        "oi": 1382,
        "oiChange": 17
      },
      {
        "strike": 23400,
        "oi": 1346,
        "oiChange": 101
      },
      {
        "strike": 24400,
        "oi": 1136,
        "oiChange": 0
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
        "oi": 1347,
        "oiChange": -4
      },
      {
        "strike": 23000,
        "oi": 1318,
        "oiChange": 144
      },
      {
        "strike": 22800,
        "oi": 1277,
        "oiChange": 53
      }
    ]
  },
  "mini": {
    "ok": true,
    "stale": false,
    "status": null,
    "label": "小型恒指 Mini-HSI",
    "date": "2026-10-29",
    "sourceUrl": "https://www.hkex.com.hk/chi/stat/dmstat/dayrpt/mhioc261029.htm",
    "frontMonth": "2026-10",
    "nextMonth": "2026-11",
    "callOI": 10935,
    "putOI": 5387,
    "callOIChange": -1229,
    "putOIChange": -7842,
    "callPct": 67.0,
    "putPct": 33.0,
    "totalOI": 16322,
    "totalOIChange": -9071,
    "pcRatio": 0.49,
    "settle": 23087,
    "settleChange": 13,
    "callWalls": [
      {
        "strike": 24400,
        "oi": 869,
        "oiChange": 0
      },
      {
        "strike": 24600,
        "oi": 658,
        "oiChange": 0
      },
      {
        "strike": 23800,
        "oi": 640,
        "oiChange": -3
      },
      {
        "strike": 26000,
        "oi": 589,
        "oiChange": 0
      },
      {
        "strike": 25600,
        "oi": 580,
        "oiChange": 0
      }
    ],
    "putWalls": [
      {
        "strike": 22800,
        "oi": 1032,
        "oiChange": 37
      },
      {
        "strike": 23000,
        "oi": 1013,
        "oiChange": 90
      },
      {
        "strike": 22600,
        "oi": 532,
        "oiChange": -4
      },
      {
        "strike": 22200,
        "oi": 303,
        "oiChange": -4
      },
      {
        "strike": 22400,
        "oi": 271,
        "oiChange": 1
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
    "note": "最新街貨欄 2026-10-27，預期 2026-10-29"
  },
  "stocks": {
    "ok": true,
    "stale": false,
    "date": "2026-10-29",
    "sourceUrl": "https://www.hkex.com.hk/eng/stat/dmstat/dayrpt/dqe261029.htm",
    "status": null,
    "items": [
      {
        "hkats": "TCH",
        "code": "00700",
        "name": "騰訊 Tencent",
        "close": 377.6,
        "volume": 183313,
        "callOI": 1262773,
        "putOI": 944452,
        "callWall": 460.0,
        "putWall": 360.0,
        "reason": "收市 377.6 · 認購牆 460.0 OI 15517 · 距認購牆 82.4 · 認沽牆 360.0 OI 12026 · 距認沽牆 17.6 · 成交 183313"
      },
      {
        "hkats": "ALB",
        "code": "09988",
        "name": "阿里巴巴 Alibaba",
        "close": 96.1,
        "volume": 101571,
        "callOI": 1040323,
        "putOI": 983410,
        "callWall": 125.0,
        "putWall": 90.0,
        "reason": "收市 96.1 · 認購牆 125.0 OI 21384 · 距認購牆 28.9 · 認沽牆 90.0 OI 10774 · 距認沽牆 6.1 · 成交 101571"
      },
      {
        "hkats": "MIU",
        "code": "01810",
        "name": "小米 Xiaomi",
        "close": 25.68,
        "volume": 23809,
        "callOI": 586496,
        "putOI": 529977,
        "callWall": 27.0,
        "putWall": 23.0,
        "reason": "收市 25.68 · 認購牆 27.0 OI 8663 · 距認購牆 1.32 · 認沽牆 23.0 OI 9012 · 距認沽牆 2.68 · 成交 23809"
      },
      {
        "hkats": "MET",
        "code": "03690",
        "name": "美團 Meituan",
        "close": 69.2,
        "volume": 25623,
        "callOI": 447271,
        "putOI": 466204,
        "callWall": 72.5,
        "putWall": 65.0,
        "reason": "收市 69.2 · 認購牆 72.5 OI 6830 · 距認購牆 3.3 · 認沽牆 65.0 OI 4919 · 距認沽牆 4.2 · 成交 25623"
      },
      {
        "hkats": "HEX",
        "code": "00388",
        "name": "港交所 HKEX",
        "close": 363.8,
        "volume": 7316,
        "callOI": 189172,
        "putOI": 158849,
        "callWall": 400.0,
        "putWall": 360.0,
        "reason": "收市 363.8 · 認購牆 400.0 OI 5812 · 距認購牆 36.2 · 認沽牆 360.0 OI 2499 · 距認沽牆 3.8 · 成交 7316"
      },
      {
        "hkats": "KST",
        "code": "01024",
        "name": "快手 Kuaishou",
        "close": 26.22,
        "volume": 11978,
        "callOI": 293609,
        "putOI": 201017,
        "callWall": 38.0,
        "putWall": 26.0,
        "reason": "收市 26.22 · 認購牆 38.0 OI 6424 · 距認購牆 11.78 · 認沽牆 26.0 OI 2927 · 距認沽牆 0.22 · 成交 11978"
      }
    ]
  },
  "calendar": {
    "ok": true,
    "asOf": "2026-10-30 10:34",
    "source": "https://www.forexfactory.com/calendar",
    "items": [
      {
        "date": "2026-10-30",
        "time": "07:30",
        "ccy": "JPY",
        "impact": "med",
        "name": "Tokyo Core CPI y/y",
        "actual": "",
        "forecast": "2.6%",
        "previous": "2.7%"
      },
      {
        "date": "2026-10-30",
        "time": "10:30",
        "ccy": "JPY",
        "impact": "high",
        "name": "BOJ Policy Rate",
        "actual": "",
        "forecast": "<1.25%",
        "previous": "<1.25%"
      },
      {
        "date": "2026-10-30",
        "time": "10:30",
        "ccy": "JPY",
        "impact": "high",
        "name": "Monetary Policy Statement",
        "actual": "",
        "forecast": "—",
        "previous": "—"
      },
      {
        "date": "2026-10-30",
        "time": "10:31",
        "ccy": "JPY",
        "impact": "high",
        "name": "BOJ Outlook Report",
        "actual": "",
        "forecast": "—",
        "previous": "—"
      },
      {
        "date": "2026-10-30",
        "time": "13:30",
        "ccy": "JPY",
        "impact": "high",
        "name": "BOJ Press Conference",
        "actual": "",
        "forecast": "—",
        "previous": "—"
      },
      {
        "date": "2026-10-30",
        "time": "20:30",
        "ccy": "USD",
        "impact": "med",
        "name": "Employment Cost Index q/q",
        "actual": "",
        "forecast": "0.8%",
        "previous": "0.9%"
      }
    ],
    "status": null
  },
  "implications": [
    "牆、街貨與隔夜僅作地圖與濾鏡，不構成方向或進場訊號。",
    "隔夜標普波幅不大，不把隔夜當今日方向。",
    "恒指即月認購牆 23200 接近結算 23087，先當阻力地圖。",
    "恒指即月認沽牆 23000 接近結算 23087，先當支持地圖。",
    "小恒牆位已核實，與恒指一併讀，不因單一牆位預測開市方向。"
  ],
  "missing": [
    "牛熊街貨：未能核實／未更新（最新街貨欄 2026-10-27，預期 2026-10-29）"
  ]
};
