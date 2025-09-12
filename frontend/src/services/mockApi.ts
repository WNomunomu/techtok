import type { Article, ArticleListResponse } from '../types/Article';

// モックデータ
const mockArticles: Article[] = [
  // 今日の記事 (2024-01-15)
  {
    id: 1,
    title: 'React 19の革新的な新機能: Server Componentsの進化とパフォーマンス最適化による開発者体験の向上',
    summary: 'React 19では、Server Componentsがさらに進化し、パフォーマンスの向上と開発者体験の改善が実現されました。新しいコンパイラとランタイムの最適化により、より高速なアプリケーション開発が可能になります。特に注目すべきは、Server Componentsのレンダリングパイプラインが大幅に改善され、初期ロード時間が従来比で40%短縮されたことです。また、新しいデータフェッチングAPIにより、サーバーサイドでのデータ取得がより効率的になり、クライアントサイドのJavaScriptバンドルサイズも削減されています。さらに、Streaming SSRの機能が強化され、ユーザーはページの一部が読み込まれるのを待つことなく、段階的にコンテンツを確認できるようになりました。これらの改善により、React 19は大規模なWebアプリケーションの構築において、より優れたパフォーマンスと開発者体験を提供します。',
    author: '田中太郎',
    sourceUrl: 'https://example.com/react-19-server-components',
    publishedAt: '2025-09-11T10:00:00Z',
    createdAt: '2025-09-10T10:00:00Z'
  },
  {
    id: 2,
    title: 'TypeScript 5.0の革新的な新機能: 型システムの大幅改善とコンパイル速度の向上による開発効率化',
    summary: 'TypeScript 5.0では、新しい型システムの改善とコンパイル速度の大幅な向上が実現されました。特に大きなプロジェクトでの開発体験が向上し、より安全なコードの記述が可能になります。新たに導入された「Template Literal Types」の拡張により、文字列の型安全性が格段に向上し、APIエンドポイントの型チェックや動的な文字列操作において、より厳密な型推論が可能になりました。また、「Conditional Types」の最適化により、複雑な型変換の処理速度が従来比で60%向上し、大規模なライブラリの型定義においても快適な開発体験を提供します。さらに、新しい「Satisfies」演算子の追加により、型の推論と型のチェックを同時に行うことができ、より柔軟で安全なコードの記述が可能になりました。これらの機能強化により、TypeScript 5.0は現代のJavaScript開発において、より強力で使いやすい型システムを提供します。',
    author: '佐藤花子',
    sourceUrl: 'https://example.com/typescript-5-0-features',
    publishedAt: '2025-09-11T11:30:00Z',
    createdAt: '2025-09-10T11:30:00Z'
  },
  {
    id: 3,
    title: 'Next.js 14のApp Router完全ガイド: React Server Componentsを活用した新しいルーティングシステムの詳細解説',
    summary: 'Next.js 14のApp Routerは、React Server Componentsを活用した新しいルーティングシステムです。この記事では、App Routerの基本的な使い方から高度なパターンまで詳しく解説します。App Routerの最大の特徴は、ファイルベースのルーティングシステムが大幅に改善され、より直感的で柔軟なルート定義が可能になったことです。新しい「Layout」コンポーネントにより、ページ間で共通のUI要素を効率的に共有でき、パフォーマンスの最適化も自動的に行われます。また、「Server Actions」の導入により、フォームの送信やデータの更新をサーバーサイドで直接処理できるようになり、クライアントサイドのJavaScriptを最小限に抑えることができます。さらに、「Streaming」と「Suspense」の組み合わせにより、ページの読み込み時間を大幅に短縮し、ユーザー体験の向上を実現しています。これらの新機能により、Next.js 14は現代のWebアプリケーション開発において、より効率的で高性能なフレームワークとしての地位を確立しています。',
    author: '山田次郎',
    sourceUrl: 'https://example.com/nextjs-14-app-router',
    publishedAt: '2025-09-11T14:15:00Z',
    createdAt: '2025-09-10T14:15:00Z'
  },
  {
    id: 4,
    title: 'Vue 3.4のComposition API最適化',
    summary: 'Vue 3.4では、Composition APIのパフォーマンスが大幅に改善されました。新しいリアクティブシステムにより、より効率的なコンポーネントの作成が可能になります。特に注目すべきは、新しい「Reactivity Transform」の導入により、ref()やreactive()の使用がより直感的になり、開発者の生産性が向上したことです。また、「Suspense」コンポーネントの改善により、非同期コンポーネントの読み込みがよりスムーズになり、ユーザー体験の向上を実現しています。さらに、「Teleport」機能の拡張により、コンポーネントの柔軟な配置が可能になり、モーダルやツールチップなどのUI要素の実装がより簡単になりました。これらの改善により、Vue 3.4は現代のWebアプリケーション開発において、より効率的で使いやすいフレームワークとしての地位を確立しています。',
    author: '鈴木一郎',
    sourceUrl: 'https://example.com/vue-3-4-composition-api',
    publishedAt: '2025-09-11T16:45:00Z',
    createdAt: '2025-09-10T16:45:00Z'
  },
  {
    id: 5,
    title: 'Node.js 20の新機能とセキュリティ強化',
    summary: 'Node.js 20では、新しいJavaScriptエンジンとセキュリティ機能の強化が実装されました。特に企業環境での利用に適した安定性とパフォーマンスを提供します。新たに導入された「Permission Model」により、ファイルシステムやネットワークアクセスの制御がより細かく設定でき、セキュリティリスクを大幅に軽減できます。また、「Test Runner」の組み込みにより、テストの実行がより簡単になり、開発ワークフローの効率化が実現されています。さらに、「Web Streams API」の完全サポートにより、ストリーミング処理がより効率的になり、大容量データの処理において優れたパフォーマンスを発揮します。これらの機能強化により、Node.js 20は企業レベルのアプリケーション開発において、より安全で高性能なランタイム環境を提供しています。',
    author: '高橋美咲',
    sourceUrl: 'https://example.com/nodejs-20-features',
    publishedAt: '2025-09-11T18:20:00Z',
    createdAt: '2025-09-10T18:20:00Z'
  },
  {
    id: 6,
    title: 'Docker Compose v2の新機能とベストプラクティス',
    summary: 'Docker Compose v2では、新しいオーケストレーション機能とパフォーマンスの改善が実装されました。マイクロサービスアーキテクチャの構築に最適なツールとして進化しています。特に注目すべきは、新しい「Profiles」機能により、環境ごとに異なるサービス構成を簡単に管理できるようになったことです。また、「Dependency Management」の改善により、サービス間の依存関係がより明確に定義でき、起動順序の制御がより柔軟になりました。さらに、「Resource Limits」の拡張により、CPUやメモリの使用量をより細かく制御でき、リソースの効率的な利用が可能になっています。これらの機能強化により、Docker Compose v2は複雑なマイクロサービスアーキテクチャの構築と運用において、より強力で使いやすいツールとしての地位を確立しています。',
    author: '伊藤健太',
    sourceUrl: 'https://example.com/docker-compose-v2',
    publishedAt: '2025-09-11T20:10:00Z',
    createdAt: '2025-09-10T20:10:00Z'
  },
  {
    id: 7,
    title: 'Kubernetes 1.29の新機能と運用改善',
    summary: 'Kubernetes 1.29では、新しいリソース管理機能と運用性の向上が実装されました。特に大規模なクラスターでの管理が容易になり、より効率的なコンテナオーケストレーションが可能になります。新たに導入された「Dynamic Resource Allocation」により、リソースの割り当てがより柔軟になり、ワークロードに応じた最適なリソース配分が実現されています。また、「Pod Security Standards」の改善により、セキュリティポリシーの適用がより簡単になり、クラスター全体のセキュリティレベルが向上しています。さらに、「Service Mesh」の統合機能が強化され、マイクロサービス間の通信がより安全で効率的になりました。これらの機能強化により、Kubernetes 1.29は企業レベルのコンテナオーケストレーションにおいて、より強力で使いやすいプラットフォームとしての地位を確立しています。',
    author: '中村由美',
    sourceUrl: 'https://example.com/kubernetes-1-29',
    publishedAt: '2025-09-11T21:30:00Z',
    createdAt: '2025-09-10T21:30:00Z'
  },
  {
    id: 8,
    title: 'AWS Lambdaの新機能とコスト最適化',
    summary: 'AWS Lambdaでは、新しい実行環境とコスト最適化機能が追加されました。サーバーレスアーキテクチャの構築により効率的になり、運用コストの削減が実現できます。特に注目すべきは、新しい「Provisioned Concurrency」機能により、コールドスタートの問題が大幅に改善され、より一貫したパフォーマンスを提供できるようになったことです。また、「Lambda Layers」の拡張により、共通の依存関係を効率的に管理でき、デプロイメントサイズの削減とメンテナンス性の向上を実現しています。さらに、「Event Source Mapping」の改善により、様々なAWSサービスとの統合がより簡単になり、イベント駆動型アーキテクチャの構築が容易になりました。これらの機能強化により、AWS Lambdaは現代のサーバーレスアプリケーション開発において、より効率的でコストパフォーマンスの高いプラットフォームとしての地位を確立しています。',
    author: '小林正樹',
    sourceUrl: 'https://example.com/aws-lambda-optimization',
    publishedAt: '2025-09-11T22:45:00Z',
    createdAt: '2025-09-10T22:45:00Z'
  },
  {
    id: 9,
    title: 'GraphQLの新機能とパフォーマンス最適化',
    summary: 'GraphQLでは、新しいクエリ最適化機能とキャッシュ戦略が実装されました。より効率的なAPI設計とクライアントサイドのパフォーマンス向上が可能になります。特に注目すべきは、新しい「Query Complexity Analysis」機能により、複雑なクエリの実行時間を事前に予測し、パフォーマンスの問題を早期に発見できるようになったことです。また、「Persisted Queries」の改善により、クエリのキャッシュがより効率的になり、ネットワーク帯域の使用量を大幅に削減できます。さらに、「Schema Federation」の拡張により、複数のGraphQLスキーマを統合したマイクロサービスアーキテクチャの構築がより簡単になりました。これらの機能強化により、GraphQLは現代のAPI設計において、より効率的でスケーラブルなソリューションとしての地位を確立しています。',
    author: '加藤智子',
    sourceUrl: 'https://example.com/graphql-optimization',
    publishedAt: '2025-09-11T23:15:00Z',
    createdAt: '2025-09-10T23:15:00Z'
  },
  {
    id: 10,
    title: 'Rust 1.75の新機能とメモリ安全性',
    summary: 'Rust 1.75では、新しいメモリ管理機能とパフォーマンスの改善が実装されました。システムプログラミングにおける安全性と効率性の両立がさらに進化しています。新たに導入された「Async Traits」により、非同期プログラミングがより直感的になり、複雑な非同期処理の実装が容易になりました。また、「Generic Associated Types」の改善により、より柔軟な型システムの設計が可能になり、ライブラリのAPI設計においてより表現力豊かなコードを記述できます。さらに、「Const Generics」の拡張により、コンパイル時の計算がより強力になり、パフォーマンスクリティカルなコードの最適化が可能になっています。これらの機能強化により、Rust 1.75はシステムプログラミングにおいて、より安全で効率的な言語としての地位を確立しています。',
    author: '松本大輔',
    sourceUrl: 'https://example.com/rust-1-75-features',
    publishedAt: '2025-09-11T23:45:00Z',
    createdAt: '2025-09-10T23:45:00Z'
  },
  // 昨日の記事 (2024-01-14)
  {
    id: 11,
    title: 'Python 3.12の新機能とパフォーマンス改善',
    summary: 'Python 3.12では、新しい型システムとパフォーマンスの大幅な向上が実現されました。特に大きなデータセットの処理において、より高速な実行が可能になります。特に注目すべきは、新しい「PEP 695」により、型エイリアスとジェネリック型の定義がより簡潔になり、型注釈の可読性が大幅に向上したことです。また、「PEP 698」の導入により、オーバーロードされた関数の型推論がより正確になり、IDEでのコード補完とエラー検出が改善されています。さらに、「PEP 701」により、f-stringの表現力が向上し、より複雑な文字列操作が可能になりました。これらの機能強化により、Python 3.12はデータサイエンスとWeb開発において、より効率的で使いやすい言語としての地位を確立しています。',
    author: '田中美咲',
    sourceUrl: 'https://example.com/python-3-12-features',
    publishedAt: '2025-09-11T09:00:00Z',
    createdAt: '2025-09-10T09:00:00Z'
  },
  {
    id: 12,
    title: 'Go 1.21の新機能と並行処理の改善',
    summary: 'Go 1.21では、新しい並行処理機能とメモリ管理の改善が実装されました。特に高負荷なアプリケーションでのパフォーマンスが向上し、より効率的な開発が可能になります。新たに導入された「Profile Guided Optimization」により、実際のワークロードに基づいた最適化が可能になり、アプリケーションの実行速度が従来比で15%向上しています。また、「Memory Arena」の改善により、メモリの割り当てと解放がより効率的になり、ガベージコレクションの負荷が軽減されています。さらに、「Goroutine Scheduler」の最適化により、並行処理のスケジューリングがより賢くなり、CPUリソースの利用率が向上しています。これらの機能強化により、Go 1.21は高負荷なサーバーアプリケーションの開発において、より高性能で効率的な言語としての地位を確立しています。',
    author: '佐藤健一',
    sourceUrl: 'https://example.com/go-1-21-features',
    publishedAt: '2025-09-11T10:30:00Z',
    createdAt: '2025-09-10T10:30:00Z'
  },
  {
    id: 13,
    title: 'Swift 5.9の新機能とiOS開発の進化',
    summary: 'Swift 5.9では、新しい言語機能とiOS開発ツールの改善が実装されました。より安全で効率的なモバイルアプリケーションの開発が可能になります。特に注目すべきは、新しい「Macro System」の導入により、ボイラープレートコードの削減とコード生成の自動化が可能になり、開発効率が大幅に向上したことです。また、「Observation Framework」の改善により、データバインディングがより直感的になり、UIの状態管理がより簡単になりました。さらに、「SwiftData」の統合により、Core Dataの代替としてより使いやすいデータ永続化フレームワークが提供されています。これらの機能強化により、Swift 5.9はiOSアプリケーション開発において、より効率的で保守性の高いコードを記述できる言語としての地位を確立しています。',
    author: '山田花子',
    sourceUrl: 'https://example.com/swift-5-9-features',
    publishedAt: '2025-09-11T12:15:00Z',
    createdAt: '2025-09-10T12:15:00Z'
  },
  {
    id: 14,
    title: 'Kotlin 1.9の新機能とAndroid開発',
    summary: 'Kotlin 1.9では、新しい言語機能とAndroid開発ツールの改善が実装されました。より効率的なモバイルアプリケーションの開発とメンテナンスが可能になります。特に注目すべきは、新しい「Kotlin Multiplatform Mobile」の改善により、iOSとAndroidの間でコード共有がより簡単になり、開発効率が大幅に向上したことです。また、「Coroutines」の最適化により、非同期処理のパフォーマンスが向上し、UIの応答性が改善されています。さらに、「Compose Multiplatform」の統合により、デスクトップアプリケーションの開発も可能になり、クロスプラットフォーム開発の可能性が拡大しています。これらの機能強化により、Kotlin 1.9はモバイルアプリケーション開発において、より効率的で保守性の高いコードを記述できる言語としての地位を確立しています。',
    author: '鈴木正樹',
    sourceUrl: 'https://example.com/kotlin-1-9-features',
    publishedAt: '2025-09-11T14:00:00Z',
    createdAt: '2025-09-10T14:00:00Z'
  },
  {
    id: 15,
    title: 'C# 12の新機能と.NET 8の統合',
    summary: 'C# 12では、新しい言語機能と.NET 8の統合により、より効率的なアプリケーション開発が可能になります。特にエンタープライズ環境での開発体験が向上しています。新たに導入された「Primary Constructors」により、クラスの初期化がより簡潔になり、ボイラープレートコードの削減が実現されています。また、「Collection Expressions」の改善により、コレクションの初期化がより直感的になり、コードの可読性が向上しています。さらに、「Interceptors」の導入により、メソッド呼び出しのインターセプトが可能になり、AOP（Aspect-Oriented Programming）の実装がより簡単になりました。これらの機能強化により、C# 12はエンタープライズアプリケーション開発において、より効率的で保守性の高いコードを記述できる言語としての地位を確立しています。',
    author: '高橋智子',
    sourceUrl: 'https://example.com/csharp-12-features',
    publishedAt: '2025-09-11T15:45:00Z',
    createdAt: '2025-09-10T15:45:00Z'
  },
  {
    id: 16,
    title: 'Java 21の新機能とパフォーマンス改善',
    summary: 'Java 21では、新しい言語機能とJVMのパフォーマンス改善が実装されました。特に大規模なエンタープライズアプリケーションでの実行効率が向上しています。特に注目すべきは、新しい「Virtual Threads」の導入により、軽量なスレッドの作成が可能になり、高並行性アプリケーションの開発がより簡単になったことです。また、「Pattern Matching」の改善により、型チェックとキャストがより直感的になり、コードの可読性が向上しています。さらに、「Record Patterns」の拡張により、データクラスの分解がより柔軟になり、関数型プログラミングの要素が強化されています。これらの機能強化により、Java 21はエンタープライズアプリケーション開発において、より効率的で保守性の高いコードを記述できる言語としての地位を確立しています。',
    author: '伊藤由美',
    sourceUrl: 'https://example.com/java-21-features',
    publishedAt: '2025-09-11T17:30:00Z',
    createdAt: '2025-09-10T17:30:00Z'
  },
  {
    id: 17,
    title: 'PHP 8.3の新機能とWeb開発の進化',
    summary: 'PHP 8.3では、新しい言語機能とWeb開発フレームワークの改善が実装されました。より安全で効率的なWebアプリケーションの開発が可能になります。新たに導入された「Typed Properties」の改善により、クラスプロパティの型安全性が向上し、実行時エラーの削減が実現されています。また、「Arrow Functions」の拡張により、クロージャの記述がより簡潔になり、関数型プログラミングの要素が強化されています。さらに、「JIT Compiler」の最適化により、計算集約的な処理の実行速度が従来比で30%向上し、データ処理アプリケーションのパフォーマンスが大幅に改善されています。これらの機能強化により、PHP 8.3はWebアプリケーション開発において、より効率的で安全なコードを記述できる言語としての地位を確立しています。',
    author: '中村大輔',
    sourceUrl: 'https://example.com/php-8-3-features',
    publishedAt: '2025-09-11T19:15:00Z',
    createdAt: '2025-09-10T19:15:00Z'
  },
  {
    id: 18,
    title: 'Ruby 3.3の新機能とRails 7.1の統合',
    summary: 'Ruby 3.3では、新しい言語機能とRails 7.1の統合により、より効率的なWebアプリケーション開発が可能になります。特に開発者体験の向上が実現されています。特に注目すべきは、新しい「YJIT」コンパイラの改善により、Rubyコードの実行速度が従来比で40%向上し、大規模なWebアプリケーションのパフォーマンスが大幅に改善されたことです。また、「Pattern Matching」の拡張により、データ構造の分解がより柔軟になり、関数型プログラミングの要素が強化されています。さらに、「Ractor」の最適化により、真の並行処理が可能になり、CPU集約的なタスクの処理効率が向上しています。これらの機能強化により、Ruby 3.3はWebアプリケーション開発において、より効率的で保守性の高いコードを記述できる言語としての地位を確立しています。',
    author: '小林美咲',
    sourceUrl: 'https://example.com/ruby-3-3-features',
    publishedAt: '2025-09-11T21:00:00Z',
    createdAt: '2025-09-10T21:00:00Z'
  },
  {
    id: 19,
    title: 'Elixir 1.16の新機能と並行処理',
    summary: 'Elixir 1.16では、新しい並行処理機能とパフォーマンスの改善が実装されました。特に高可用性が要求されるアプリケーションでの開発が容易になります。特に注目すべきは、新しい「LiveView」の改善により、リアルタイムなWebアプリケーションの開発がより簡単になり、サーバーサイドレンダリングとクライアントサイドの状態管理が統合されたことです。また、「GenServer」の最適化により、アクター間の通信がより効率的になり、大規模な分散システムの構築が容易になりました。さらに、「Phoenix Framework」の統合により、WebSocketベースのリアルタイム通信がより安定し、チャットアプリケーションやライブストリーミングサービスの開発がより簡単になっています。これらの機能強化により、Elixir 1.16は高可用性アプリケーション開発において、より効率的で保守性の高いコードを記述できる言語としての地位を確立しています。',
    author: '加藤健太',
    sourceUrl: 'https://example.com/elixir-1-16-features',
    publishedAt: '2025-09-11T22:45:00Z',
    createdAt: '2025-09-10T22:45:00Z'
  },
  {
    id: 20,
    title: 'Clojure 1.11の新機能と関数型プログラミング',
    summary: 'Clojure 1.11では、新しい関数型プログラミング機能とパフォーマンスの改善が実装されました。より効率的な関数型アプリケーションの開発が可能になります。新たに導入された「Spec 2」により、データの検証とドキュメント生成がより強力になり、APIの設計とテストがより簡単になりました。また、「Transducers」の最適化により、データ変換処理のパフォーマンスが向上し、大規模なデータセットの処理がより効率的になっています。さらに、「REPL」の改善により、対話的な開発体験が向上し、プロトタイピングとデバッグがより簡単になりました。これらの機能強化により、Clojure 1.11は関数型プログラミングにおいて、より効率的で保守性の高いコードを記述できる言語としての地位を確立しています。',
    author: '松本正樹',
    sourceUrl: 'https://example.com/clojure-1-11-features',
    publishedAt: '2025-09-11T23:30:00Z',
    createdAt: '2025-09-10T23:30:00Z'
  },
  // 一昨日の記事 (2024-01-13)
  {
    id: 21,
    title: 'JavaScript ES2024の新機能とブラウザ対応',
    summary: 'JavaScript ES2024では、新しい言語機能とブラウザ対応の改善が実装されました。より効率的なフロントエンド開発とモダンなWebアプリケーションの構築が可能になります。特に注目すべきは、新しい「Top-level await」の導入により、モジュールレベルでの非同期処理が可能になり、アプリケーションの初期化がより柔軟になったことです。また、「Private Fields」の改善により、クラスのカプセル化がより厳密になり、オブジェクト指向プログラミングの安全性が向上しています。さらに、「Optional Chaining」の拡張により、ネストしたオブジェクトの安全なアクセスがより簡単になり、null/undefinedエラーの削減が実現されています。これらの機能強化により、JavaScript ES2024は現代のWebアプリケーション開発において、より効率的で安全なコードを記述できる言語としての地位を確立しています。',
    author: '田中正樹',
    sourceUrl: 'https://example.com/javascript-es2024',
    publishedAt: '2025-09-11T08:00:00Z',
    createdAt: '2025-09-10T08:00:00Z'
  },
  {
    id: 22,
    title: 'WebAssembly 2.0の新機能とパフォーマンス',
    summary: 'WebAssembly 2.0では、新しい実行環境とパフォーマンスの大幅な改善が実装されました。特にブラウザでの高負荷な計算処理がより効率的になります。新たに導入された「SIMD Instructions」により、ベクトル演算の処理速度が従来比で400%向上し、画像処理や機械学習アルゴリズムの実行がより高速になりました。また、「Threading」の改善により、マルチスレッド処理が可能になり、CPU集約的なタスクの並列実行が実現されています。さらに、「Garbage Collection」の統合により、メモリ管理がより自動化され、C++やRustなどの言語からの移植がより簡単になっています。これらの機能強化により、WebAssembly 2.0はブラウザベースの高性能アプリケーション開発において、より効率的で強力なプラットフォームとしての地位を確立しています。',
    author: '佐藤由美',
    sourceUrl: 'https://example.com/webassembly-2-0',
    publishedAt: '2025-09-11T09:30:00Z',
    createdAt: '2025-09-10T09:30:00Z'
  },
  {
    id: 23,
    title: 'WebRTCの新機能とリアルタイム通信',
    summary: 'WebRTCでは、新しい通信プロトコルとリアルタイム通信機能の改善が実装されました。より安定したビデオ通話と音声通話の実現が可能になります。特に注目すべきは、新しい「AV1 Codec」のサポートにより、ビデオ品質が向上し、帯域幅の使用量が従来比で50%削減されたことです。また、「SCTP」プロトコルの改善により、データチャンネルの信頼性が向上し、ファイル転送やゲームデータの同期がより安定しています。さらに、「ICE」の最適化により、NAT越えの成功率が向上し、複雑なネットワーク環境でも安定した接続が実現されています。これらの機能強化により、WebRTCはリアルタイム通信アプリケーション開発において、より効率的で安定したプラットフォームとしての地位を確立しています。',
    author: '山田大輔',
    sourceUrl: 'https://example.com/webrtc-features',
    publishedAt: '2025-09-11T11:15:00Z',
    createdAt: '2025-09-10T11:15:00Z'
  },
  {
    id: 24,
    title: 'WebGL 2.0の新機能と3Dグラフィックス',
    summary: 'WebGL 2.0では、新しい3Dグラフィックス機能とパフォーマンスの改善が実装されました。より高品質な3Dコンテンツの作成と表示が可能になります。特に注目すべきは、新しい「Multiple Render Targets」により、複数のテクスチャに同時にレンダリングが可能になり、ポストプロセッシングエフェクトの実装がより効率的になったことです。また、「Transform Feedback」の改善により、GPU上でのデータ処理が可能になり、パーティクルシステムや物理シミュレーションのパフォーマンスが大幅に向上しています。さらに、「Uniform Buffer Objects」の導入により、シェーダー間でのデータ共有がより効率的になり、複雑な3Dシーンのレンダリングがより高速になっています。これらの機能強化により、WebGL 2.0はブラウザベースの3Dアプリケーション開発において、より効率的で高品質なグラフィックスを実現できるプラットフォームとしての地位を確立しています。',
    author: '鈴木智子',
    sourceUrl: 'https://example.com/webgl-2-0-features',
    publishedAt: '2025-09-11T13:00:00Z',
    createdAt: '2025-09-10T13:00:00Z'
  },
  {
    id: 25,
    title: 'WebXRの新機能とVR/AR開発',
    summary: 'WebXRでは、新しいVR/AR機能と開発ツールの改善が実装されました。より没入感のある仮想現実と拡張現実のアプリケーション開発が可能になります。新たに導入された「Hand Tracking」により、コントローラーを使わずに手の動きでVR空間を操作できるようになり、より直感的なユーザーインタラクションが実現されています。また、「Spatial Anchors」の改善により、現実世界の特定の位置に仮想オブジェクトを固定できるようになり、ARアプリケーションの安定性が大幅に向上しています。さらに、「Foveated Rendering」の最適化により、視線の方向に応じてレンダリング品質を調整できるようになり、VRヘッドセットのパフォーマンスが向上しています。これらの機能強化により、WebXRはブラウザベースのVR/ARアプリケーション開発において、より効率的で没入感のある体験を提供できるプラットフォームとしての地位を確立しています。',
    author: '高橋健太',
    sourceUrl: 'https://example.com/webxr-features',
    publishedAt: '2025-09-11T14:45:00Z',
    createdAt: '2025-09-10T14:45:00Z'
  },
  {
    id: 26,
    title: 'Service Workerの新機能とPWA開発',
    summary: 'Service Workerでは、新しいキャッシュ機能とPWA開発ツールの改善が実装されました。より効率的なオフライン対応アプリケーションの開発が可能になります。特に注目すべきは、新しい「Background Sync」により、ネットワーク接続が復旧した際に自動的にデータの同期が行われるようになり、オフライン体験が大幅に改善されたことです。また、「Push Notifications」の改善により、ユーザーエンゲージメントの向上とリアルタイムな情報配信が可能になっています。さらに、「Cache API」の拡張により、より柔軟なキャッシュ戦略の実装が可能になり、アプリケーションのパフォーマンスが向上しています。これらの機能強化により、Service WorkerはPWAアプリケーション開発において、より効率的でユーザーフレンドリーなオフライン体験を提供できるプラットフォームとしての地位を確立しています。',
    author: '伊藤美咲',
    sourceUrl: 'https://example.com/service-worker-features',
    publishedAt: '2025-09-11T16:30:00Z',
    createdAt: '2025-09-10T16:30:00Z'
  },
  {
    id: 27,
    title: 'Web Componentsの新機能と再利用性',
    summary: 'Web Componentsでは、新しいコンポーネント機能と再利用性の改善が実装されました。より効率的なWebアプリケーションの開発とメンテナンスが可能になります。新たに導入された「Custom Elements」の改善により、独自のHTML要素の定義がより簡単になり、フレームワークに依存しないコンポーネント開発が可能になっています。また、「Shadow DOM」の最適化により、スタイルのカプセル化がより厳密になり、コンポーネント間のスタイルの競合を防ぐことができます。さらに、「HTML Templates」の拡張により、動的なコンテンツの生成がより効率的になり、パフォーマンスの向上が実現されています。これらの機能強化により、Web Componentsは現代のWebアプリケーション開発において、より効率的で保守性の高いコンポーネントベースのアーキテクチャを実現できるプラットフォームとしての地位を確立しています。',
    author: '中村正樹',
    sourceUrl: 'https://example.com/web-components-features',
    publishedAt: '2025-09-11T18:15:00Z',
    createdAt: '2025-09-10T18:15:00Z'
  },
  {
    id: 28,
    title: 'Web Streams APIの新機能とデータ処理',
    summary: 'Web Streams APIでは、新しいデータ処理機能とパフォーマンスの改善が実装されました。より効率的な大量データの処理とストリーミングが可能になります。特に注目すべきは、新しい「ReadableStream」の改善により、大きなファイルの読み込みがより効率的になり、メモリ使用量を抑えながらデータ処理が可能になったことです。また、「WritableStream」の最適化により、データの書き込み処理がより高速になり、リアルタイムなデータ転送が実現されています。さらに、「TransformStream」の拡張により、データの変換処理がより柔軟になり、複雑なデータパイプラインの構築が容易になっています。これらの機能強化により、Web Streams APIは大量データの処理において、より効率的でスケーラブルなソリューションを提供できるプラットフォームとしての地位を確立しています。',
    author: '小林由美',
    sourceUrl: 'https://example.com/web-streams-api',
    publishedAt: '2025-09-11T20:00:00Z',
    createdAt: '2025-09-10T20:00:00Z'
  },
  {
    id: 29,
    title: 'Web Crypto APIの新機能とセキュリティ',
    summary: 'Web Crypto APIでは、新しい暗号化機能とセキュリティの改善が実装されました。より安全なWebアプリケーションの開発とデータ保護が可能になります。特に注目すべきは、新しい「Post-Quantum Cryptography」のサポートにより、量子コンピュータに対抗できる暗号化アルゴリズムが利用できるようになり、将来のセキュリティ脅威に対応できるようになったことです。また、「Hardware Security Module」の統合により、暗号化キーの管理がより安全になり、エンタープライズレベルのセキュリティ要件を満たすことができます。さらに、「Zero-Knowledge Proofs」の実装により、データを開示することなく認証や検証が可能になり、プライバシー保護が強化されています。これらの機能強化により、Web Crypto APIは現代のWebアプリケーション開発において、より安全で信頼性の高いセキュリティソリューションを提供できるプラットフォームとしての地位を確立しています。',
    author: '加藤大輔',
    sourceUrl: 'https://example.com/web-crypto-api',
    publishedAt: '2025-09-11T21:45:00Z',
    createdAt: '2025-09-10T21:45:00Z'
  },
  {
    id: 30,
    title: 'Web Animations APIの新機能とアニメーション',
    summary: 'Web Animations APIでは、新しいアニメーション機能とパフォーマンスの改善が実装されました。より滑らかで効率的なWebアニメーションの作成が可能になります。新たに導入された「Timeline API」により、複数のアニメーションを同期させることが可能になり、複雑なアニメーションシーケンスの制御がより簡単になっています。また、「Easing Functions」の拡張により、より自然で滑らかなアニメーションカーブの実装が可能になり、ユーザー体験の向上が実現されています。さらに、「Performance Optimization」の改善により、GPUアクセラレーションを活用したアニメーション処理が可能になり、60fpsの滑らかなアニメーションが実現されています。これらの機能強化により、Web Animations APIは現代のWebアプリケーション開発において、より効率的で魅力的なユーザーインターフェースを実現できるプラットフォームとしての地位を確立しています。',
    author: '松本智子',
    sourceUrl: 'https://example.com/web-animations-api',
    publishedAt: '2025-09-11T23:30:00Z',
    createdAt: '2025-09-10T23:30:00Z'
  }
];

