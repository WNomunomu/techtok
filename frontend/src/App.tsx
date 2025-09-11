import { useState } from 'react';
import { Heart, RefreshCw } from 'lucide-react';
import { TechArticleList } from "./components/TechArticleList";
import { LikedArticlesPage } from "./components/LikedArticlesPage";
import { Analytics } from "@vercel/analytics/react";
import { CacheStatus } from "./components/CacheStatus";

function App() {
  const [showLikedArticles, setShowLikedArticles] = useState(false);

  return (
    <div className="h-screen w-full bg-black text-white">
      {showLikedArticles ? (
        <LikedArticlesPage onBack={() => setShowLikedArticles(false)} />
      ) : (
        <>
          {/* ヘッダー */}
          <div className="fixed top-4 left-4 z-50">
            <button
              onClick={() => window.location.reload()}
              className="text-base font-bold text-white drop-shadow-lg hover:text-white transition-all cursor-pointer"
            >
              TechTok
            </button>
          </div>

          <div className="fixed top-4 right-4 z-50 flex gap-2">
            <button
              onClick={() => window.location.reload()}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all text-white shadow-lg cursor-pointer"
              title="Reset all articles and start from today"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">Reset</span>
            </button>
            
            <button
              onClick={() => setShowLikedArticles(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-red-600 hover:bg-red-600 rounded-lg transition-all text-white shadow-lg cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span className="text-xs font-medium">Liked</span>
            </button>
          </div>

          <TechArticleList />
        </>
      )}
      
      <CacheStatus />
      <Analytics />
    </div>
  );
}

export default App;