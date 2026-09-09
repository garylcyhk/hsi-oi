(function(){
  if(!document.getElementById("homeTodoCss")){
    const l = document.createElement("link");
    l.id = "homeTodoCss";
    l.rel = "stylesheet";
    l.href = "home-todo.css";
    document.head.appendChild(l);
  }
  if(!document.getElementById("notodoSlotCss")){
    const s = document.createElement("style");
    s.id = "notodoSlotCss";
    s.textContent = "#cardNotodo{grid-column:1/-1;min-width:0}#cardNotodo .todo-wrap{margin:0;cursor:default}#notodoBlock:empty{display:none}#cardNotodo .todo-head h2{color:#fb7185}body.notodo-edit .todo-item input.txt,body.notodo-edit .todo-sec-head .title{border-color:#3f3f46}";
    document.head.appendChild(s);
  }
})();

const NOTODO_TPL = "exodus_home_notodo_tpl_v1";
const NOTODO_DAY = "exodus_home_notodo_day_v1_";
const NOTODO_DEFAULT = [
  { id:"n1", title:"今日不做 Not to-do", items:[
    "追開市第一跳／第一根衝動 K",
    "屠牛／屠熊仲進行緊 → 唔好 fade（跟被迫對沖）",
    "把「我怕／我想追」當進場訊號",
    "開市標超過兩道戰場",
    "作廢線外攤平／盤中發明第三套劇本",
    "用 1.33 SR 或「午後必破 AMH/AML」當預設目標"
  ]}
];
let notodoSecs = [];
let notodoChecks = {};
let notodoEdit = false;
let notodoDragSec = null, notodoDragItem = null;

function notodoToday(){
  const d = new Date();
  return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
}
function notodoUid(){ return "n"+Math.random().toString(36).slice(2,9); }
function notodoLoad(){
  try {
    const raw = localStorage.getItem(NOTODO_TPL);
    if(raw){ notodoSecs = JSON.parse(raw); }
    else notodoSecs = JSON.parse(JSON.stringify(NOTODO_DEFAULT));
  } catch(e){ notodoSecs = JSON.parse(JSON.stringify(NOTODO_DEFAULT)); }
  notodoChecks = {};
  try {
    const raw = localStorage.getItem(NOTODO_DAY + notodoToday());
    if(raw){
      const o = JSON.parse(raw);
      notodoChecks = o.checks || {};
    }
  } catch(e){}
  notodoSecs.forEach(function(sec){
    (sec.items||[]).forEach(function(txt,i){
      if(txt==="屠牛／屠熊未完就 fade"){
        sec.items[i]="屠牛／屠熊仲進行緊 → 唔好 fade（跟被迫對沖）";
      }
    });
  });
}
function notodoSave(){
  try { localStorage.setItem(NOTODO_TPL, JSON.stringify(notodoSecs)); } catch(e){}
  try { localStorage.setItem(NOTODO_DAY + notodoToday(), JSON.stringify({ checks: notodoChecks })); } catch(e){}
  const m = document.getElementById("notodoMsg");
  if(m) m.textContent = "已儲存 · Saved " + new Date().toLocaleTimeString();
}
function notodoRender(){
  const box = document.getElementById("notodoSecs");
  if(!box) return;
  box.innerHTML = "";
  document.body.classList.toggle("notodo-edit", notodoEdit);
  notodoSecs.forEach((sec, si) => {
    const el = document.createElement("div");
    el.className = "todo-sec";
    el.draggable = notodoEdit;
    el.dataset.si = si;
    el.addEventListener("dragstart", notodoOnSecStart);
    el.addEventListener("dragover", e => { if(notodoEdit) e.preventDefault(); });
    el.addEventListener("drop", notodoOnSecDrop);
    const head = document.createElement("div");
    head.className = "todo-sec-head";
    head.innerHTML = '<span class="grip" title="拖曳">☰</span>';
    const title = document.createElement("input");
    title.className = "title";
    title.value = sec.title || "";
    title.readOnly = !notodoEdit;
    title.addEventListener("input", () => { sec.title = title.value; });
    title.addEventListener("change", notodoSave);
    head.appendChild(title);
    if(notodoEdit){
      const add = document.createElement("button");
      add.textContent = "＋項";
      add.onclick = () => { sec.items.push("New item"); notodoRender(); notodoSave(); };
      const del = document.createElement("button");
      del.className = "x"; del.textContent = "✕";
      del.onclick = () => { if(confirm("刪除此區塊？")){ notodoSecs.splice(si,1); notodoRender(); notodoSave(); } };
      head.appendChild(add); head.appendChild(del);
    }
    el.appendChild(head);
    (sec.items||[]).forEach((txt, ii) => {
      const row = document.createElement("div");
      row.className = "todo-item";
      row.draggable = notodoEdit;
      row.dataset.si = si; row.dataset.ii = ii;
      row.addEventListener("dragstart", notodoOnItemStart);
      row.addEventListener("dragover", e => { if(notodoEdit){ e.preventDefault(); e.stopPropagation(); } });
      row.addEventListener("drop", notodoOnItemDrop);
      const key = (sec.id||si) + ":" + ii;
      const cb = document.createElement("input");
      cb.type = "checkbox"; cb.checked = !!notodoChecks[key];
      if(cb.checked) row.classList.add("done");
      cb.onchange = () => { notodoChecks[key] = cb.checked; row.classList.toggle("done", cb.checked); notodoSave(); };
      const grip = document.createElement("span"); grip.className = "grip"; grip.textContent = "⋮⋮";
      const inp = document.createElement("input");
      inp.className = "txt"; inp.value = txt; inp.readOnly = !notodoEdit;
      inp.addEventListener("input", () => { sec.items[ii] = inp.value; });
      inp.addEventListener("change", notodoSave);
      row.appendChild(grip); row.appendChild(cb); row.appendChild(inp);
      if(notodoEdit){
        const x = document.createElement("button");
        x.className = "x"; x.textContent = "✕";
        x.onclick = () => { sec.items.splice(ii,1); notodoRender(); notodoSave(); };
        row.appendChild(x);
      }
      el.appendChild(row);
    });
    box.appendChild(el);
  });
}
function notodoOnSecStart(e){
  if(!notodoEdit) return;
  notodoDragSec = +e.currentTarget.dataset.si;
  e.dataTransfer.effectAllowed = "move";
}
function notodoOnSecDrop(e){
  e.preventDefault();
  if(!notodoEdit || notodoDragSec==null) return;
  const to = +e.currentTarget.dataset.si;
  if(isNaN(to) || to===notodoDragSec) return;
  const [m] = notodoSecs.splice(notodoDragSec,1);
  notodoSecs.splice(to,0,m);
  notodoDragSec = null;
  notodoRender(); notodoSave();
}
function notodoOnItemStart(e){
  if(!notodoEdit) return;
  e.stopPropagation();
  notodoDragItem = { si:+e.currentTarget.dataset.si, ii:+e.currentTarget.dataset.ii };
  e.dataTransfer.effectAllowed = "move";
}
function notodoOnItemDrop(e){
  e.preventDefault(); e.stopPropagation();
  if(!notodoEdit || !notodoDragItem) return;
  const tsi = +e.currentTarget.dataset.si, tii = +e.currentTarget.dataset.ii;
  const from = notodoSecs[notodoDragItem.si].items;
  const [m] = from.splice(notodoDragItem.ii,1);
  notodoSecs[tsi].items.splice(tii,0,m);
  notodoDragItem = null;
  notodoRender(); notodoSave();
}
function notodoToggleEdit(){
  notodoEdit = !notodoEdit;
  document.getElementById("notodoEditBtn").textContent = notodoEdit ? "完成 Done" : "編輯 Edit";
  notodoRender();
}
function notodoAddSection(){
  notodoSecs.push({ id: notodoUid(), title: "New section", items: ["New item"] });
  notodoEdit = true;
  document.getElementById("notodoEditBtn").textContent = "完成 Done";
  notodoRender(); notodoSave();
}
function notodoResetToday(){
  if(!confirm("清除今日勾選？文字模板會保留。")) return;
  notodoChecks = {};
  notodoSave(); notodoRender();
}
function notodoResetTpl(){
  if(!confirm("還原預設「不做」清單？")) return;
  notodoSecs = JSON.parse(JSON.stringify(NOTODO_DEFAULT));
  notodoChecks = {};
  try { localStorage.removeItem(NOTODO_TPL); } catch(e){}
  notodoSave(); notodoRender();
}

