/* Shared renderer for homepage card + /morning-brief/ page. */
(function(global){
  function esc(s){
    return String(s==null?"":s).replace(/[&<>"']/g, function(c){
      if(c==="&") return "&"+"amp;";
      if(c==="<") return "&"+"lt;";
      if(c===">") return "&"+"gt;";
      if(c==='"') return "&"+"quot;";
      return "&#39;";
    });
  }
  function fmt(n){
    if(n==null || n==="" || isNaN(Number(n))) return "—";
    return Number(n).toLocaleString("en-US");
  }
  function fmtC(n){
    if(n==null || isNaN(Number(n))) return "—";
    var s = Number(n).toLocaleString("en-US");
    return n>0 ? "+"+s : s;
  }
  function clsN(n){ return n>0?"pos":n<0?"neg":""; }
  function srcLink(url, label){
    if(!url) return "";
    return '<a class="src" href="'+esc(url)+'" target="_blank" rel="noopener">'+esc(label||"來源")+"</a>";
  }
  function unverified(msg){
    return '<div class="na-block">未能核實／未更新'+(msg?' <span class="dim">'+esc(msg)+"</span>":"")+"</div>";
  }
  function wallTable(list, side){
    if(!list || !list.length) return unverified();
    var color = side==="call" ? "#34d399" : "#fb7185";
    return '<table class="mini"><thead><tr><th>行使價</th><th class="tr">OI</th><th class="tr">變</th></tr></thead><tbody>'+
      list.map(function(z){
        return "<tr><td style=\"color:"+color+"\">"+esc(z.strike)+"</td><td class=\"tr\">"+fmt(z.oi)+
          "</td><td class=\"tr "+clsN(z.oiChange)+"\">"+fmtC(z.oiChange)+"</td></tr>";
      }).join("")+"</tbody></table>";
  }
  function oiBlock(pack, href){
    if(!pack || !pack.ok) return unverified(pack && (pack.note||pack.status));
    var pc = pack.pcRatio!=null ? pack.pcRatio.toFixed(2) : "—";
    return '<div class="meta">'+esc(pack.label||"")+" · 檔 "+esc(pack.date||"—")+
      " · 即月 "+esc(pack.frontMonth||"—")+" · 下月 "+esc(pack.nextMonth||"—")+" · "+
      srcLink(pack.sourceUrl,"港交所")+(href?' · <a class="src" href="'+esc(href)+'">詳情</a>':"")+"</div>"+
      '<div class="kpi">'+
        '<div class="item"><div class="l">Call OI</div><div class="v">'+fmt(pack.callOI)+' <span class="'+clsN(pack.callOIChange)+'">'+fmtC(pack.callOIChange)+"</span></div></div>"+
        '<div class="item"><div class="l">Put OI</div><div class="v">'+fmt(pack.putOI)+' <span class="'+clsN(pack.putOIChange)+'">'+fmtC(pack.putOIChange)+"</span></div></div>"+
        '<div class="item"><div class="l">P/C</div><div class="v">'+pc+"</div></div>"+
        '<div class="item"><div class="l">結算</div><div class="v">'+(pack.settle!=null?fmt(pack.settle):"—")+"</div></div>"+
      "</div>"+
      '<div class="split">'+
        "<div><div class=\"lbl\">認購牆 Call</div>"+wallTable(pack.callWalls,"call")+"</div>"+
        "<div><div class=\"lbl\">認沽牆 Put</div>"+wallTable(pack.putWalls,"put")+"</div>"+
      "</div>";
  }
  function usGrid(us){
    if(!us || !us.ok || !(us.items||[]).length) return unverified(us && us.status);
    return '<div class="meta">美東時段 '+esc(us.asOf||"—")+" · "+srcLink(us.source,"Yahoo")+"</div>"+
      '<div class="us-grid">'+us.items.map(function(x){
        if(!x.ok) return '<div class="us-cell"><div class="l">'+esc(x.name)+'</div><div class="na">未能核實</div></div>';
        var chg = x.kind==="pt" || x.kind==="raw" ? fmtC(x.chg) : ((x.pct>0?"+":"")+x.pct+"%");
        return '<div class="us-cell"><div class="l">'+esc(x.name)+"</div>"+
          '<div class="v">'+fmt(x.last)+' <span class="'+clsN(x.pct)+'">'+chg+"</span></div></div>";
      }).join("")+"</div>";
  }
  function cbbcBlock(c){
    if(!c || !c.ok) return unverified(c && (c.note||c.status));
    var pages = (c.sourcePages||[]).map(function(p){ return srcLink(p.url, p.name); }).join(" · ");
    function lines(list){
      if(!list||!list.length) return '<div class="dim">近價無堆</div>';
      return list.map(function(b){
        return '<div class="ln"><span>'+esc(b.call||b.lo)+"–"+esc(b.hi)+"</span><span>"+fmt(b.fut)+
          " 張 <span class=\""+clsN(b.chg)+"\">"+fmtC(b.chg)+"</span></span></div>";
      }).join("");
    }
    return '<div class="meta">街貨 '+esc(c.asOf||"—")+" · 圖表 "+esc(c.published||"—")+
      " · 現價 "+fmt(c.spot)+(pages?" · "+pages:"")+"</div>"+
      '<div class="kpi">'+
        '<div class="item"><div class="l">牛／熊</div><div class="v">'+fmt(c.bullFut)+" / "+fmt(c.bearFut)+"</div></div>"+
        '<div class="item"><div class="l">近收回牛／熊</div><div class="v">'+fmt(c.nearKoBull)+" / "+fmt(c.nearKoBear)+"</div></div>"+
      "</div>"+
      '<div class="split"><div><div class="lbl">近價熊證（現價之上）</div>'+lines(c.nearBear)+
      "</div><div><div class=\"lbl\">近價牛證（現價之下）</div>"+lines(c.nearBull)+"</div></div>"+
      '<div class="dim">'+(c.note||"僅作對沖地圖，並非買賣牛熊證。")+"</div>";
  }
  function stocksBlock(s, prefix){
    if(!s || !s.ok || !(s.items||[]).length) return unverified(s && (s.note||s.status));
    var base = prefix||"../";
    return '<div class="meta">檔 '+esc(s.date||"—")+" · "+srcLink(s.sourceUrl,"港交所")+' · <a class="src" href="'+base+'stock-oi/">詳情</a></div>'+
      s.items.map(function(it){
        return '<div class="stk"><strong>'+esc(it.name||it.code)+"</strong> "+
          '<span class="dim">'+esc(it.reason)+"</span></div>";
      }).join("");
  }
  function implBlock(b){
    var lines = b.implications||[];
    if(!lines.length) return unverified();
    return "<ul>"+lines.map(function(x){ return "<li>"+esc(x)+"</li>"; }).join("")+"</ul>";
  }

  function morningBriefHTML(b, mode){
    b = b || {};
    var compact = mode==="card";
    var go = compact ? '<span class="go">詳情 →</span>' : "";
    var root = compact ? "./" : "../";
    var inner = "";
    if(b.closed){
      inner = '<div class="bias na">'+esc(b.oneLiner||"休市")+"</div>"+
        '<div class="meta">'+esc(b.closedReason||"")+"</div>";
    } else {
      inner =
        '<div class="bias mid">'+esc(b.oneLiner||"—")+"</div>"+
        '<div class="meta">港股時段 '+esc(b.sessionDate||"—")+" · 美股時段 "+esc(b.usSessionDate||"—")+
          " · 組裝 "+esc(b.asOf||"—")+" HKT</div>"+
        (b.missing&&b.missing.length?'<div class="miss">'+b.missing.map(esc).join(" · ")+"</div>":"")+
        '<div class="sec"><h3>美股隔夜</h3>'+usGrid(b.us)+"</div>"+
        '<div class="sec"><h3>恒指期權牆</h3>'+oiBlock(b.hsi, root+"options/#hsi")+"</div>"+
        '<div class="sec"><h3>小恒期權牆</h3>'+oiBlock(b.mini, root+"options/#mini")+"</div>"+
        '<div class="sec"><h3>牛熊街貨（對沖地圖）</h3>'+cbbcBlock(b.cbbc)+"</div>"+
        '<div class="sec"><h3>股票觀察</h3>'+stocksBlock(b.stocks, root)+"</div>"+
        '<div class="sec"><h3>開市濾鏡</h3>'+implBlock(b)+"</div>"+
        '<div class="disc">'+esc(b.disclaimer||"研究用，非買賣建議。")+"</div>";
    }
    if(compact){
      return '<a class="card brief-card" href="./morning-brief/">'+
        "<h2><span>早晨簡報 Morning Brief</span>"+go+"</h2>"+inner+"</a>";
    }
    return '<div class="brief-page">'+
      "<h2>"+esc(b.title||"早晨簡報")+"</h2>"+inner+"</div>";
  }

  global.morningBriefHTML = morningBriefHTML;
})(window);
