/* Home options cards: volume PCR + OI PCR */
(function(){
  if(typeof optionsCard!=="function" || typeof render!=="function") return;
  optionsCard = function(title, href, r, date, extraNote){
    if(!r){
      return '<a class="card" href="'+href+'"><h2><span>'+title+'</span><span class="go">詳情 →</span></h2><div class="bias na">無資料</div></a>';
    }
    const pack = activePack(r);
    const b = biasFromWalls(settleOf(r), pack.zones.callWalls, pack.zones.putWalls);
    const settle = settleOf(r);
    const strikes = pack.strikes || [];
    const callVol = strikes.reduce((a,s)=>a+(s.callVol||0),0);
    const putVol = strikes.reduce((a,s)=>a+(s.putVol||0),0);
    const oiPcr = pack.callOI ? pack.putOI/pack.callOI : null;
    const volPcr = callVol ? putVol/callVol : null;
    const hz = pack.zones || {};
    const monthLbl = pack.useNext ? "下月" : "即月";
    return '<a class="card" href="'+href+'">'+'
      <h2><span>'+title+'</span><span class="go">詳情 →</span></h2>'+'
      <div class="bias '+b.cls+'">'+(b.label||"")+'</div>'+'
      <div class="meta">'+(b.note||"\u2014")+'</div>'+'
      <div class="kpi">'+'
        <div class="item"><div class="l">Settle</div><div class="v">'+(settle!=null?fmt(settle):"\u2014")+'</div></div>'+'
        <div class="item"><div class="l">'+monthLbl+'</div><div class="v">'+(pack.label||"\u2014")+'</div></div>'+'
        <div class="item"><div class="l">成交量 認沽/認購</div><div class="v">'+(volPcr!=null?volPcr.toFixed(2):"\u2014")+'</div></div>'+'
        <div class="item"><div class="l">OI 認沽/認購</div><div class="v">'+(oiPcr!=null?oiPcr.toFixed(2):"\u2014")+'</div></div>'+'
        <div class="item"><div class="l">認購 / 認沽成交</div><div class="v">'+fmt(callVol)+' / '+fmt(putVol)+'</div></div>'+'
        <div class="item"><div class="l">認購 / 認沽 OI</div><div class="v">'+fmt(pack.callOI)+' / '+fmt(pack.putOI)+'</div></div>'+'
        <div class="item"><div class="l">總 OI</div><div class="v">'+fmt(pack.totalOI)+' <span class="'+clsN(pack.totalOIChange)+'">'+fmtC(pack.totalOIChange)+'</span></div></div>'+'
        <div class="item"><div class="l">Call Δ / Put Δ</div><div class="v"><span class="'+clsN(pack.callOIChange)+'">'+fmtC(pack.callOIChange)+'</span> / <span class="'+clsN(pack.putOIChange)+'">'+fmtC(pack.putOIChange)+'</span></div></div>'+'
      </div>'+'
      <div class="top3">'+'
        <div class="lbl">Call 重貨 Top 3'+(pack.useNext?" · 下月":"")+'</div>'+'
        '+wallLines(hz.callWalls, "call")+'
        <div class="lbl">Put 重貨 Top 3'+(pack.useNext?" · 下月":"")+'</div>'+'
        '+wallLines(hz.putWalls, "put")+'
      </div>'+'
      '+(pack.useNext?'<div class="meta" style="margin-top:8px">即月已到期 · 改顯示下月 '+pack.label+'</div>':'')+'
      '+(extraNote?'<div class="meta" style="margin-top:8px">'+extraNote+'</div>':'')+'
      <div class="row" style="margin-top:8px"><span class="k">日期</span><span>'+(date||"\u2014")+'</span></div>'+'
    </a>';
  };
  render();
})();
