import { useState, useEffect } from 'react'
import { type BookReview, authApi } from '../utils/api'
import './BookReviewForm.css'

interface BookReviewFormProps {
  onSubmit: (review: Omit<BookReview, 'id' | 'createdAt'>) => void
}

export function BookReviewForm({ onSubmit }: BookReviewFormProps) {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [review, setReview] = useState('')
  const [userName, setUserName] = useState<string>('')

  // ログインしたユーザー名を取得
  useEffect(() => {
    // 実際の実装では、ログイン時にユーザー名を取得するAPIを呼び出す
    // 現在は認証状態のみをチェックしているため、デフォルト値を設定
    if (authApi.isAuthenticated()) {
      setUserName('ログインユーザー') // 実際の実装では、APIからユーザー名を取得
    } else {
      setUserName('匿名ユーザー')
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim() || !url.trim() || !review.trim()) {
      alert('必須フィールド（タイトル、URL、レビュー本文）を入力してください')
      return
    }

    onSubmit({
      title: title.trim(),
      url: url.trim(),
      detail: userName, // ログインしたユーザー名を使用
      review: review.trim()
    })

    // フォームをリセット
    setTitle('')
    setUrl('')
    setReview('')
  }

  return (
    <div className="book-review-form-container">
      <h2>書籍レビューを投稿</h2>
      <form onSubmit={handleSubmit} className="book-review-form">
        <div className="form-group">
          <label htmlFor="title">書籍タイトル *</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="書籍のタイトルを入力してください"
          />
        </div>

        <div className="form-group">
          <label htmlFor="url">URL *</label>
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            placeholder="https://example.com/book"
          />
        </div>

        <div className="form-group">
          <label htmlFor="review">書籍レビュー本文 *</label>
          <textarea
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
            placeholder="書籍の感想やレビューを入力してください"
            rows={6}
          />
        </div>

        <button type="submit" className="submit-button">
          レビューを投稿
        </button>
      </form>
    </div>
  )
}
