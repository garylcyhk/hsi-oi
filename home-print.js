/* Overview print / Save-as-PDF layout */
(function(){
  if(document.getElementById("homePrintCss")) return;
  const css = `
.print-btn{
  display:inline-flex;align-items:center;height:36px;padding:0 10px;margin-right:6px;
  border-radius:8px;background:var(--card);border:1px solid var(--border);
  color:var(--text);font-size:.78rem;cursor:pointer;
}
.print-btn:hover{border-color:#3f3f46}
.print-only{display:none}
@media print{
  @page{size:A4;margin:10mm}
  html,body{background:#fff!important;color:#111!important;font-size:10pt}
  *{-webkit-print-color-adjust:exact;print-color-adjust:exact}
  header{position:static;background:#fff!important;border-bottom:1px solid #ccc;padding:0 0 8px}
  .header-menu,.menu-toggle,.print-btn,.modal-overlay,.todo-btns,.todo-hint,.todo-msg,.go{display:none!important}
  .print-only{display:block!important;margin:0 0 8px;font-size:9pt;color:#444;border-bottom:1px solid #ddd;padding-bottom:6px}
  .container{padding:0;max-width:none}
  .note{color:#444;margin-bottom:8px}
  .grid{display:grid!important;grid-template-columns:1fr 1fr!important;gap:8px}
  #consLine{grid-column:1/-1}
  .card,.todo-wrap,.cons-banner,.todo-sec{
    background:#fff!important;color:#111!important;border:1px solid #bbb!important;
    box-shadow:none!important;transform:none!important;break-inside:avoid;page-break-inside:avoid
  }
  .card{padding:8px 10px}
  .card h2,.kpi .item .l,.meta,.row .k,.top3 .lbl,.todo-head h2 .ver{color:#555!important}
  .bias.res,.neg,.tag.res{color:#b42318!important}
  .bias.sup,.pos,.tag.sup{color:#087443!important}
  .bias.mid,.tag.mid,.cons-banner.diverge{color:#9a6700!important}
  .cons-banner.agree{color:#087443!important;border-color:#087443!important}
  .cbbc-ratio{background:#eee}
  footer{color:#666;margin-top:10px;padding:8px 0}
  #todoBlock{padding:8px 0 0!important}
  .todo-wrap{margin-top:8px}
  a{text-decoration:none;color:inherit}
}
`;
  const style=document.createElement("style");
  style.id="homePrintCss";
  style.textContent=css;
  document.head.appendChild(style);

  const ph=document.createElement("div");
  ph.id="printHeader";
  ph.className="print-only";
  const header=document.querySelector("header");
  if(header) header.insertAdjacentElement("afterend", ph);

  window.printHome=function(){
    if(typeof closeHeaderMenu==="function") closeHeaderMenu();
    const st=document.getElementById("status");
    const now=new Date();
    const stamp=now.getFullYear()+"-"+String(now.getMonth()+1).padStart(2,"0")+"-"+String(now.getDate()).padStart(2,"0");
    const info=(st&&st.textContent)?st.textContent.replace(/^\u6700\u65b0\u6578\u64da\s*\u00b7\s*/,""):"";
    if(ph) ph.textContent="\u7e3d\u89bd \u00b7 Exodus Trading Group \u00b7 "+info+" \u00b7 "+stamp;
    document.title="Exodus\u7e3d\u89bd_"+stamp;
    window.print();
  };

  const menu=document.querySelector(".header-menu");
  if(menu && !document.getElementById("printHomeBtn")){
    const b=document.createElement("button");
    b.id="printHomeBtn";
    b.type="button";
    b.className="print-btn";
    b.textContent="\u5217\u5370 / PDF";
    b.title="\u958b\u555f\u5217\u5370\u5c0d\u8a71\u6846\uff0c\u53ef\u9078\u300c\u5132\u5b58\u70ba PDF\u300d";
    b.onclick=function(){ window.printHome(); };
    menu.parentNode.insertBefore(b, menu);
  }
  document.querySelectorAll(".menu-dropdown button").forEach(function(btn){
    if(/\u5217\u5370/.test(btn.textContent||"")){
      btn.textContent="\u5217\u5370 / \u5132\u5b58 PDF";
      btn.onclick=function(){ window.printHome(); };
    }
  });
})();
