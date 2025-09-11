import React from 'react';
import { useSWRConfig } from 'swr';
import { Database, RefreshCw, Trash2 } from 'lucide-react';

interface CacheStatusProps {
  className?: string;
}

export function CacheStatus({ className = '' }: CacheStatusProps) {
  const { mutate } = useSWRConfig();
  const [isVisible, setIsVisible] = React.useState(false);

  // 開発環境でのみ表示
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const cacheSize = 0; // SWRのキャッシュサイズは直接取得できないため、0に設定
  const cacheKeys: string[] = []; // SWRのキャッシュキーは直接取得できないため、空配列に設定

  const clearCache = () => {
    // SWRのキャッシュクリアはmutateを使用
    mutate(() => true, undefined, { revalidate: false });
  };

  const refreshAll = () => {
    mutate(() => true, undefined, { revalidate: true });
  };

  return (
    <div className={`fixed bottom-4 left-4 z-50 ${className}`}>
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-lg transition-colors cursor-pointer"
        title="SWR Cache Status"
      >
        <Database className="w-4 h-4" />
      </button>

      {isVisible && (
        <div className="absolute bottom-12 left-0 bg-gray-900 text-white p-4 rounded-lg shadow-lg min-w-80 max-w-96">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold">SWR Cache Status</h3>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-400 hover:text-white cursor-pointer"
            >
              ×
            </button>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Cache Size:</span>
              <span className="text-blue-400">{cacheSize} items</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={refreshAll}
                className="flex items-center gap-1 px-2 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                Refresh All
              </button>
              <button
                onClick={clearCache}
                className="flex items-center gap-1 px-2 py-1 bg-red-600 hover:bg-red-700 rounded text-xs transition-colors cursor-pointer"
              >
                <Trash2 className="w-3 h-3" />
                Clear Cache
              </button>
            </div>

            {cacheKeys.length > 0 && (
              <div className="mt-3">
                <div className="text-xs text-gray-400 mb-1">Cached Keys:</div>
                <div className="max-h-32 overflow-y-auto space-y-1">
                  {cacheKeys.map((key, index) => (
                    <div key={index} className="text-xs bg-gray-800 p-1 rounded truncate">
                      {typeof key === 'string' ? key : JSON.stringify(key)}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
