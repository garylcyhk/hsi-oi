/* Exodus morning brief — generated, do not edit by hand.
   Builder: scripts/update_morning_brief.py
   Schedule: weekday 09:00 Asia/Hong_Kong (cron 0 1 * * 1-5).
   Missing feeds stay empty with 未能核實／未更新. Never invents walls or prices.
*/
window.MORNING_BRIEF = {
  "asOf": "2026-11-27 17:34",
  "sessionDate": "2026-11-27",
  "usSessionDate": "2026-11-25",
  "expectedOiDate": "2026-11-26",
  "tz": "HKT",
  "title": "香港早晨 · 美股收市／小恒早盤",
  "disclaimer": "研究用，非買賣建議。牆與街貨為對沖地圖，不構成投資建議。",
  "pipeline": "GitHub Action 平日 09:00 HKT（cron 0 1 * * 1-5）由 scripts/update_morning_brief.py 寫入 morning-brief/data.js。",
  "closed": false,
  "oneLiner": "恒指認購牆 22600 · 認沽牆 21200 · 小恒認購牆 24400",
  "us": {
    "ok": false,
    "stale": true,
    "asOf": "2026-11-25",
    "source": "https://query1.finance.yahoo.com/v8/finance/chart",
    "sourceNote": "Yahoo Finance 日線收市（美東日期）",
    "items": [
      {
        "symbol": "^GSPC",
        "name": "標普 S&P 500",
        "ok": true,
        "stale": true,
        "last": 7182.7798,
        "prev": 7201.0898,
        "chg": -18.3101,
        "pct": -0.25,
        "date": "2026-11-25",
        "kind": "%"
      },
      {
        "symbol": "^DJI",
        "name": "道指 Dow",
        "ok": true,
        "stale": true,
        "last": 50182.9492,
        "prev": 50018.6992,
        "chg": 164.25,
        "pct": 0.33,
        "date": "2026-11-25",
        "kind": "%"
      },
      {
        "symbol": "^IXIC",
        "name": "納指 Nasdaq",
        "ok": true,
        "stale": true,
        "last": 23585.8008,
        "prev": 23733.5391,
        "chg": -147.7383,
        "pct": -0.62,
        "date": "2026-11-25",
        "kind": "%"
      },
      {
        "symbol": "^VIX",
        "name": "VIX",
        "ok": true,
        "stale": false,
        "last": 24.64,
        "prev": 26.8,
        "chg": -2.16,
        "pct": -8.06,
        "date": "2026-11-27",
        "kind": "pt"
      },
      {
        "symbol": "CL=F",
        "name": "WTI 原油",
        "ok": true,
        "stale": false,
        "last": 85.71,
        "prev": 83.68,
        "chg": 2.03,
        "pct": 2.43,
        "date": "2026-11-27",
        "kind": "%"
      },
      {
        "symbol": "^TNX",
        "name": "美10年期債 Yahoo ^TNX",
        "ok": true,
        "stale": true,
        "last": 4.848,
        "prev": 4.904,
        "chg": -0.056,
        "pct": -1.14,
        "date": "2026-11-25",
        "kind": "raw"
      }
    ],
    "status": "未能核實／未更新"
  },
  "hsi": {
    "ok": true,
    "stale": false,
    "status": null,
    "label": "恒指期權 HSI",
    "date": "2026-11-26",
    "sourceUrl": "https://www.hkex.com.hk/chi/stat/dmstat/dayrpt/hsioc261126.htm",
    "frontMonth": "2026-11",
    "nextMonth": "2026-12",
    "callOI": 30562,
    "putOI": 32982,
    "callOIChange": 946,
    "putOIChange": -206,
    "callPct": 48.1,
    "putPct": 51.9,
    "totalOI": 63544,
    "totalOIChange": 740,
    "pcRatio": 1.08,
    "settle": 22201,
    "settleChange": 262,
    "callWalls": [
      {
        "strike": 22600,
        "oi": 4021,
        "oiChange": 315
      },
      {
        "strike": 23400,
        "oi": 3004,
        "oiChange": -1
      },
      {
        "strike": 23600,
        "oi": 2345,
        "oiChange": -15
      },
      {
        "strike": 23200,
        "oi": 1737,
        "oiChange": -48
      },
      {
        "strike": 22400,
        "oi": 1646,
        "oiChange": 743
      }
    ],
    "putWalls": [
      {
        "strike": 21200,
        "oi": 2418,
        "oiChange": 98
      },
      {
        "strike": 21400,
        "oi": 2403,
        "oiChange": -63
      },
      {
        "strike": 21600,
        "oi": 1694,
        "oiChange": -40
      },
      {
        "strike": 22400,
        "oi": 1270,
        "oiChange": 183
      },
      {
        "strike": 22000,
        "oi": 1170,
        "oiChange": -663
      }
    ]
  },
  "mini": {
    "ok": true,
    "stale": false,
    "status": null,
    "label": "小型恒指 Mini-HSI",
    "date": "2026-11-26",
    "sourceUrl": "https://www.hkex.com.hk/chi/stat/dmstat/dayrpt/mhioc261126.htm",
    "frontMonth": "2026-11",
    "nextMonth": "2026-12",
    "callOI": 14674,
    "putOI": 12188,
    "callOIChange": 141,
    "putOIChange": -248,
    "callPct": 54.6,
    "putPct": 45.4,
    "totalOI": 26862,
    "totalOIChange": -107,
    "pcRatio": 0.83,
    "settle": 22201,
    "settleChange": 262,
    "callWalls": [
      {
        "strike": 24400,
        "oi": 1239,
        "oiChange": 0
      },
      {
        "strike": 25000,
        "oi": 1046,
        "oiChange": -13
      },
      {
        "strike": 24000,
        "oi": 847,
        "oiChange": -2
      },
      {
        "strike": 24600,
        "oi": 836,
        "oiChange": -3
      },
      {
        "strike": 22400,
        "oi": 826,
        "oiChange": 265
      }
    ],
    "putWalls": [
      {
        "strike": 21600,
        "oi": 894,
        "oiChange": -23
      },
      {
        "strike": 23400,
        "oi": 777,
        "oiChange": -5
      },
      {
        "strike": 21400,
        "oi": 701,
        "oiChange": 10
      },
      {
        "strike": 23800,
        "oi": 644,
        "oiChange": -7
      },
      {
        "strike": 22200,
        "oi": 592,
        "oiChange": -138
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
    "note": "最新街貨欄 2026-10-27，預期 2026-11-26"
  },
  "stocks": {
    "ok": true,
    "stale": false,
    "date": "2026-11-26",
    "sourceUrl": "https://www.hkex.com.hk/eng/stat/dmstat/dayrpt/dqe261126.htm",
    "status": null,
    "items": [
      {
        "hkats": "TCH",
        "code": "00700",
        "name": "騰訊 Tencent",
        "close": 341.0,
        "volume": 101362,
        "callOI": 1435330,
        "putOI": 977368,
        "callWall": 430.0,
        "putWall": 340.0,
        "reason": "收市 341.0 · 認購牆 430.0 OI 15407 · 距認購牆 89.0 · 認沽牆 340.0 OI 10845 · 距認沽牆 1.0 · 成交 101362"
      },
      {
        "hkats": "ALB",
        "code": "09988",
        "name": "阿里巴巴 Alibaba",
        "close": 82.5,
        "volume": 76373,
        "callOI": 1115553,
        "putOI": 1021685,
        "callWall": 110.0,
        "putWall": 90.0,
        "reason": "收市 82.5 · 認購牆 110.0 OI 18337 · 距認購牆 27.5 · 認沽牆 90.0 OI 13309 · 距認沽牆 -7.5 · 成交 76373"
      },
      {
        "hkats": "MIU",
        "code": "01810",
        "name": "小米 Xiaomi",
        "close": 26.6,
        "volume": 48013,
        "callOI": 661916,
        "putOI": 598463,
        "callWall": 30.0,
        "putWall": 25.0,
        "reason": "收市 26.6 · 認購牆 30.0 OI 15754 · 距認購牆 3.4 · 認沽牆 25.0 OI 17132 · 距認沽牆 1.6 · 成交 48013"
      },
      {
        "hkats": "MET",
        "code": "03690",
        "name": "美團 Meituan",
        "close": 62.7,
        "volume": 57518,
        "callOI": 514844,
        "putOI": 514783,
        "callWall": 80.0,
        "putWall": 70.0,
        "reason": "收市 62.7 · 認購牆 80.0 OI 7536 · 距認購牆 17.3 · 認沽牆 70.0 OI 8233 · 距認沽牆 -7.3 · 成交 57518"
      },
      {
        "hkats": "HEX",
        "code": "00388",
        "name": "港交所 HKEX",
        "close": 351.4,
        "volume": 19620,
        "callOI": 229609,
        "putOI": 179498,
        "callWall": 430.0,
        "putWall": 380.0,
        "reason": "收市 351.4 · 認購牆 430.0 OI 5152 · 距認購牆 78.6 · 認沽牆 380.0 OI 6218 · 距認沽牆 -28.6 · 成交 19620"
      },
      {
        "hkats": "KST",
        "code": "01024",
        "name": "快手 Kuaishou",
        "close": 19.62,
        "volume": 36861,
        "callOI": 334970,
        "putOI": 213277,
        "callWall": 30.0,
        "putWall": 24.0,
        "reason": "收市 19.62 · 認購牆 30.0 OI 8588 · 距認購牆 10.38 · 認沽牆 24.0 OI 1692 · 距認沽牆 -4.38 · 成交 36861"
      }
    ]
  },
  "calendar": {
    "ok": true,
    "asOf": "2026-11-27 13:01",
    "source": "https://www.forexfactory.com/calendar",
    "items": [
      {
        "date": "2026-11-27",
        "time": "07:30",
        "ccy": "JPY",
        "impact": "med",
        "name": "Tokyo Core CPI y/y",
        "actual": "",
        "forecast": "3.0%",
        "previous": "2.6%"
      }
    ],
    "status": null
  },
  "implications": [
    "牆、街貨與隔夜僅作地圖與濾鏡，不構成方向或進場訊號。",
    "恒指即月認購牆 22400 接近結算 22201，先當阻力地圖。",
    "恒指即月認沽牆 22000 接近結算 22201，先當支持地圖。",
    "小恒牆位已核實，與恒指一併讀，不因單一牆位預測開市方向。"
  ],
  "missing": [
    "美股隔夜：未能核實／未更新",
    "牛熊街貨：未能核實／未更新（最新街貨欄 2026-10-27，預期 2026-11-26）"
  ]
};
