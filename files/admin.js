/* Upload / delete PDFs on GitHub Pages via Contents API. Token stays in this browser. */
(function(){
  var TOKEN_LS="exodus_gh_token_v1";
  var OWNER="garylcyhk";
  var REPO="hsi-oi";
  var BRANCH="main";

  function $(id){ return document.getElementById(id); }
  function today(){
    try { return new Date().toLocaleDateString("en-CA",{timeZone:"Asia/Hong_Kong"}); }
    catch(e){ return new Date().toISOString().slice(0,10); }
  }
  function token(){ try { return localStorage.getItem(TOKEN_LS)||""; } catch(e){ return ""; } }
  function setToken(v){ try { if(v) localStorage.setItem(TOKEN_LS,v); else localStorage.removeItem(TOKEN_LS); } catch(e){} }
  function status(msg){ var el=$("adminStatus"); if(el) el.textContent=msg||""; }
  function fmtSize(n){
    if(n<1024) return n+" B";
    if(n<1024*1024) return Math.round(n/1024)+" KB";
    return (n/1024/1024).toFixed(1)+" MB";
  }
  function slugName(name){
    var base=(name||"file.pdf").split(/[/\\]/).pop();
    var safe=base.replace(/[^\w.\u4e00-\u9fff-]+/g,"-").replace(/-+/g,"-");
    if(!/\.pdf$/i.test(safe)) safe+=".pdf";
    return safe;
  }
  function makeId(file){
    return file.replace(/\.pdf$/i,"").toLowerCase().replace(/[^a-z0-9\u4e00-\u9fff]+/g,"-").replace(/^-|-$/g,"").slice(0,60);
  }
  function utf8ToB64(str){
    return btoa(unescape(encodeURIComponent(str)));
  }
  function dumpCatalog(files){
    var obj={ asOf:today(), note:(window.pack&&window.pack.note)||"私人檔案，登入後先睇到。", files:files };
    return "window.EXODUS_FILES = "+JSON.stringify(obj,null,2)+";\n";
  }
  function fileToB64(file){
    return new Promise(function(res,rej){
      var r=new FileReader();
      r.onload=function(){ res(String(r.result).split(",")[1]||""); };
      r.onerror=rej;
      r.readAsDataURL(file);
    });
  }
  async function gh(path, method, body){
    var t=token();
    if(!t) throw new Error("未設定 GitHub token");
    var url="https://api.github.com/repos/"+OWNER+"/"+REPO+"/contents/"+path;
    var opt={ method:method||"GET", headers:{
      "Accept":"application/vnd.github+json",
      "Authorization":"Bearer "+t,
      "X-GitHub-Api-Version":"2022-11-28"
    }};
    if(body){ opt.body=JSON.stringify(body); opt.headers["Content-Type"]="application/json"; }
    var r=await fetch(url, opt);
    var data=null;
    try { data=await r.json(); } catch(e){ data=null; }
    if(!r.ok){
      var msg=(data&&data.message)||("GitHub "+r.status);
      throw new Error(msg);
    }
    return data;
  }
  async function getSha(path){
    try { var d=await gh(path,"GET"); return d&&d.sha; }
    catch(e){ return null; }
  }
  async function waitLive(file){
    for(var i=0;i<18;i++){
      try {
        var r=await fetch(file+"?t="+Date.now(), { cache:"no-store" });
        if(r.ok) return true;
      } catch(e){}
      status("已提交 · 等 Pages 發布… "+(i+1));
      await new Promise(function(ok){ setTimeout(ok,3000); });
    }
    return false;
  }

  function needToken(){
    if(token()) return true;
    openModal("tokenModal");
    return false;
  }
  function openModal(id){
    document.querySelectorAll(".modal-overlay").forEach(function(m){ m.classList.remove("open"); });
    var el=$(id); if(el) el.classList.add("open");
    var m=$("headerMenu"); if(m) m.classList.remove("open");
  }
  function closeModals(){ document.querySelectorAll(".modal-overlay").forEach(function(m){ m.classList.remove("open"); }); }

  window.filesOpenUpload=function(){
    if(!needToken()) return;
    $("upFile").value="";
    $("upTitle").value="";
    $("upTitleEn").value="";
    $("upCat").value="筆記 Notes";
    $("upNote").value="";
    openModal("uploadModal");
  };
  window.filesOpenToken=function(){
    $("ghToken").value=token();
    openModal("tokenModal");
  };
  window.filesSaveToken=function(){
    var v=($("ghToken").value||"").trim();
    setToken(v);
    closeModals();
    status(v?"已儲存 token（只在呢部瀏覽器）":"已清除 token");
  };
  window.filesCloseModal=closeModals;

  window.filesDoUpload=async function(){
    if(!needToken()) return;
    var input=$("upFile");
    var f=input.files&&input.files[0];
    if(!f){ status("請揀一份 PDF"); return; }
    if(!/\.pdf$/i.test(f.name) && f.type!=="application/pdf"){ status("只接受 PDF"); return; }
    if(f.size>20*1024*1024){ status("檔案太大（建議 < 20MB）"); return; }
    var title=($("upTitle").value||"").trim()||f.name.replace(/\.pdf$/i,"");
    var titleEn=($("upTitleEn").value||"").trim();
    var cat=($("upCat").value||"").trim()||"PDF";
    var note=($("upNote").value||"").trim();
    var name=slugName(f.name);
    var id=makeId(name);
    var btn=$("upGo");
    btn.disabled=true;
    status("上傳中…");
    try {
      var b64=await fileToB64(f);
      var pdfSha=await getSha("files/"+name);
      await gh("files/"+name,"PUT",{
        message: (pdfSha?"Update":"Add")+" "+name,
        content:b64,
        branch:BRANCH,
        sha:pdfSha||undefined
      });
      var files=(window.FILES||[]).slice();
      var rec={
        id:id, title:title, titleEn:titleEn, cat:cat, date:today(),
        size:fmtSize(f.size), file:name, note:note
      };
      var idx=files.findIndex(function(x){ return x.file===name || x.id===id; });
      if(idx>=0){ rec.id=files[idx].id; files[idx]=rec; }
      else files.unshift(rec);
      var js=dumpCatalog(files);
      var dataSha=await getSha("files/data.js");
      await gh("files/data.js","PUT",{
        message:"Update Files catalog",
        content:utf8ToB64(js),
        branch:BRANCH,
        sha:dataSha||undefined
      });
      closeModals();
      status("已上傳，等網站發布（約 30–60 秒）…");
      await waitLive(name);
      location.href="./?v="+Date.now()+"#"+rec.id;
    } catch(e){
      status("失敗："+(e.message||e));
    } finally {
      btn.disabled=false;
    }
  };

  window.filesDoDelete=async function(){
    if(!needToken()) return;
    var cur=window.current;
    if(!cur||!cur.file){ status("請先揀一份檔案"); return; }
    if(!confirm("刪除「"+cur.title+"」？網站上會一齊刪。")) return;
    status("刪除中…");
    try {
      var pdfSha=await getSha("files/"+cur.file);
      if(pdfSha){
        await gh("files/"+cur.file,"DELETE",{
          message:"Delete "+cur.file,
          sha:pdfSha,
          branch:BRANCH
        });
      }
      var files=(window.FILES||[]).filter(function(x){ return x.id!==cur.id && x.file!==cur.file; });
      var js=dumpCatalog(files);
      var dataSha=await getSha("files/data.js");
      await gh("files/data.js","PUT",{
        message:"Remove "+cur.file+" from catalog",
        content:utf8ToB64(js),
        branch:BRANCH,
        sha:dataSha||undefined
      });
      status("已刪除，等網站發布…");
      await waitLive("data.js");
      location.href="./?v="+Date.now();
    } catch(e){
      status("失敗："+(e.message||e));
    }
  };
})();
