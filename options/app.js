let productMode = localStorage.getItem("hsi_product_mode") || "hsi";
(function(){
  const h = (location.hash || "").replace("#","").toLowerCase();
  if (h === "mini" || h === "hsi") {
    productMode = h;
    try { localStorage.setItem("hsi_product_mode", h); } catch(e) {}
  }
})();
let reports = productMode === "mini" ? (window.MINI_HSI_REPORTS || {}) : (window.HSI_REPORTS || {});
let availableDates = Object.keys(reports).sort().reverse();
let currentDate = availableDates[0] || null;
let currentReport = null;
let monthMode = "auto";
const DEFAULTS = { sortKey:"strike", sortDir:"desc", minOI:100, minVol:0, onlyActive:true, atmEnabled:false, atmRange:800, fontScale:100, topN:5 };
function loadSettings(){
  try { const raw = localStorage.getItem("hsi_oi_settings"); if (raw) return { ...DEFAULTS, ...JSON.parse(raw) }; } catch(e) {}
  return { ...DEFAULTS };
}
let settings = loadSettings();
let sortKey = settings.sortKey, sortDir = settings.sortDir;
let minOI = settings.minOI, minVol = settings.minVol, onlyActive = settings.onlyActive;
let atmEnabled = settings.atmEnabled === true, atmRange = settings.atmRange || 800;
let fontScale = settings.fontScale || 100, topN = settings.topN || 5;
document.documentElement.style.setProperty("--font-scale", fontScale + "%");
let wallSortKey = "oi", wallSortDir = "desc";
function fmt(n){ return (n==null||isNaN(n)) ? "—" : Number(n).toLocaleString("en-US"); }
function fmtChg(n){ if(n==null||isNaN(n)||n===0) return "0"; return (n>0?"+":"") + Number(n).toLocaleString("en-US"); }
function chgClass(n){ return n>0?"pos":n<0?"neg":"mu"; }
function settleOf(r){ return r?.futures?.hsif?.front?.settle || r?.futures?.mhif?.front?.settle || null; }
function frontExpired(r){
  const rows = r?.strikes || [];
  if (!rows.length) return false;
  const iv = rows.filter(s => (s.callIV||0)>0 || (s.putIV||0)>0).length;
  const nextIv = (r.nextStrikes||[]).filter(s => (s.callIV||0)>0 || (s.putIV||0)>0).length;
  return iv===0 && nextIv>0;
}
function activeMonth(r){
  if (!r) return { useNext:false, label:"—", strikes:[], zones:{} };
  const useNext = monthMode==="next" || (monthMode==="auto" && frontExpired(r));
  if (useNext && (r.nextStrikes||[]).length){
    const z = r.nextMonthZones || {};
    return { useNext:true, label: z.month || r.summary?.nextMonth || "下月", strikes: r.nextStrikes, zones:{ callWalls:z.callWalls||[], putWalls:z.putWalls||[] } };
  }
  return { useNext:false, label: r.summary?.frontMonth || r.monthLabel || "即月", strikes: r.strikes||[], zones: r.heavyZones||{} };
}
function packOf(r){ return activeMonth(r); }
function biasFromWalls(close, callWalls, putWalls){
  if(close==null || close===0) return { title:"無 Settle", note:"缺期貨結算價", cls:"na" };
  const calls = (callWalls||[]).slice();
  const puts = (putWalls||[]).slice();
  const nearCall = calls.filter(z=>z.strike>=close).sort((a,b)=>a.strike-b.strike)[0]
    || calls.slice().sort((a,b)=>Math.abs(a.strike-close)-Math.abs(b.strike-close))[0];
  const nearPut = puts.filter(z=>z.strike<=close).sort((a,b)=>b.strike-a.strike)[0]
    || puts.slice().sort((a,b)=>Math.abs(a.strike-close)-Math.abs(b.strike-close))[0];
  const distCall = nearCall ? nearCall.strike - close : null;
  const distPut = nearPut ? close - nearPut.strike : null;
  const band = Math.max(Math.abs(close)*0.01, close>1000 ? 150 : close*0.015);
  const callNear = distCall!=null && distCall>=0 && distCall<=band*1.2;
  const putNear = distPut!=null && distPut>=0 && distPut<=band*1.2;
  const callAbove = nearCall && nearCall.strike >= close;
  const putBelow = nearPut && nearPut.strike <= close;
  let title="牆遠";
  if(callNear && putNear && callAbove && putBelow) title="夾在牆中";
  else if(callNear && callAbove) title="潛在阻力";
  else if(putNear && putBelow) title="潛在支持";
  else if(distCall!=null && distPut!=null){
    if(Math.abs(distCall)<Math.abs(distPut) && callAbove) title="偏近阻力";
    else if(Math.abs(distPut)<Math.abs(distCall) && putBelow) title="偏近支持";
  }
  const note = [
    nearCall ? `Call ${nearCall.strike} (${distCall>=0?"+":""}${Math.round(distCall)})` : null,
    nearPut ? `Put ${nearPut.strike} (${distPut>=0?"+":""}${Math.round(distPut)})` : null
  ].filter(Boolean).join(" · ");
  return { title, note, nearCall, nearPut };
}
function biasLine(r){
  if(!r) return { title:"無資料", note:"" };
  const pack = activeMonth(r);
  const b = biasFromWalls(settleOf(r), pack.zones?.callWalls, pack.zones?.putWalls);
  return { title:b.title, note:(b.note||"") + (pack.useNext ? ` · 下月 ${pack.label}` : "") };
}
function getReportSet(mode, date){
  const bag = mode==="mini" ? (window.MINI_HSI_REPORTS||{}) : (window.HSI_REPORTS||{});
  if (bag[date]) return bag[date];
  const keys = Object.keys(bag).sort().reverse();
  const hit = keys.find(d => d <= date);
  return hit ? bag[hit] : null;
}
function getAtmCenter(){ return settleOf(currentReport); }
function syncAtmUI(){
  const g = document.getElementById("atmEnabledGlobal");
  const r = document.getElementById("atmRangeGlobal");
  const lab = document.getElementById("atmCenterLabel");
  if (g) g.checked = !!atmEnabled;
  if (r) r.value = String(atmRange||800);
  const c = getAtmCenter();
  if (lab) lab.textContent = !c ? "無期貨價" : (atmEnabled ? (c+" ±"+atmRange) : ("中心 "+c));
}
function onAtmToggle(){
  const g = document.getElementById("atmEnabledGlobal");
  const r = document.getElementById("atmRangeGlobal");
  if (g) atmEnabled = g.checked;
  if (r) atmRange = parseInt(r.value,10)||800;
  try { const s=JSON.parse(localStorage.getItem("hsi_oi_settings")||"{}"); s.atmEnabled=atmEnabled; s.atmRange=atmRange; localStorage.setItem("hsi_oi_settings", JSON.stringify(s)); } catch(e){}
  if (currentDate) render(currentDate);
}
function onDateSelectChange(){
  const sel = document.getElementById("dateSelect");
  if (sel && sel.value) render(sel.value);
}
function switchProduct(mode){
  if(mode!=="hsi" && mode!=="mini") return;
  productMode = mode;
  localStorage.setItem("hsi_product_mode", mode);
  reports = mode==="mini" ? (window.MINI_HSI_REPORTS||{}) : (window.HSI_REPORTS||{});
  availableDates = Object.keys(reports).sort().reverse();
  currentDate = availableDates[0] || null;
  const mH = document.getElementById("menuProdHsi");
  const mM = document.getElementById("menuProdMini");
  if (mH) mH.classList.toggle("menu-active", mode==="hsi");
  if (mM) mM.classList.toggle("menu-active", mode==="mini");
  const h1 = document.querySelector("header h1");
  if (h1) h1.innerHTML = mode==="mini" ? '小型恒指期權未平倉 <span>Mini-HSI Options OI</span>' : '恒指期權未平倉 <span>HSI Options OI</span>';
  if (!availableDates.length){
    const st=document.getElementById("status"); if(st) st.textContent = mode==="mini" ? "無 Mini-HSI 資料" : "無 HSI 資料";
    return;
  }
  render(currentDate);
}
function switchTab(name){
  document.querySelectorAll(".tab-btn").forEach(b => b.classList.toggle("active", b.dataset.tab===name));
  document.querySelectorAll(".tab-panel").forEach(p => p.classList.toggle("active", p.id==="tab-"+name));
  try { localStorage.setItem("hsi_oi_tab", name); } catch(e){}
  if (name==="compare") renderCompare(currentDate);
}
function toggleHeaderMenu(e){ if(e) e.stopPropagation(); const m=document.getElementById("headerMenu"); if(m) m.classList.toggle("open"); }
function closeHeaderMenu(){ const m=document.getElementById("headerMenu"); if(m) m.classList.remove("open"); }
document.addEventListener("click", function(e){ const m=document.getElementById("headerMenu"); if(m && !m.contains(e.target)) m.classList.remove("open"); });
function openSettings(){
  const set = (id, val, chk)=>{ const el=document.getElementById(id); if(!el) return; if(chk) el.checked=!!val; else el.value=val; };
  set("setMinOI", minOI); set("setMinVol", minVol); set("setSortKey", sortKey); set("setSortDir", sortDir);
  set("setOnlyActive", onlyActive, true); set("setFontScale", String(fontScale)); set("setAtmEnabled", atmEnabled, true); set("setAtmRange", atmRange); set("setTopN", topN);
  const modal=document.getElementById("settingsModal"); if(modal) modal.classList.add("open");
}
function closeSettings(){ const modal=document.getElementById("settingsModal"); if(modal) modal.classList.remove("open"); }
function saveSettings(){
  const num=(id,d)=>{ const el=document.getElementById(id); return el? (parseInt(el.value,10)||d) : d; };
  const chk=(id,d)=>{ const el=document.getElementById(id); return el? el.checked : d; };
  const val=(id,d)=>{ const el=document.getElementById(id); return el? el.value : d; };
  minOI=num("setMinOI",0); minVol=num("setMinVol",0); sortKey=val("setSortKey","strike"); sortDir=val("setSortDir","desc");
  onlyActive=chk("setOnlyActive",true); fontScale=num("setFontScale",100); atmEnabled=chk("setAtmEnabled",false); atmRange=num("setAtmRange",800); topN=num("setTopN",5);
  document.documentElement.style.setProperty("--font-scale", fontScale+"%");
  settings={ sortKey, sortDir, minOI, minVol, onlyActive, atmEnabled, atmRange, fontScale, topN };
  localStorage.setItem("hsi_oi_settings", JSON.stringify(settings));
  closeSettings();
  if (currentDate) render(currentDate);
}
function resetSettings(){ settings={...DEFAULTS}; localStorage.removeItem("hsi_oi_settings"); minOI=settings.minOI; minVol=settings.minVol; sortKey=settings.sortKey; sortDir=settings.sortDir; onlyActive=settings.onlyActive; topN=settings.topN; openSettings(); }
function onRowClick(tr, ev){
  if(!tr || (tr.parentElement && tr.parentElement.tagName==="THEAD")) return;
  const e = ev || window.event;
  const multi = e && (e.ctrlKey || e.metaKey);
  if(!multi){ const table=tr.closest("table"); if(table) table.querySelectorAll("tbody tr.row-selected").forEach(r=>{ if(r!==tr) r.classList.remove("row-selected"); }); }
  tr.classList.toggle("row-selected");
}
function onFilterChange(){
  const moi=document.getElementById("minOI"), mv=document.getElementById("minVol");
  if(moi) minOI=parseInt(moi.value,10)||0;
  if(mv) minVol=parseInt(mv.value,10)||0;
  if(currentDate) render(currentDate);
}
function setStrikeSort(key){ if(sortKey===key) sortDir = sortDir==="desc"?"asc":"desc"; else { sortKey=key; sortDir="desc"; } if(currentReport) renderStrikeTable(); }
function setWallSort(key){ if(wallSortKey===key) wallSortDir = wallSortDir==="desc"?"asc":"desc"; else { wallSortKey=key; wallSortDir="desc"; } renderWalls(); }
function setVolSort(key){ setWallSort(key==="volume"?"oi":key); }
function setTopSort(key){ setStrikeSort(key); }
function renderFutures(r){
  const box=document.getElementById("futuresBar"); if(!box) return;
  const hf=r.futures?.hsif?.front||{}, mf=r.futures?.mhif?.front||{};
  const ht=r.futures?.hsif?.total||{}, mt=r.futures?.mhif?.total||{};
  function card(title,f,t,tag){
    if(!f.settle) return `<div class="fut-card"><h3>${title}</h3><div class="mu">無資料</div></div>`;
    return `<div class="fut-card"><h3><span>${title}</span><span class="tag">${f.month||tag}</span></h3>
      <div class="fut-grid">
        <div class="fut-item"><div class="fl">結算價</div><div class="fv">${fmt(f.settle)}</div><div class="fs ${chgClass(f.settleChange)}">${fmtChg(f.settleChange)}</div></div>
        <div class="fut-item"><div class="fl">成交量</div><div class="fv">${fmt(f.volume)}</div></div>
        <div class="fut-item"><div class="fl">未平倉</div><div class="fv">${fmt(f.oi)}</div><div class="fs ${chgClass(f.oiChange)}">${fmtChg(f.oiChange)}</div></div>
        <div class="fut-item"><div class="fl">全月份 OI</div><div class="fv">${fmt(t.oi||f.oi)}</div></div>
      </div></div>`;
  }
  box.innerHTML = `<div class="futures-bar">${card("恒生指數期貨 HSI",hf,ht,"HSIF")}${card("小型恒指期貨 MHI",mf,mt,"MHIF")}</div>`;
}
function renderLevelsCard(r){
  const box=document.getElementById("levelsCard"); if(!box) return;
  const pack=activeMonth(r), settle=settleOf(r), bias=biasLine(r);
  const calls=(pack.zones.callWalls||[]).slice(0,3);
  const puts=(pack.zones.putWalls||[]).slice(0,3);
  box.innerHTML = `<div class="section" style="grid-column:1/-1;margin-bottom:0;">
    <div class="section-header"><h2>關鍵水平 Levels</h2><span class="tag">${settle!=null?"Settle "+fmt(settle):"無 Settle"} · ${pack.useNext?"下月 ":"即月 "}${pack.label}</span></div>
    <div style="padding:10px 12px;">
      <div style="background:rgba(39,39,42,.55);border:1px solid var(--border);border-radius:8px;padding:10px 12px;margin-bottom:10px;">
        <div style="font-weight:600;margin-bottom:4px;">${bias.title}</div>
        <div class="mu" style="font-size:.78rem;">${bias.note}</div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
        <div><div class="em" style="font-size:.8rem;margin-bottom:6px;">Call 關鍵阻力</div>${calls.map(z=>`<div class="lvl-row"><span class="lvl-strike em">${z.strike}</span><span class="lvl-meta">OI ${fmt(z.oi)} <span class="${chgClass(z.oiChange)}">${fmtChg(z.oiChange)}</span>${settle!=null?` · ${z.strike>=settle?"+":""}${Math.round(z.strike-settle)}`:""}</span></div>`).join("")||'<div class="mu">無資料</div>'}</div>
        <div><div class="ro" style="font-size:.8rem;margin-bottom:6px;">Put 關鍵支持</div>${puts.map(z=>`<div class="lvl-row"><span class="lvl-strike ro">${z.strike}</span><span class="lvl-meta">OI ${fmt(z.oi)} <span class="${chgClass(z.oiChange)}">${fmtChg(z.oiChange)}</span>${settle!=null?` · ${z.strike>=settle?"+":""}${Math.round(z.strike-settle)}`:""}</span></div>`).join("")||'<div class="mu">無資料</div>'}</div>
      </div>
    </div>
  </div>`;
}
function renderDayChange(r){
  const box=document.getElementById("dayChange"); if(!box) return;
  const prev=reports[r.prevDate];
  if(!prev){ box.innerHTML='<div class="day-change"><div class="dc-label">尚無昨日資料可比較</div></div>'; return; }
  function wallMap(walls){ const m={}; (walls||[]).forEach(w=>m[w.strike]=w.oi); return m; }
  const tPack=activeMonth(r), yPack=activeMonth(prev);
  function diffSide(today,yest,label){
    const items=[], all=new Set([...Object.keys(today),...Object.keys(yest)].map(Number));
    [...all].sort((a,b)=>b-a).forEach(strike=>{
      const t=today[strike]||0, y=yest[strike]||0;
      if(t&&!y) items.push(`<div class="dc-item dc-new">${strike} 新進榜 OI ${fmt(t)}</div>`);
      else if(!t&&y) items.push(`<div class="dc-item dc-down">${strike} 跌出榜 (昨 ${fmt(y)})</div>`);
      else if(t&&y&&t!==y) items.push(`<div class="dc-item ${t-y>0?"dc-up":"dc-down"}">${strike} OI ${fmt(t)} (${fmtChg(t-y)})</div>`);
    });
    if(!items.length) items.push('<div class="dc-item mu">變化不大</div>');
    return `<div><div class="dc-label">${label}</div>${items.slice(0,6).join("")}</div>`;
  }
  box.innerHTML = `<div class="day-change"><div class="section-header" style="border:none;padding:0 0 8px;"><h3 style="margin:0;font-size:.8rem;">今日 vs 昨日牆位變化 <span class="tag">${r.date} vs ${r.prevDate}</span></h3></div><div class="dc-grid">${diffSide(wallMap(tPack.zones.callWalls),wallMap(yPack.zones.callWalls),"Call 牆")}${diffSide(wallMap(tPack.zones.putWalls),wallMap(yPack.zones.putWalls),"Put 牆")}</div></div>`;
}
function renderCompare(date){
  const box=document.getElementById("compareBox"); if(!box) return;
  const d=date||currentDate;
  const hsi=getReportSet("hsi",d), mini=getReportSet("mini",d);
  const settle=settleOf(hsi)||settleOf(mini);
  const minOiF=parseInt(document.getElementById("cmpMinOI")?.value,10)||0;
  const topNF=parseInt(document.getElementById("cmpTopN")?.value,10)||5;
  function sideCard(title,r,mult){
    if(!r) return `<div class="cmp-card"><h3>${title}</h3><div class="mu">此日期無資料</div></div>`;
    const pack=activeMonth(r), b=biasLine(r);
    const callOI=(pack.strikes||[]).reduce((a,x)=>a+(x.callOI||0),0);
    const putOI=(pack.strikes||[]).reduce((a,x)=>a+(x.putOI||0),0);
    const cW=(pack.zones.callWalls||[]).filter(z=>(z.oi||0)>=minOiF).slice(0,topNF);
    const pW=(pack.zones.putWalls||[]).filter(z=>(z.oi||0)>=minOiF).slice(0,topNF);
    return `<div class="cmp-card"><h3><span>${title}</span><span class="tag">${r.date||""} · ${pack.useNext?"下月 "+pack.label:pack.label} · ${mult}</span></h3>
      <div class="cmp-label">偏向</div><div style="font-weight:600;">${b.title}</div><div class="mu" style="font-size:.75rem;margin-bottom:10px;">${b.note}</div>
      <div class="cmp-row"><span>${pack.useNext?"下月":"即月"} Call OI</span><span class="cmp-metric">${fmt(callOI)}</span></div>
      <div class="cmp-row"><span>${pack.useNext?"下月":"即月"} Put OI</span><span class="cmp-metric">${fmt(putOI)}</span></div>
      <div class="cmp-row"><span>Put/Call</span><span class="cmp-metric">${callOI?(putOI/callOI).toFixed(2):"—"}</span></div>
      <div class="cmp-label" style="margin-top:10px;">Call 重貨</div>${cW.map(z=>`<div class="cmp-row"><span class="em">${z.strike}</span><span>OI ${fmt(z.oi)} <span class="${chgClass(z.oiChange)}">${fmtChg(z.oiChange)}</span></span></div>`).join("")||'<div class="mu">無符合</div>'}
      <div class="cmp-label" style="margin-top:10px;">Put 重貨</div>${pW.map(z=>`<div class="cmp-row"><span class="ro">${z.strike}</span><span>OI ${fmt(z.oi)} <span class="${chgClass(z.oiChange)}">${fmtChg(z.oiChange)}</span></span></div>`).join("")||'<div class="mu">無符合</div>'}
    </div>`;
  }
  box.innerHTML = `<div class="note" style="margin-bottom:10px;">對比日期 <strong>${d||"—"}</strong> · Settle <strong>${settle!=null?fmt(settle):"—"}</strong></div><div class="cmp-grid">${sideCard("恒指期權 HSI",hsi,"$50/點")}${sideCard("小型恒指期權 Mini",mini,"$10/點")}</div>`;
}
function renderWalls(){
  const box=document.getElementById("zones"); if(!box||!currentReport) return;
  const pack=activeMonth(currentReport);
  const center=getAtmCenter();
  let calls=(pack.zones.callWalls||[]).slice();
  let puts=(pack.zones.putWalls||[]).slice();
  if(atmEnabled && center){ const keep=z=>Math.abs((z.strike||0)-center)<=atmRange; calls=calls.filter(keep); puts=puts.filter(keep); }
  const sortFn=(a,b)=>{ const k=wallSortKey==="strike"?"strike":wallSortKey==="chg"?"oiChange":"oi"; return wallSortDir==="desc" ? ((b[k]||0)-(a[k]||0)) : ((a[k]||0)-(b[k]||0)); };
  calls.sort(sortFn); puts.sort(sortFn);
  const tag=pack.useNext?"下月":"即月";
  function table(title,cls,rows,isCall){
    return `<div class="section"><div class="section-header"><h2>${title}</h2><span class="tag ${cls}">${tag}</span></div>
      <table><thead><tr><th onclick="setWallSort('strike')">行使價</th><th class="tr" onclick="setWallSort('oi')">未平倉</th><th class="tr" onclick="setWallSort('chg')">變化</th></tr></thead>
      <tbody>${rows.length?rows.map(z=>`<tr onclick="onRowClick(this,event)"><td class="mono ${isCall?"em":"ro"}">${z.strike}</td><td class="tr mono">${fmt(z.oi)}</td><td class="tr mono ${chgClass(z.oiChange)}">${fmtChg(z.oiChange)}</td></tr>`).join(""):'<tr><td colspan="3" class="mu" style="text-align:center;padding:12px;">無資料</td></tr>'}</tbody></table></div>`;
  }
  box.innerHTML = table("Call 重貨區 (潛在阻力)","em",calls,true)+table("Put 重貨區 (潛在支持)","ro",puts,false);
}
function renderStrikeTable(){
  const box=document.getElementById("strikes"); if(!box||!currentReport) return;
  const r=currentReport, pack=activeMonth(r), center=settleOf(r);
  let rows=[...(pack.strikes||[])].filter(s=>{
    const oi=(s.callOI||0)+(s.putOI||0), vol=(s.callVol||0)+(s.putVol||0);
    if(onlyActive && oi===0 && vol===0) return false;
    if(oi<minOI) return false;
    if(vol<minVol) return false;
    if(atmEnabled && center && Math.abs(s.strike-center)>atmRange) return false;
    return true;
  });
  rows.sort((a,b)=>{
    const pick=k=>({callOI:a.callOI||0,putOI:a.putOI||0,callVol:a.callVol||0,putVol:a.putVol||0,totalOI:(a.callOI||0)+(a.putOI||0),chg:Math.max(Math.abs(a.callChange||0),Math.abs(a.putChange||0)),strike:a.strike}[k]||0);
    const pickb=k=>({callOI:b.callOI||0,putOI:b.putOI||0,callVol:b.callVol||0,putVol:b.putVol||0,totalOI:(b.callOI||0)+(b.putOI||0),chg:Math.max(Math.abs(b.callChange||0),Math.abs(b.putChange||0)),strike:b.strike}[k]||0);
    const va=pick(sortKey), vb=pickb(sortKey);
    return sortDir==="desc"? vb-va : va-vb;
  });
  box.innerHTML = `<div class="section"><div class="section-header"><h2>${pack.useNext?"下月":"即月"}行使價分佈 · ${pack.label}</h2><span class="tag">顯示 ${rows.length} / ${(pack.strikes||[]).length}</span></div>
    <div class="controls"><div><label>月份</label><select id="monthSelect" onchange="monthMode=this.value;render(currentDate);">
      <option value="auto" ${monthMode==="auto"?"selected":""}>自動（到期用下月）</option>
      <option value="front" ${monthMode==="front"?"selected":""}>即月 ${r.summary?.frontMonth||""}</option>
      <option value="next" ${monthMode==="next"?"selected":""}>下月 ${r.summary?.nextMonth||""}</option>
    </select></div>
    <div><label>最低 OI</label><input type="number" id="minOI" value="${minOI}" min="0" step="50" onchange="onFilterChange()" /></div>
    <div><label>最低成交量</label><input type="number" id="minVol" value="${minVol}" min="0" step="10" onchange="onFilterChange()" /></div></div>
    <div class="table-wrap"><table><thead><tr>
      <th class="tr" onclick="setStrikeSort('callOI')">Call OI</th><th class="tr" onclick="setStrikeSort('callVol')">Call成交</th>
      <th class="tc" onclick="setStrikeSort('strike')">行使價</th>
      <th class="tl" onclick="setStrikeSort('putOI')">Put OI</th><th class="tl" onclick="setStrikeSort('putVol')">Put成交</th>
    </tr></thead><tbody>
      ${rows.length?rows.map(s=>`<tr onclick="onRowClick(this,event)">
        <td class="tr mono">${fmt(s.callOI||0)}</td><td class="tr mono mu">${fmt(s.callVol||0)}</td>
        <td class="tc mono" style="font-weight:500">${s.strike}</td>
        <td class="tl mono">${fmt(s.putOI||0)}</td><td class="tl mono mu">${fmt(s.putVol||0)}</td>
      </tr>`).join(""):'<tr><td colspan="5" class="mu" style="text-align:center;padding:20px;">沒有符合條件的行使價</td></tr>'}
    </tbody></table></div></div>`;
}
function renderTopVolume(){
  const box=document.getElementById("topVolume"); if(!box||!currentReport) return;
  const items=currentReport.topVolume||[];
  box.innerHTML = `<div class="section"><div class="section-header"><h2>十大成交</h2></div><div class="table-wrap"><table>
    <thead><tr><th>月份</th><th>行使價</th><th>類型</th><th class="tr">成交量</th><th class="tr">OI</th><th class="tr">OI變化</th></tr></thead>
    <tbody>${items.map(it=>`<tr onclick="onRowClick(this,event)"><td class="mono mu">${it.month||""}</td><td class="mono">${it.strike}</td><td class="${it.type==="Call"?"em":"ro"}">${it.type==="Call"?"認購":"認沽"}</td><td class="tr mono">${fmt(it.volume)}</td><td class="tr mono">${fmt(it.oi)}</td><td class="tr mono ${chgClass(it.oiChange)}">${fmtChg(it.oiChange)}</td></tr>`).join("")}</tbody>
  </table></div></div>`;
}
function render(date){
  const r=reports[date];
  const st=document.getElementById("status");
  if(!r){ if(st) st.textContent="沒有資料。請先執行更新。"; return; }
  currentDate=date; currentReport=r;
  const pack=activeMonth(r);
  const monthWord=pack.useNext?"下月":"即月";
  const sumCall=(pack.strikes||[]).reduce((a,x)=>a+(x.callOI||0),0);
  const sumPut=(pack.strikes||[]).reduce((a,x)=>a+(x.putOI||0),0);
  const sumCallChg=pack.useNext?(pack.strikes||[]).reduce((a,x)=>a+(x.callChange||0),0):(r.summary?.callOIChange);
  const sumPutChg=pack.useNext?(pack.strikes||[]).reduce((a,x)=>a+(x.putChange||0),0):(r.summary?.putOIChange);
  if(st) st.textContent=`顯示 ${r.date} · 共 ${availableDates.length} 個交易日 · ${monthWord} ${pack.label} · 行使價 ${(pack.strikes||[]).length} 個`+(pack.useNext?" · 即月已到期":"");
  const sel=document.getElementById("dateSelect");
  if(sel) sel.innerHTML=availableDates.map(d=>`<option value="${d}" ${d===date?"selected":""}>${d}</option>`).join("");
  const sum=document.getElementById("summary");
  if(sum){
    const total=sumCall+sumPut;
    sum.innerHTML=`<div class="card"><div class="label">交易日</div><div class="value">${r.date}</div><div class="subv">前一日 ${r.prevDate||"—"}</div></div>
      <div class="card"><div class="label">${monthWord}</div><div class="value">${pack.label}</div><div class="subv">${pack.useNext?"即月已到期":""}</div></div>
      <div class="card"><div class="label">Call OI</div><div class="value">${fmt(sumCall)}</div><div class="subv ${chgClass(sumCallChg)}">${fmtChg(sumCallChg)}</div></div>
      <div class="card"><div class="label">Put OI</div><div class="value">${fmt(sumPut)}</div><div class="subv ${chgClass(sumPutChg)}">${fmtChg(sumPutChg)}</div></div>
      <div class="card"><div class="label">街貨比例</div><div class="value">${total?(sumCall/total*100).toFixed(1):"—"}% / ${total?(sumPut/total*100).toFixed(1):"—"}%</div><div class="subv">Call / Put</div></div>
      <div class="card"><div class="label">總 OI</div><div class="value">${fmt(total)}</div><div class="subv ${chgClass((sumCallChg||0)+(sumPutChg||0))}">${fmtChg((sumCallChg||0)+(sumPutChg||0))}</div></div>`;
  }
  renderFutures(r); renderLevelsCard(r); renderDayChange(r); renderCompare(r.date||date);
  renderWalls(); renderStrikeTable(); renderTopVolume(); syncAtmUI();
  const src=document.getElementById("sourceLink"); if(src) src.href=r.sourceUrl||"#";
}
(function initProduct(){
  const mH=document.getElementById("menuProdHsi"), mM=document.getElementById("menuProdMini");
  if(mH) mH.classList.toggle("menu-active", productMode==="hsi");
  if(mM) mM.classList.toggle("menu-active", productMode==="mini");
  if(productMode==="mini"){
    const h1=document.querySelector("header h1");
    if(h1) h1.innerHTML='小型恒指期權未平倉 <span>Mini-HSI Options OI</span>';
  }
})();
if (availableDates.length) render(availableDates[0]);
else { const st=document.getElementById("status"); if(st) st.textContent="尚未有數據。請執行 GitHub Actions 更新。"; }
