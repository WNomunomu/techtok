import { useState, useMemo } from 'react';
import { Search, Heart, Trash2, ArrowLeft } from 'lucide-react';
import { useLikedArticles } from '../hooks/useLikedArticles';
import { TechArticleCard } from './TechArticleCard';
import type { Article } from '../types/Article';

interface LikedArticlesPageProps {
  onBack: () => void;
}

export function LikedArticlesPage({ onBack }: LikedArticlesPageProps) {
  const { likedArticles, removeLikedArticle } = useLikedArticles();
  const [searchQuery, setSearchQuery] = useState('');

  // 検索機能
  const filteredArticles = useMemo(() => {
    if (!searchQuery.trim()) {
      return likedArticles;
    }
    
    const query = searchQuery.toLowerCase();
    return likedArticles.filter(article => 
      article.title.toLowerCase().includes(query) ||
      article.summary.toLowerCase().includes(query) ||
      article.author.toLowerCase().includes(query)
    );
  }, [likedArticles, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleRemoveArticle = (article: Article) => {
    removeLikedArticle(article.id);
  };

  return (
    <div className="h-screen w-full bg-black text-white overflow-y-auto">
      {/* ヘッダー */}
      <div className="sticky top-0 bg-black/90 backdrop-blur-sm border-b border-gray-800 z-10">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-lg font-semibold">Back</span>
          </button>
          
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-red-500 fill-current" />
            <h1 className="text-xl font-bold">Liked Articles</h1>
            <span className="text-gray-400">({likedArticles.length})</span>
          </div>
          
          <div className="w-20" /> {/* スペーサー */}
        </div>
      </div>

      {/* 検索バー */}
      <div className="p-4 bg-gray-900/50">
        <div className="relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search liked articles..."
            className="w-full bg-gray-800 text-white px-4 py-3 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 border border-gray-700"
          />
        </div>
      </div>

      {/* 記事一覧 */}
      <div className="p-4">
        {likedArticles.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-400 mb-2">No liked articles yet</h2>
            <p className="text-gray-500">Start liking articles to see them here!</p>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-400 mb-2">No articles found</h2>
            <p className="text-gray-500">Try adjusting your search terms</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredArticles.map((article) => (
              <div key={article.id} className="relative group">
                <TechArticleCard article={article} />
                
                {/* 削除ボタン */}
                <button
                  onClick={() => handleRemoveArticle(article)}
                  className="absolute top-4 right-4 p-2 bg-red-600/80 hover:bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm cursor-pointer"
                  aria-label="Remove from liked articles"
                >
                  <Trash2 className="w-4 h-4 text-white" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* フッター情報 */}
      {likedArticles.length > 0 && (
        <div className="p-4 text-center text-gray-500 text-sm border-t border-gray-800">
          {filteredArticles.length === likedArticles.length 
            ? `${likedArticles.length} liked articles`
            : `${filteredArticles.length} of ${likedArticles.length} articles`
          }
        </div>
      )}
    </div>
  );
}
