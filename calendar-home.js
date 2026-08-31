/* Force calendar card onto homepage grid after every render. */
(function(){
  if(typeof homeSettings==="object" && homeSettings.showCal==null) homeSettings.showCal = true;

  function todayHKT(){
    return new Date(Date.now() + 8*3600*1000).toISOString().slice(0,10);
  }
  function line(e){
    const right = e.actual || (e.forecast && e.forecast!=="\u2014" ? ("\u9810\u6e2c "+e.forecast) : (e.time||""));
    return '<div class="ln"><span>'+e.date.slice(5)+' '+e.time+' '+e.ccy+' '+e.name+'</span><span>'+right+'</span></div>';
  }
  function calCard(){
    const d = window.FF_CAL;
    if(!d){
      return '<a class="card" href="./calendar/"><h2><span>\u65e5\u66c6 Calendar</span><span class="go">\u8a73\u60c5 \u2192</span></h2><div class="bias na">\u7121\u8cc7\u6599</div></a>';
    }
    const tday = todayHKT();
    const week = d.thisWeek || [];
    const today = week.filter(e => e.date===tday);
    const later = week.filter(e => e.date>tday && e.impact==="high").slice(0,4);
    const show = today.length ? today : week.filter(e => e.impact==="high").slice(0,5);
    const nxt = week.find(e => (e.date||"")>=tday) || week[0];
    const head = nxt ? (nxt.date.slice(5)+' '+nxt.time+' '+nxt.ccy+' '+nxt.name) : (d.rangeLabel||"\u672c\u9031");
    return '<a class="card" href="./calendar/">'+'
      <h2><span>\u65e5\u66c6 Calendar</span><span class="go">\u8a73\u60c5 \u2192</span></h2>'+'
      <div class="bias mid">'+head+'</div>'+'
      <div class="meta">'+(d.rangeLabel||"")+' \u00b7 '+(d.tz||"HKT")+'</div>'+'
      <div class="top3">'+'
        <div class="lbl">'+(today.length?("\u4eca\u65e5 "+tday.slice(5)):"\u672c\u9031\u91cd\u9ede")+'</div>'+'
        '+(show.map(line).join("")||'<div class="ln"><span>\u2014</span></div>')+'
        '+(later.length?('<div class="lbl">\u5176\u5f8c\u9ad8\u5f71\u97ff</div>'+later.map(line).join("")):"")+'
      </div>'+'
      <div class="row" style="margin-top:8px"><span class="k">\u66f4\u65b0</span><span>'+(d.asOf||"\u2014")+'</span></div>'+'
    </a>';
  }

  function place(){
    const g = document.getElementById("grid");
    if(!g) return;
    let box = document.getElementById("cardCal");
    if(!box){
      box = document.createElement("div");
      box.id = "cardCal";
      const after = document.getElementById("cardCbbc") || document.getElementById("cardFut") || g.lastElementChild;
      if(after && after.parentNode===g) after.after(box);
      else g.appendChild(box);
    }
    box.innerHTML = calCard();
    box.style.display = (typeof homeSettings==="object" && homeSettings.showCal===false) ? "none" : "";
  }

  const prev = window.render;
  window.render = function(){
    if(typeof prev==="function") prev();
    place();
  };

  if(typeof window.applyHomeSettings==="function"){
    const prevA = window.applyHomeSettings;
    window.applyHomeSettings = function(){
      prevA();
      const el = document.getElementById("cardCal");
      if(el) el.style.display = (homeSettings && homeSettings.showCal===false) ? "none" : "";
    };
  }

  place();
  setTimeout(place, 0);
  setTimeout(place, 200);
})();
