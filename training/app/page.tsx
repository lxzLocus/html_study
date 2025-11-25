import Image from "next/image";

// app/page.tsx
export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* ヘッダー */}
      <header className="flex justify-between items-center bg-gray-100 p-4">
        {/* 左上 */}
        <div className="flex items-center gap-4">
          <a href="#">googleについて</a>
          <a href="#">ストア</a>
        </div>

        {/* 右上 */}
        <div className="flex items-center gap-4">
          <a href="#">Gmail</a>
          <a href="#">画像</a>
          <a href="#">Lab Icon</a>
          <a href="#">Grid Menu</a>
          <a href="#">User Icon</a>
        </div>
      </header>

      {/* メイン */}
      <main className="flex flex-col items-center mt-32 gap-8">
        {/* ロゴ */}
        <h1 className="text-6xl font-bold">Google</h1>

        <form className="flex flex-col items-center gap-4">
          {/* 検索入力 */}
          <input
            type="text"
            name="q"
            placeholder="Search..."
            className="border border-gray-300 rounded-lg px-4 py-2 w-96"
          />

          {/* ボタン群 */}
          <div className="flex gap-3 justify-center">
            <button type="submit" className="bg-gray-200 px-4 py-2 rounded">
              Google 検索
            </button>
            <button type="submit" className="bg-gray-200 px-4 py-2 rounded">
              I'm Feeling Lucky
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}