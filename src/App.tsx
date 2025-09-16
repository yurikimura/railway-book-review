import { useState, useEffect } from 'react'
import { BookReviewForm } from './components/BookReviewForm'
import { BookReviewListDemo } from './components/BookReviewListDemo'
import { LoginForm } from './components/LoginForm'
import { RegisterForm, type RegisterData } from './components/RegisterForm'
import { reviewsApi, authApi, type BookReview } from './utils/api'
import './App.css'

function App() {
  const [reviews, setReviews] = useState<BookReview[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showRegisterForm, setShowRegisterForm] = useState(false)

  // 認証状態をチェック
  useEffect(() => {
    setIsAuthenticated(authApi.isAuthenticated())
  }, [])

  // デモ用のサンプルデータを生成
  const generateSampleReviews = (): BookReview[] => {
    const sampleBooks = [
      { title: 'React入門', author: '山田太郎', url: 'https://example.com/react-guide' },
      { title: 'TypeScript完全ガイド', author: '佐藤花子', url: 'https://example.com/typescript-guide' },
      { title: 'JavaScriptの基礎', author: '田中一郎', url: 'https://example.com/javascript-basics' },
      { title: 'CSS Grid Layout', author: '鈴木二郎', url: 'https://example.com/css-grid' },
      { title: 'Node.js実践入門', author: '高橋三郎', url: 'https://example.com/nodejs-practice' },
      { title: 'Vue.js 3.0完全攻略', author: '伊藤四郎', url: 'https://example.com/vue3-guide' },
      { title: 'Next.jsアプリケーション開発', author: '渡辺五郎', url: 'https://example.com/nextjs-app' },
      { title: 'GraphQL実践ガイド', author: '中村六郎', url: 'https://example.com/graphql-practice' },
      { title: 'Dockerコンテナ技術', author: '小林七郎', url: 'https://example.com/docker-containers' },
      { title: 'AWSクラウド入門', author: '加藤八郎', url: 'https://example.com/aws-cloud' },
      { title: 'Python機械学習', author: '吉田九郎', url: 'https://example.com/python-ml' },
      { title: 'Go言語プログラミング', author: '山本十郎', url: 'https://example.com/go-programming' },
      { title: 'Rustシステムプログラミング', author: '松本十一郎', url: 'https://example.com/rust-systems' },
      { title: 'Kubernetes完全ガイド', author: '林十二郎', url: 'https://example.com/kubernetes-guide' },
      { title: 'マイクロサービス設計', author: '森十三郎', url: 'https://example.com/microservices' },
      { title: 'データベース設計の基礎', author: '石川十四郎', url: 'https://example.com/database-design' },
      { title: 'セキュリティエンジニアリング', author: '阿部十五郎', url: 'https://example.com/security-engineering' },
      { title: 'テスト駆動開発', author: '福田十六郎', url: 'https://example.com/tdd' },
      { title: 'アジャイル開発手法', author: '岡田十七郎', url: 'https://example.com/agile-development' },
      { title: 'DevOps実践入門', author: '中島十八郎', url: 'https://example.com/devops-practice' }
    ]

    const reviews = [
      'とても参考になりました！',
      '初心者にも分かりやすい内容です。',
      '実践的な例が豊富で良いです。',
      '理論と実践のバランスが取れています。',
      '最新の技術動向が詳しく書かれています。',
      'コード例が充実していて理解しやすいです。',
      '問題解決のアプローチが参考になります。',
      '段階的に学習できる構成になっています。',
      '実際のプロジェクトで使える知識が得られました。',
      '専門用語の説明が丁寧で理解しやすいです。'
    ]

    return sampleBooks.map((book, index) => ({
      title: book.title,
      url: book.url,
      detail: `著者: ${book.author}`,
      review: reviews[Math.floor(Math.random() * reviews.length)],
      reviewer: `レビュワー${index + 1}`
    }))
  }

  // コンポーネントマウント時にレビューを取得
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // 認証が必要な場合のチェック
        if (!authApi.isAuthenticated()) {
          setLoading(false)
          return
        }
        
        const fetchedReviews = await reviewsApi.getAll()
        // デモ用にサンプルデータを追加（実際のデータが少ない場合）
        const sampleReviews = generateSampleReviews()
        const allReviews = [...fetchedReviews, ...sampleReviews]
        setReviews(allReviews)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'レビューの取得に失敗しました'
        setError(errorMessage)
        console.error('Failed to fetch reviews:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [isAuthenticated])

  const handleReviewSubmit = async (reviewData: Omit<BookReview, 'id' | 'createdAt'>) => {
    try {
      // 認証チェック
      if (!authApi.isAuthenticated()) {
        setError('ログインが必要です。認証情報を入力してください。')
        return
      }
      
      const newReview = await reviewsApi.create(reviewData)
      setReviews(prevReviews => [newReview, ...prevReviews])
      setError(null)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'レビューの投稿に失敗しました'
      setError(errorMessage)
      console.error('Failed to create review:', err)
    }
  }

  const handleRegister = async (userData: RegisterData) => {
    try {
      await authApi.register(userData)
      setError(null)
      // 登録成功後、ログイン画面に切り替え
      setShowRegisterForm(false)
      // 成功メッセージを表示
      setSuccessMessage('登録が完了しました。ログインしてください。')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '登録に失敗しました'
      setError(errorMessage)
      console.error('Failed to register:', err)
    }
  }

  const handleLogin = async (credentials: { email: string; password: string }) => {
    try {
      await authApi.signin(credentials)
      setIsAuthenticated(true)
      setError(null)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'ログインに失敗しました'
      setError(errorMessage)
      console.error('Failed to login:', err)
    }
  }

  const handleLogout = () => {
    authApi.logout()
    setIsAuthenticated(false)
    setReviews([])
    setError(null)
    setSuccessMessage(null)
    setShowRegisterForm(false)
  }

  const switchToRegister = () => {
    setShowRegisterForm(true)
    setError(null)
    setSuccessMessage(null)
  }

  const switchToLogin = () => {
    setShowRegisterForm(false)
    setError(null)
    setSuccessMessage(null)
  }

  return (
    <div className="App">
      <header className="app-header">
        <h1>書籍レビューアプリ</h1>
        <p>お気に入りの書籍をレビューして共有しましょう</p>
        {isAuthenticated && (
          <button onClick={handleLogout} className="logout-button">
            ログアウト
          </button>
        )}
      </header>
      
      <main className="app-main">
        {error && (
          <div className="error-message">
            <p>エラー: {error}</p>
            <button onClick={() => setError(null)}>閉じる</button>
          </div>
        )}
        
        {successMessage && (
          <div className="success-message">
            <p>{successMessage}</p>
          </div>
        )}
        
        {!isAuthenticated ? (
          showRegisterForm ? (
            <RegisterForm onSubmit={handleRegister} onSwitchToLogin={switchToLogin} />
          ) : (
            <LoginForm onSubmit={handleLogin} onSwitchToRegister={switchToRegister} />
          )
        ) : (
          <>
            <BookReviewForm onSubmit={handleReviewSubmit} />
            
            {loading ? (
              <div className="loading-message">
                <p>レビューを読み込み中...</p>
              </div>
            ) : (
              <BookReviewListDemo reviews={reviews} />
            )}
          </>
        )}
      </main>
    </div>
  )
}

export default App
