/* Overview print / Save-as-PDF — dropdown only, no top-bar button. */
(function(){
  if(document.getElementById("homePrintCss")) return;
  const css = `
.print-only{display:none}
@media print{
  @page{size:A4;margin:10mm}
  html,body{background:#fff!important;color:#111!important;font-size:10pt}
  *{-webkit-print-color-adjust:exact;print-color-adjust:exact}
  header{position:static;background:#fff!important;border-bottom:1px solid #ccc;padding:0 0 8px}
  .header-menu,.menu-toggle,.print-btn,.modal-overlay,.todo-btns,.todo-hint,.todo-msg,.go,.cal-wbtns{display:none!important}
  .print-only{display:block!important;margin:0 0 8px;font-size:9pt;color:#444;border-bottom:1px solid #ddd;padding-bottom:6px}
  .container{padding:0;max-width:none}
  .note{color:#444;margin-bottom:8px}
  .grid{display:grid!important;grid-template-columns:1fr 1fr!important;gap:8px}
  #consLine,#cardCal.cal-wfull{grid-column:1/-1}
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
    const info=(st&&st.textContent)?st.textContent.replace(/^最新數據\s*\u00b7\s*/,""):"";
    if(ph) ph.textContent="總覽 · Exodus Trading Group · "+info+" · "+stamp;
    document.title="Exodus總覽_"+stamp;
    window.print();
  };

  const oldBtn=document.getElementById("printHomeBtn");
  if(oldBtn) oldBtn.remove();
})();
