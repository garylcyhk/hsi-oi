/* Calendar card: parked outside #grid so render() cannot delete it, then moved in for layout + drag. */
(function(){
  if(typeof homeSettings==="object" && homeSettings.showCal==null) homeSettings.showCal = true;

  if(!document.getElementById("calCardCss")){
    const s = document.createElement("style");
    s.id = "calCardCss";
    s.textContent =
      "#cardCal .cal-dot{display:inline-block;width:7px;height:7px;border-radius:50%;margin-right:5px;vertical-align:middle}"+
      "#cardCal .cal-dot.high{background:#fb7185}#cardCal .cal-dot.med{background:#fbbf24}#cardCal .cal-dot.low{background:#71717a}"+
      "#cardCal .cal-name{flex:1;min-width:0}"+
      "#cardCal .cal-nums{white-space:nowrap;color:#a1a1aa;font-size:.7rem}"+
      "#cardCal .cal-nums .act{color:#e4e4e7;font-weight:600}"+
      "#cardCal .cal-nums .beat{color:#34d399}#cardCal .cal-nums .miss{color:#fb7185}"+
      "#cardCal .top3 .ln{align-items:flex-start}";
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

  function todayHKT(){
    return new Date(Date.now() + 8*3600*1000).toISOString().slice(0,10);
  }
  function nm(e){ return ZH[e.name] || e.name; }
  function beatCls(e){
    if(!e.actual || !e.forecast || e.actual==="\u2014" || e.forecast==="\u2014") return "";
    const a = parseFloat(String(e.actual).replace(/,/g,""));
    const f = parseFloat(String(e.forecast).replace(/,/g,""));
    if(isNaN(a) || isNaN(f)) return "";
    if(a===f) return "";
    const goodHigh = /pmi|gdp|employment change|jolts|durable|hourly|pce/i.test(e.name);
    const goodLow = /unemployment|claims/i.test(e.name);
    if(goodLow) return a<f ? "beat" : "miss";
    if(goodHigh) return a>f ? "beat" : "miss";
    return "";
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
    return '<div class="ln">'+'
      '<span class="cal-name"><i class="cal-dot '+(e.impact||"med")+'"></i>'+
      e.date.slice(5)+' '+e.time+' '+e.ccy+' '+nm(e)+'</span>'+nums(e)+'
    </div>';
  }

  function html(){
    const d = window.FF_CAL;
    if(!d){
      return '<a class="card" href="./calendar/" draggable="false"><h2><span>日曆 Calendar</span><span class="go">詳情 →</span></h2><div class="bias na">無資料</div></a>';
    }
    const tday = todayHKT();
    const week = d.thisWeek || [];
    const last = d.lastWeek || [];
    const today = week.filter(e => e.date===tday);
    const later = week.filter(e => e.date>tday);
    const highs = week.filter(e => e.impact==="high");
    const nxt = week.find(e => (e.date||"")>=tday && !e.actual) || week.find(e => (e.date||"")>=tday) || week[0];
    const head = nxt ? (nxt.date.slice(5)+' '+nxt.time+' '+nxt.ccy+' '+nm(nxt)) : (d.rangeLabel||"本週");
    const lastHits = last.filter(e => e.actual).slice(0,4);
    return '<a class="card" href="./calendar/" draggable="false">'+'
      <h2><span>日曆 Calendar</span><span class="go">詳情 →</span></h2>'+'
      <div class="bias mid">下一項 · '+head+'</div>'+'
      <div class="meta">'+(d.rangeLabel||"")+' · '+(d.tz||"HKT")+' · 高影響 '+highs.length+' 項</div>'+'
      <div class="top3">'+'
        <div class="lbl">'+(today.length?("今日 "+tday.slice(5)+" · "+today.length+" 項"):"本週重點")+'</div>'+'
        '+(today.length?today.map(line).join(""):(highs.slice(0,4).map(line).join("")||'<div class="ln"><span>—</span></div>'))+'
        '+(later.length?('<div class="lbl">其後 '+later.length+' 項</div>'+later.map(line).join("")):"")+'
        '+(lastHits.length?('<div class="lbl">上週已公布</div>'+lastHits.map(line).join("")):"")+'
      </div>'+'
      <div class="row" style="margin-top:8px"><span class="k">更新</span><span>'+(d.asOf||"—")+'</span></div>'+'
    </a>';
  }

  function box(){
    let el = document.getElementById("cardCal");
    if(el) return el;
    el = document.createElement("div");
    el.id = "cardCal";
    const park = document.getElementById("calPark") || document.querySelector(".container") || document.body;
    park.appendChild(el);
    return el;
  }

  function place(){
    const g = document.getElementById("grid");
    const el = box();
    el.innerHTML = html();
    el.querySelectorAll("a").forEach(function(a){ a.draggable = false; });
    const hide = (typeof homeSettings==="object" && homeSettings.showCal===false);
    el.style.display = hide ? "none" : "";
    if(g && el.parentNode !== g) g.appendChild(el);
    if(typeof window.applyHomeCardOrder==="function") window.applyHomeCardOrder();
  }

  const prev = window.render;
  window.render = function(){
    if(typeof prev==="function") prev();
    place();
  };

  if(typeof window.applyHomeSettings==="function" && !window.applyHomeSettings._cal){
    const prevA = window.applyHomeSettings;
    window.applyHomeSettings = function(){
      prevA();
      const el = document.getElementById("cardCal");
      if(el) el.style.display = (homeSettings && homeSettings.showCal===false) ? "none" : "";
    };
    window.applyHomeSettings._cal = true;
  }
  if(typeof window.openSettings==="function" && !window.openSettings._cal){
    const prevO = window.openSettings;
    window.openSettings = function(){
      prevO();
      const cb = document.getElementById("setShowCal");
      if(cb) cb.checked = !(homeSettings && homeSettings.showCal===false);
    };
    window.openSettings._cal = true;
  }
  if(typeof window.saveSettings==="function" && !window.saveSettings._cal){
    const prevS = window.saveSettings;
    window.saveSettings = function(){
      const cb = document.getElementById("setShowCal");
      if(cb && typeof homeSettings==="object") homeSettings.showCal = cb.checked;
      prevS();
    };
    window.saveSettings._cal = true;
  }

  place();
  setTimeout(place, 0);
  setTimeout(place, 200);
  setTimeout(place, 800);
})();
