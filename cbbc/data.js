/* HSI CBBC outstanding by call-level bin.
   Snapshot compiled from issuer market-wide 街貨分佈 (UBS/BNP/SG republish HKEX issuer reports).
   Units: futures-equivalent contracts (相對期指張數).
   Outstanding updates after close (~16:00 report; issuer charts ~08:05 next morning).
   Far OTM bins not listed on issuer charts are omitted; bullFut/bearFut are market totals.
*/
window.CBBC_HSI = {
  asOf: "2026-08-28",
  published: "2026-08-31 08:05",
  spot: 25566.99,
  prevClose: 25584.79,
  source: "Issuer CBBC outstanding distribution (market-wide, HKEX-reported street qty)",
  sourcePages: [
    { name: "SG 法興 街貨分佈", url: "https://hk.warrants.com/tc/cbbc/outstanding-distribution" },
    { name: "UBS Index CBBC OS", url: "https://warrants.ubs.com/en/cbbc/index-cbbc-outstanding" },
    { name: "BNP Outstanding Dist", url: "https://bnppwarrant.com/en/cbbc/outstanding-distribution" }
  ],
  bullFut: 8927,
  bearFut: 7715,
  bullPct: 53.6,
  bearPct: 46.4,
  nearKoPts: 1000,
  nearKoBull: 3868,
  nearKoBear: 3908,
  flow1d: { bullM: -18.89, bearM: 7.88 },
  flow5d: { bullM: 19.94, bearM: -86.84 },
  flow5dSeries: {
    dates: ["08-28", "08-27", "08-26", "08-25", "08-24"],
    bull: [-18.89, 16.07, -28.79, -7.64, 59.2],
    bear: [7.88, -9.55, 10.67, 14.16, -110.01]
  },
  calledNote: "31/08 收回（BOCI）：牛證 67 隻 / 約 818 張；熊證 7 隻 / 0 張。收回價約 25,296–25,685。",
  bins: [
    { lo: 27100, hi: 27199, side: "bear", fut: 233, chg: 7, hist: [233, 226, 243, 240, 227], pick: "63441", call: 27100, koPct: 5.9 },
    { lo: 27000, hi: 27099, side: "bear", fut: 440, chg: 15, hist: [440, 425, 425, 394, 393], pick: "67880", call: 27000, koPct: 5.5 },
    { lo: 26900, hi: 26999, side: "bear", fut: 240, chg: -5, hist: [240, 245, 249, 236, 235], pick: "57313", call: 26918, koPct: 5.2 },
    { lo: 26800, hi: 26899, side: "bear", fut: 291, chg: 1, hist: [291, 290, 270, 236, 237], pick: "59535", call: 26888, koPct: 5.1 },
    { lo: 26700, hi: 26799, side: "bear", fut: 217, chg: -3, hist: [217, 220, 211, 196, 184], pick: "58921", call: 26750, koPct: 4.6 },
    { lo: 26600, hi: 26699, side: "bear", fut: 196, chg: 18, hist: [196, 178, 255, 198, 207], pick: "57794", call: 26638, koPct: 4.1 },
    { lo: 26500, hi: 26599, side: "bear", fut: 591, chg: 42, hist: [591, 549, 608, 555, 551], pick: "58880", call: 26500, koPct: 3.6 },
    { lo: 26400, hi: 26499, side: "bear", fut: 434, chg: 18, hist: [434, 416, 401, 415, 427], pick: "53897", call: 26428, koPct: 3.3 },
    { lo: 26300, hi: 26399, side: "bear", fut: 563, chg: 46, hist: [563, 516, 567, 522, 518], pick: "62101", call: 26300, koPct: 2.8 },
    { lo: 26200, hi: 26299, side: "bear", fut: 577, chg: -10, hist: [577, 588, 612, 600, 518], pick: "59976", call: 26200, koPct: 2.4 },
    { lo: 26100, hi: 26199, side: "bear", fut: 397, chg: -83, hist: [397, 481, 506, 445, 469], pick: "57633", call: 26100, koPct: 2.0 },
    { lo: 26000, hi: 26099, side: "bear", fut: 494, chg: -6, hist: [494, 500, 501, 486, 427], pick: "58171", call: 26050, koPct: 1.8 },
    { lo: 25900, hi: 25999, side: "bear", fut: 246, chg: -57, hist: [246, 303, 234, 159, 29], pick: "61076", call: 25978, koPct: 1.5 },
    { lo: 25800, hi: 25899, side: "bear", fut: 564, chg: 138, hist: [564, 427, 291, 473, 285], pick: "61690", call: 25858, koPct: 1.1 },
    { lo: 25700, hi: 25799, side: "bear", fut: 48, chg: 48, hist: [48, 0, 0, 57, 0], pick: "64182", call: 25700, koPct: 0.5 },
    { lo: 25400, hi: 25499, side: "bull", fut: 288, chg: -4, hist: [288, 293, 254, 175, 250], pick: "", call: null, koPct: null, called: true },
    { lo: 25300, hi: 25399, side: "bull", fut: 522, chg: -141, hist: [522, 663, 536, 400, 443], pick: "", call: null, koPct: 1.0 },
    { lo: 25200, hi: 25299, side: "bull", fut: 465, chg: 53, hist: [465, 413, 363, 386, 371], pick: "59003", call: 25250, koPct: 1.3 },
    { lo: 25100, hi: 25199, side: "bull", fut: 588, chg: 126, hist: [588, 462, 366, 430, 343], pick: "60164", call: 25150, koPct: 1.7 },
    { lo: 25000, hi: 25099, side: "bull", fut: 807, chg: -44, hist: [807, 851, 554, 834, 956], pick: "69460", call: 25018, koPct: 2.2 },
    { lo: 24900, hi: 24999, side: "bull", fut: 380, chg: -105, hist: [380, 485, 455, 536, 577], pick: "66671", call: 24950, koPct: 2.5 },
    { lo: 24800, hi: 24899, side: "bull", fut: 460, chg: -27, hist: [460, 487, 445, 513, 544], pick: "63937", call: 24800, koPct: 3.1 },
    { lo: 24700, hi: 24799, side: "bull", fut: 156, chg: -27, hist: [156, 183, 171, 197, 230], pick: "63057", call: 24700, koPct: 3.5 },
    { lo: 24600, hi: 24699, side: "bull", fut: 198, chg: -55, hist: [198, 253, 258, 283, 286], pick: "62373", call: 24650, koPct: 3.7 },
    { lo: 24500, hi: 24599, side: "bull", fut: 431, chg: -36, hist: [431, 467, 426, 459, 467], pick: "61828", call: 24550, koPct: 4.0 },
    { lo: 24400, hi: 24499, side: "bull", fut: 69, chg: -10, hist: [69, 80, 71, 84, 83], pick: "67476", call: 24468, koPct: 4.4 },
    { lo: 24300, hi: 24399, side: "bull", fut: 100, chg: -1, hist: [100, 101, 86, 105, 108], pick: "60336", call: 24300, koPct: 5.0 },
    { lo: 24200, hi: 24299, side: "bull", fut: 231, chg: -4, hist: [231, 235, 233, 240, 239], pick: "61405", call: 24200, koPct: 5.4 },
    { lo: 24100, hi: 24199, side: "bull", fut: 162, chg: -1, hist: [162, 163, 152, 154, 156], pick: "60337", call: 24150, koPct: 5.6 },
    { lo: 24000, hi: 24099, side: "bull", fut: 43, chg: -9, hist: [43, 51, 39, 53, 51], pick: "60338", call: 24000, koPct: 6.2 }
  ]
};
