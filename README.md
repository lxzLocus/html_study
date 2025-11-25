# 勉強用

## HTMLからNext.jsやReactで使いたい場合

`class`から `className`に変更する

```html
<h2 id="news-tabs" class="visually-hidden">
```

から

```html
<h2 id="news-tabs" className="visually-hidden">
```

## モダンな感じ🤔

Tailwindなら `flex`と `p-12`、`gap-4`を中心に組めばすぐにモダンUIができる


## HTMLとCSSを別で実装する

### 外部CSSファイルを使う

ディレクトリ構成

```
app/
 ├ page.tsx
 └ styles/
     └ Home.css
```


page.tsx にクラス名をつけて

```
// page.tsx
import "./styles/Home.css";

export default function Home() {
  return (
    <main className="container">
      <h1 className="title">Hello CSS!</h1>
      <p className="text">
        これは外部CSSファイルを読み込む例です。
      </p>
    </main>
  );
}
```


Home.css にスタイルを書く

```css
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
}

.title {
  color: #1e40af;
  font-size: 2rem;
  font-weight: bold;
}

.text {
  color: #333;
  font-size: 1rem;
}
```

✅ ポイント

CSSクラスをclassNameで指定（classではなくclassName）
React/Nextでは直接importするだけでCSSが有効
複数ページごとに独立したCSSを置ける


## Tailwind CSSの使い方（3つの方法）

### 方法1️⃣: CDN方式（プロトタイプ・学習向け）

HTMLの`<head>`内に直接記述するだけで使える最も簡単な方法。

```html
<!DOCTYPE html>
<html lang="jp">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tailwind CDN Example</title>
    
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50">
    <div class="flex flex-col items-center justify-center min-h-screen">
        <h1 class="text-4xl font-bold text-blue-600">Hello Tailwind!</h1>
        <p class="mt-4 text-gray-700">CDN方式で即座に使える</p>
    </div>
</body>
</html>
```

**✅ メリット**
- `node_modules`不要
- 設定ファイル不要
- 即座に使える

**❌ デメリット**
- 未使用クラスの削除（purge）ができない → ファイルサイズが大きい
- カスタム設定ができない
- 本番環境には不向き

---

### 方法2️⃣: ローカルビルド方式（本番環境推奨）

Tailwind CSSをプロジェクトにインストールし、ビルドプロセスで最適化されたCSSを生成する方法。

#### セットアップ手順

```bash
# プロジェクト初期化
pnpm init -y

# Tailwind CSS と関連パッケージをインストール
pnpm add -D tailwindcss postcss autoprefixer

# 設定ファイルを自動生成
npx tailwindcss init -p
```

#### ディレクトリ構成

```
project/
 ├ package.json
 ├ tailwind.config.js
 ├ postcss.config.js
 ├ src/
 │   ├ index.html
 │   └ styles/
 │       └ input.css
 └ dist/
     └ output.css  (ビルド後に生成)
```

#### `tailwind.config.js` を設定

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",  // HTMLやJSファイルのパスを指定
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

#### `src/styles/input.css` を作成

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### ビルドコマンド

```bash
# 開発用（ウォッチモード）
npx tailwindcss -i ./src/styles/input.css -o ./dist/output.css --watch

# 本番用（最小化）
npx tailwindcss -i ./src/styles/input.css -o ./dist/output.css --minify
```

#### HTML で読み込む

```html
<!DOCTYPE html>
<html lang="jp">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="/dist/output.css">
</head>
<body class="bg-gray-50">
    <h1 class="text-4xl font-bold text-blue-600">Tailwind Build!</h1>
</body>
</html>
```

**✅ メリット**
- 未使用クラスが自動削除される（軽量化）
- カスタムテーマやプラグインが使える
- 本番環境に最適

**❌ デメリット**
- セットアップが必要
- ビルドプロセスが必要

---

### 方法3️⃣: Next.js/React と統合（モダン開発推奨）

Next.js や React プロジェクトで Tailwind CSS を使う方法。

#### Next.js での初期セットアップ

```bash
# Next.jsプロジェクト作成時にTailwindを選択
npx create-next-app@latest my-app
# ✔ Would you like to use Tailwind CSS? … Yes

# または既存プロジェクトに追加
pnpm add -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

#### `tailwind.config.ts` (Next.js)

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;
```

