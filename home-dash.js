
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

function futuresRegime(stockBag){
  const bag = stockBag || {};
  const allKeys = Object.keys(bag).sort();
  const keysDesc = allKeys.slice().reverse().slice(0, 20);
  if(allKeys.length < 2) return { label:"—", cls:"na", note:"數據不足", streakText:"—", detail:{} };

  let up=0, down=0;
  const regimes = { "新多":0, "新空":0, "回補":0, "平多":0, "其他":0 };
  for(let i=0;i<keysDesc.length-1;i++){
    const a = bag[keysDesc[i]]?.futures?.hsif?.front;
    const b = bag[keysDesc[i+1]]?.futures?.hsif?.front;
    if(!a||!b||a.settle==null||b.settle==null) continue;
    const dp = a.settle - b.settle;
    const doi = (a.oi||0) - (b.oi||0);
    if(dp>0) up++; else if(dp<0) down++;
    if(dp>0 && doi>0) regimes["新多"]++;
    else if(dp<0 && doi>0) regimes["新空"]++;
    else if(dp>0 && doi<0) regimes["回補"]++;
    else if(dp<0 && doi<0) regimes["平多"]++;
    else regimes["其他"]++;
  }

  let streak = 0;
  let streakDir = 0;
  for(let i=allKeys.length-1; i>=1; i--){
    const a = bag[allKeys[i]]?.futures?.hsif?.front;
    const b = bag[allKeys[i-1]]?.futures?.hsif?.front;
    if(!a||!b||a.settle==null||b.settle==null) break;
    const dp = a.settle - b.settle;
    if(dp===0) break;
    const dir = dp>0 ? 1 : -1;
    if(streak===0){ streakDir = dir; streak = 1; }
    else if(dir===streakDir) streak++;
    else break;
  }
  let streakText = "—";
  let streakCls = "far";
  if(streak>0 && streakDir>0){ streakText = `連升 ${streak} 日`; streakCls = "sup"; }
  else if(streak>0 && streakDir<0){ streakText = `連跌 ${streak} 日`; streakCls = "res"; }

  const front = bag[allKeys[allKeys.length-1]]?.futures?.hsif?.front || {};
  const mhi = bag[allKeys[allKeys.length-1]]?.futures?.mhif?.front || {};
  const topReg = Object.entries(regimes).filter(x=>x[0]!=="其他").sort((a,b)=>b[1]-a[1])[0] || ["—",0];
  let cls = "far";
  if(topReg[0]==="新多"||topReg[0]==="回補") cls="sup";
  if(topReg[0]==="新空"||topReg[0]==="平多") cls="res";
  return {
    label: topReg[0],
    cls,
    up, down, days: keysDesc.length,
    front, mhi,
    regimes,
    streak, streakDir, streakText, streakCls,
    note: `近${keysDesc.length}日 漲${up} 跌${down}`
  };
}