function notodoPlace(){
  const g = document.getElementById("grid");
  const wrap = document.getElementById("notodoWrap");
  if(!g || !wrap) return;
  let card = document.getElementById("cardNotodo");
  if(!card){
    card = document.createElement("div");
    card.id = "cardNotodo";
  }
  if(wrap.parentNode !== card) card.appendChild(wrap);
  const hide = (typeof homeSettings==="object" && homeSettings.showNotodo===false);
  card.style.display = hide ? "none" : "";
  const park = document.getElementById("notodoBlock");
  if(park && !park.children.length) park.style.display = "none";
  if(card.parentNode !== g){
    let order = null;
    try { order = JSON.parse(localStorage.getItem("exodus_home_card_order_v1") || "null"); } catch(e){}
    if(Array.isArray(order) && order.indexOf("cardNotodo")!==-1){
      g.appendChild(card);
    } else {
      const todo = document.getElementById("cardTodo");
      if(todo && todo.parentNode===g) todo.after(card);
      else g.appendChild(card);
    }
  }
  if(typeof window.applyHomeCardOrder==="function") window.applyHomeCardOrder();
}

if(typeof window.render==="function" && !window.render._notodoSlot){
  const prev = window.render;
  window.render = function(){
    prev();
    notodoPlace();
  };
  window.render._notodoSlot = true;
}
if(typeof window.applyHomeSettings==="function" && !window.applyHomeSettings._notodoSlot){
  const prevA = window.applyHomeSettings;
  window.applyHomeSettings = function(){
    prevA();
    const el = document.getElementById("cardNotodo");
    if(el) el.style.display = (homeSettings && homeSettings.showNotodo===false) ? "none" : "";
    const park = document.getElementById("notodoBlock");
    if(park) park.style.display = "none";
  };
  window.applyHomeSettings._notodoSlot = true;
}

if(typeof homeSettings==="object" && homeSettings.showNotodo==null) homeSettings.showNotodo = true;

notodoLoad();
notodoRender();
notodoPlace();
setTimeout(notodoPlace, 0);
setTimeout(notodoPlace, 300);
