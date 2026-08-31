/* Inject volume + OI put/call ratios into options overview. */
(function(){
  function fmtN(n){
    if(typeof fmt==="function") return fmt(n);
    return (n==null||isNaN(n)) ? "\u2014" : Number(n).toLocaleString("en-US");
  }
  function monthPack(r){
    if(typeof activeMonth==="function") return activeMonth(r);
    if(typeof window.packOf==="function") return window.packOf(r);
    return { strikes:(r&&r.strikes)||[], useNext:false, label:"" };
  }
  function ratios(r){
    const pack = monthPack(r);
    const rows = pack.strikes || [];
    const callOI = rows.reduce((a,x)=>a+(x.callOI||0),0);
    const putOI = rows.reduce((a,x)=>a+(x.putOI||0),0);
    const callVol = rows.reduce((a,x)=>a+(x.callVol||0),0);
    const putVol = rows.reduce((a,x)=>a+(x.putVol||0),0);
    return {
      pack, callOI, putOI, callVol, putVol,
      oiPcr: callOI ? putOI/callOI : null,
      volPcr: callVol ? putVol/callVol : null
    };
  }
  function injectSummary(){
    const sum = document.getElementById("summary");
    const r = window.currentReport;
    if(!sum || !r) return;
    const x = ratios(r);
    let box = document.getElementById("pcrCards");
    if(!box){
      box = document.createElement("div");
      box.id = "pcrCards";
      box.style.display = "contents";
      sum.appendChild(box);
    }
    box.innerHTML =
      '<div class="card"><div class="label">成交量 認沽/認購</div><div class="value">'+
      (x.volPcr!=null?x.volPcr.toFixed(2):"\u2014")+'</div><div class="subv">認購 '+fmtN(x.callVol)+' · 認沽 '+fmtN(x.putVol)+'</div></div>'+
      '<div class="card"><div class="label">OI 認沽/認購</div><div class="value">'+
      (x.oiPcr!=null?x.oiPcr.toFixed(2):"\u2014")+'</div><div class="subv">>1 代表認沽較多</div></div>';
  }
  function hook(){
    if(typeof window.render==="function" && !window.render._pcrHooked){
      const orig = window.render;
      window.render = function(date){
        orig(date);
        try { injectSummary(); } catch(e){}
      };
      window.render._pcrHooked = true;
    }
    try { injectSummary(); } catch(e){}
  }
  hook();
  const t = setInterval(hook, 80);
  setTimeout(function(){ clearInterval(t); hook(); }, 8000);
})();
