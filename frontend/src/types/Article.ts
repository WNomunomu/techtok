// バックエンドのTechArticleエンティティに対応するフロントエンド型定義

export interface Article {
  id: number;
  title: string;
  summary: string;
  author: string;
  sourceUrl: string;
  publishedAt: string;
  createdAt: string;
}

// APIレスポンス用の型（ページネーション対応）
export interface ArticleListResponse {
  content: Article[];
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  number: number;
  size: number;
}

// 記事検索用の型
export interface ArticleSearchParams {
  page?: number;
  size?: number;
  sort?: 'createdAt' | 'publishedAt' | 'title';
  direction?: 'asc' | 'desc';
  search?: string;
}

// 日付ベースのページネーション用の型
export interface DateBasedPaginationParams {
  date?: string; // YYYY-MM-DD形式
  size?: number;
  sort?: 'createdAt' | 'publishedAt';
  direction?: 'asc' | 'desc';
}

// 無限スクロール用の型
export interface InfiniteScrollState {
  articles: Article[];
  currentDate: string;
  hasNextPage: boolean;
  isLoading: boolean;
  error: Error | null;
}

// エラーレスポンス用の型
export interface ApiError {
  message: string;
  status: number;
}