#### `app/globals.css` に追加

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### TSX で使用

```tsx
// app/page.tsx
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-500 to-purple-600">
      <h1 className="text-5xl font-bold text-white drop-shadow-lg">
        Next.js + Tailwind CSS
      </h1>
      <p className="mt-4 text-xl text-white/90">
        モダンな開発環境で爆速UI構築
      </p>
      <button className="mt-8 rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 shadow-xl transition hover:scale-105">
        Get Started
      </button>
    </main>
  );
}
```

**✅ メリット**
- ホットリロード対応（変更が即座に反映）
- TypeScript との統合
- コンポーネント単位で管理しやすい
- 本番ビルドで自動最適化

---

## 📊 比較表：どの方法を選ぶべきか？

| 方法 | node_modules | ビルド | 本番向き | 使用場面 |
|------|-------------|--------|---------|---------|
| **CDN** | ❌ 不要 | ❌ なし | ❌ 不向き | プロトタイプ、学習、デモ |
| **ローカルビルド** | ✅ 必要 | ✅ 必要 | ✅ 最適 | 静的サイト、本番HTML |
| **Next.js統合** | ✅ 必要 | ✅ 自動 | ✅ 最適 | Reactアプリ、SPA、SSR |

---

## ✅ まとめ

1. **プロトタイプ・学習** → CDN方式（`<script src="https://cdn.tailwindcss.com"></script>`）
2. **本番の静的サイト** → ローカルビルド方式（`npx tailwindcss build`）
3. **Next.js/React開発** → フレームワーク統合方式（推奨）

💡 **実務では方法3（Next.js統合）が最も多く使われています！**

---

## 🔄 Tailwind CSS と外部CSSファイルの併用

### 🤔 よくある疑問

> Q: Next.jsでTailwindを使っているけど、外部CSSファイルも使える？  
> A: **はい、併用できます！** ただし注意点があります。

---

### ⚠️ 重要な前提知識

Tailwind CSSは「**ユーティリティクラスを生成するフレームワーク**」です。

- `bg-gray-100`, `flex`, `p-4` などのクラスは、Tailwindのビルドプロセスで生成される
- 通常のCSSファイルに直接書いても**Tailwindは解釈しません**

---

### ❌ これは動きません

```css
/* styles/Home.css */
.my-box {
  bg-gray-100;  /* ⛔ 無効：Tailwindクラスは普通のCSSプロパティではない */
  flex;         /* ⛔ 無効 */
  p-4;          /* ⛔ 無効 */
}
```

➡ 普通のCSSファイルでは、Tailwindクラスは認識されません。

---

### ✅ 正しい方法1: `@apply` ディレクティブを使う

Tailwindがビルド処理するCSSファイル（`globals.css` や `*.module.css`）では、`@apply` を使ってTailwindクラスを適用できます。

#### 例：`app/globals.css` に記述

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* カスタムクラスを定義 */
.my-box {
  @apply bg-gray-100 flex flex-col justify-center items-center p-4 rounded-lg shadow-md;
}

.btn-primary {
  @apply bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition;
}
```

#### TSXで使用

```tsx
// app/page.tsx
export default function Home() {
  return (
    <div className="my-box">
      <h1>Hello World!</h1>
      <button className="btn-primary">Click Me</button>
    </div>
  );
}
```

**✅ メリット**

- 繰り返し使うスタイルをクラス化できる
- Tailwindのユーティリティをまとめて管理
- コンポーネントのクラス名がシンプルになる

**⚠️ 注意点**

- `@apply` が使えるのは、Tailwindのビルド対象のCSSファイルのみ
- 普通の `.css` ファイル（Tailwind管轄外）では動作しない

---

### ✅ 正しい方法2: 通常のCSSプロパティで書く

Tailwindクラスを使わず、通常のCSSプロパティで記述する方法。これは**どのCSSファイルでも使えます**。

```css
/* styles/custom.css */
.my-box {
  background-color: #f3f4f6;  /* bg-gray-100 相当 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;              /* p-4 相当 */
  border-radius: 0.5rem;      /* rounded-lg 相当 */
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);  /* shadow-md 相当 */
}

