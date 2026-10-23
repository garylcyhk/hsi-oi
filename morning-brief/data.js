/* Exodus morning brief — generated, do not edit by hand.
   Builder: scripts/update_morning_brief.py
   Schedule: weekday 09:00 Asia/Hong_Kong (cron 0 1 * * 1-5).
   Missing feeds stay empty with 未能核實／未更新. Never invents walls or prices.
*/
window.MORNING_BRIEF = {
  "asOf": "2026-10-23 13:53",
  "sessionDate": "2026-10-23",
  "usSessionDate": "2026-10-22",
  "expectedOiDate": "2026-10-22",
  "tz": "HKT",
  "title": "香港早晨 · 美股收市／小恒早盤",
  "disclaimer": "研究用，非買賣建議。牆與街貨為對沖地圖，不構成投資建議。",
  "pipeline": "GitHub Action 平日 09:00 HKT（cron 0 1 * * 1-5）由 scripts/update_morning_brief.py 寫入 morning-brief/data.js。",
  "closed": false,
  "oneLiner": "標普 -1.21% · VIX 19.03 · 恒指認購牆 26000 · 認沽牆 22600 · 街貨現價 22935 · 近收回 牛7175/熊0",
  "us": {
    "ok": true,
    "stale": false,
    "asOf": "2026-10-22",
    "source": "https://query1.finance.yahoo.com/v8/finance/chart",
    "sourceNote": "Yahoo Finance 日線收市（美東日期）",
    "items": [
      {
        "symbol": "^GSPC",
        "name": "標普 S&P 500",
        "ok": true,
        "stale": false,
        "last": 7663.4302,
        "prev": 7757.1699,
        "chg": -93.7397,
        "pct": -1.21,
        "date": "2026-10-22",
        "kind": "%"
      },
      {
        "symbol": "^DJI",
        "name": "道指 Dow",
        "ok": true,
        "stale": false,
        "last": 52867.9805,
        "prev": 52856.0898,
        "chg": 11.8906,
        "pct": 0.02,
        "date": "2026-10-22",
        "kind": "%"
      },
      {
        "symbol": "^IXIC",
        "name": "納指 Nasdaq",
        "ok": true,
        "stale": false,
        "last": 26008.8594,
        "prev": 26702.8594,
        "chg": -694.0,
        "pct": -2.6,
        "date": "2026-10-22",
        "kind": "%"
      },
      {
        "symbol": "^VIX",
        "name": "VIX",
        "ok": true,
        "stale": false,
        "last": 19.03,
        "prev": 16.68,
        "chg": 2.35,
        "pct": 14.09,
        "date": "2026-10-22",
        "kind": "pt"
      },
      {
        "symbol": "CL=F",
        "name": "WTI 原油",
        "ok": true,
        "stale": false,
        "last": 100.26,
        "prev": 99.47,
        "chg": 0.79,
        "pct": 0.79,
        "date": "2026-10-23",
        "kind": "%"
      },
      {
        "symbol": "^TNX",
        "name": "美10年期債 Yahoo ^TNX",
        "ok": true,
        "stale": false,
        "last": 4.953,
        "prev": 5.146,
        "chg": -0.193,
        "pct": -3.75,
        "date": "2026-10-22",
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
    "date": "2026-10-22",
    "sourceUrl": "https://www.hkex.com.hk/chi/stat/dmstat/dayrpt/hsioc261022.htm",
    "frontMonth": "2026-10",
    "nextMonth": "2026-11",
    "callOI": 18043,
    "putOI": 21727,
    "callOIChange": 1418,
    "putOIChange": 730,
    "callPct": 45.4,
    "putPct": 54.6,
    "totalOI": 39770,
    "totalOIChange": 2148,
    "pcRatio": 1.2,
    "settle": 22954,
    "settleChange": -701,
    "callWalls": [
      {
        "strike": 26000,
        "oi": 1692,
        "oiChange": -25
      },
      {
        "strike": 24400,
        "oi": 1285,
        "oiChange": -283
      },
      {
        "strike": 24600,
        "oi": 1057,
        "oiChange": -67
      },
      {
        "strike": 23600,
        "oi": 990,
        "oiChange": 542
      },
      {
        "strike": 25000,
        "oi": 824,
        "oiChange": -17
      }
    ],
    "putWalls": [
      {
        "strike": 22600,
        "oi": 1330,
        "oiChange": 450
      },
      {
        "strike": 22800,
        "oi": 1204,
        "oiChange": 584
      },
      {
        "strike": 22400,
        "oi": 1145,
        "oiChange": 288
      },
      {
        "strike": 20200,
        "oi": 1122,
        "oiChange": -6
      },
      {
        "strike": 21600,
        "oi": 1020,
        "oiChange": 538
      }
    ]
  },
  "mini": {
    "ok": false,
    "stale": true,
    "date": "2026-10-21",
    "label": "小型恒指 Mini-HSI",
    "status": "未能核實／未更新",
    "sourceUrl": "https://www.hkex.com.hk/chi/stat/dmstat/dayrpt/mhioc261021.htm",
    "note": "最新檔為 2026-10-21，預期 2026-10-22"
  },
  "cbbc": {
    "ok": true,
    "stale": false,
    "status": null,
    "asOf": "2026-10-22",
    "published": "2026-10-23 08:05",
    "spot": 22935,
    "prevClose": 23652,
    "bullFut": 8679,
    "bearFut": 6188,
    "bullPct": 58.4,
    "bearPct": 41.6,
    "ratio": 1.4,
    "nearKoPts": 1000,
    "nearKoBull": 7175,
    "nearKoBear": 0,
    "flow1d": {
      "bullM": null,
      "bearM": null,
      "bullFut": 642,
      "bearFut": -2583
    },
    "calledNote": "自動更新自高盛 · 圖表 2026-10-23 08:05 · 街貨欄 10-22",
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
    "nearBear": [],
    "nearBull": [
      {
        "lo": 22700,
        "hi": 22899,
        "call": 22700,
        "fut": 2413,
        "chg": 2176
      },
      {
        "lo": 22500,
        "hi": 22699,
        "call": 22500,
        "fut": 2127,
        "chg": 1516
      },
      {
        "lo": 22300,
        "hi": 22499,
        "call": 22300,
        "fut": 1566,
        "chg": 1011
      },
      {
        "lo": 21900,
        "hi": 22099,
        "call": 21900,
        "fut": 618,
        "chg": 326
      }
    ],
    "note": "僅作對沖地圖，並非買賣牛熊證。"
  },
  "stocks": {
    "ok": true,
    "stale": false,
    "date": "2026-10-22",
    "sourceUrl": "https://www.hkex.com.hk/eng/stat/dmstat/dayrpt/dqe261022.htm",
    "status": null,
    "items": [
      {
        "hkats": "TCH",
        "code": "00700",
        "name": "騰訊 Tencent",
        "close": 382.4,
        "volume": 286063,
        "callOI": 1131953,
        "putOI": 1008604,
        "callWall": 435.0,
        "putWall": 400.0,
        "reason": "收市 382.4 · 認購牆 435.0 OI 3439 · 距認購牆 52.6 · 認沽牆 400.0 OI 2152 · 距認沽牆 -17.6 · 成交 286063"
      },
      {
        "hkats": "ALB",
        "code": "09988",
        "name": "阿里巴巴 Alibaba",
        "close": 97.35,
        "volume": 184386,
        "callOI": 983585,
        "putOI": 1003805,
        "callWall": 107.0,
        "putWall": 105.0,
        "reason": "收市 97.35 · 認購牆 107.0 OI 1447 · 距認購牆 9.65 · 認沽牆 105.0 OI 1113 · 距認沽牆 -7.65 · 成交 184386"
      },
      {
        "hkats": "MIU",
        "code": "01810",
        "name": "小米 Xiaomi",
        "close": 25.8,
        "volume": 40023,
        "callOI": 547206,
        "putOI": 514385,
        "callWall": 28.0,
        "putWall": 25.5,
        "reason": "收市 25.8 · 認購牆 28.0 OI 1100 · 距認購牆 2.2 · 認沽牆 25.5 OI 1410 · 距認沽牆 0.3 · 成交 40023"
      },
      {
        "hkats": "MET",
        "code": "03690",
        "name": "美團 Meituan",
        "close": 71.3,
        "volume": 27175,
        "callOI": 409789,
        "putOI": 466970,
        "callWall": 80.0,
        "putWall": 73.0,
        "reason": "收市 71.3 · 認購牆 80.0 OI 1427 · 距認購牆 8.7 · 認沽牆 73.0 OI 1169 · 距認沽牆 -1.7 · 成交 27175"
      },
      {
        "hkats": "HEX",
        "code": "00388",
        "name": "港交所 HKEX",
        "close": 367.2,
        "volume": 27251,
        "callOI": 180937,
        "putOI": 171708,
        "callWall": 380.0,
        "putWall": 375.0,
        "reason": "收市 367.2 · 認購牆 380.0 OI 801 · 距認購牆 12.8 · 認沽牆 375.0 OI 750 · 距認沽牆 -7.8 · 成交 27251"
      },
      {
        "hkats": "KST",
        "code": "01024",
        "name": "快手 Kuaishou",
        "close": 26.78,
        "volume": 40574,
        "callOI": 272336,
        "putOI": 232657,
        "callWall": 27.5,
        "putWall": 28.5,
        "reason": "收市 26.78 · 認購牆 27.5 OI 1246 · 距認購牆 0.72 · 認沽牆 28.5 OI 830 · 距認沽牆 -1.72 · 成交 40574"
      }
    ]
  },
  "calendar": {
    "ok": true,
    "asOf": "2026-10-23 09:28",
    "source": "https://www.forexfactory.com/calendar",
    "items": [
      {
        "date": "2026-10-23",
        "time": "21:45",
        "ccy": "USD",
        "impact": "med",
        "name": "Flash Manufacturing PMI",
        "actual": "",
        "forecast": "55.4",
        "previous": "57.0"
      },
      {
        "date": "2026-10-23",
        "time": "21:45",
        "ccy": "USD",
        "impact": "med",
        "name": "Flash Services PMI",
        "actual": "",
        "forecast": "57.9",
        "previous": "58.7"
      },
      {
        "date": "2026-10-23",
        "time": "22:00",
        "ccy": "USD",
        "impact": "med",
        "name": "Revised UoM Consumer Sentiment",
        "actual": "",
        "forecast": "46.3",
        "previous": "46.3"
      },
      {
        "date": "2026-10-23",
        "time": "22:00",
        "ccy": "USD",
        "impact": "med",
        "name": "Revised UoM Inflation Expectations",
        "actual": "",
        "forecast": "—",
        "previous": "4.7%"
      }
    ],
    "status": null
  },
  "implications": [
    "牆、街貨與隔夜僅作地圖與濾鏡，不構成方向或進場訊號。",
    "隔夜標普下跌超過 0.8%，開市區間或較闊；無方向優勢。",
    "恒指即月認沽牆 22800 接近結算 22954，先當支持地圖。",
    "現價之下近收回牛證較重，屬對沖流動性地圖；屠牛進行中不要 fade。"
  ],
  "missing": [
    "小恒期權：未能核實／未更新（最新檔為 2026-10-21，預期 2026-10-22）"
  ]
};