function render(){
  const hsiBag = window.HSI_REPORTS || {};
  const miniBag = window.MINI_HSI_REPORTS || {};
  const stockBag = window.STOCK_OI || {};
  const dH = latestKey(hsiBag);
  const dM = latestKey(miniBag);
  const dS = latestKey(stockBag);
  const rH = dH ? hsiBag[dH] : null;
  const rM = dM ? miniBag[dM] : null;
  const rS = dS ? stockBag[dS] : null;

  document.getElementById("status").textContent =
    `最新數據 · HSI ${dH||"—"} · Mini ${dM||"—"} · Stocks/Futures ${dS||"—"} · 點卡片進入詳情`;

  const bH = hsiBias(rH);
  const bM = hsiBias(rM);
  let consText = "資料不足，無法比較 HSI / Mini 牆位";
  let consCls = "na";
  if(bH.label!=="—" && bM.label!=="—" && bH.label!=="無資料" && bM.label!=="無資料"){
    if(bH.cls===bM.cls || bH.label===bM.label){
      consText = "HSI ↔ Mini 牆位判斷一致 · " + bH.label;
      consCls = "agree";
    } else {
      consText = "HSI ↔ Mini 牆位判斷分歧 · HSI「"+bH.label+"」vs Mini「"+bM.label+"」";
      consCls = "diverge";
    }
  }

  let stockRows = "";
  let nRes=0, nSup=0, nMid=0, nFar=0;
  if(rS && rS.underlyings){
    stockRows = STOCK_ORDER.map(h=>{
      const u = rS.underlyings[h];
      if(!u) return "";
      const b = stockBias(u);
      if(b.cls==="res") nRes++; else if(b.cls==="sup") nSup++; else if(b.cls==="mid") nMid++; else nFar++;
      const code = String(u.code||"").replace(/^0+/,"")||u.code;
      const pc = u.callOI ? (u.putOI/u.callOI) : null;
      const callW = (u.callWalls||[])[0];
      const putW = (u.putWalls||[])[0];
      return `<tr>
        <td><strong>${code}</strong></td>
        <td class="tr">${u.close!=null?u.close.toFixed(2):"—"}</td>
        <td class="tr">${callW?callW.strike:"—"}</td>
        <td class="tr">${putW?putW.strike:"—"}</td>
        <td class="tr">${pc!=null?pc.toFixed(2):"—"}</td>
        <td><span class="tag ${b.cls}">${b.label}</span></td>
      </tr>`;
    }).join("");
  }

  const fr = futuresRegime(stockBag);
  const f = fr.front || {};
  const m = fr.mhi || {};

  const regLine = fr.regimes
    ? Object.entries(fr.regimes).filter(([k,v])=>k!=="其他"&&v>0).map(([k,v])=>`${k} ${v}`).join(" · ")
    : "";

  document.getElementById("grid").innerHTML = `
    <div id="cardHsi">${optionsCard("恒指期權 HSI", "./options/#hsi", rH, dH, "")}</div>
    <div id="cardMini">${optionsCard("小型恒指 Mini-HSI", "./options/#mini", rM, dM, "")}</div>
    <div id="consLine" class="cons-banner ${consCls}"><span class="cons-title">一致 / 分歧</span>${consText}</div>
    <div id="cardStock"><a class="card" href="./stock-oi/">
      <h2><span>股票期權籃子</span><span class="go">詳情 →</span></h2>
      <div class="meta" style="margin-bottom:6px">
        阻力 ${nRes} · 支持 ${nSup} · 夾中 ${nMid} · 牆遠 ${nFar}
      </div>
      <div class="stocks">
        <table>
          <thead><tr>
            <th>股票</th><th class="tr">收市</th>
            <th class="tr">Call牆</th><th class="tr">Put牆</th>
            <th class="tr">P/C</th><th>偏向</th>
          </tr></thead>
          <tbody>${stockRows||'<tr><td colspan="6">無資料</td></tr>'}</tbody>
        </table>
      </div>
      <div class="row" style="margin-top:8px"><span class="k">日期</span><span>${dS||"—"}</span></div>
    </a></div>
    <div id="cardFut"><a class="card" href="./futures/">
      <h2><span>期貨 HSI / MHI</span><span class="go">詳情 →</span></h2>
      <div class="bias ${fr.cls}">${fr.label}</div>
      <div class="bias ${fr.streakCls||"far"}" style="font-size:1rem;margin-top:2px">${fr.streakText||"—"}</div>
      <div class="meta">${fr.note||""}${regLine?" · "+regLine:""}</div>
      <div class="kpi">
        <div class="item"><div class="l">HSI Settle</div><div class="v">${f.settle!=null?fmt(f.settle):"—"} <span class="${clsN(f.settleChange)}">${fmtC(f.settleChange)}</span></div></div>
        <div class="item"><div class="l">HSI OI</div><div class="v">${fmt(f.oi)} <span class="${clsN(f.oiChange)}">${fmtC(f.oiChange)}</span></div></div>
        <div class="item"><div class="l">HSI 成交</div><div class="v">${fmt(f.volume)}</div></div>
        <div class="item"><div class="l">月份</div><div class="v">${f.month||"—"}</div></div>
        <div class="item"><div class="l">MHI Settle</div><div class="v">${m.settle!=null?fmt(m.settle):"—"} <span class="${clsN(m.settleChange)}">${fmtC(m.settleChange)}</span></div></div>
        <div class="item"><div class="l">MHI OI</div><div class="v">${fmt(m.oi)} <span class="${clsN(m.oiChange)}">${fmtC(m.oiChange)}</span></div></div>
      </div>
      <div class="row" style="margin-top:8px"><span class="k">日期</span><span>${dS||"—"}</span></div>
    </a></div>
  `;
  applyHomeSettings();
}