.btn-primary {
  background-color: #2563eb;
  color: white;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s;
}

.btn-primary:hover {
  background-color: #1d4ed8;
}
```

```tsx
// page.tsx
import './styles/custom.css';

export default function Home() {
  return (
    <div className="my-box">
      <button className="btn-primary">Click Me</button>
    </div>
  );
}
```

**✅ メリット**

- Tailwindに依存しない
- 複雑なアニメーションや細かい制御がしやすい
- どんなCSSファイルでも使える

**❌ デメリット**

- Tailwindの恩恵（クラス名の統一、軽量化）が受けられない
- 自分でCSSプロパティを全て書く必要がある

---

### ✅ 正しい方法3: CSS Modules と Tailwind を併用

CSS Modulesを使えば、スコープを分離しながらTailwindと併用できます。

#### ファイル構成

```
app/
 ├ page.tsx
 ├ page.module.css
 └ globals.css
```

#### `page.module.css`

```css
/* page.module.css */
.container {
  @apply max-w-4xl mx-auto p-6;
}

.card {
  @apply bg-white rounded-xl shadow-lg p-6;
  /* Tailwindにないカスタムスタイルも追加可能 */
  background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.title {
  @apply text-3xl font-bold text-white mb-4;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}
```

#### `page.tsx`

```tsx
// page.tsx
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Tailwind + CSS Modules</h1>
        <p className="text-white">ベストプラクティス</p>
      </div>
    </div>
  );
}
```

**✅ メリット**

- クラス名の衝突を防げる
- Tailwindクラスと通常CSSを自由に組み合わせ可能
- コンポーネント単位でスタイル管理

---

### 📊 Tailwind と 外部CSS の使い分け

| 用途 | 推奨方法 | 理由 |
|------|---------|------|
| **グローバルスタイル**（フォント、リセットCSS） | `globals.css` に通常CSS | 全ページ共通の基本設定 |
| **繰り返し使うパーツ**（ボタン、カードなど） | `globals.css` で `@apply` | Tailwindクラスをまとめて再利用 |
| **コンポーネント固有スタイル** | CSS Modules + `@apply` | スコープ分離＋Tailwind活用 |
| **複雑なアニメーション・特殊効果** | 通常CSSプロパティ | Tailwindでは表現しづらい処理 |
| **ページ単位の簡単なUI** | TSXに直接Tailwindクラス | 最速・最軽量 |

---

### 🧠 実践例：併用パターン

#### `app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* グローバル設定 */
body {
  font-family: 'Inter', sans-serif;
  background-color: #fafafa;
}

/* よく使うボタンを定義 */
@layer components {
  .btn {
    @apply font-semibold px-6 py-3 rounded-lg transition;
  }
  
  .btn-primary {
    @apply btn bg-blue-600 text-white hover:bg-blue-700;
  }
  
  .btn-secondary {
    @apply btn bg-gray-200 text-gray-800 hover:bg-gray-300;
  }
}
```

#### `components/Card.tsx` と `Card.module.css`

```tsx
// components/Card.tsx
import styles from './Card.module.css';

export function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className={styles.card}>
      <h2 className={styles.cardTitle}>{title}</h2>
      <div className={styles.cardContent}>{children}</div>
    </div>
  );
}
```

```css
/* components/Card.module.css */
.card {
  @apply bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow;
}

.cardTitle {
  @apply text-2xl font-bold text-gray-800 mb-4 border-b pb-2;
}

.cardContent {
  @apply text-gray-700;
  /* Tailwindにないカスタムスタイル */
  line-height: 1.8;
}
```

#### `app/page.tsx`（使用例）

```tsx
// app/page.tsx
import { Card } from '@/components/Card';

