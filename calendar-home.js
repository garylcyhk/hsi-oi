/* Homepage economic calendar card */
(function(){
  function fmtEv(e){
    const act = e.actual && e.actual!=="\u2014" ? e.actual : "";
    return '<div class="ln"><span>'+e.date.slice(5)+' '+e.ccy+' '+e.name+'</span><span>'+(act||e.time||"")+'</span></div>';
  }
  function calendarCard(){
    const d = window.FF_CAL;
    if(!d){
      return '<a class="card" href="./calendar/"><h2><span>\u7d93\u6fdf\u65e5\u66c6</span><span class="go">\u8a73\u60c5 \u2192</span></h2><div class="bias na">\u7121\u8cc7\u6599</div></a>';
    }
    const up = (d.thisWeek||[]).filter(e=>e.impact==="high").slice(0,4);
    const last = (d.lastWeek||[]).filter(e=>e.impact==="high").slice(-3);
    return '<a class="card" href="./calendar/">'+'
      <h2><span>\u7d93\u6fdf\u65e5\u66c6</span><span class="go">\u8a73\u60c5 \u2192</span></h2>'+'
      <div class="bias mid">'+(d.rangeLabel||"\u672c\u9031")+'</div>'+'
      <div class="meta">'+(d.note||"")+'</div>'+'
      <div class="top3">'+'
        <div class="lbl">\u672c\u9031\u91cd\u9ede\uff08HKT\uff09</div>'+'
        '+(up.map(fmtEv).join("")||'<div class="ln"><span>\u2014</span></div>')+'
        <div class="lbl">\u4e0a\u9031\u5df2\u516c\u5e03</div>'+'
        '+(last.map(fmtEv).join("")||'<div class="ln"><span>\u2014</span></div>')+'
      </div>'+'
      <div class="row" style="margin-top:8px"><span class="k">\u66f4\u65b0</span><span>'+(d.asOf||"\u2014")+' \u00b7 '+(d.tz||"HKT")+'</span></div>'+'
    </a>';
  }
  function inject(){
    const grid = document.getElementById("grid");
    if(!grid) return;
    let box = document.getElementById("cardCal");
    if(!box){
      box = document.createElement("div");
      box.id = "cardCal";
      grid.appendChild(box);
    }
    box.innerHTML = calendarCard();
    const menu = document.querySelector(".menu-dropdown");
    if(menu && !menu.querySelector('a[href="./calendar/"]')){
      const a = document.createElement("a");
      a.href = "./calendar/";
      a.textContent = "\u7d93\u6fdf\u65e5\u66c6 Calendar";
      const cbbc = menu.querySelector('a[href="./cbbc/"]');
      if(cbbc && cbbc.nextSibling) menu.insertBefore(a, cbbc.nextSibling);
      else menu.appendChild(a);
    }
  }
  if(typeof render==="function"){
    const orig = render;
    window.render = function(){ orig(); inject(); };
  }
  inject();
})();
