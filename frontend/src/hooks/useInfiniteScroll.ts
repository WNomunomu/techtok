import { useState, useEffect, useCallback, useRef } from 'react';
import type { Article, InfiniteScrollState } from '../types/Article';

// 今日の日付をYYYY-MM-DD形式で取得
const getTodayDate = (): string => {
  return new Date().toISOString().split('T')[0];
};

export function useInfiniteScroll(pageSize: number = 20) {
  const [state, setState] = useState<InfiniteScrollState>({
    articles: [],
    currentDate: getTodayDate(),
    hasNextPage: true,
    isLoading: false,
    error: null,
  });

  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [retryCount, setRetryCount] = useState(0);
  const [lastFetchTime, setLastFetchTime] = useState<number>(0);
  const maxRetries = 3;
  const CACHE_DURATION = 60000; // 1 minute in milliseconds
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement | null>(null);

  const fetchArticles = useCallback(async () => {
    const now = Date.now();

    // Check if we have cached data and it's still fresh (less than 1 minute old)
    if (allArticles.length > 0 && now - lastFetchTime < CACHE_DURATION) {
      return;
    }

    if (state.isLoading) return;

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Call the real backend API
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
      const apiUrl = `${baseUrl}/articles`;
      console.log('Fetching from:', apiUrl);
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const articles: Article[] = await response.json();

      setAllArticles(articles);
      setLastFetchTime(now);

      // Set initial articles (first page)
      const initialArticles = articles.slice(0, pageSize);
      setState(prev => ({
        ...prev,
        articles: initialArticles,
        hasNextPage: articles.length > pageSize,
        isLoading: false,
        error: null,
      }));

      setRetryCount(0);
    } catch (error) {
      console.error('Failed to fetch articles:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error as Error,
      }));
    }
  }, [pageSize, state.isLoading, allArticles.length, lastFetchTime, CACHE_DURATION]);

  // 次のページを読み込む関数
  const loadNextPage = useCallback(() => {
    if (state.isLoading || !state.hasNextPage) return;

    const nextPage = currentPage + 1;
    const startIndex = nextPage * pageSize;
    const endIndex = startIndex + pageSize;
    const nextArticles = allArticles.slice(startIndex, endIndex);

    if (nextArticles.length > 0) {
      setState(prev => ({
        ...prev,
        articles: [...prev.articles, ...nextArticles],
        hasNextPage: endIndex < allArticles.length,
      }));
      setCurrentPage(nextPage);
    }
  }, [state.isLoading, state.hasNextPage, currentPage, pageSize, allArticles]);

  // エラー時の再試行
  const retry = useCallback(() => {
    if (retryCount >= maxRetries) {
      setState(prev => ({ ...prev, error: new Error('Max retries exceeded') }));
      return;
    }
    setRetryCount(prev => prev + 1);
    fetchArticles();
  }, [retryCount, maxRetries, fetchArticles]);

  // リフレッシュ関数
  const refresh = useCallback(() => {
    setState({
      articles: [],
      currentDate: getTodayDate(),
      hasNextPage: true,
      isLoading: false,
      error: null,
    });
    setAllArticles([]);
    setCurrentPage(0);
    setRetryCount(0);
    setLastFetchTime(0); // Force fresh fetch by resetting cache time
    fetchArticles();
  }, [fetchArticles]);

  // Intersection Observer の設定
  useEffect(() => {
    if (loadingRef.current) {
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !state.isLoading && state.hasNextPage) {
          loadNextPage();
        }
      }, { threshold: 0.1 });
      observerRef.current.observe(loadingRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [state.isLoading, state.hasNextPage, loadNextPage]);

  // 初期ロード
  useEffect(() => {
    if (state.articles.length === 0 && !state.isLoading && allArticles.length === 0) {
      fetchArticles();
    }
  }, [state.articles.length, state.isLoading, allArticles.length, fetchArticles]);

  return {
    articles: state.articles,
    isLoading: state.isLoading,
    error: state.error,
    loadNextPage,
    retry,
    refresh,
    loadingRef,
  };
}