export default function Home() {
  return (
    <main className="container mx-auto p-8">
      {/* Tailwindを直接使用 */}
      <h1 className="text-4xl font-bold text-center mb-8">
        Tailwind + CSS 併用デモ
      </h1>
      
      {/* グローバルで定義したボタン */}
      <div className="flex gap-4 justify-center mb-8">
        <button className="btn-primary">Primary</button>
        <button className="btn-secondary">Secondary</button>
      </div>
      
      {/* CSS Modulesを使ったコンポーネント */}
      <Card title="カードタイトル">
        <p>これはCSS ModulesとTailwindを併用した例です。</p>
      </Card>
    </main>
  );
}
```

---

### ✅ まとめ：Tailwind と 外部CSS の併用ルール

| 書き方 | 動作 | 使える場所 |
|--------|------|-----------|
| `className="bg-gray-100 p-4"` | ✅ 動作 | TSX/JSX |
| `.box { bg-gray-100; }` | ❌ 無効 | 通常CSS |
| `.box { @apply bg-gray-100 p-4; }` | ✅ 動作 | `globals.css`, `*.module.css` (Tailwind管轄内) |
| `.box { background-color: #f3f4f6; padding: 1rem; }` | ✅ 動作 | すべてのCSS |

**💡 ベストプラクティス**

1. **基本はTSXに直接Tailwindクラス** → 最速・最軽量
2. **繰り返すスタイルは `@apply` でクラス化** → 再利用性UP
3. **複雑なスタイルは通常CSSで記述** → 柔軟性確保
4. **コンポーネント固有は CSS Modules** → スコープ分離

これで Tailwind と外部CSS を効果的に使い分けられます！🎨✨

---

## 🎯 HTML で CSS を使う方法（3つの基本）

HTMLファイルでスタイルを適用するには、主に3つの方法があります。

### 方法1️⃣: 外部CSSファイルを読み込む（推奨）

`<head>` 内に `<link>` タグで外部CSSファイルを読み込む。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>家計簿アプリ</title>
    
    <!-- 外部CSSファイルを読み込む -->
    <link rel="stylesheet" href="styles/main.css">
</head>
<body>
    <h1>Hello World</h1>
</body>
</html>
```

**✅ メリット**
- HTMLとCSSを分離できる（保守性が高い）
- 複数のHTMLファイルで同じCSSを再利用可能
- ブラウザキャッシュが効く

**📁 ディレクトリ構成例**

```
project/
 ├ index.html
 └ styles/
     └ main.css
```

---

### 方法2️⃣: `<style>` タグで埋め込む

`<head>` 内に `<style>` タグを使ってCSSを直接記述。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>家計簿アプリ</title>
    
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
        }
        
        h1 {
            color: #333;
            text-align: center;
        }
    </style>
</head>
<body>
    <h1>Hello World</h1>
</body>
</html>
```

**✅ メリット**
- 1ファイルで完結（小規模ページ向け）
- 外部ファイルのリクエストが不要

**❌ デメリット**
- HTMLが長くなる
- 再利用できない

---

### 方法3️⃣: インラインスタイル（要素に直接記述）

各HTML要素に `style` 属性を使って直接スタイルを適用。

```html
<h1 style="color: #333; text-align: center; margin-top: 20px;">
    Hello World
</h1>
```

**✅ メリット**
- その要素だけにスタイルを適用したい時に便利
- 最優先で適用される（詳細度が最高）

**❌ デメリット**
- 管理が大変
- 再利用できない
- HTMLが読みづらくなる

---

### 📊 使い分けガイド

| 方法 | 使用場面 | 推奨度 |
|------|---------|--------|
| **外部CSS** | 本番サイト、複数ページ | ⭐⭐⭐⭐⭐ |
| **`<style>`タグ** | 1ページ完結の小規模サイト | ⭐⭐⭐ |
| **インラインスタイル** | 特定要素のみ、動的スタイル変更 | ⭐⭐ |

---

## 🎨 ポップアップ（モーダル）実装ガイド

ポップアップ（モーダル）は、ユーザーが特定の操作をした時に画面上に表示される小さなウィンドウです。  
ここでは**HTML + CSS + JavaScript**だけで実装する方法を完全解説します。

---

### 🧩 基本構造の理解

ポップアップは以下の3要素で構成されます：

1. **背景オーバーレイ** - 画面全体を覆う半透明の背景
2. **モーダルコンテンツ** - 実際に表示する内容
3. **開閉制御** - JavaScriptで表示・非表示を切り替え

---

### ✨ 完全な実装例

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ポップアップ実装サンプル</title>
    <style>
        /* ========== 基本スタイル ========== */
        body {
            font-family: 'Inter', sans-serif;
            background: #f9fafb;
            margin: 0;
            padding: 2rem;
        }

        /* ========== ボタン ========== */
        .open-modal-btn {
            background-color: #2563eb;
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
        }

        .open-modal-btn:hover {
            background-color: #1d4ed8;
        }

        /* ========== モーダル（ポップアップ）========== */
        .modal {
            /* 画面全体を覆う */
            position: fixed;
            inset: 0; /* top: 0; right: 0; bottom: 0; left: 0; の短縮 */
            
            /* 半透明の黒背景 */
            background: rgba(0, 0, 0, 0.5);
            
            /* 中央配置 */
            display: flex;
            justify-content: center;
            align-items: center;
            
            /* 初期状態は非表示 */
            visibility: hidden;
            opacity: 0;
            
            /* フェードイン・アウトのアニメーション */
            transition: opacity 0.3s ease, visibility 0.3s ease;
        }

        /* モーダルが開いている状態 */
        .modal.active {
            visibility: visible;
            opacity: 1;
        }

        /* モーダルのコンテンツ部分 */
        .modal-content {
            background: white;
            padding: 2rem;
            border-radius: 12px;
            width: 90%;
            max-width: 500px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            position: relative;
            
            /* モーダル自体もアニメーション */
            transform: scale(0.9);
            transition: transform 0.3s ease;
        }

        .modal.active .modal-content {
            transform: scale(1);
        }

        /* 閉じるボタン */
        .close-btn {
            position: absolute;
            top: 12px;
            right: 16px;
            border: none;
            background: none;
            font-size: 28px;
            cursor: pointer;
            color: #666;
            line-height: 1;
        }

        .close-btn:hover {
            color: #000;
        }

        /* モーダル内のコンテンツ */
        .modal-content h2 {
            margin-top: 0;
            color: #333;
        }

        .modal-content p {
            color: #666;
            line-height: 1.6;
        }

        .modal-actions {
            display: flex;
            gap: 12px;
            margin-top: 1.5rem;
        }

        .modal-actions button {
            flex: 1;
            padding: 10px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
        }

        .btn-primary {
            background-color: #2563eb;
            color: white;
        }

        .btn-secondary {
            background-color: #e5e7eb;
            color: #333;
        }
    </style>
</head>
<body>
    <h1>ポップアップ実装デモ</h1>
    
    <!-- モーダルを開くボタン -->
    <button class="open-modal-btn" id="openModal">モーダルを開く</button>

    <!-- ========== モーダル（ポップアップ）========== -->
    <div class="modal" id="myModal">
        <div class="modal-content">
            <!-- 閉じるボタン -->
            <button class="close-btn" id="closeModal">&times;</button>
            
            <!-- コンテンツ -->
            <h2>モーダルタイトル</h2>
            <p>これはポップアップの内容です。任意のHTMLを配置できます。</p>
            
            <!-- アクションボタン -->
            <div class="modal-actions">
                <button class="btn-primary">保存</button>
                <button class="btn-secondary" id="cancelBtn">キャンセル</button>
            </div>
        </div>
    </div>

    <script>
        // 要素の取得
        const modal = document.getElementById('myModal');
        const openBtn = document.getElementById('openModal');
        const closeBtn = document.getElementById('closeModal');
        const cancelBtn = document.getElementById('cancelBtn');

        // モーダルを開く
        openBtn.addEventListener('click', () => {
            modal.classList.add('active');
        });

        // モーダルを閉じる（×ボタン）
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        // モーダルを閉じる（キャンセルボタン）
        cancelBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        // モーダルを閉じる（背景クリック）
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });

        // ESCキーでモーダルを閉じる
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                modal.classList.remove('active');
            }
        });
    </script>
