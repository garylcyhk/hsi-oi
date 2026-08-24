/* Exodus site gate — client-side only (not real server security) */
(function(){
  const HASH = "abbcf0ae965c7aa42dd0b7ed6c10ac2cd7bb4815f59844f201dbf6f38431aa98";
  const KEY = "exodus_auth_ok_v1";
  const HOURS = 12;

  function ok(){
    try {
      const raw = sessionStorage.getItem(KEY) || localStorage.getItem(KEY);
      if(!raw) return false;
      const t = parseInt(raw, 10);
      if(!t || Date.now() - t > HOURS*3600*1000){
        sessionStorage.removeItem(KEY);
        localStorage.removeItem(KEY);
        return false;
      }
      return true;
    } catch(e){ return false; }
  }

  async function sha256(text){
    const data = new TextEncoder().encode(text);
    const buf = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,"0")).join("");
  }

  function showGate(){
    if(document.getElementById("exodusGate")) return;
    const style = document.createElement("style");
    style.textContent = `
#exodusGate{position:fixed;inset:0;z-index:99999;background:#09090b;display:flex;align-items:center;justify-content:center;padding:20px;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#e4e4e7}
#exodusGate .box{background:#18181b;border:1px solid #27272a;border-radius:12px;padding:28px 24px;width:100%;max-width:340px;box-shadow:0 20px 50px rgba(0,0,0,.5)}
#exodusGate h1{margin:0 0 6px;font-size:1.1rem;font-weight:600}
#exodusGate p{margin:0 0 18px;font-size:.78rem;color:#a1a1aa;line-height:1.45}
#exodusGate input{width:100%;box-sizing:border-box;background:#0f0f12;border:1px solid #27272a;color:#e4e4e7;border-radius:8px;padding:10px 12px;font-size:.9rem;margin-bottom:12px}
#exodusGate input:focus{outline:none;border-color:#3f3f46}
#exodusGate button{width:100%;border:1px solid rgba(52,211,153,.35);background:rgba(52,211,153,.15);color:#34d399;border-radius:8px;padding:10px;font-size:.9rem;cursor:pointer;font-weight:500}
#exodusGate button:hover{background:rgba(52,211,153,.22)}
#exodusGate .err{color:#fb7185;font-size:.78rem;margin:-6px 0 10px;min-height:1.1em}
#exodusGate .remember{display:flex;align-items:center;gap:8px;font-size:.78rem;color:#a1a1aa;margin-bottom:14px}
body.exodus-locked > *:not(#exodusGate){visibility:hidden !important}
`;
    document.head.appendChild(style);
    document.body.classList.add("exodus-locked");
    const gate = document.createElement("div");
    gate.id = "exodusGate";
    gate.innerHTML = `
      <div class="box">
        <h1>Exodus Trading Group</h1>
        <p>Private workspace · 請輸入通行密碼<br/>Client-side gate only — not bank-grade security.</p>
        <div class="err" id="exodusErr"></div>
        <input type="password" id="exodusPw" placeholder="Password" autocomplete="current-password" />
        <label class="remember"><input type="checkbox" id="exodusRemember" /> 記住 12 小時 · Remember</label>
        <button type="button" id="exodusBtn">進入 Enter</button>
      </div>`;
    document.body.appendChild(gate);
    const input = document.getElementById("exodusPw");
    const btn = document.getElementById("exodusBtn");
    const err = document.getElementById("exodusErr");
    async function tryLogin(){
      err.textContent = "";
      const h = await sha256(input.value || "");
      if(h !== HASH){
        err.textContent = "密碼錯誤 · Wrong password";
        input.select();
        return;
      }
      const stamp = String(Date.now());
      try {
        sessionStorage.setItem(KEY, stamp);
        if(document.getElementById("exodusRemember").checked){
          localStorage.setItem(KEY, stamp);
        }
      } catch(e){}
      document.body.classList.remove("exodus-locked");
      gate.remove();
    }
    btn.addEventListener("click", tryLogin);
    input.addEventListener("keydown", e => { if(e.key==="Enter") tryLogin(); });
    setTimeout(() => input.focus(), 50);
  }

  function boot(){
    if(ok()) return;
    if(document.body) showGate();
    else document.addEventListener("DOMContentLoaded", showGate);
  }
  boot();
})();
