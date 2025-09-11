import { useState, useEffect, useCallback, useRef } from 'react';
import { mockApi } from '../services/mockApi';
import type { Article, InfiniteScrollState } from '../types/Article';

// 日付を1日進める関数 (実際には過去の日付に進む)
const getNextDate = (dateString: string): string => {
  const date = new Date(dateString);
  date.setDate(date.getDate() - 1); // 過去の日付に進む
  return date.toISOString().split('T')[0];
};

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

  const [buffer, setBuffer] = useState<Article[]>([]);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement | null>(null);

  const fetchArticles = useCallback(async (date: string, forBuffer: boolean = false) => {
    if (state.isLoading) return;

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const data = await mockApi.getArticlesByDate(date, pageSize);
      const articles = data.content || [];

      if (articles.length === 0) {
        // その日の記事がない場合、次の日付に進む
        const nextDate = getNextDate(date);
        setState(prev => ({
          ...prev,
          currentDate: nextDate,
          hasNextPage: true,
          isLoading: false,
        }));
        return;
      }

      if (forBuffer) {
        // バッファに保存
        setBuffer(articles);
      } else {
        // 直接記事一覧に追加
        setState(prev => ({
          ...prev,
          articles: [...prev.articles, ...articles],
          currentDate: data.last ? getNextDate(date) : date,
          hasNextPage: !data.last || articles.length === pageSize,
          isLoading: false,
          error: null,
        }));
        
        // 次の記事をバッファに取得
        const nextDate = data.last ? getNextDate(date) : date;
        if (data.last) {
          fetchArticles(nextDate, true);
        }
      }

      setRetryCount(0);
    } catch (error) {
      console.error('Failed to fetch articles:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error as Error,
      }));
    }
  }, [pageSize, state.isLoading]);

  // 次のページを読み込む関数
  const loadNextPage = useCallback(() => {
    if (state.isLoading || !state.hasNextPage) return;
    
    // バッファから記事を表示に追加
    if (buffer.length > 0) {
      setState(prev => ({
        ...prev,
        articles: [...prev.articles, ...buffer],
      }));
      setBuffer([]);
      
      fetchArticles(state.currentDate, true);
    } else {
      fetchArticles(state.currentDate, false);
    }
  }, [state.isLoading, state.hasNextPage, state.currentDate, buffer, fetchArticles]);

  // エラー時の再試行
  const retry = useCallback(() => {
    if (retryCount >= maxRetries) {
      setState(prev => ({ ...prev, error: new Error('Max retries exceeded') }));
      return;
    }
    setRetryCount(prev => prev + 1);
    fetchArticles(state.currentDate, false);
  }, [retryCount, maxRetries, state.currentDate, fetchArticles]);

  // リフレッシュ関数
  const refresh = useCallback(() => {
    setState({
      articles: [],
      currentDate: getTodayDate(),
      hasNextPage: true,
      isLoading: false,
      error: null,
    });
    setBuffer([]);
    setRetryCount(0);
    fetchArticles(getTodayDate(), false);
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
    if (state.articles.length === 0 && !state.isLoading) {
      fetchArticles(state.currentDate, false);
    }
  }, [state.articles.length, state.isLoading, state.currentDate, fetchArticles]);

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