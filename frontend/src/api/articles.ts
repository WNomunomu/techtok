import useSWR from 'swr';
import type { 
  Article, 
  ArticleListResponse, 
  ArticleSearchParams,
  DateBasedPaginationParams,
  ApiError 
} from '../types/Article';

// URLBase
const URL_BASE = import.meta.env.VITE_API_BASE_URL;

// getURL
const getArticlesURL = (params: ArticleSearchParams = {}) => {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, value.toString());
    }
  });
  
  return `${URL_BASE}/articles?${searchParams.toString()}`;
};

const getArticlesByDateURL = (params: DateBasedPaginationParams = {}) => {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, value.toString());
    }
  });
  
  return `${URL_BASE}/articles/by-date?${searchParams.toString()}`;
};

const getArticleDetailURL = (id: number) => {
  return `${URL_BASE}/articles/${id}`;
};

// fetcher
const fetcher = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) {
    const error: ApiError = await response.json();
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// useArticles (SWR)
export function useArticles(params: ArticleSearchParams = {}) {
  const url = getArticlesURL(params);
  
  const { data, error, isLoading, mutate: revalidate } = useSWR<ArticleListResponse>(
    url,
    () => fetcher<ArticleListResponse>(url),
    {
      // 記事一覧はほとんど更新されないため、キャッシュ時間を長く設定
      dedupingInterval: 1800000, // 30分
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    articles: data?.content || [],
    pagination: data ? {
      number: data.number,
      size: data.size,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      last: data.last,
      first: data.first,
    } : null,
    isLoading,
    error,
    revalidate,
  };
}

// useArticle (SWR)
export function useArticle(id: number) {
  const url = getArticleDetailURL(id);
  
  const { data, error, isLoading, mutate: revalidate } = useSWR<Article>(
    id ? url : null, // idが存在する場合のみリクエスト
    () => fetcher<Article>(url),
    {
      // 記事詳細は変更されにくいため、キャッシュ時間を長く設定
      dedupingInterval: 1800000, // 30分
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    article: data,
    isLoading,
    error,
    revalidate,
  };
}

// useArticlesByDate (日付ベースの記事取得)
export function useArticlesByDate(params: DateBasedPaginationParams = {}) {
  const url = getArticlesByDateURL(params);
  
  const { data, error, isLoading, mutate: revalidate } = useSWR<ArticleListResponse>(
    url,
    () => fetcher<ArticleListResponse>(url),
    {
      // 日付ベースの記事は頻繁に更新されるため、キャッシュ時間を短く設定
      dedupingInterval: 300000, // 5分
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    articles: data?.content || [],
    pagination: data ? {
      number: data.number,
      size: data.size,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      last: data.last,
      first: data.first,
    } : null,
    isLoading,
    error,
    revalidate,
  };
}
