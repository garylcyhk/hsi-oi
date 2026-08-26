/* Exodus — drag tabs / menu links to reorder. Saved in this browser. */
(function(){
  const P = "exodus_tabord_v1:";
  function pageKey(){
    try { return location.pathname.replace(/\/+$/,"") || "/"; } catch(e){ return "/"; }
  }
  function ident(el){
    return el.getAttribute("data-tab")
      || el.getAttribute("data-hkats")
      || el.id
      || (el.getAttribute("href") || "").replace(/\/+$/,"")
      || (el.textContent || "").trim();
  }
  function items(bar){
    return [...bar.children].filter(el => el.tagName==="BUTTON" || el.tagName==="A");
  }
  function save(bar, key){
    try { localStorage.setItem(key, JSON.stringify(items(bar).map(ident))); } catch(e){}
  }
  function restore(bar, key){
    let order = null;
    try { order = JSON.parse(localStorage.getItem(key) || "null"); } catch(e){}
    if(!Array.isArray(order) || !order.length) return;
    const map = {};
    items(bar).forEach(el => { map[ident(el)] = el; });
    order.forEach(id => { if(map[id]) bar.appendChild(map[id]); });
  }
  function enable(bar, key){
    if(!bar) return;
    restore(bar, key);
    bar.dataset.tabord = "1";
    items(bar).forEach(el => {
      el.draggable = true;
      if(!el.style.cursor) el.style.cursor = "grab";
      if(el._tabordBound) return;
      el._tabordBound = true;
      el.addEventListener("dragstart", function(e){
        e.dataTransfer.setData("text/plain", ident(el));
        e.dataTransfer.effectAllowed = "move";
        el.classList.add("tab-dragging");
      });
      el.addEventListener("dragend", function(){ el.classList.remove("tab-dragging"); });
      el.addEventListener("dragover", function(e){ e.preventDefault(); });
      el.addEventListener("drop", function(e){
        e.preventDefault();
        e.stopPropagation();
        const fromId = e.dataTransfer.getData("text/plain");
        const from = items(bar).find(k => ident(k) === fromId);
        if(!from || from === el) return;
        const nodes = items(bar);
        if(nodes.indexOf(from) < nodes.indexOf(el)) el.after(from);
        else el.before(from);
        save(bar, key);
      });
    });
  }

  function groupConsecutiveAnchors(menu){
    const groups = [];
    let cur = [];
    [...menu.children].forEach(el => {
      if(el.tagName === "A"){ cur.push(el); }
      else {
        if(cur.length >= 2) groups.push(cur);
        cur = [];
      }
    });
    if(cur.length >= 2) groups.push(cur);
    return groups;
  }

  function enableMenuGroup(group, key){
    const parent = group[0].parentNode;
    let order = null;
    try { order = JSON.parse(localStorage.getItem(key) || "null"); } catch(e){}
    if(Array.isArray(order) && order.length){
      const map = {};
      group.forEach(a => { map[ident(a)] = a; });
      const insertBefore = group[group.length-1].nextSibling;
      order.forEach(id => {
        if(map[id]) parent.insertBefore(map[id], insertBefore);
      });
      group = order.map(id => map[id]).filter(Boolean);
      if(!group.length) group = [...parent.querySelectorAll("a")];
    }
    group.forEach(el => {
      el.draggable = true;
      el.style.cursor = "grab";
      if(el._tabordBound) return;
      el._tabordBound = true;
      el.addEventListener("dragstart", function(e){
        e.dataTransfer.setData("text/plain", ident(el));
        e.dataTransfer.effectAllowed = "move";
      });
      el.addEventListener("dragover", function(e){ e.preventDefault(); });
      el.addEventListener("drop", function(e){
        e.preventDefault();
        e.stopPropagation();
        const fromId = e.dataTransfer.getData("text/plain");
        const links = [...parent.children].filter(x => x.tagName==="A");
        const from = links.find(k => ident(k) === fromId);
        if(!from || from === el) return;
        if(links.indexOf(from) < links.indexOf(el)) el.after(from);
        else el.before(from);
        const ids = [...parent.children].filter(x => x.tagName==="A").map(ident);
        try { localStorage.setItem(key, JSON.stringify(ids)); } catch(err){}
      });
    });
  }

  window.exodusBindTabOrder = function(){
    const pk = pageKey();
    document.querySelectorAll(".tab-bar").forEach((bar,i) => enable(bar, P+pk+":tabbar:"+i));
    document.querySelectorAll(".csv-subtabs").forEach((bar,i) => enable(bar, P+pk+":csvsub:"+i));
    document.querySelectorAll(".stock-tabs").forEach((bar,i) => enable(bar, P+pk+":stocks:"+i));
    document.querySelectorAll(".fut-tabs").forEach((bar,i) => enable(bar, P+pk+":fut:"+i));
    document.querySelectorAll(".menu-dropdown").forEach((menu,i) => {
      groupConsecutiveAnchors(menu).forEach((g,j) => enableMenuGroup(g, P+pk+":menu:"+i+":"+j));
    });
  };

  function boot(){
    window.exodusBindTabOrder();
    const obs = new MutationObserver(() => {
      document.querySelectorAll(".stock-tabs,.tab-bar,.csv-subtabs").forEach(bar => {
        const unbound = [...bar.querySelectorAll("button,a")].some(b => !b._tabordBound);
        if(unbound) window.exodusBindTabOrder();
      });
    });
    try { obs.observe(document.body, { childList:true, subtree:true }); } catch(e){}
  }
  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
