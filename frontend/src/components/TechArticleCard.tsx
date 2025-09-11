import { Calendar, User, ExternalLink, Heart } from 'lucide-react';
import { useLikedArticles } from '../hooks/useLikedArticles';
import type { Article } from '../types/Article';

interface TechArticleCardProps {
  article: Article;
}

export function TechArticleCard({ article }: TechArticleCardProps) {
  const { toggleLike, isLiked } = useLikedArticles();
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="mt-12 mb-4">
      <div className="bg-gray-900 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow max-h-[calc(100vh-100px)] flex flex-col">
        {/* ヘッダー */}
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-lg font-bold text-white line-clamp-2 flex-1 pr-4">
            {article.title}
          </h2>
          <button
            onClick={() => toggleLike(article)}
            className={`p-1.5 rounded-full transition-colors flex-shrink-0 cursor-pointer ${
              isLiked(article.id)
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
            aria-label={isLiked(article.id) ? 'Unlike article' : 'Like article'}
          >
            <Heart
              className={`w-4 h-4 ${
                isLiked(article.id) ? 'fill-white text-white' : 'text-gray-300'
              }`}
            />
          </button>
        </div>

        {/* 要約 - スクロール可能エリア */}
        <div className="flex-1 overflow-y-auto mb-6">
          <p className="text-gray-300 text-sm leading-relaxed">
            {article.summary}
          </p>
        </div>

        {/* メタ情報 */}
        <div className="flex items-center gap-3 text-xs text-gray-400 mb-4 flex-shrink-0">
          <div className="flex items-center gap-1">
            <User className="w-3 h-3" />
            <span>{article.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{formatDate(article.publishedAt)}</span>
          </div>
        </div>

        {/* アクションボタン */}
        <div className="flex-shrink-0">
          <a
            href={article.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-white text-sm"
          >
            <ExternalLink className="w-3 h-3" />
            記事を読む
          </a>
        </div>
      </div>
    </div>
  );
}
