# Premier Doctor Marriage — LP 引き継ぎガイド

静的HTML/CSS/JS で実装された1ページLP。ビルド不要。

---

## 使用技術

| 種別 | 内容 |
|------|------|
| マークアップ | HTML5 |
| スタイリング | CSS（カスタムプロパティ使用） |
| スクリプト | バニラJS（外部ライブラリなし） |
| フォント | Google Fonts（Cormorant Garamond, Noto Serif JP, Noto Sans JP） |

---

## ローカル確認方法

ビルド不要。ブラウザで `index.html` を直接開くか、簡易サーバーで確認:

```bash
# Python 3 の場合
python -m http.server 8080

# Node.js の場合
npx serve .
```

ブラウザで `http://localhost:8080` を開く。

---

## ディレクトリ構成

```
LPプロジェクト/
├── index.html      # メインHTML（全セクション）
├── styles.css      # スタイル（デザイントークン含む）
├── script.js       # 追従CTA制御・スクロールアニメーション
├── assets/
│   ├── hero.jpg    # ← FV女性写真（要配置）
│   ├── ogp.jpg     # ← OGP画像（要配置、推奨: 1200×630px）
│   └── favicon.ico # ← ファビコン（要配置）
└── README.md
```

---

## 差し替えが必要な箇所

### 1. FV 女性写真
```
assets/hero.jpg に写真ファイルを配置
推奨サイズ: 750×1000px以上（縦長ポートレート）
```

### 2. フォーム iframe URL
```html
<!-- index.html の #entry セクション内 -->
<iframe src="about:blank" ...>
         ↑ここをZoho FormsなどのiFrame URLに差し替え
<!-- 例: src="https://forms.zohopublic.com/xxx/form/xxx/formperma/xxx" -->
```
差し替え後、`form-placeholder` の div ブロックを削除:
```html
<!-- ↓ このブロックを丸ごと削除 -->
<div class="form-placeholder" aria-hidden="true">...</div>
```

### 3. 本番URL（OGP）
```html
<!-- index.html <head> 内 -->
<meta property="og:url" content="https://example.com/">
                                  ↑ 実際のURLに差し替え
```

### 4. OGP画像
```
assets/ogp.jpg を配置（推奨: 1200×630px）
```

### 5. フッターリンクURL
```html
<!-- index.html フッター内 -->
<a href="/privacy">プライバシーポリシー</a>
<a href="/tokushoho">特定商取引法に基づく表示</a>
<a href="/company">会社概要</a>
<!-- ↑ 各ページのURLに差し替え -->
```

### 6. ファビコン
```
assets/favicon.ico を配置
```

---

## テキスト修正箇所

`index.html` 内に `← 修正箇所` コメントを記載。主な箇所:

| 箇所 | コメント目印 |
|------|-------------|
| ページタイトル・説明 | `SEO設定` |
| FVキャッチコピー | `fv__headline` |
| 代表者名・役職 | `fv__rep` |
| CTAボタン文言（全箇所） | `CTAテキスト修正箇所` |
| 強みカード数値（在籍数・支店数） | `在籍数の修正箇所`、`支店数の修正箇所` |
| Q&A 質問・回答 | `FAQ アコーディオン` |
| ミクロコピー | `ミクロコピー修正箇所` |

---

## デザイントークン修正

`styles.css` の `:root` ブロックで色・余白を一元管理:

```css
:root {
  --color-gold:  #B8963E;  /* ← ブランドカラー変更時はここ */
  --color-text:  #1C1C1C;  /* ← テキスト色 */
  ...
}
```

---

## 引き継ぎ時の確認チェックリスト

- [ ] `assets/hero.jpg` を配置したか
- [ ] フォームiframe URLを差し替えたか
- [ ] `form-placeholder` の div を削除したか
- [ ] 本番URLをOGPに設定したか
- [ ] フッターリンクのURLを設定したか
- [ ] スマホ（375px / 390px / 414px）で表示確認したか
- [ ] 追従CTAがFV中は非表示、スクロール後に表示されるか確認したか
- [ ] フォームセクション到達時に追従CTAが非表示になるか確認したか