// 配列をシャッフルする関数
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// 日付ベースで記事をフィルタリングする関数
function getArticlesByDate(date: string, size: number = 20): ArticleListResponse {
  console.log('getArticlesByDate', date, size);
  const targetDate = new Date(date);
  const nextDay = new Date(targetDate);
  nextDay.setDate(nextDay.getDate() + 1);
  
  // 指定された日付の記事をフィルタリング
  const filteredArticles = mockArticles.filter(article => {
    const articleDate = new Date(article.publishedAt);
    return articleDate >= targetDate && articleDate < nextDay;
  });
  
  // シャッフルしてから取得
  const shuffledArticles = shuffleArray(filteredArticles);
  
  // ページネーション
  const content = shuffledArticles.slice(0, size);
  
  return {
    content,
    totalElements: shuffledArticles.length,
    totalPages: Math.ceil(shuffledArticles.length / size),
    last: content.length < size,
    first: true,
    number: 0,
    size
  };
}

// モックAPI関数
export const mockApi = {
  // 日付ベースで記事を取得
  getArticlesByDate: async (date: string, size: number = 20): Promise<ArticleListResponse> => {
    // ネットワーク遅延をシミュレート
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
    
    return getArticlesByDate(date, size);
  },
  
  // 記事詳細を取得
  getArticleById: async (id: number): Promise<Article> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const article = mockArticles.find(a => a.id === id);
    if (!article) {
      throw new Error(`Article not found with id: ${id}`);
    }
    
    return article;
  },
  
  // 全記事を取得（ページネーション付き）
  getAllArticles: async (page: number = 0, size: number = 20): Promise<ArticleListResponse> => {
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
    
    const startIndex = page * size;
    const endIndex = startIndex + size;
    const content = mockArticles.slice(startIndex, endIndex);
    
    return {
      content,
      totalElements: mockArticles.length,
      totalPages: Math.ceil(mockArticles.length / size),
      last: endIndex >= mockArticles.length,
      first: page === 0,
      number: page,
      size
    };
  }
};
