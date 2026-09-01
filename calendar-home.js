/* Homepage calendar tile + width control (1 col / 2 col / full). */
(function(){
  if(typeof homeSettings==="object"){
    if(homeSettings.showCal==null) homeSettings.showCal = true;
    if(!homeSettings.calWidth) homeSettings.calWidth = "1";
  }

  if(!document.getElementById("calCardCss")){
    const s = document.createElement("style");
    s.id = "calCardCss";
    s.textContent =
      "#calPark{display:none!important}"+
      "#cardCal{min-width:0}"+
      "#cardCal.cal-w2{grid-column:span 2}"+
      "#cardCal.cal-wfull{grid-column:1/-1}"+
      "@media(max-width:720px){#cardCal.cal-w2{grid-column:auto}}"+
      "#cardCal .cal-wbtns{display:flex;gap:4px}"+
      "#cardCal .cal-wbtns button{border:1px solid #27272a;background:#18181b;color:#a1a1aa;border-radius:6px;font-size:.68rem;padding:2px 7px;cursor:pointer}"+
      "#cardCal .cal-wbtns button.on{color:#34d399;border-color:rgba(52,211,153,.35);background:rgba(52,211,153,.12)}"+
      "#cardCal .cal-dot{display:inline-block;width:7px;height:7px;border-radius:50%;margin-right:5px;flex:none}"+
      "#cardCal .cal-dot.high{background:#fb7185}#cardCal .cal-dot.med{background:#fbbf24}#cardCal .cal-dot.low{background:#71717a}"+
      "#cardCal .cal-name{flex:1;min-width:0}"+
      "#cardCal .cal-nums{white-space:nowrap;color:#a1a1aa;font-size:.7rem}"+
      "#cardCal .cal-nums .act{color:#e4e4e7;font-weight:600}"+
      "#cardCal .cal-nums .beat{color:#34d399}#cardCal .cal-nums .miss{color:#fb7185}"+
      "#cardCal .top3 .ln{align-items:flex-start;gap:8px}"+
      "#cardCal h2{gap:8px}";
    document.head.appendChild(s);
  }

  const ZH = {
    "ISM Manufacturing PMI": "ISM 製造",
    "ISM Manufacturing Prices": "ISM 製造價格",
    "JOLTS Job Openings": "JOLTS 空缺",
    "GDP q/q": "GDP 季率",
    "ADP Non-Farm Employment Change": "ADP 就業",
    "Unemployment Claims": "失業救濟",
    "ISM Services PMI": "ISM 服務",
    "Average Hourly Earnings m/m": "平均時薪",
    "Non-Farm Employment Change": "非農就業",
    "Unemployment Rate": "失業率",
    "Core PCE m/m": "核心 PCE",
    "Prelim GDP q/q": "GDP 初值",
    "Durable Goods Orders m/m": "耐用品訂單",
    "Chicago PMI": "芝加哥 PMI"
  };

  function width(){
    const w = (typeof homeSettings==="object" && homeSettings.calWidth) || "1";
    return (w==="2"||w==="full") ? w : "1";
  }
  function saveWidth(w){
    if(typeof homeSettings==="object") homeSettings.calWidth = w;
    try {
      const raw = localStorage.getItem("exodus_home_settings_v1");
      const o = raw ? JSON.parse(raw) : {};
      o.calWidth = w;
      localStorage.setItem("exodus_home_settings_v1", JSON.stringify(o));
    } catch(e){}
    applyWidth();
  }
  function applyWidth(){
    const el = document.getElementById("cardCal");
    if(!el) return;
    const w = width();
    el.classList.toggle("cal-w2", w==="2");
    el.classList.toggle("cal-wfull", w==="full");
    el.querySelectorAll(".cal-wbtns button").forEach(function(b){
      b.classList.toggle("on", b.getAttribute("data-w")===w);
    });
  }
  window.setCalWidth = function(w, ev){
    if(ev){ ev.preventDefault(); ev.stopPropagation(); }
    saveWidth(w==="2"||w==="full" ? w : "1");
  };

  function todayHKT(){
    return new Date(Date.now() + 8*3600*1000).toISOString().slice(0,10);
  }
  function nm(e){ return ZH[e.name] || e.name; }
  function beatCls(e){
    if(!e.actual || !e.forecast) return "";
    const a = parseFloat(String(e.actual).replace(/,/g,""));
    const f = parseFloat(String(e.forecast).replace(/,/g,""));
    if(isNaN(a) || isNaN(f) || a===f) return "";
    const goodLow = /失業|unemployment|claims/i.test(e.name);
    if(goodLow) return a<f ? "beat" : "miss";
    return a>f ? "beat" : "miss";
  }
  function nums(e){
    if(e.actual){
      const cls = beatCls(e);
      return '<span class="cal-nums"><span class="act '+cls+'">'+e.actual+'</span>'+
        (e.forecast ? ' / 預 '+e.forecast : '')+
        (e.previous ? ' · 前 '+e.previous : '')+'</span>';
    }
    const bits = [];
    if(e.forecast) bits.push('預 '+e.forecast);
    if(e.previous) bits.push('前 '+e.previous);
    return bits.length ? '<span class="cal-nums">'+bits.join(' · ')+'</span>' : '';
  }
  function line(e){
    const d = (e.date||"").slice(5);
    return '<div class="ln"><span class="cal-name"><i class="cal-dot '+(e.impact||"med")+'"></i>'+
      d+' '+(e.time||"")+' '+(e.ccy||"")+' '+nm(e)+'</span>'+nums(e)+'</div>';
  }
  function wbtns(){
    const w = width();
    return '<span class="cal-wbtns" onclick="event.preventDefault();event.stopPropagation()">'+
      '<button type="button" data-w="1" class="'+(w==="1"?"on":"")+'" onclick="setCalWidth(\'1\',event)">一格</button>'+
      '<button type="button" data-w="2" class="'+(w==="2"?"on":"")+'" onclick="setCalWidth(\'2\',event)">兩格</button>'+
      '<button type="button" data-w="full" class="'+(w==="full"?"on":"")+'" onclick="setCalWidth(\'full\',event)">全闊</button>'+
      '<span class="go">詳情 →</span></span>';
  }

  function html(){
    const d = window.FF_CAL;
    if(!d){
      return '<a class="card" href="./calendar/" draggable="false"><h2><span>日曆 Calendar</span>'+wbtns()+'</h2><div class="bias na">無資料</div></a>';
    }
    const tday = todayHKT();
    const week = d.thisWeek || [];
    const last = (d.lastWeek || []).filter(e => e.actual).slice(0,4);
    const today = week.filter(e => e.date===tday);
    const later = week.filter(e => e.date>tday);
    const highs = week.filter(e => e.impact==="high");
    const nxt = week.find(e => (e.date||"")>=tday && !e.actual) || week.find(e => (e.date||"")>=tday) || week[0];
    const head = nxt ? (nxt.date.slice(5)+' '+nxt.time+' '+nxt.ccy+' '+nm(nxt)) : (d.rangeLabel||"本週");
    return '<a class="card" href="./calendar/" draggable="false">'+
      '<h2><span>日曆 Calendar</span>'+wbtns()+'</h2>'+
      '<div class="bias mid">下一項 · '+head+'</div>'+
      '<div class="meta">'+(d.rangeLabel||"")+' · '+(d.tz||"HKT")+' · 高影響 '+highs.length+' 項</div>'+
      '<div class="top3">'+
        '<div class="lbl">'+(today.length?("今日 "+tday.slice(5)+" · "+today.length+" 項"):"本週重點")+'</div>'+
        (today.length?today.map(line).join(""):highs.slice(0,5).map(line).join(""))+
        (later.length?('<div class="lbl">其後</div>'+later.map(line).join("")):"")+
        (last.length?('<div class="lbl">上週已公布</div>'+last.map(line).join("")):"")+
      '</div>'+
      '<div class="row" style="margin-top:8px"><span class="k">更新</span><span>'+(d.asOf||"—")+'</span></div>'+
    '</a>';
  }

  function place(){
    try {
      const g = document.getElementById("grid");
      let el = document.getElementById("cardCal");
      if(!el){
        el = document.createElement("div");
        el.id = "cardCal";
      }
      el.innerHTML = html();
      el.querySelectorAll("a").forEach(function(a){ a.draggable = false; });
      el.style.display = (homeSettings && homeSettings.showCal===false) ? "none" : "";
      if(g && el.parentNode !== g) g.appendChild(el);
      applyWidth();
      if(typeof window.applyHomeCardOrder==="function") window.applyHomeCardOrder();
    } catch(err){
      try { console.error("calendar-home", err); } catch(e){}
    }
  }

  function injectSetting(){
    if(document.getElementById("setCalWidth")) return;
    const after = document.getElementById("setShowCal");
    if(!after || !after.closest) return;
    const row = after.closest(".modal-row");
    if(!row || !row.parentNode) return;
    const div = document.createElement("div");
    div.className = "modal-row";
    div.innerHTML = '<label>日曆卡闊度 Width</label><select id="setCalWidth">'+
      '<option value="1">一格</option><option value="2">兩格</option><option value="full">全闊</option></select>';
    row.after(div);
  }

  const prev = window.render;
  window.render = function(){
    if(typeof prev==="function") prev();
    place();
  };

  if(typeof window.openSettings==="function" && !window.openSettings._calW){
    const prevO = window.openSettings;
    window.openSettings = function(){
      prevO();
      injectSetting();
      const cb = document.getElementById("setShowCal");
      if(cb) cb.checked = !(homeSettings && homeSettings.showCal===false);
      const sel = document.getElementById("setCalWidth");
      if(sel) sel.value = width();
    };
    window.openSettings._calW = true;
  }
  if(typeof window.saveSettings==="function" && !window.saveSettings._calW){
    const prevS = window.saveSettings;
    window.saveSettings = function(){
      const cb = document.getElementById("setShowCal");
      if(cb && typeof homeSettings==="object") homeSettings.showCal = cb.checked;
      const sel = document.getElementById("setCalWidth");
      if(sel && typeof homeSettings==="object") homeSettings.calWidth = sel.value;
      prevS();
      applyWidth();
    };
    window.saveSettings._calW = true;
  }

  place();
  setTimeout(place, 0);
  setTimeout(place, 250);
  setTimeout(place, 1000);
})();