</body>
</html>
```

---

### 🔑 重要ポイント解説

#### 1️⃣ CSS の構造

```css
.modal {
    position: fixed;    /* 画面の絶対位置に固定 */
    inset: 0;          /* 画面全体を覆う */
    display: flex;      /* 中央配置用 */
    justify-content: center;
    align-items: center;
    visibility: hidden; /* 初期状態は非表示 */
    opacity: 0;
}

.modal.active {
    visibility: visible; /* 表示状態 */
    opacity: 1;
}
```

**ポイント:**
- `position: fixed` で画面に固定
- `inset: 0` で画面全体を覆う
- `visibility` と `opacity` で滑らかな表示・非表示

---

#### 2️⃣ JavaScript の制御

```javascript
// クラスを追加して表示
modal.classList.add('active');

// クラスを削除して非表示
modal.classList.remove('active');
```

**ポイント:**
- `classList.add()` / `classList.remove()` でCSSクラスを操作
- CSSの `transition` でアニメーション効果

---

### 📊 テーブルとモーダルの連携例

実務でよく使う「テーブルの行をクリックして詳細を表示」する実装例：

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>家計簿ダッシュボード</title>
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background: #f9fafb;
            margin: 0;
            padding: 2rem;
        }

        /* ========== テーブル ========== */
        table {
            width: 100%;
            border-collapse: collapse;
            background-color: #fff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        th, td {
            padding: 12px 16px;
            border-bottom: 1px solid #e5e7eb;
            text-align: left;
        }

        th {
            background-color: #f3f4f6;
            font-weight: 600;
        }

        tbody tr:hover {
            background-color: #eef2ff;
            cursor: pointer;
        }

        /* ========== モーダル ========== */
        .modal {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            visibility: hidden;
            opacity: 0;
            transition: opacity 0.3s ease, visibility 0.3s ease;
        }

        .modal.active {
            visibility: visible;
            opacity: 1;
        }

        .modal-content {
            background: white;
            padding: 2rem;
            border-radius: 12px;
            width: 90%;
            max-width: 400px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            position: relative;
        }

        .close-btn {
            position: absolute;
            top: 12px;
            right: 16px;
            border: none;
            background: none;
            font-size: 28px;
            cursor: pointer;
            color: #666;
        }

        .modal-content h2 {
            margin-top: 0;
        }

        .modal-content p {
            margin: 0.5rem 0;
            color: #555;
        }

        .modal-actions {
            display: flex;
            gap: 8px;
            margin-top: 1.5rem;
        }

        .modal-actions button {
            flex: 1;
            padding: 10px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
        }

        .edit-btn {
            background-color: #2563eb;
            color: white;
        }

        .delete-btn {
            background-color: #dc2626;
            color: white;
        }
    </style>
</head>
<body>
    <h1>取引履歴</h1>

    <table>
        <thead>
            <tr>
                <th>日付</th>
                <th>金額</th>
                <th>タイプ</th>
                <th>カテゴリ</th>
            </tr>
        </thead>
        <tbody>
            <tr data-date="2025-02-01" data-amount="10000" data-type="支出" data-category="食費">
                <td>2025-02-01</td>
                <td>¥10,000</td>
                <td>支出</td>
                <td>食費</td>
            </tr>
            <tr data-date="2025-02-03" data-amount="230000" data-type="収入" data-category="給料">
                <td>2025-02-03</td>
                <td>¥230,000</td>
                <td>収入</td>
                <td>給料</td>
            </tr>
            <tr data-date="2025-02-06" data-amount="4200" data-type="支出" data-category="交通費">
                <td>2025-02-06</td>
                <td>¥4,200</td>
                <td>支出</td>
                <td>交通費</td>
            </tr>
        </tbody>
    </table>

    <!-- ========== モーダル ========== -->
    <div class="modal" id="recordModal">
        <div class="modal-content">
            <button class="close-btn" id="closeModal">&times;</button>
            <h2>取引詳細</h2>
            <p><strong>日付:</strong> <span id="detailDate"></span></p>
            <p><strong>金額:</strong> ¥<span id="detailAmount"></span></p>
            <p><strong>種類:</strong> <span id="detailType"></span></p>
            <p><strong>カテゴリ:</strong> <span id="detailCategory"></span></p>

            <div class="modal-actions">
                <button class="edit-btn">編集</button>
                <button class="delete-btn">削除</button>
            </div>
        </div>
    </div>

    <script>
        // 要素の取得
        const rows = document.querySelectorAll('tbody tr');
        const modal = document.getElementById('recordModal');
        const closeBtn = document.getElementById('closeModal');
        
        // モーダル内の表示要素
        const detailDate = document.getElementById('detailDate');
        const detailAmount = document.getElementById('detailAmount');
        const detailType = document.getElementById('detailType');
        const detailCategory = document.getElementById('detailCategory');

        // 各テーブル行にクリックイベントを追加
        rows.forEach((row) => {
            row.addEventListener('click', () => {
                // data-* 属性から情報を取得
                const date = row.dataset.date;
                const amount = row.dataset.amount;
                const type = row.dataset.type;
                const category = row.dataset.category;

                // モーダルに情報を反映
                detailDate.textContent = date;
                detailAmount.textContent = amount.toLocaleString();
                detailType.textContent = type;
                detailCategory.textContent = category;

                // モーダルを表示
                modal.classList.add('active');
            });
        });

        // モーダルを閉じる（×ボタン）
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        // モーダルを閉じる（背景クリック）
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });

        // ESCキーでモーダルを閉じる
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                modal.classList.remove('active');
            }
        });
    </script>
</body>
</html>
```

