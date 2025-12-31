import React, { useState } from 'react';

// ブラーアップ画像コンポーネント
const BlurUpImage = ({ src, placeholderSrc, alt }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full aspect-video overflow-hidden rounded-xl bg-slate-100">
      {/* 低画質プレースホルダー */}
      <img
        src={placeholderSrc}
        alt=""
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 blur-lg scale-110
          ${isLoaded ? 'opacity-0' : 'opacity-100'}`}
      />

      {/* 本番画像 */}
      <img
        src={src}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700
          ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
};

export default function App() {
  const [key, setKey] = useState(0);

  // 画像のURL（実際の高画質画像）
  const imageUrl = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80';

  // プレースホルダー（低画質・小サイズ）
  const placeholderUrl = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=50&q=10';

  const handleReload = () => {
    // keyを変更してコンポーネントを再マウント
    setKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            ブラーアップ / LQIP デモ
          </h1>
          <p className="text-slate-600 mb-4">
            低画質画像から高画質画像へスムーズに遷移
          </p>
          <button
            onClick={handleReload}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            再読み込み
          </button>
        </div>

        <BlurUpImage
          key={key}
          src={imageUrl}
          placeholderSrc={placeholderUrl}
          alt="美しい山の風景"
        />

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="font-bold text-lg mb-2">仕組み</h2>
          <ol className="list-decimal list-inside space-y-2 text-slate-700">
            <li>最初に極小サイズの低画質画像を表示（ぼかし効果付き）</li>
            <li>バックグラウンドで高画質画像を読み込み</li>
            <li>読み込み完了後、フェードインでスムーズに切り替え</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
