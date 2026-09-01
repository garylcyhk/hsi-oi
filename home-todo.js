(function(){
  if(!document.getElementById("homeTodoCss")){
    const l = document.createElement("link");
    l.id = "homeTodoCss";
    l.rel = "stylesheet";
    l.href = "home-todo.css";
    document.head.appendChild(l);
  }
  if(!document.getElementById("todoSlotCss")){
    const s = document.createElement("style");
    s.id = "todoSlotCss";
    s.textContent = "#cardTodo{grid-column:1/-1;min-width:0}#cardTodo .todo-wrap{margin:0;cursor:default}#todoBlock:empty{display:none}";
    document.head.appendChild(s);
  }
})();

const TODO_TPL = "exodus_home_todo_tpl_v1";
const TODO_DAY = "exodus_home_todo_day_v1_";
const TODO_DEFAULT = [
  { id:"t1", title:"今日 To-do", items:["New item"] }
];
let todoSecs = [];
let todoChecks = {};
let todoEdit = false;
let todoDragSec = null, todoDragItem = null;

function todoToday(){
  const d = new Date();
  return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
}
function todoUid(){ return "t"+Math.random().toString(36).slice(2,9); }
function todoLoad(){
  try {
    const raw = localStorage.getItem(TODO_TPL);
    if(raw){ todoSecs = JSON.parse(raw); }
    else todoSecs = JSON.parse(JSON.stringify(TODO_DEFAULT));
  } catch(e){ todoSecs = JSON.parse(JSON.stringify(TODO_DEFAULT)); }
  todoChecks = {};
  try {
    const raw = localStorage.getItem(TODO_DAY + todoToday());
    if(raw){
      const o = JSON.parse(raw);
      todoChecks = o.checks || {};
    }
  } catch(e){}
}
function todoSave(){
  try { localStorage.setItem(TODO_TPL, JSON.stringify(todoSecs)); } catch(e){}
  try { localStorage.setItem(TODO_DAY + todoToday(), JSON.stringify({ checks: todoChecks })); } catch(e){}
  const m = document.getElementById("todoMsg");
  if(m) m.textContent = "已儲存 · Saved " + new Date().toLocaleTimeString();
}
function todoRender(){
  const box = document.getElementById("todoSecs");
  if(!box) return;
  box.innerHTML = "";
  document.body.classList.toggle("todo-edit", todoEdit);
  todoSecs.forEach((sec, si) => {
    const el = document.createElement("div");
    el.className = "todo-sec";
    el.draggable = todoEdit;
    el.dataset.si = si;
    el.addEventListener("dragstart", todoOnSecStart);
    el.addEventListener("dragover", e => { if(todoEdit) e.preventDefault(); });
    el.addEventListener("drop", todoOnSecDrop);
    const head = document.createElement("div");
    head.className = "todo-sec-head";
    head.innerHTML = '<span class="grip" title="拖曳">☰</span>';
    const title = document.createElement("input");
    title.className = "title";
    title.value = sec.title || "";
    title.readOnly = !todoEdit;
    title.addEventListener("input", () => { sec.title = title.value; });
    title.addEventListener("change", todoSave);
    head.appendChild(title);
    if(todoEdit){
      const add = document.createElement("button");
      add.textContent = "＋項";
      add.onclick = () => { sec.items.push("New item"); todoRender(); todoSave(); };
      const del = document.createElement("button");
      del.className = "x"; del.textContent = "✕";
      del.onclick = () => { if(confirm("刪除此區塊？")){ todoSecs.splice(si,1); todoRender(); todoSave(); } };
      head.appendChild(add); head.appendChild(del);
    }
    el.appendChild(head);
    (sec.items||[]).forEach((txt, ii) => {
      const row = document.createElement("div");
      row.className = "todo-item";
      row.draggable = todoEdit;
      row.dataset.si = si; row.dataset.ii = ii;
      row.addEventListener("dragstart", todoOnItemStart);
      row.addEventListener("dragover", e => { if(todoEdit){ e.preventDefault(); e.stopPropagation(); } });
      row.addEventListener("drop", todoOnItemDrop);
      const key = (sec.id||si) + ":" + ii;
      const cb = document.createElement("input");
      cb.type = "checkbox"; cb.checked = !!todoChecks[key];
      if(cb.checked) row.classList.add("done");
      cb.onchange = () => { todoChecks[key] = cb.checked; row.classList.toggle("done", cb.checked); todoSave(); };
      const grip = document.createElement("span"); grip.className = "grip"; grip.textContent = "⋮⋮";
      const inp = document.createElement("input");
      inp.className = "txt"; inp.value = txt; inp.readOnly = !todoEdit;
      inp.addEventListener("input", () => { sec.items[ii] = inp.value; });
      inp.addEventListener("change", todoSave);
      row.appendChild(grip); row.appendChild(cb); row.appendChild(inp);
      if(todoEdit){
        const x = document.createElement("button");
        x.className = "x"; x.textContent = "✕";
        x.onclick = () => { sec.items.splice(ii,1); todoRender(); todoSave(); };
        row.appendChild(x);
      }
      el.appendChild(row);
    });
    box.appendChild(el);
  });
}
function todoOnSecStart(e){
  if(!todoEdit) return;
  todoDragSec = +e.currentTarget.dataset.si;
  e.dataTransfer.effectAllowed = "move";
}
function todoOnSecDrop(e){
  e.preventDefault();
  if(!todoEdit || todoDragSec==null) return;
  const to = +e.currentTarget.dataset.si;
  if(isNaN(to) || to===todoDragSec) return;
  const [m] = todoSecs.splice(todoDragSec,1);
  todoSecs.splice(to,0,m);
  todoDragSec = null;
  todoRender(); todoSave();
}
function todoOnItemStart(e){
  if(!todoEdit) return;
  e.stopPropagation();
  todoDragItem = { si:+e.currentTarget.dataset.si, ii:+e.currentTarget.dataset.ii };
  e.dataTransfer.effectAllowed = "move";
}
function todoOnItemDrop(e){
  e.preventDefault(); e.stopPropagation();
  if(!todoEdit || !todoDragItem) return;
  const tsi = +e.currentTarget.dataset.si, tii = +e.currentTarget.dataset.ii;
  const from = todoSecs[todoDragItem.si].items;
  const [m] = from.splice(todoDragItem.ii,1);
  todoSecs[tsi].items.splice(tii,0,m);
  todoDragItem = null;
  todoRender(); todoSave();
}
function todoToggleEdit(){
  todoEdit = !todoEdit;
  document.getElementById("todoEditBtn").textContent = todoEdit ? "完成 Done" : "編輯 Edit";
  todoRender();
}
function todoAddSection(){
  todoSecs.push({ id: todoUid(), title: "New section", items: ["New item"] });
  todoEdit = true;
  document.getElementById("todoEditBtn").textContent = "完成 Done";
  todoRender(); todoSave();
}
function todoResetToday(){
  if(!confirm("清除今日勾選？文字模板會保留。")) return;
  todoChecks = {};
  todoSave(); todoRender();
}
function todoResetTpl(){
  if(!confirm("還原預設待辦模板？")) return;
  todoSecs = JSON.parse(JSON.stringify(TODO_DEFAULT));
  todoChecks = {};
  try { localStorage.removeItem(TODO_TPL); } catch(e){}
  todoSave(); todoRender();
}

