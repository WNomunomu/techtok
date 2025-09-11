import { SWRConfiguration } from 'swr';

// SWRのグローバル設定
export const swrConfig: SWRConfiguration = {
  // 自動的な定期的な再取得を無効化（記事データは変更頻度が低いため）
  refreshInterval: 0,
  
  // ウィンドウフォーカス時の自動再取得を無効化（不要なリクエストを避ける）
  revalidateOnFocus: false,
  
  // ネットワーク復旧時の自動再取得を無効化（キャッシュで十分）
  revalidateOnReconnect: false,
  
  // エラー時の再試行回数（適度な回数でリトライ）
  errorRetryCount: 3,
  
  // エラー時の再試行間隔（5秒間隔でシンプルに）
  errorRetryInterval: 5000,
  
  // 同じリクエストの重複を5分間防ぐ（記事データの特性に合わせて）
  dedupingInterval: 300000,
  
  // グローバルエラーハンドリング
  onError: (error, key) => {
    // 開発環境では詳細ログ
    if (process.env.NODE_ENV === 'development') {
      console.error('SWR Error:', error, 'Key:', key);
    }
    
    // 本番環境ではエラー監視サービスに送信
    // if (process.env.NODE_ENV === 'production') {
    //   Sentry.captureException(error, { tags: { swr_key: key } });
    // }
  },
  
  // 成功時のコールバック（開発環境のみ）
  onSuccess: (data, key) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('SWR Success:', key, data);
    }
  },
  
  // フォールバックデータ（各hookで個別に設定）
  fallbackData: undefined,
};
