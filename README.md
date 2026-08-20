# 恒指期權未平倉 Dashboard (HSI Options OI)

自動更新的恒生指數期權未平倉分佈工具，適合日內交易使用。

- 每日自動從港交所下載最新報告
- 顯示 Call / Put 重貨區、行使價分佈、十大成交
- 完全免費（GitHub Actions + GitHub Pages）

---

## 第一次設定（只需做一次）

### 1. 建立 GitHub 倉庫
1. 登入 [GitHub](https://github.com)
2. 點右上角 **+** → **New repository**
3. Repository name 填：`hsi-oi`（或其他名字）
4. 設為 **Public**
5. 不要勾選 “Add a README”
6. 按 **Create repository**

### 2. 上傳檔案
把這個資料夾裡的所有檔案上傳到倉庫：

- `index.html`
- `data.js`
- `fetch_and_parse.py`
- `.github/workflows/update.yml`
- `README.md`

方法 A（簡單）：在 GitHub 網頁按 **uploading an existing file**，把檔案拖進去。

方法 B（終端機）：
```bash
git clone https://github.com/你的用戶名/hsi-oi.git
cd hsi-oi
# 把檔案複製進去
git add .
git commit -m "initial"
git push
```

### 3. 開啟 GitHub Pages
1. 進入倉庫 → **Settings** → **Pages**
2. Source 選 **Deploy from a branch**
3. Branch 選 `main`，資料夾選 `/ (root)`
4. 按 **Save**

幾分鐘後你會得到網址：
`https://你的用戶名.github.io/hsi-oi/`

### 4. 允許 Actions 寫入資料
1. 進入倉庫 → **Settings** → **Actions** → **General**
2. 找到 **Workflow permissions**
3. 選 **Read and write permissions**
4. 按 **Save**

### 5. 測試自動更新
1. 進入 **Actions** 頁面
2. 左邊選 **Update HSI Options OI Data**
3. 按 **Run workflow** → **Run workflow**
4. 等它跑完，確認 `data.js` 有更新

---

## 之後的使用

- 每天 22:50 HKT 左右會自動更新
- 直接打開你的 GitHub Pages 網址即可
- 不需要再手動跑指令

手動強制更新：到 Actions 頁面按 **Run workflow**

---

## 本地測試（可選）

```bash
python3 fetch_and_parse.py 2026-08-18
# 然後用瀏覽器打開 index.html
```

---

數據來源：港交所每日市場報告  
僅供個人交易參考，不構成投資建議。
