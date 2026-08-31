
function toggleHeaderMenu(e){
  if(e) e.stopPropagation();
  document.getElementById("headerMenu").classList.toggle("open");
}
document.addEventListener("click", function(e){
  const m = document.getElementById("headerMenu");
  if(m && !m.contains(e.target)) m.classList.remove("open");
});

const fmt = n => (n==null||isNaN(n)) ? "—" : Number(n).toLocaleString("en-US");
const fmtC = n => {
  if(n==null||isNaN(n)) return "—";
  const s = Number(n).toLocaleString("en-US");
  return n>0 ? "+"+s : s;
};
const clsN = n => n>0?"pos":n<0?"neg":"";
const STOCK_ORDER = ["TCH","ALB","MIU","MET","HEX","KST"];

function latestKey(bag){
  const keys = Object.keys(bag||{}).sort().reverse();
  return keys[0] || null;
}
function settleOf(r){
  if(!r) return null;
  return r.futures?.hsif?.front?.settle || r.futures?.mhif?.front?.settle || null;
}
function frontExpired(r){
  if(!r) return false;
  const rows = r.strikes || [];
  if(!rows.length) return false;
  const iv = rows.filter(s => (s.callIV||0)>0 || (s.putIV||0)>0).length;
  const nextIv = (r.nextStrikes||[]).filter(s => (s.callIV||0)>0 || (s.putIV||0)>0).length;
  return iv===0 && nextIv>0;
}
function activePack(r){
  if(!r){
    return { useNext:false, label:"—", strikes:[], zones:{}, callOI:null, putOI:null, callOIChange:null, putOIChange:null, totalOI:null, totalOIChange:null };
  }
  if(frontExpired(r) && (r.nextStrikes||[]).length){
    const z = r.nextMonthZones || {};
    const strikes = r.nextStrikes;
    const callOI = strikes.reduce((a,s)=>a+(s.callOI||0),0);
    const putOI = strikes.reduce((a,s)=>a+(s.putOI||0),0);
    const callOIChange = strikes.reduce((a,s)=>a+(s.callChange||0),0);
    const putOIChange = strikes.reduce((a,s)=>a+(s.putChange||0),0);
    return {
      useNext: true,
      label: z.month || r.summary?.nextMonth || "下月",
      strikes,
      zones: { callWalls: z.callWalls||[], putWalls: z.putWalls||[] },
      callOI, putOI, callOIChange, putOIChange,
      totalOI: callOI+putOI,
      totalOIChange: callOIChange+putOIChange
    };
  }
  const s = r.summary || {};
  return {
    useNext: false,
    label: s.frontMonth || r.monthLabel || "即月",
    strikes: r.strikes || [],
    zones: r.heavyZones || {},
    callOI: s.callOI, putOI: s.putOI,
    callOIChange: s.callOIChange, putOIChange: s.putOIChange,
    totalOI: s.totalOI, totalOIChange: s.totalOIChange
  };
}
function biasFromWalls(close, callWalls, putWalls){
  if(close==null || close===0) return { label:"—", cls:"na", note:"" };
  const calls = (callWalls||[]).slice();
  const puts = (putWalls||[]).slice();
  const nearCall = calls.filter(z=>z.strike>=close).sort((a,b)=>a.strike-b.strike)[0]
    || calls.slice().sort((a,b)=>Math.abs(a.strike-close)-Math.abs(b.strike-close))[0];
  const nearPut = puts.filter(z=>z.strike<=close).sort((a,b)=>b.strike-a.strike)[0]
    || puts.slice().sort((a,b)=>Math.abs(a.strike-close)-Math.abs(b.strike-close))[0];
  const distCall = nearCall ? nearCall.strike - close : null;
  const distPut = nearPut ? close - nearPut.strike : null;
  const band = Math.max(Math.abs(close)*0.01, close > 1000 ? 150 : close*0.015);
  const callNear = distCall!=null && distCall>=0 && distCall<=band*1.2;
  const putNear = distPut!=null && distPut>=0 && distPut<=band*1.2;
  const callAbove = nearCall && nearCall.strike >= close;
  const putBelow = nearPut && nearPut.strike <= close;
  let label="牆遠", cls="far";
  if(callNear && putNear && callAbove && putBelow){ label="夾在牆中"; cls="mid"; }
  else if(callNear && callAbove){ label="潛在阻力"; cls="res"; }
  else if(putNear && putBelow){ label="潛在支持"; cls="sup"; }
  else if(distCall!=null && distPut!=null){
    if(Math.abs(distCall)<Math.abs(distPut) && callAbove){ label="偏近阻力"; cls="res"; }
    else if(Math.abs(distPut)<Math.abs(distCall) && putBelow){ label="偏近支持"; cls="sup"; }
  }
  const note = [
    nearCall ? `Call ${nearCall.strike} (${distCall>=0?"+":""}${Math.round(distCall)})` : null,
    nearPut ? `Put ${nearPut.strike} (${distPut>=0?"+":""}${Math.round(distPut)})` : null,
  ].filter(Boolean).join(" · ");
  return { label, cls, note, nearCall, nearPut, distCall, distPut };
}

