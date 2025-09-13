import { useState, useEffect } from 'react'
import { BookReviewForm } from './components/BookReviewForm'
import { BookReviewList } from './components/BookReviewList'
import { LoginForm } from './components/LoginForm'
import { RegisterForm, type RegisterData } from './components/RegisterForm'
import { reviewsApi, authApi, type BookReview } from './utils/api'
import './App.css'

function App() {
  const [reviews, setReviews] = useState<BookReview[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showRegisterForm, setShowRegisterForm] = useState(false)

  // 認証状態をチェック
  useEffect(() => {
    setIsAuthenticated(authApi.isAuthenticated())
  }, [])

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
        setReviews(fetchedReviews)
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
      setError('登録が完了しました。ログインしてください。')
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
    setShowRegisterForm(false)
  }

  const switchToRegister = () => {
    setShowRegisterForm(true)
    setError(null)
  }

  const switchToLogin = () => {
    setShowRegisterForm(false)
    setError(null)
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
              <BookReviewList reviews={reviews} />
            )}
          </>
        )}
      </main>
    </div>
  )
}

export default App
