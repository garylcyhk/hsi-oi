/* HSI CBBC outstanding by call-level bin.
   Snapshot compiled from issuer market-wide 街貨分佈 (GS/UBS/BNP/SG republish HKEX issuer reports).
   Units: futures-equivalent contracts (相對期指張數).
   Outstanding updates after close (~16:00 report; issuer charts ~08:05 next morning).
   Far OTM bins not listed on issuer charts are omitted; bullFut/bearFut are market totals.
*/
window.CBBC_HSI = {
  asOf: "2026-08-31",
  published: "2026-09-01 08:05",
  spot: 25567,
  prevClose: 25585,
  source: "Issuer CBBC outstanding distribution (market-wide, HKEX-reported street qty)",
  sourcePages: [
    { name: "GS HSI CBBC OS", url: "https://www.gswarrants.com.hk/en/market/hsi-cbbc-outstanding-distribution" },
    { name: "SG 法興 街貨分佈", url: "https://hk.warrants.com/tc/cbbc/outstanding-distribution" },
    { name: "UBS Index CBBC OS", url: "https://warrants.ubs.com/en/cbbc/index-cbbc-outstanding" },
    { name: "BNP Outstanding Dist", url: "https://bnppwarrant.com/en/cbbc/outstanding-distribution" }
  ],
  bullFut: 8729,
  bearFut: 7584,
  bullPct: 53.5,
  bearPct: 46.5,
  nearKoPts: 1000,
  nearKoBull: 3563,
  nearKoBear: 3832,
  flow1d: { bullM: null, bearM: null, bullFut: 198, bearFut: 130 },
  flow5d: { bullM: null, bearM: null },
  flow5dSeries: {
    dates: ["08-31", "08-28", "08-27", "08-26", "08-25"]
  },
  calledNote: "圖表 2026-09-01 08:05 · 街貨日 2026-08-31。區間來自高盛 200 點 KO bin。未列出的遠價區已省略。",
  bins: [
    { lo: 28000, hi: 28199, side: "bear", fut: 362, chg: -3, hist: [362,365,364,365,363], call: 28000, koPct: 9.5 },
    { lo: 27800, hi: 27999, side: "bear", fut: 160, chg: -2, hist: [160,162,167,161,166], call: 27800, koPct: 8.7 },
    { lo: 27600, hi: 27799, side: "bear", fut: 49, chg: -8, hist: [49,57,55,55,53], call: 27600, koPct: 8.0 },
    { lo: 27400, hi: 27599, side: "bear", fut: 344, chg: -7, hist: [344,351,350,355,359], call: 27400, koPct: 7.2 },
    { lo: 27200, hi: 27399, side: "bear", fut: 292, chg: -2, hist: [292,294,283,301,296], call: 27200, koPct: 6.4 },
    { lo: 27000, hi: 27199, side: "bear", fut: 681, chg: 8, hist: [681,673,651,668,634], call: 27000, koPct: 5.6 },
    { lo: 26800, hi: 26999, side: "bear", fut: 513, chg: -18, hist: [513,531,535,519,472], call: 26800, koPct: 4.8 },
    { lo: 26600, hi: 26799, side: "bear", fut: 379, chg: -34, hist: [379,413,398,467,395], call: 26600, koPct: 4.0 },
    { lo: 26400, hi: 26599, side: "bear", fut: 965, chg: -61, hist: [965,1026,965,1009,970], call: 26400, koPct: 3.3 },
    { lo: 26200, hi: 26399, side: "bear", fut: 1061, chg: -79, hist: [1061,1140,1104,1179,1122], call: 26200, koPct: 2.5 },
    { lo: 26000, hi: 26199, side: "bear", fut: 753, chg: -138, hist: [753,891,980,1007,931], call: 26000, koPct: 1.7 },
    { lo: 25800, hi: 25999, side: "bear", fut: 757, chg: -53, hist: [757,810,729,525,632], call: 25800, koPct: 0.9 },
    { lo: 25600, hi: 25799, side: "bear", fut: 320, chg: 272, hist: [320,48,0,0,120], call: 25600, koPct: 0.1 },
    { lo: 25100, hi: 25299, side: "bull", fut: 1093, chg: 39, hist: [1093,1054,875,729,816], call: 25100, koPct: 1.8 },
    { lo: 24900, hi: 25099, side: "bull", fut: 1466, chg: 279, hist: [1466,1188,1336,1009,1369], call: 24900, koPct: 2.6 },
    { lo: 24700, hi: 24899, side: "bull", fut: 734, chg: 118, hist: [734,616,670,616,710], call: 24700, koPct: 3.4 },
    { lo: 24500, hi: 24699, side: "bull", fut: 740, chg: 112, hist: [740,628,720,684,742], call: 24500, koPct: 4.2 },
    { lo: 24300, hi: 24499, side: "bull", fut: 207, chg: 38, hist: [207,169,181,157,189], call: 24300, koPct: 4.9 },
    { lo: 24100, hi: 24299, side: "bull", fut: 390, chg: -3, hist: [390,393,398,385,394], call: 24100, koPct: 5.7 },
    { lo: 23900, hi: 24099, side: "bull", fut: 249, chg: 23, hist: [249,226,236,222,245], call: 23900, koPct: 6.5 },
    { lo: 23700, hi: 23899, side: "bull", fut: 117, chg: -1, hist: [117,117,125,129,135], call: 23700, koPct: 7.3 },
    { lo: 23500, hi: 23699, side: "bull", fut: 520, chg: 15, hist: [520,505,509,503,513], call: 23500, koPct: 8.1 },
    { lo: 23300, hi: 23499, side: "bull", fut: 277, chg: -4, hist: [277,282,287,366,373], call: 23300, koPct: 8.9 },
    { lo: 23100, hi: 23299, side: "bull", fut: 206, chg: -6, hist: [206,212,216,216,216], call: 23100, koPct: 9.6 },
    { lo: 22900, hi: 23099, side: "bull", fut: 242, chg: -4, hist: [242,245,259,269,269], call: 22900, koPct: 10.4 },
    { lo: 22700, hi: 22899, side: "bull", fut: 81, chg: 0, hist: [81,81,81,81,81], call: 22700, koPct: 11.2 }
  ]
};
setTimeout(function(){
  if(document.getElementById("cbbcCallCol")) return;
  var s=document.createElement("script");
  s.id="cbbcCallCol";
  s.src="call-col.js";
  document.body.appendChild(s);
},0);
