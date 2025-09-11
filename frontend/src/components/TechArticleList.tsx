import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { TechArticleCard } from './TechArticleCard';
import { LoadingState } from './LoadingState';
import { ErrorState } from './ErrorState';

export function TechArticleList() {
  const { 
    articles, 
    isLoading, 
    error, 
    retry, 
    loadingRef 
  } = useInfiniteScroll(20);

  if (error) {
    return (
      <div className="p-6">
        <ErrorState error={error} onRetry={retry} />
      </div>
    );
  }

  return (
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory">
      {/* 初期ローディング状態 */}
      {articles.length === 0 && isLoading ? (
        <div className="h-screen flex items-center justify-center">
          <LoadingState message="Loading articles..." size="lg" />
        </div>
      ) : articles.length === 0 && !isLoading ? (
        <div className="h-screen flex items-center justify-center">
          <p className="text-gray-400 text-sm">No articles found</p>
        </div>
      ) : (
        <>
          {articles.map((article, index) => (
            <div key={article.id} className="h-screen w-full snap-start flex items-center justify-center p-6 relative">
              <div className="w-full h-full max-h-[calc(100vh-3rem)]">
                <TechArticleCard article={article} />
              </div>
              {/* 最後の記事の上にローディング表示 */}
              {index === articles.length - 1 && isLoading && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gray-800/90 backdrop-blur-sm rounded-lg px-4 py-2">
                    <LoadingState message="Loading more..." size="sm" />
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {/* 無限スクロール用のトリガー要素（非表示） */}
          <div ref={loadingRef} className="h-1 w-full" />
        </>
      )}
    </div>
  );
}
