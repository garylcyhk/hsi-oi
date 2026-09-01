/* Calendar card lives inside #grid so home-order can drag it. */
(function(){
  if(typeof homeSettings==="object" && homeSettings.showCal==null) homeSettings.showCal = true;

  function todayHKT(){
    return new Date(Date.now() + 8*3600*1000).toISOString().slice(0,10);
  }
  function line(e){
    const right = e.actual || (e.forecast && e.forecast!=="\u2014" ? ("預測 "+e.forecast) : (e.time||""));
    return '<div class="ln"><span>'+e.date.slice(5)+' '+e.time+' '+e.ccy+' '+e.name+'</span><span>'+right+'</span></div>';
  }
  function calCard(){
    const d = window.FF_CAL;
    if(!d){
      return '<a class="card" href="./calendar/" draggable="false"><h2><span>日曆 Calendar</span><span class="go">詳情 →</span></h2><div class="bias na">無資料</div></a>';
    }
    const tday = todayHKT();
    const week = d.thisWeek || [];
    const today = week.filter(e => e.date===tday);
    const later = week.filter(e => e.date>tday && e.impact==="high").slice(0,4);
    const show = today.length ? today : week.filter(e => e.impact==="high").slice(0,5);
    const nxt = week.find(e => (e.date||"")>=tday) || week[0];
    const head = nxt ? (nxt.date.slice(5)+' '+nxt.time+' '+nxt.ccy+' '+nxt.name) : (d.rangeLabel||"本週");
    return '<a class="card" href="./calendar/" draggable="false">'+'
      <h2><span>日曆 Calendar</span><span class="go">詳情 →</span></h2>'+'
      <div class="bias mid">'+head+'</div>'+'
      <div class="meta">'+(d.rangeLabel||"")+' · '+(d.tz||"HKT")+'</div>'+'
      <div class="top3">'+'
        <div class="lbl">'+(today.length?("今日 "+tday.slice(5)):"本週重點")+'</div>'+'
        '+(show.map(line).join("")||'<div class="ln"><span>—</span></div>')+'
        '+(later.length?('<div class="lbl">其後高影響</div>'+later.map(line).join("")):"")+'
      </div>'+'
      <div class="row" style="margin-top:8px"><span class="k">更新</span><span>'+(d.asOf||"—")+'</span></div>'+'
    </a>';
  }

  function place(){
    const g = document.getElementById("grid");
    if(!g) return;
    const leftover = document.getElementById("cardCalFixed");
    if(leftover) leftover.remove();
    let box = document.getElementById("cardCal");
    if(!box){
      box = document.createElement("div");
      box.id = "cardCal";
      g.appendChild(box);
    }
    box.innerHTML = calCard();
    box.style.display = (typeof homeSettings==="object" && homeSettings.showCal===false) ? "none" : "";
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
  if(typeof window.saveSettings==="function" && !window.saveSettings._cal){
    const prevS = window.saveSettings;
    window.saveSettings = function(){
      const box = document.getElementById("setShowCal");
      if(box && typeof homeSettings==="object") homeSettings.showCal = box.checked;
      prevS();
    };
    window.saveSettings._cal = true;
  }

  place();
  setTimeout(place, 50);
  setTimeout(place, 400);
})();
