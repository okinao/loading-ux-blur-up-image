import React, { useState } from 'react';

// ブラーアップ画像コンポーネント
const BlurUpImage = ({ src, placeholderSrc, alt }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full aspect-video overflow-hidden rounded-xl bg-slate-100">
      
      <img
        src={placeholderSrc}
        alt=""
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 blur-lg scale-110
          ${isLoaded ? 'opacity-0' : 'opacity-100'}`}
      />

      
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
        <BlurUpImage
          key={key}
          src={imageUrl}
          placeholderSrc={placeholderUrl}
          alt="美しい山の風景"
        />

        <div className="text-center">
          <button
            onClick={handleReload}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            リロード
          </button>
        </div>
      </div>
    </div>
  );
}