---

### 🎯 実装ステップ（段階的に進める）

| ステップ | 内容 | 難易度 |
|---------|------|--------|
| **1** | HTMLでモーダルの構造を作る | ⭐ |
| **2** | CSSで見た目とアニメーションを設定 | ⭐⭐ |
| **3** | JSで開く・閉じる動作を実装 | ⭐⭐ |
| **4** | テーブルと連携してデータを表示 | ⭐⭐⭐ |
| **5** | 編集・削除機能を追加 | ⭐⭐⭐⭐ |

---

### 💡 よく使うテクニック

#### 1️⃣ `data-*` 属性でデータを埋め込む

```html
<tr data-id="123" data-name="田中太郎" data-email="tanaka@example.com">
    <td>田中太郎</td>
    <td>tanaka@example.com</td>
</tr>
```

```javascript
const id = row.dataset.id;       // "123"
const name = row.dataset.name;   // "田中太郎"
```

---

#### 2️⃣ 複数のモーダルを管理

```javascript
function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// 使用例
openModal('editModal');
closeModal('deleteModal');
```

---

#### 3️⃣ フォーム入力と連携

```html
<div class="modal-content">
    <h2>新規登録</h2>
    <form id="addForm">
        <input type="date" name="date" required>
        <input type="number" name="amount" required>
        <button type="submit">保存</button>
    </form>
</div>
```

