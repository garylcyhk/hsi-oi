/* Exodus morning brief — generated, do not edit by hand.
   Builder: scripts/update_morning_brief.py
   Schedule: weekday 09:00 Asia/Hong_Kong (cron 0 1 * * 1-5).
   Missing feeds stay empty with 未能核實／未更新. Never invents walls or prices.
*/
window.MORNING_BRIEF = {
  "asOf": "2026-10-27 14:07",
  "sessionDate": "2026-10-27",
  "usSessionDate": "2026-10-26",
  "expectedOiDate": "2026-10-26",
  "tz": "HKT",
  "title": "香港早晨 · 美股收市／小恒早盤",
  "disclaimer": "研究用，非買賣建議。牆與街貨為對沖地圖，不構成投資建議。",
  "pipeline": "GitHub Action 平日 09:00 HKT（cron 0 1 * * 1-5）由 scripts/update_morning_brief.py 寫入 morning-brief/data.js。",
  "closed": false,
  "oneLiner": "標普 +0.7% · VIX 18.39 · 恒指認購牆 26000 · 認沽牆 18200 · 小恒認購牆 24400 · 街貨現價 23212 · 近收回 牛4784/熊2385",
  "us": {
    "ok": true,
    "stale": false,
    "asOf": "2026-10-26",
    "source": "https://query1.finance.yahoo.com/v8/finance/chart",
    "sourceNote": "Yahoo Finance 日線收市（美東日期）",
    "items": [
      {
        "symbol": "^GSPC",
        "name": "標普 S&P 500",
        "ok": true,
        "stale": false,
        "last": 7676.77,
        "prev": 7623.6802,
        "chg": 53.0898,
        "pct": 0.7,
        "date": "2026-10-26",
        "kind": "%"
      },
      {
        "symbol": "^DJI",
        "name": "道指 Dow",
        "ok": true,
        "stale": false,
        "last": 52361.5781,
        "prev": 52215.1602,
        "chg": 146.418,
        "pct": 0.28,
        "date": "2026-10-26",
        "kind": "%"
      },
      {
        "symbol": "^IXIC",
        "name": "納指 Nasdaq",
        "ok": true,
        "stale": false,
        "last": 26169.3809,
        "prev": 25955.3398,
        "chg": 214.041,
        "pct": 0.82,
        "date": "2026-10-26",
        "kind": "%"
      },
      {
        "symbol": "^VIX",
        "name": "VIX",
        "ok": true,
        "stale": false,
        "last": 18.39,
        "prev": 19.45,
        "chg": -1.06,
        "pct": -5.45,
        "date": "2026-10-26",
        "kind": "pt"
      },
      {
        "symbol": "CL=F",
        "name": "WTI 原油",
        "ok": true,
        "stale": false,
        "last": 100.91,
        "prev": 101.76,
        "chg": -0.85,
        "pct": -0.84,
        "date": "2026-10-27",
        "kind": "%"
      },
      {
        "symbol": "^TNX",
        "name": "美10年期債 Yahoo ^TNX",
        "ok": true,
        "stale": false,
        "last": 4.986,
        "prev": 4.988,
        "chg": -0.002,
        "pct": -0.04,
        "date": "2026-10-26",
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
    "date": "2026-10-26",
    "sourceUrl": "https://www.hkex.com.hk/chi/stat/dmstat/dayrpt/hsioc261026.htm",
    "frontMonth": "2026-10",
    "nextMonth": "2026-11",
    "callOI": 19870,
    "putOI": 27614,
    "callOIChange": -16,
    "putOIChange": 2146,
    "callPct": 41.8,
    "putPct": 58.2,
    "totalOI": 47484,
    "totalOIChange": 2130,
    "pcRatio": 1.39,
    "settle": 23236,
    "settleChange": 130,
    "callWalls": [
      {
        "strike": 26000,
        "oi": 1692,
        "oiChange": 0
      },
      {
        "strike": 23600,
        "oi": 1531,
        "oiChange": 100
      },
      {
        "strike": 24400,
        "oi": 1153,
        "oiChange": 11
      },
      {
        "strike": 24600,
        "oi": 1064,
        "oiChange": -4
      },
      {
        "strike": 24200,
        "oi": 1043,
        "oiChange": -4
      }
    ],
    "putWalls": [
      {
        "strike": 18200,
        "oi": 2216,
        "oiChange": 4
      },
      {
        "strike": 22400,
        "oi": 2090,
        "oiChange": -35
      },
      {
        "strike": 19000,
        "oi": 2006,
        "oiChange": 1860
      },
      {
        "strike": 21200,
        "oi": 1328,
        "oiChange": 23
      },
      {
        "strike": 22600,
        "oi": 1191,
        "oiChange": -6
      }
    ]
  },
  "mini": {
    "ok": true,
    "stale": false,
    "status": null,
    "label": "小型恒指 Mini-HSI",
    "date": "2026-10-26",
    "sourceUrl": "https://www.hkex.com.hk/chi/stat/dmstat/dayrpt/mhioc261026.htm",
    "frontMonth": "2026-10",
    "nextMonth": "2026-11",
    "callOI": 12129,
    "putOI": 13232,
    "callOIChange": 404,
    "putOIChange": -116,
    "callPct": 47.8,
    "putPct": 52.2,
    "totalOI": 25361,
    "totalOIChange": 288,
    "pcRatio": 1.09,
    "settle": 23236,
    "settleChange": 130,
    "callWalls": [
      {
        "strike": 24400,
        "oi": 869,
        "oiChange": -9
      },
      {
        "strike": 24600,
        "oi": 659,
        "oiChange": -4
      },
      {
        "strike": 23200,
        "oi": 605,
        "oiChange": 181
      },
      {
        "strike": 23800,
        "oi": 602,
        "oiChange": 65
      },
      {
        "strike": 26000,
        "oi": 589,
        "oiChange": 0
      }
    ],
    "putWalls": [
      {
        "strike": 22800,
        "oi": 823,
        "oiChange": 16
      },
      {
        "strike": 23200,
        "oi": 813,
        "oiChange": -8
      },
      {
        "strike": 24600,
        "oi": 812,
        "oiChange": -4
      },
      {
        "strike": 23000,
        "oi": 804,
        "oiChange": -150
      },
      {
        "strike": 23400,
        "oi": 749,
        "oiChange": 13
      }
    ]
  },
  "cbbc": {
    "ok": true,
    "stale": false,
    "status": null,
    "asOf": "2026-10-26",
    "published": "2026-10-27 08:05",
    "spot": 23212,
    "prevClose": 23093,
    "bullFut": 7035,
    "bearFut": 8244,
    "bullPct": 46.0,
    "bearPct": 54.0,
    "ratio": 0.85,
    "nearKoPts": 1000,
    "nearKoBull": 4784,
    "nearKoBear": 2385,
    "flow1d": {
      "bullM": null,
      "bearM": null,
      "bullFut": -470,
      "bearFut": 915
    },
    "calledNote": "自動更新自高盛 · 圖表 2026-10-27 08:05 · 街貨欄 10-26",
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
        "lo": 23800,
        "hi": 23999,
        "call": 23800,
        "fut": 808,
        "chg": 208
      },
      {
        "lo": 24000,
        "hi": 24199,
        "call": 24000,
        "fut": 803,
        "chg": 82
      },
      {
        "lo": 23600,
        "hi": 23799,
        "call": 23600,
        "fut": 567,
        "chg": 567
      },
      {
        "lo": 24200,
        "hi": 24399,
        "call": 24200,
        "fut": 505,
        "chg": 81
      }
    ],
    "nearBull": [
      {
        "lo": 22500,
        "hi": 22699,
        "call": 22500,
        "fut": 2026,
        "chg": -194
      },
      {
        "lo": 22300,
        "hi": 22499,
        "call": 22300,
        "fut": 1411,
        "chg": -108
      },
      {
        "lo": 22700,
        "hi": 22899,
        "call": 22700,
        "fut": 1262,
        "chg": -40
      },
      {
        "lo": 22100,
        "hi": 22299,
        "call": 22100,
        "fut": 475,
        "chg": -43
      }
    ],
    "note": "僅作對沖地圖，並非買賣牛熊證。"
  },
  "stocks": {
    "ok": true,
    "stale": false,
    "date": "2026-10-26",
    "sourceUrl": "https://www.hkex.com.hk/eng/stat/dmstat/dayrpt/dqe261026.htm",
    "status": null,
    "items": [
      {
        "hkats": "TCH",
        "code": "00700",
        "name": "騰訊 Tencent",
        "close": 386.4,
        "volume": 112654,
        "callOI": 1173258,
        "putOI": 1024605,
        "callWall": 460.0,
        "putWall": 420.0,
        "reason": "收市 386.4 · 認購牆 460.0 OI 15527 · 距認購牆 73.6 · 認沽牆 420.0 OI 37964 · 距認沽牆 -33.6 · 成交 112654"
      },
      {
        "hkats": "ALB",
        "code": "09988",
        "name": "阿里巴巴 Alibaba",
        "close": 97.95,
        "volume": 60919,
        "callOI": 1002038,
        "putOI": 1018683,
        "callWall": 125.0,
        "putWall": 100.0,
        "reason": "收市 97.95 · 認購牆 125.0 OI 21407 · 距認購牆 27.05 · 認沽牆 100.0 OI 17457 · 距認沽牆 -2.05 · 成交 60919"
      },
      {
        "hkats": "MIU",
        "code": "01810",
        "name": "小米 Xiaomi",
        "close": 26.9,
        "volume": 51034,
        "callOI": 554976,
        "putOI": 514562,
        "callWall": 27.0,
        "putWall": 23.0,
        "reason": "收市 26.9 · 認購牆 27.0 OI 8307 · 距認購牆 0.1 · 認沽牆 23.0 OI 9017 · 距認沽牆 3.9 · 成交 51034"
      },
      {
        "hkats": "MET",
        "code": "03690",
        "name": "美團 Meituan",
        "close": 74.05,
        "volume": 61573,
        "callOI": 410673,
        "putOI": 467502,
        "callWall": 75.0,
        "putWall": 70.0,
        "reason": "收市 74.05 · 認購牆 75.0 OI 6912 · 距認購牆 0.95 · 認沽牆 70.0 OI 8311 · 距認沽牆 4.05 · 成交 61573"
      },
      {
        "hkats": "HEX",
        "code": "00388",
        "name": "港交所 HKEX",
        "close": 372.4,
        "volume": 10967,
        "callOI": 185335,
        "putOI": 170634,
        "callWall": 400.0,
        "putWall": 380.0,
        "reason": "收市 372.4 · 認購牆 400.0 OI 5824 · 距認購牆 27.6 · 認沽牆 380.0 OI 5592 · 距認沽牆 -7.6 · 成交 10967"
      },
      {
        "hkats": "KST",
        "code": "01024",
        "name": "快手 Kuaishou",
        "close": 27.6,
        "volume": 17317,
        "callOI": 276442,
        "putOI": 234018,
        "callWall": 38.0,
        "putWall": 30.0,
        "reason": "收市 27.6 · 認購牆 38.0 OI 6424 · 距認購牆 10.4 · 認沽牆 30.0 OI 6398 · 距認沽牆 -2.4 · 成交 17317"
      }
    ]
  },
  "calendar": {
    "ok": true,
    "asOf": "2026-10-27 10:03",
    "source": "https://www.forexfactory.com/calendar",
    "items": [
      {
        "date": "2026-10-27",
        "time": "22:00",
        "ccy": "USD",
        "impact": "med",
        "name": "CB Consumer Confidence",
        "actual": "",
        "forecast": "81.2",
        "previous": "81.9"
      }
    ],
    "status": null
  },
  "implications": [
    "牆、街貨與隔夜僅作地圖與濾鏡，不構成方向或進場訊號。",
    "隔夜標普波幅不大，不把隔夜當今日方向。",
    "小恒牆位已核實，與恒指一併讀，不因單一牆位預測開市方向。",
    "現價之下近收回牛證較重，屬對沖流動性地圖；屠牛進行中不要 fade。"
  ],
  "missing": []
};
