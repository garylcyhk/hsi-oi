/* Show actual 收回價 + distance-to-spot on the distribution table. */
(function(){
  if(typeof renderDist!=="function") return;
  var fmtN = (typeof fmt==="function") ? fmt : function(n){return (n==null||isNaN(n))?"\u2014":Number(n).toLocaleString("en-US");};
  var fmtChg = (typeof fmtC==="function") ? fmtC : function(n){if(n==null||isNaN(n))return"\u2014";var s=Number(n).toLocaleString("en-US");return n>0?"+"+s:s;};

  window.renderDist = function(){
    var D = window.CBBC_HSI || {};
    var bins = (D.bins||[]).slice();
    var spot = D.spot || 0;
    var minFut = parseInt(document.getElementById("minFut").value,10)||0;
    var range = parseInt(document.getElementById("rangeSel").value,10)||0;
    var listed = bins.filter(function(b){
      var mid = b.call!=null ? b.call : ((b.lo+b.hi)/2);
      return b.fut>=minFut && (!range || Math.abs(mid-spot)<=range);
    });
    var maxFut = Math.max.apply(null, listed.map(function(b){return b.fut;}).concat([1]));
    var maxHist = Math.max.apply(null, bins.flatMap(function(b){return b.hist||[0];}).concat([1]));
    var heavyBull = bins.filter(function(b){return b.side==="bull";}).sort(function(a,b){return b.fut-a.fut;})[0];
    var heavyBear = bins.filter(function(b){return b.side==="bear";}).sort(function(a,b){return b.fut-a.fut;})[0];
    var addBull = bins.filter(function(b){return b.side==="bull";}).sort(function(a,b){return b.chg-a.chg;})[0];
    var addBear = bins.filter(function(b){return b.side==="bear";}).sort(function(a,b){return b.chg-a.chg;})[0];
    var totListed = listed.reduce(function(s,b){return s+(b.fut||0);},0);

    function callOf(b){
      if(b.call!=null && !isNaN(b.call)) return b.call;
      return Math.round((b.lo+b.hi)/2);
    }
    function distOf(b){
      var c = callOf(b);
      var d = Math.round(c - spot);
      var sign = d>0 ? "+" : "";
      return sign + d.toLocaleString("en-US");
    }
    function row(b){
      var w = Math.max(4, Math.round(b.fut/maxFut*100)), badges="";
      if(heavyBull===b||heavyBear===b) badges += '<span class="badge hz">重貨區</span>';
      if((addBull===b||addBear===b)&&b.chg>0) badges += '<span class="badge add">最多新增</span>';
      if(b.called) badges += '<span class="badge ko">已收回</span>';
      var bar = b.side==="bear"
        ? '<div class="bar-wrap"><div class="bar bear" style="width:'+w+'%"></div></div>'
        : '<div class="bar-wrap"><div class="bar bull" style="width:'+w+'%"></div></div>';
      var call = callOf(b);
      var rangeTxt = fmtN(b.lo)+"\u2013"+fmtN(b.hi);
      return '<tr class="'+(b.called?"called":"")+'">'+'
        <td class="mono"><b>'+fmtN(call)+'</b>'+badges+'<div class="mu" style="font-size:.68rem">'+rangeTxt+'</div></td>'+'
        <td class="tr mono mu">'+distOf(b)+'</td>'+'
        <td class="tc mu">'+(b.side==="bear"?"熊 Bear":"牛 Bull")+'</td>'+'
        <td style="width:22%">'+bar+'</td>'+'
        <td class="tr mono">'+fmtN(b.fut)+'</td>'+'
        <td class="tr mono '+(b.chg>0?"pos":b.chg<0?"neg":"mu")+'">'+fmtChg(b.chg)+'</td>'+'
        <td class="tr mono mu">'+(totListed?((b.fut/totListed)*100).toFixed(1)+"%":"\u2014")+'</td>'+'
        <td>'+(typeof spark==="function"?spark(b.hist,maxHist):"")+'</td>'+'
        <td class="mono mu">'+(b.pick||"\u2014")+'</td>'+'
      </tr>';
    }

    var hint = document.getElementById("filterHint");
    if(hint) hint.textContent = "顯示 "+listed.length+" / "+bins.length+" 檔";
    document.getElementById("dist").innerHTML =
      '<table class="sg-table"><thead><tr>'+'
        '<th>收回價</th><th class="tr">距現價</th><th>方向</th><th>街貨</th>'+'
        '<th class="tr">期指張數</th><th class="tr">1日Δ</th><th class="tr">佔比*</th><th class="tr">5日</th><th>精選</th>'+'
      '</tr></thead><tbody>'+
      listed.filter(function(b){return b.side==="bear";}).sort(function(a,b){return callOf(b)-callOf(a);}).map(row).join("")+
      '<tr class="spot"><td colspan="9" class="tc">現價 '+fmtN(Math.round(spot))+'</td></tr>'+
      listed.filter(function(b){return b.side==="bull";}).sort(function(a,b){return callOf(b)-callOf(a);}).map(row).join("")+
      '</tbody></table>'+
      '<p class="mu" style="font-size:.72rem">收回價 = 該區間代表檔 / 精選證的 call level。下方細字係 100 點區間。佔比* 以本表為分母。'+(D.calledNote||"")+'</p>';
  };

  renderDist();
})();
