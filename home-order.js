/* Drag homepage cards to reorder. Saved in this browser. */
(function(){
  const LS = "exodus_home_card_order_v1";
  let dragging = null;
  let moved = false;

  function grid(){ return document.getElementById("grid"); }
  function kids(g){ return [...(g||[]).children].filter(el => el.id); }

  function save(g){
    try { localStorage.setItem(LS, JSON.stringify(kids(g).map(el => el.id))); } catch(e){}
  }
  function restore(g){
    if(!g) return;
    let order = null;
    try { order = JSON.parse(localStorage.getItem(LS) || "null"); } catch(e){}
    if(!Array.isArray(order) || !order.length) return;
    const map = {};
    kids(g).forEach(el => { map[el.id] = el; });
    order.forEach(id => { if(map[id]) g.appendChild(map[id]); });
    kids(g).forEach(el => { if(!order.includes(el.id)) g.appendChild(el); });
  }

  function bind(el){
    if(!el || el._homeOrd) return;
    el._homeOrd = true;
    el.draggable = true;
    el.style.cursor = "grab";
    el.addEventListener("dragstart", function(e){
      dragging = el;
      moved = false;
      el.classList.add("card-dragging");
      try {
        e.dataTransfer.setData("text/plain", el.id);
        e.dataTransfer.effectAllowed = "move";
      } catch(err){}
    });
    el.addEventListener("dragend", function(){
      el.classList.remove("card-dragging");
      dragging = null;
      setTimeout(function(){ moved = false; }, 50);
    });
    el.addEventListener("dragover", function(e){
      e.preventDefault();
      if(!dragging || dragging===el) return;
      const g = grid();
      const list = kids(g);
      if(list.indexOf(dragging) < list.indexOf(el)) el.after(dragging);
      else el.before(dragging);
      moved = true;
    });
    el.addEventListener("drop", function(e){
      e.preventDefault();
      save(grid());
    });
    el.addEventListener("click", function(e){
      if(moved){
        e.preventDefault();
        e.stopPropagation();
      }
    }, true);
  }

  function apply(){
    const g = grid();
    if(!g) return;
    restore(g);
    kids(g).forEach(bind);
  }

  function hook(){
    if(typeof window.render==="function" && !window.render._homeOrd){
      const orig = window.render;
      window.render = function(){
        orig();
        apply();
      };
      window.render._homeOrd = true;
    }
  }

  if(!document.getElementById("homeOrderCss")){
    const s = document.createElement("style");
    s.id = "homeOrderCss";
    s.textContent = "#grid > [id]{cursor:grab}#grid > .card-dragging{opacity:.45}#grid > [id]:active{cursor:grabbing}"+
      ".tag.res{background:rgba(244,63,94,.15);color:#fb7185}.tag.sup{background:rgba(52,211,153,.15);color:#34d399}.tag.mid{background:rgba(251,191,36,.12);color:#fbbf24}"+
      ".cons-banner.agree{border-color:rgba(52,211,153,.35);background:rgba(52,211,153,.08);color:#34d399}"+
      ".cons-banner.diverge{border-color:rgba(251,191,36,.35);background:rgba(251,191,36,.08);color:#fbbf24}"+
      ".kpi .item{font-size:.75rem}.kpi .item .v{font-family:ui-monospace,monospace;font-weight:600}.kpi .item .l{color:#a1a1aa;font-size:.68rem}";
    document.head.appendChild(s);
  }

  window.applyHomeCardOrder = apply;
  window.resetHomeCardOrder = function(){
    try { localStorage.removeItem(LS); } catch(e){}
    if(typeof render==="function") render();
  };

  if(typeof window.openSettings==="function" && !window.openSettings._homeOrd){
    const orig = window.openSettings;
    window.openSettings = function(){
      orig();
      if(!document.getElementById("resetCardOrderBtn")){
        const actions = document.querySelector("#settingsModal .modal-actions");
        if(actions){
          const b = document.createElement("button");
          b.id = "resetCardOrderBtn";
          b.type = "button";
          b.textContent = "重設卡序";
          b.onclick = function(){ resetHomeCardOrder(); };
          actions.insertBefore(b, actions.firstChild);
        }
      }
    };
    window.openSettings._homeOrd = true;
  }

  hook();
  apply();
  setTimeout(function(){ hook(); apply(); }, 80);

  const st = document.getElementById("status");
  if(st && st.textContent && st.textContent.indexOf("拖")===-1){
    st.textContent += " · 可拖卡片排序";
  }
})();
