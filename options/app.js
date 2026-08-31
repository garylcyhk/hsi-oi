(function(){
  const a=document.createElement("script");
  a.src="https://cdn.jsdelivr.net/gh/garylcyhk/hsi-oi@1befaa6bdbe62de6b99d54a0b0cb0dfef097d7a0/options/app.js";
  a.onload=function(){
    const b=document.createElement("script");
    b.src="strike-dist.js?v=20260831";
    b.onload=function(){
      const c=document.createElement("script");
      c.src="pcr.js?v=20260831";
      document.body.appendChild(c);
    };
    b.onerror=function(){
      const c=document.createElement("script");
      c.src="pcr.js?v=20260831";
      document.body.appendChild(c);
    };
    document.body.appendChild(b);
  };
  a.onerror=function(){
    const st=document.getElementById("status");
    if(st) st.textContent="無法載入期權程式，請重新整理。";
  };
  document.body.appendChild(a);
})();