const HOME_LS = "exodus_home_settings_v1";
let homeSettings = {
  fontScale: 100,
  compact: false,
  showHsi: true,
  showMini: true,
  showStock: true,
  showFut: true,
  showCons: true,
  showTodo: true
};
try {
  const s = JSON.parse(localStorage.getItem(HOME_LS)||"null");
  if(s) homeSettings = Object.assign(homeSettings, s);
} catch(e){}

function applyHomeSettings(){
  document.documentElement.style.fontSize = (homeSettings.fontScale/100*14) + "px";
  document.body.classList.toggle("compact", !!homeSettings.compact);
  const map = {
    cardHsi: homeSettings.showHsi,
    cardMini: homeSettings.showMini,
    cardStock: homeSettings.showStock,
    cardFut: homeSettings.showFut,
    consLine: homeSettings.showCons
  };
  Object.keys(map).forEach(id => {
    const el = document.getElementById(id);
    if(el) el.style.display = map[id] ? "" : "none";
  });
  const td = document.getElementById("todoBlock");
  if(td) td.style.display = homeSettings.showTodo === false ? "none" : "";
}

function openSettings(){
  const m = document.getElementById("settingsModal");
  if(!m) return;
  document.getElementById("setFontScale").value = String(homeSettings.fontScale||100);
  document.getElementById("setCompact").checked = !!homeSettings.compact;
  document.getElementById("setShowHsi").checked = homeSettings.showHsi !== false;
  document.getElementById("setShowMini").checked = homeSettings.showMini !== false;
  document.getElementById("setShowStock").checked = homeSettings.showStock !== false;
  document.getElementById("setShowFut").checked = homeSettings.showFut !== false;
  document.getElementById("setShowCons").checked = homeSettings.showCons !== false;
  const sc = document.getElementById("setShowTodo");
  if(sc) sc.checked = homeSettings.showTodo !== false;
  m.classList.add("open");
}
function closeSettings(){
  const m = document.getElementById("settingsModal");
  if(m) m.classList.remove("open");
}
function saveSettings(){
  homeSettings.fontScale = parseInt(document.getElementById("setFontScale").value,10)||100;
  homeSettings.compact = document.getElementById("setCompact").checked;
  homeSettings.showHsi = document.getElementById("setShowHsi").checked;
  homeSettings.showMini = document.getElementById("setShowMini").checked;
  homeSettings.showStock = document.getElementById("setShowStock").checked;
  homeSettings.showFut = document.getElementById("setShowFut").checked;
  homeSettings.showCons = document.getElementById("setShowCons").checked;
  const sc2 = document.getElementById("setShowTodo");
  if(sc2) homeSettings.showTodo = sc2.checked;
  try { localStorage.setItem(HOME_LS, JSON.stringify(homeSettings)); } catch(e){}
  applyHomeSettings();
  closeSettings();
}
function closeHeaderMenu(){
  const m = document.getElementById("headerMenu");
  if(m) m.classList.remove("open");
}

render();
applyHomeSettings();
