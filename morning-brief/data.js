/* Exodus morning brief — generated, do not edit by hand.
   Builder: scripts/update_morning_brief.py
   Schedule: weekday 09:00 Asia/Hong_Kong (cron 0 1 * * 1-5).
   Missing feeds stay empty with 未能核實／未更新. Never invents walls or prices.
*/
window.MORNING_BRIEF = {
  "asOf": "2026-10-28 14:45",
  "sessionDate": "2026-10-28",
  "usSessionDate": "2026-10-27",
  "expectedOiDate": "2026-10-27",
  "tz": "HKT",
  "title": "香港早晨 · 美股收市／小恒早盤",
  "disclaimer": "研究用，非買賣建議。牆與街貨為對沖地圖，不構成投資建議。",
  "pipeline": "GitHub Action 平日 09:00 HKT（cron 0 1 * * 1-5）由 scripts/update_morning_brief.py 寫入 morning-brief/data.js。",
  "closed": false,
  "oneLiner": "標普 +0.6% · VIX 17.52 · 恒指認購牆 26000 · 認沽牆 18200 · 小恒認購牆 24400 · 街貨現價 23041 · 近收回 牛5209/熊1949",
  "us": {
    "ok": true,
    "stale": false,
    "asOf": "2026-10-27",
    "source": "https://query1.finance.yahoo.com/v8/finance/chart",
    "sourceNote": "Yahoo Finance 日線收市（美東日期）",
    "items": [
      {
        "symbol": "^GSPC",
        "name": "標普 S&P 500",
        "ok": true,
        "stale": false,
        "last": 7722.6001,
        "prev": 7676.77,
        "chg": 45.8301,
        "pct": 0.6,
        "date": "2026-10-27",
        "kind": "%"
      },
      {
        "symbol": "^DJI",
        "name": "道指 Dow",
        "ok": true,
        "stale": false,
        "last": 52377.5703,
        "prev": 52361.5781,
        "chg": 15.9922,
        "pct": 0.03,
        "date": "2026-10-27",
        "kind": "%"
      },
      {
        "symbol": "^IXIC",
        "name": "納指 Nasdaq",
        "ok": true,
        "stale": false,
        "last": 26477.8105,
        "prev": 26169.3809,
        "chg": 308.4297,
        "pct": 1.18,
        "date": "2026-10-27",
        "kind": "%"
      },
      {
        "symbol": "^VIX",
        "name": "VIX",
        "ok": true,
        "stale": false,
        "last": 17.52,
        "prev": 18.39,
        "chg": -0.87,
        "pct": -4.73,
        "date": "2026-10-27",
        "kind": "pt"
      },
      {
        "symbol": "CL=F",
        "name": "WTI 原油",
        "ok": true,
        "stale": false,
        "last": 101.6,
        "prev": 99.9,
        "chg": 1.7,
        "pct": 1.7,
        "date": "2026-10-28",
        "kind": "%"
      },
      {
        "symbol": "^TNX",
        "name": "美10年期債 Yahoo ^TNX",
        "ok": true,
        "stale": false,
        "last": 4.993,
        "prev": 4.986,
        "chg": 0.007,
        "pct": 0.14,
        "date": "2026-10-27",
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
    "date": "2026-10-27",
    "sourceUrl": "https://www.hkex.com.hk/chi/stat/dmstat/dayrpt/hsioc261027.htm",
    "frontMonth": "2026-10",
    "nextMonth": "2026-11",
    "callOI": 20673,
    "putOI": 26871,
    "callOIChange": 803,
    "putOIChange": -743,
    "callPct": 43.5,
    "putPct": 56.5,
    "totalOI": 47544,
    "totalOIChange": 60,
    "pcRatio": 1.3,
    "settle": 23027,
    "settleChange": -209,
    "callWalls": [
      {
        "strike": 26000,
        "oi": 1692,
        "oiChange": 0
      },
      {
        "strike": 23600,
        "oi": 1372,
        "oiChange": -159
      },
      {
        "strike": 23400,
        "oi": 1260,
        "oiChange": 411
      },
      {
        "strike": 24400,
        "oi": 1161,
        "oiChange": 8
      },
      {
        "strike": 23200,
        "oi": 1093,
        "oiChange": 252
      }
    ],
    "putWalls": [
      {
        "strike": 18200,
        "oi": 2205,
        "oiChange": -11
      },
      {
        "strike": 19000,
        "oi": 2006,
        "oiChange": 0
      },
      {
        "strike": 22400,
        "oi": 1330,
        "oiChange": -760
      },
      {
        "strike": 22800,
        "oi": 1308,
        "oiChange": 198
      },
      {
        "strike": 22600,
        "oi": 1261,
        "oiChange": 70
      }
    ]
  },
  "mini": {
    "ok": true,
    "stale": false,
    "status": null,
    "label": "小型恒指 Mini-HSI",
    "date": "2026-10-27",
    "sourceUrl": "https://www.hkex.com.hk/chi/stat/dmstat/dayrpt/mhioc261027.htm",
    "frontMonth": "2026-10",
    "nextMonth": "2026-11",
    "callOI": 12383,
    "putOI": 13292,
    "callOIChange": 254,
    "putOIChange": 60,
    "callPct": 48.2,
    "putPct": 51.8,
    "totalOI": 25675,
    "totalOIChange": 314,
    "pcRatio": 1.07,
    "settle": 23027,
    "settleChange": -209,
    "callWalls": [
      {
        "strike": 24400,
        "oi": 869,
        "oiChange": 0
      },
      {
        "strike": 23200,
        "oi": 708,
        "oiChange": 103
      },
      {
        "strike": 24600,
        "oi": 658,
        "oiChange": -1
      },
      {
        "strike": 23800,
        "oi": 651,
        "oiChange": 49
      },
      {
        "strike": 23400,
        "oi": 624,
        "oiChange": 136
      }
    ],
    "putWalls": [
      {
        "strike": 22800,
        "oi": 987,
        "oiChange": 164
      },
      {
        "strike": 23000,
        "oi": 860,
        "oiChange": 56
      },
      {
        "strike": 23200,
        "oi": 810,
        "oiChange": -3
      },
      {
        "strike": 24600,
        "oi": 810,
        "oiChange": -2
      },
      {
        "strike": 23600,
        "oi": 792,
        "oiChange": 47
      }
    ]
  },
  "cbbc": {
    "ok": true,
    "stale": false,
    "status": null,
    "asOf": "2026-10-27",
    "published": "2026-10-28 08:05",
    "spot": 23041,
    "prevClose": 23212,
    "bullFut": 7102,
    "bearFut": 8337,
    "bullPct": 46.0,
    "bearPct": 54.0,
    "ratio": 0.85,
    "nearKoPts": 1000,
    "nearKoBull": 5209,
    "nearKoBear": 1949,
    "flow1d": {
      "bullM": null,
      "bearM": null,
      "bullFut": 67,
      "bearFut": 93
    },
    "calledNote": "自動更新自高盛 · 圖表 2026-10-28 08:05 · 街貨欄 10-27",
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
        "lo": 23500,
        "hi": 23699,
        "call": 23500,
        "fut": 745,
        "chg": 210
      },
      {
        "lo": 23900,
        "hi": 24099,
        "call": 23900,
        "fut": 714,
        "chg": -148
      },
      {
        "lo": 23700,
        "hi": 23899,
        "call": 23700,
        "fut": 635,
        "chg": -121
      },
      {
        "lo": 23300,
        "hi": 23499,
        "call": 23300,
        "fut": 326,
        "chg": 326
      }
    ],
    "nearBull": [
      {
        "lo": 22400,
        "hi": 22599,
        "call": 22400,
        "fut": 1867,
        "chg": 32
      },
      {
        "lo": 22600,
        "hi": 22799,
        "call": 22600,
        "fut": 1598,
        "chg": -217
      },
      {
        "lo": 22200,
        "hi": 22399,
        "call": 22200,
        "fut": 854,
        "chg": -11
      },
      {
        "lo": 22800,
        "hi": 22999,
        "call": 22800,
        "fut": 622,
        "chg": 177
      }
    ],
    "note": "僅作對沖地圖，並非買賣牛熊證。"
  },
  "stocks": {
    "ok": true,
    "stale": false,
    "date": "2026-10-27",
    "sourceUrl": "https://www.hkex.com.hk/eng/stat/dmstat/dayrpt/dqe261027.htm",
    "status": null,
    "items": [
      {
        "hkats": "TCH",
        "code": "00700",
        "name": "騰訊 Tencent",
        "close": 385.2,
        "volume": 95524,
        "callOI": 1194537,
        "putOI": 1009435,
        "callWall": 460.0,
        "putWall": 420.0,
        "reason": "收市 385.2 · 認購牆 460.0 OI 15519 · 距認購牆 74.8 · 認沽牆 420.0 OI 23731 · 距認沽牆 -34.8 · 成交 95524"
      },
      {
        "hkats": "ALB",
        "code": "09988",
        "name": "阿里巴巴 Alibaba",
        "close": 97.0,
        "volume": 109999,
        "callOI": 999583,
        "putOI": 1006269,
        "callWall": 125.0,
        "putWall": 100.0,
        "reason": "收市 97.0 · 認購牆 125.0 OI 21385 · 距認購牆 28.0 · 認沽牆 100.0 OI 17204 · 距認沽牆 -3.0 · 成交 109999"
      },
      {
        "hkats": "MIU",
        "code": "01810",
        "name": "小米 Xiaomi",
        "close": 25.66,
        "volume": 94225,
        "callOI": 588944,
        "putOI": 539548,
        "callWall": 27.0,
        "putWall": 23.0,
        "reason": "收市 25.66 · 認購牆 27.0 OI 8568 · 距認購牆 1.34 · 認沽牆 23.0 OI 9013 · 距認沽牆 2.66 · 成交 94225"
      },
      {
        "hkats": "MET",
        "code": "03690",
        "name": "美團 Meituan",
        "close": 71.85,
        "volume": 58599,
        "callOI": 434347,
        "putOI": 490798,
        "callWall": 75.0,
        "putWall": 70.0,
        "reason": "收市 71.85 · 認購牆 75.0 OI 6756 · 距認購牆 3.15 · 認沽牆 70.0 OI 8366 · 距認沽牆 1.85 · 成交 58599"
      },
      {
        "hkats": "HEX",
        "code": "00388",
        "name": "港交所 HKEX",
        "close": 367.6,
        "volume": 6945,
        "callOI": 186070,
        "putOI": 170734,
        "callWall": 400.0,
        "putWall": 380.0,
        "reason": "收市 367.6 · 認購牆 400.0 OI 5823 · 距認購牆 32.4 · 認沽牆 380.0 OI 5485 · 距認沽牆 -12.4 · 成交 6945"
      },
      {
        "hkats": "KST",
        "code": "01024",
        "name": "快手 Kuaishou",
        "close": 27.2,
        "volume": 7592,
        "callOI": 277991,
        "putOI": 233486,
        "callWall": 38.0,
        "putWall": 30.0,
        "reason": "收市 27.2 · 認購牆 38.0 OI 6424 · 距認購牆 10.8 · 認沽牆 30.0 OI 6389 · 距認沽牆 -2.8 · 成交 7592"
      }
    ]
  },
  "calendar": {
    "ok": true,
    "asOf": "2026-10-28 10:13",
    "source": "https://www.forexfactory.com/calendar",
    "items": [
      {
        "date": "2026-10-28",
        "time": "08:15",
        "ccy": "AUD",
        "impact": "med",
        "name": "RBA Gov Bullock Speaks",
        "actual": "",
        "forecast": "—",
        "previous": "—"
      },
      {
        "date": "2026-10-28",
        "time": "08:30",
        "ccy": "AUD",
        "impact": "high",
        "name": "CPI m/m",
        "actual": "",
        "forecast": "0.7%",
        "previous": "0.4%"
      },
      {
        "date": "2026-10-28",
        "time": "08:30",
        "ccy": "AUD",
        "impact": "high",
        "name": "CPI y/y",
        "actual": "",
        "forecast": "4.2%",
        "previous": "4.0%"
      },
      {
        "date": "2026-10-28",
        "time": "08:30",
        "ccy": "AUD",
        "impact": "high",
        "name": "Trimmed Mean CPI m/m",
        "actual": "",
        "forecast": "0.3%",
        "previous": "0.2%"
      }
    ],
    "status": null
  },
  "implications": [
    "牆、街貨與隔夜僅作地圖與濾鏡，不構成方向或進場訊號。",
    "隔夜標普波幅不大，不把隔夜當今日方向。",
    "恒指即月認購牆 23200 接近結算 23027，先當阻力地圖。",
    "恒指即月認沽牆 22800 接近結算 23027，先當支持地圖。",
    "小恒牆位已核實，與恒指一併讀，不因單一牆位預測開市方向。",
    "現價之下近收回牛證較重，屬對沖流動性地圖；屠牛進行中不要 fade。"
  ],
  "missing": []
};
