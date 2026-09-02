/* Homepage TradingView card — full-width, drag with other tiles. */
(function(){
  if(typeof homeSettings==="object" && homeSettings.showTv==null) homeSettings.showTv = true;

  if(!document.getElementById("tvCardCss")){
    const s=document.createElement("style");
    s.id="tvCardCss";
    s.textContent=
      "#cardTv{grid-column:1/-1;min-width:0}"+
      "#cardTv .tv-card{cursor:default;padding:12px 14px}"+
      "#cardTv .tv-tools{display:flex;flex-wrap:wrap;gap:6px;margin:0 0 8px;align-items:center}"+
      "#cardTv .tv-tools button,#cardTv .tv-tools select{border:1px solid #27272a;background:#111113;color:#e4e4e7;border-radius:6px;padding:3px 8px;font-size:.72rem;cursor:pointer}"+
      "#cardTv .tv-tools button.on{color:#34d399;border-color:rgba(52,211,153,.35);background:rgba(52,211,153,.12)}"+
      "#cardTv .tv-note{font-size:.68rem;color:#71717a;margin:0 0 6px}"+
      "#cardTv iframe{width:100%;height:420px;border:0;border-radius:8px;background:#000;display:block}";
    document.head.appendChild(s);
  }

  const LS="exodus_tv_v1";
  const SYMS=[
    {id:"INDEX:HSI",label:"HSI"},
    {id:"INDEX:HSI",label:"Mini", alias:"mini"},
    {id:"HKEX:0700",label:"0700"},
    {id:"HKEX:9988",label:"9988"},
    {id:"HKEX:3690",label:"3690"},
    {id:"HKEX:1810",label:"1810"}
  ];
  function load(){ try{return JSON.parse(localStorage.getItem(LS)||"{}");}catch(e){return{};} }
  function save(o){ try{localStorage.setItem(LS,JSON.stringify(o));}catch(e){} }
  function migrate(s){
    if(s.symbol==="HKEX:MHI1!" || s.symbol==="HKEX:HSI1!" || s.symbol==="HSI") s.symbol="INDEX:HSI";
    return s;
  }
  function st(){ const s=migrate(load()); return {symbol:s.symbol||"INDEX:HSI", interval:s.interval||"15", pick:s.pick||"HSI"}; }
  function src(symbol,interval){
    const q=new URLSearchParams({
      symbol:symbol, interval:interval, theme:"dark", style:"1",
      timezone:"Asia/Hong_Kong", locale:"zh_TW", toolbarbg:"18181b",
      hideideas:"1", withdateranges:"1", hidesidetoolbar:"1",
      symboledit:"1", saveimage:"0"
    });
    return "https://www.tradingview.com/widgetembed/?"+q.toString();
  }

  function html(){
    const cur=st();
    const btns=SYMS.map(s=>{
      const on = (s.alias||s.label)===cur.pick || (!cur.pick && s.id===cur.symbol && !s.alias);
      return '<button type="button" class="'+(on?"on":"")+'" data-sym="'+s.id+'" data-pick="'+(s.alias||s.label)+'">'+s.label+'</button>';
    }).join("");
    return '<div class="card tv-card">'+
      '<h2><span>圖表 TradingView</span><a class="go" href="./chart/">全螢幕 →</a></h2>'+
      '<p class="tv-note">Mini 跟恒指現貨走勢相同；HKEX 期貨連續合約在 embed 被鎖，要期貨請用全螢幕頁打開 TradingView。</p>'+
      '<div class="tv-tools" onclick="event.preventDefault();event.stopPropagation()">'+btns+
      '<select id="tvHomeInt">'+
        '<option value="5"'+(cur.interval==="5"?" selected":"")+'>·5</option>'+
        '<option value="15"'+(cur.interval==="15"?" selected":"")+'>·15</option>'+
        '<option value="60"'+(cur.interval==="60"?" selected":"")+'>·60</option>'+
        '<option value="D"'+(cur.interval==="D"?" selected":"")+'>日</option>'+
      '</select></div>'+
      '<iframe title="TradingView" src="'+src(cur.symbol,cur.interval)+'"></iframe>'+
    '</div>';
  }

  function bind(el){
    el.querySelectorAll("[data-sym]").forEach(function(b){
      b.onclick=function(e){
        e.preventDefault(); e.stopPropagation();
        const s=st(); s.symbol=b.getAttribute("data-sym"); s.pick=b.getAttribute("data-pick"); save(s); place(true);
      };
    });
    const sel=el.querySelector("#tvHomeInt");
    if(sel) sel.onchange=function(){
      const s=st(); s.interval=this.value; save(s); place(true);
    };
  }

  function place(force){
    try{
      const g=document.getElementById("grid");
      if(!g) return;
      let el=document.getElementById("cardTv");
      if(!el){
        el=document.createElement("div");
        el.id="cardTv";
      }
      if(force || !el.querySelector("iframe")){
        el.innerHTML=html();
        bind(el);
      }
      el.style.display=(homeSettings && homeSettings.showTv===false)?"none":"";
      if(el.parentNode!==g) g.appendChild(el);
      if(typeof window.applyHomeCardOrder==="function") window.applyHomeCardOrder();
    }catch(err){}
  }

  const prev=window.render;
  window.render=function(){
    if(typeof prev==="function") prev();
    place();
  };

  if(typeof window.openSettings==="function" && !window.openSettings._tv){
    const prevO=window.openSettings;
    window.openSettings=function(){
      prevO();
      if(!document.getElementById("setShowTv")){
        const after=document.getElementById("setShowCal");
        const row=after && after.closest && after.closest(".modal-row");
        if(row){
          const div=document.createElement("div");
          div.className="modal-row";
          div.innerHTML='<label>顯示 TradingView 圖</label><input type="checkbox" id="setShowTv" />';
          row.after(div);
        }
      }
      const cb=document.getElementById("setShowTv");
      if(cb) cb.checked=!(homeSettings && homeSettings.showTv===false);
    };
    window.openSettings._tv=true;
  }
  if(typeof window.saveSettings==="function" && !window.saveSettings._tv){
    const prevS=window.saveSettings;
    window.saveSettings=function(){
      const cb=document.getElementById("setShowTv");
      if(cb && typeof homeSettings==="object") homeSettings.showTv=cb.checked;
      prevS();
      const el=document.getElementById("cardTv");
      if(el) el.style.display=(homeSettings && homeSettings.showTv===false)?"none":"";
    };
    window.saveSettings._tv=true;
  }

  place();
  setTimeout(place, 200);
  setTimeout(place, 800);
})();