```javascript
document.getElementById('addForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const date = formData.get('date');
    const amount = formData.get('amount');
    
    // データを処理...
    console.log(date, amount);
    
    modal.classList.remove('active');
});
```

---

### ✅ チェックリスト

モーダル実装時に確認すべき項目：

- [ ] 背景クリックで閉じる
- [ ] ESCキーで閉じる
- [ ] ×ボタンで閉じる
- [ ] スクロールをロック（必要に応じて）
- [ ] モバイル対応（レスポンシブ）
- [ ] アニメーション効果
- [ ] アクセシビリティ（`aria-*` 属性）

---

### 🚀 発展: スクロールロック

モーダルが開いている時、背景のスクロールを防ぐ：

```javascript
// モーダルを開く時
modal.classList.add('active');
document.body.style.overflow = 'hidden';

// モーダルを閉じる時
modal.classList.remove('active');
document.body.style.overflow = '';
```

---

### 🎨 Next.js/React での実装例

```tsx
'use client';
import { useState } from 'react';

export default function Modal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        モーダルを開く
      </button>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="bg-white p-8 rounded-xl max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="float-right text-2xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">モーダル</h2>
            <p>コンテンツ</p>
          </div>
        </div>
      )}
    </>
  );
}
```

---

### ✅ まとめ

**ポップアップ（モーダル）実装の基本3ステップ:**

1. **HTML** - モーダルの構造を作る（非表示状態）
2. **CSS** - 表示・非表示のスタイルとアニメーション
3. **JavaScript** - クラスの追加・削除で制御

**重要ポイント:**
- `position: fixed` で画面に固定
- `classList.add/remove` で表示制御
- `data-*` 属性でデータを渡す
- 背景クリック・ESCキーで閉じる

これでポップアップを自由に実装できます！🎉

