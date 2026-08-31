function setMonthMode(mode){
  monthMode = mode || "auto";
  if (typeof currentDate!=="undefined" && currentDate && typeof render==="function") render(currentDate);
}
(function injectDistCss(){
  if (document.getElementById("sgDistCss")) return;
  const s=document.createElement("style");
  s.id="sgDistCss";
  s.textContent=".sg-dist .section-header{align-items:center;gap:12px;flex-wrap:wrap}.sg-month{display:flex;gap:14px;align-items:center;font-size:.8rem;color:var(--muted)}.sg-month label{display:flex;align-items:center;gap:5px;cursor:pointer;white-space:nowrap}.sg-month input{accent-color:#e11d48}.sg-ratio-wrap{padding:10px 14px 4px}.sg-ratio-label{text-align:center;font-size:.72rem;color:var(--muted);margin-bottom:6px}.sg-ratio{display:flex;height:22px;border-radius:3px;overflow:hidden;font-size:.7rem;font-weight:600;line-height:22px}.sg-ratio-call{background:#e11d48;color:#fff;text-align:left;padding:0 8px;min-width:fit-content}.sg-ratio-put{background:#059669;color:#fff;text-align:right;padding:0 8px;min-width:fit-content}.sg-table{min-width:720px!important}.sg-table th{white-space:normal;line-height:1.25}.sg-pct{width:72px;font-size:.75rem}.sg-k{font-weight:700;width:88px;background:rgba(39,39,42,.35)}.sg-call,.sg-put{min-width:220px}.sg-cell{display:flex;align-items:center;gap:8px}.sg-cell-call{justify-content:flex-end}.sg-cell-put{justify-content:flex-start}.sg-meta{font-size:.78rem;font-family:ui-monospace,Menlo,monospace;white-space:nowrap;display:flex;align-items:center;gap:6px}.sg-track{width:120px;height:14px;position:relative;flex:0 0 120px}.sg-bar{position:absolute;top:0;bottom:0;border-radius:2px}.sg-bar-call{right:0;background:#e11d48}.sg-bar-put{left:0;background:#059669}.sg-badge{font-size:.62rem;font-weight:600;padding:1px 5px;border-radius:3px}.sg-wall{background:#111;color:#fff}.sg-add{color:#f59e0b}.sg-close td{text-align:center;font-size:.78rem;color:var(--muted);padding:8px;background:#111113;border-top:1px solid var(--border);border-bottom:1px solid var(--border)}.sg-close strong{color:var(--text);margin-left:6px}@media(max-width:800px){.sg-track{width:72px;flex-basis:72px}.sg-call,.sg-put{min-width:160px}}";
  document.head.appendChild(s);
})();
function renderStrikeTable(){
  const box=document.getElementById("strikes"); if(!box||!currentReport) return;
  const r=currentReport, pack=activeMonth(r), center=settleOf(r);
  const monthWord = pack.useNext ? "\u4e0b\u6708" : "\u5373\u6708";
  let rows=[...(pack.strikes||[])];
  if (typeof attachGreeks==="function") attachGreeks(rows, center, pack.label);
  rows=rows.filter(s=>{
    const call=s.callOI||0, put=s.putOI||0, oi=call+put;
    const vol=(s.callVol||0)+(s.putVol||0);
    const chg=Math.max(Math.abs(s.callChange||0), Math.abs(s.putChange||0));
    if(onlyActive && oi===0 && vol===0 && chg===0) return false;
    if(Math.max(call, put, chg) < minOI) return false;
    if(vol<minVol) return false;
    if(atmEnabled && center && Math.abs(s.strike-center)>atmRange) return false;
    return true;
  });
  const getter={
    callOI:s=>s.callOI||0, putOI:s=>s.putOI||0,
    totalOI:s=>(s.callOI||0)+(s.putOI||0),
    chg:s=>Math.max(Math.abs(s.callChange||0),Math.abs(s.putChange||0)),
    strike:s=>s.strike
  };
  const g=getter[sortKey]||getter.strike;
  rows.sort((a,b)=> sortDir==="desc" ? g(b)-g(a) : g(a)-g(b));
  const sumCall=rows.reduce((a,x)=>a+(x.callOI||0),0);
  const sumPut=rows.reduce((a,x)=>a+(x.putOI||0),0);
  const tot=sumCall+sumPut;
  const callPct=tot?(sumCall/tot*100):0, putPct=tot?(sumPut/tot*100):0;
  const maxOI=Math.max(1, ...rows.map(x=>Math.max(x.callOI||0,x.putOI||0)));
  const maxCall=rows.reduce((m,x)=> (x.callOI||0)>m.oi?{oi:x.callOI,strike:x.strike}:m, {oi:0,strike:null});
  const maxPut=rows.reduce((m,x)=> (x.putOI||0)>m.oi?{oi:x.putOI,strike:x.strike}:m, {oi:0,strike:null});
  const maxCallAdd=rows.reduce((m,x)=> (x.callChange||0)>m.chg?{chg:x.callChange,strike:x.strike}:m, {chg:0,strike:null});
  const maxPutAdd=rows.reduce((m,x)=> (x.putChange||0)>m.chg?{chg:x.putChange,strike:x.strike}:m, {chg:0,strike:null});
  function badge(kind){
    if(kind==="wall") return '<span class="sg-badge sg-wall">\u91cd\u8ca8\u5340</span>';
    if(kind==="add") return '<span class="sg-badge sg-add">\u25b2 \u6700\u591a\u65b0\u589e</span>';
    return "";
  }
  function closeRow(){
    if(center==null) return "";
    return '<tr class="sg-close"><td colspan="5">\u4e0a\u65e5\u7d50\u7b97 / Settle <strong>'+Number(center).toLocaleString("en-US")+'</strong></td></tr>';
  }
  const bodyParts=[];
  let closeInserted=false;
  rows.forEach(s=>{
    if(center!=null && !closeInserted && s.strike < center){ bodyParts.push(closeRow()); closeInserted=true; }
    const cw=Math.round(((s.callOI||0)/maxOI)*100);
    const pw=Math.round(((s.putOI||0)/maxOI)*100);
    const cShare=sumCall?((s.callOI||0)/sumCall*100):0;
    const pShare=sumPut?((s.putOI||0)/sumPut*100):0;
    const near = center && Math.abs(s.strike-center)<=200;
    const isCallWall = maxCall.strike===s.strike && maxCall.oi>0;
    const isPutWall = maxPut.strike===s.strike && maxPut.oi>0;
    const isCallAdd = maxCallAdd.strike===s.strike && maxCallAdd.chg>0;
    const isPutAdd = maxPutAdd.strike===s.strike && maxPutAdd.chg>0;
    bodyParts.push('<tr class="'+(near?"row-atm":"")+'" onclick="onRowClick(this,event)">'+'
      <td class="tr mono mu sg-pct">'+(cShare?cShare.toFixed(2)+"%":"0.00%")+'</td>'+'
      <td class="sg-call"><div class="sg-cell sg-cell-call"><div class="sg-meta">'+fmt(s.callOI||0)+'<span class="'+chgClass(s.callChange)+'">['+fmtChg(s.callChange)+']</span>'+(isCallWall?badge("wall"):"")+(isCallAdd?badge("add"):"")+'</div><div class="sg-track"><div class="sg-bar sg-bar-call" style="width:'+cw+'%"></div></div></div></td>'+'
      <td class="tc mono sg-k">'+Number(s.strike).toLocaleString("en-US")+'</td>'+'
      <td class="sg-put"><div class="sg-cell sg-cell-put"><div class="sg-track"><div class="sg-bar sg-bar-put" style="width:'+pw+'%"></div></div><div class="sg-meta">'+(isPutAdd?badge("add"):"")+(isPutWall?badge("wall"):"")+'<span class="'+chgClass(s.putChange)+'">['+fmtChg(s.putChange)+']</span>'+fmt(s.putOI||0)+'</div></div></td>'+'
      <td class="tl mono mu sg-pct">'+(pShare?pShare.toFixed(2)+"%":"0.00%")+'</td></tr>');
  });
  if(center!=null && !closeInserted) bodyParts.push(closeRow());
  const frontLab = (r.summary&&r.summary.frontMonth)||"";
  const nextLab = (r.summary&&r.summary.nextMonth)||"";
  box.innerHTML = '<div class="section sg-dist">'+
    '<div class="section-header"><h2>\u884c\u4f7f\u50f9\u5206\u4f48 \u00b7 '+monthWord+' '+pack.label+'</h2>'+
    '<div class="sg-month">'+
      '<label><input type="radio" name="sgMonth" '+(monthMode==="front"?"checked":"")+' onchange="setMonthMode(\'front\')" /> \u5373\u6708 '+frontLab+'</label>'+
      '<label><input type="radio" name="sgMonth" '+(monthMode==="next"?"checked":"")+' onchange="setMonthMode(\'next\')" /> \u4e0b\u6708 '+nextLab+'</label>'+
      '<label><input type="radio" name="sgMonth" '+(monthMode==="auto"?"checked":"")+' onchange="setMonthMode(\'auto\')" /> \u81ea\u52d5</label>'+
    '</div></div>'+
    '<div class="sg-ratio-wrap"><div class="sg-ratio-label">\u6052\u6307\u671f\u6b0a\u672a\u5e73\u5009\u6bd4\u4f8b</div>'+
    '<div class="sg-ratio"><div class="sg-ratio-call" style="width:'+callPct+'%">'+monthWord+' \u8a8d\u8cfc '+callPct.toFixed(1)+'%</div>'+
    '<div class="sg-ratio-put" style="width:'+putPct+'%">'+monthWord+' \u8a8d\u6cbd '+putPct.toFixed(1)+'%</div></div></div>'+
    '<div class="controls"><div><label>\u6700\u4f4e OI</label><input type="number" id="minOI" value="'+minOI+'" min="0" step="50" onchange="onFilterChange()" /></div>'+
    '<div><label>\u6700\u4f4e\u6210\u4ea4\u91cf</label><input type="number" id="minVol" value="'+minVol+'" min="0" step="10" onchange="onFilterChange()" /></div>'+
    '<span class="tag">\u986f\u793a '+rows.length+' / '+(pack.strikes||[]).length+' \u00b7 \u8a8d\u8cfc '+fmt(sumCall)+' / \u8a8d\u6cbd '+fmt(sumPut)+'</span></div>'+
    '<div class="table-wrap"><table class="sg-table"><thead><tr>'+
      '<th class="tr">\u8857\u8ca8\u4f54\u6bd4(%)</th>'+
      '<th class="tr sortable '+(sortKey==="callOI"?"active":"")+'" onclick="setStrikeSort(\'callOI\')">'+monthWord+'\u8a8d\u8cfc\u672a\u5e73\u5009 [\u9694\u65e5\u8b8a\u5316]</th>'+
      '<th class="tc sortable '+(sortKey==="strike"?"active":"")+'" onclick="setStrikeSort(\'strike\')">\u884c\u4f7f\u50f9</th>'+
      '<th class="tl sortable '+(sortKey==="putOI"?"active":"")+'" onclick="setStrikeSort(\'putOI\')">'+monthWord+'\u8a8d\u6cbd\u672a\u5e73\u5009 [\u9694\u65e5\u8b8a\u5316]</th>'+
      '<th class="tl">\u8857\u8ca8\u4f54\u6bd4(%)</th>'+
    '</tr></thead><tbody>'+(rows.length?bodyParts.join(""):'<tr><td colspan="5" class="mu" style="text-align:center;padding:20px;">\u6c92\u6709\u7b26\u5408\u689d\u4ef6\u7684\u884c\u4f7f\u50f9</td></tr>')+'</tbody></table></div></div>';
}
if (typeof currentDate!=="undefined" && currentDate && typeof renderStrikeTable==="function") {
  try { renderStrikeTable(); } catch(e) {}
}
