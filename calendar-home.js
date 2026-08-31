/* Homepage 日曆 card — baked into #grid like CBBC */
(function(){
  if(typeof homeSettings==="object" && homeSettings.showCal==null) homeSettings.showCal = true;

  function todayStr(){
    const n = new Date();
    const z = new Date(n.getTime() + 8*3600*1000);
    return z.toISOString().slice(0,10);
  }
  function evRight(e){
    if(e.actual) return e.actual;
    if(e.forecast && e.forecast!=="\u2014" && e.forecast!=="—") return "預測 "+e.forecast;
    return e.time||"";
  }
  function fmtEv(e){
    return '<div class="ln"><span>'+e.date.slice(5)+' '+e.time+' '+e.ccy+' '+e.name+'</span><span>'+evRight(e)+'</span></div>';
  }
  function nextHeadline(list){
    const t = todayStr();
    const up = (list||[]).filter(e => (e.date||"") >= t);
    return up[0] || (list||[])[0] || null;
  }
  function calendarCard(){
    const d = window.FF_CAL;
    if(!d){
      return '<a class="card" href="./calendar/"><h2><span>日曆</span><span class="go">詳情 →</span></h2><div class="bias na">無資料</div></a>';
    }
    const t = todayStr();
    const week = d.thisWeek || [];
    const today = week.filter(e => e.date===t);
    const later = week.filter(e => e.date>t && e.impact==="high").slice(0,4);
    const show = (today.length?today:week.filter(e=>e.impact==="high").slice(0,4));
    const nxt = nextHeadline(week);
    const head = nxt ? (nxt.date.slice(5)+' '+nxt.time+' '+nxt.ccy+' '+nxt.name) : (d.rangeLabel||"本週");
    return '<a class="card" href="./calendar/">'+'
      <h2><span>日曆 Calendar</span><span class="go">詳情 →</span></h2>'+'
      <div class="bias mid">'+head+'</div>'+'
      <div class="meta">'+(d.rangeLabel||"")+' · 時區 '+(d.tz||"HKT")+'</div>'+'
      <div class="top3">'+'
        <div class="lbl">'+(today.length?"今日 "+t.slice(5):"本週重點")+'</div>'+'
        '+(show.map(fmtEv).join("")||'<div class="ln"><span>—</span></div>')+'
        '+(later.length?'<div class="lbl">其後高影響</div>'+later.map(fmtEv).join(""):'')+'
      </div>'+'
      <div class="row" style="margin-top:8px"><span class="k">更新</span><span>'+(d.asOf||"—")+'</span></div>'+'
    </a>';
  }

  function placeCard(){
    const grid = document.getElementById("grid");
    if(!grid) return false;
    let box = document.getElementById("cardCal");
    if(!box){
      box = document.createElement("div");
      box.id = "cardCal";
      const after = document.getElementById("cardCbbc") || document.getElementById("cardFut");
      if(after && after.parentNode===grid) after.after(box);
      else grid.appendChild(box);
    }
    box.innerHTML = calendarCard();
    if(typeof homeSettings==="object" && homeSettings.showCal===false) box.style.display = "none";
    else box.style.display = "";
    return true;
  }

  function hookRender(){
    if(typeof window.render!=="function" || window.render._calHooked) return;
    const orig = window.render;
    window.render = function(){
      orig();
      placeCard();
    };
    window.render._calHooked = true;
  }
  function hookSettings(){
    if(typeof window.applyHomeSettings==="function" && !window.applyHomeSettings._calHooked){
      const orig = window.applyHomeSettings;
      window.applyHomeSettings = function(){
        orig();
        const el = document.getElementById("cardCal");
        if(el) el.style.display = (homeSettings && homeSettings.showCal===false) ? "none" : "";
      };
      window.applyHomeSettings._calHooked = true;
    }
    if(typeof window.saveSettings==="function" && !window.saveSettings._calHooked){
      const orig = window.saveSettings;
      window.saveSettings = function(){
        const box = document.getElementById("setShowCal");
        if(box && typeof homeSettings==="object") homeSettings.showCal = box.checked;
        orig();
      };
      window.saveSettings._calHooked = true;
    }
    if(typeof window.openSettings==="function" && !window.openSettings._calHooked){
      const orig = window.openSettings;
      window.openSettings = function(){
        orig();
        const box = document.getElementById("setShowCal");
        if(box && typeof homeSettings==="object") box.checked = homeSettings.showCal !== false;
      };
      window.openSettings._calHooked = true;
    }
    if(!document.getElementById("setShowCal")){
      const todo = document.getElementById("setShowTodo");
      const host = todo && todo.closest ? todo.closest(".modal-row") : null;
      if(host && host.parentNode){
        const row = document.createElement("div");
        row.className = "modal-row";
        row.innerHTML = '<label>顯示日曆卡</label><input type="checkbox" id="setShowCal" checked />';
        host.parentNode.insertBefore(row, host);
      }
    }
  }

  hookRender();
  hookSettings();
  placeCard();
  setTimeout(function(){ hookRender(); hookSettings(); placeCard(); }, 50);
})();