function hsiBias(r){
  if(!r) return { label:"無資料", cls:"na", note:"" };
  const p = activePack(r);
  return biasFromWalls(settleOf(r), p.zones.callWalls, p.zones.putWalls);
}

function stockBias(u){
  return biasFromWalls(u.close, u.callWalls, u.putWalls);
}

function wallsTop3(list){
  return (list||[]).slice(0,3);
}

function wallLines(list, side){
  const color = side==="call"?"#34d399":"#fb7185";
  return wallsTop3(list).map(z =>
    `<div class="ln"><span style="color:${color}">${z.strike}</span>`+
    `<span>OI ${fmt(z.oi)} <span class="${clsN(z.oiChange)}">${fmtC(z.oiChange)}</span></span></div>`
  ).join("") || `<div class="ln"><span>—</span></div>`;
}

function optionsCard(title, href, r, date, extraNote){
  if(!r){
    return `<a class="card" href="${href}"><h2><span>${title}</span><span class="go">詳情 →</span></h2>
      <div class="bias na">無資料</div></a>`;
  }
  const pack = activePack(r);
  const b = biasFromWalls(settleOf(r), pack.zones.callWalls, pack.zones.putWalls);
  const settle = settleOf(r);
  const pc = pack.callOI ? (pack.putOI/pack.callOI) : null;
  const hz = pack.zones || {};
  const monthLbl = pack.useNext ? "下月" : "即月";
  return `<a class="card" href="${href}">
    <h2><span>${title}</span><span class="go">詳情 →</span></h2>
    <div class="bias ${b.cls}">${b.label}</div>
    <div class="meta">${b.note||"—"}</div>
    <div class="kpi">
      <div class="item"><div class="l">Settle</div><div class="v">${settle!=null?fmt(settle):"—"}</div></div>
      <div class="item"><div class="l">P/C</div><div class="v">${pc!=null?pc.toFixed(2):"—"}</div></div>
      <div class="item"><div class="l">Call OI</div><div class="v">${fmt(pack.callOI)} <span class="${clsN(pack.callOIChange)}">${fmtC(pack.callOIChange)}</span></div></div>
      <div class="item"><div class="l">Put OI</div><div class="v">${fmt(pack.putOI)} <span class="${clsN(pack.putOIChange)}">${fmtC(pack.putOIChange)}</span></div></div>
      <div class="item"><div class="l">總 OI</div><div class="v">${fmt(pack.totalOI)} <span class="${clsN(pack.totalOIChange)}">${fmtC(pack.totalOIChange)}</span></div></div>
      <div class="item"><div class="l">${monthLbl}</div><div class="v">${pack.label||"—"}</div></div>
    </div>
    <div class="top3">
      <div class="lbl">Call 重貨 Top 3${pack.useNext?" · 下月":""}</div>
      ${wallLines(hz.callWalls, "call")}
      <div class="lbl">Put 重貨 Top 3${pack.useNext?" · 下月":""}</div>
      ${wallLines(hz.putWalls, "put")}
    </div>
    ${pack.useNext?`<div class="meta" style="margin-top:8px">即月已到期 · 改顯示下月 ${pack.label}</div>`:""}
    ${extraNote?`<div class="meta" style="margin-top:8px">${extraNote}</div>`:""}
    <div class="row" style="margin-top:8px"><span class="k">日期</span><span>${date||"—"}</span></div>
  </a>`;
}