function todoPlace(){
  const g = document.getElementById("grid");
  const wrap = document.getElementById("todoWrap");
  if(!g || !wrap) return;
  let card = document.getElementById("cardTodo");
  if(!card){
    card = document.createElement("div");
    card.id = "cardTodo";
  }
  if(wrap.parentNode !== card) card.appendChild(wrap);
  const hide = (typeof homeSettings==="object" && homeSettings.showTodo===false);
  card.style.display = hide ? "none" : "";
  const park = document.getElementById("todoBlock");
  if(park && !park.children.length) park.style.display = "none";
  if(card.parentNode !== g){
    let order = null;
    try { order = JSON.parse(localStorage.getItem("exodus_home_card_order_v1") || "null"); } catch(e){}
    if(Array.isArray(order) && order.indexOf("cardTodo")!==-1){
      g.appendChild(card);
    } else {
      g.insertBefore(card, g.firstChild);
    }
  }
  if(typeof window.applyHomeCardOrder==="function") window.applyHomeCardOrder();
}

if(typeof window.render==="function" && !window.render._todoSlot){
  const prev = window.render;
  window.render = function(){
    prev();
    todoPlace();
  };
  window.render._todoSlot = true;
}
if(typeof window.applyHomeSettings==="function" && !window.applyHomeSettings._todoSlot){
  const prevA = window.applyHomeSettings;
  window.applyHomeSettings = function(){
    prevA();
    const el = document.getElementById("cardTodo");
    if(el) el.style.display = (homeSettings && homeSettings.showTodo===false) ? "none" : "";
    const park = document.getElementById("todoBlock");
    if(park) park.style.display = "none";
  };
  window.applyHomeSettings._todoSlot = true;
}

todoLoad();
todoRender();
todoPlace();
setTimeout(todoPlace, 0);
setTimeout(todoPlace, 300);
