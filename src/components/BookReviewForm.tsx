import { useState } from 'react'
import { type BookReview } from '../utils/api'
import './BookReviewForm.css'

interface BookReviewFormProps {
  onSubmit: (review: Omit<BookReview, 'id' | 'createdAt'>) => void
}

export function BookReviewForm({ onSubmit }: BookReviewFormProps) {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [reviewer, setReviewer] = useState('')
  const [review, setReview] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim() || !url.trim() || !reviewer.trim() || !review.trim()) {
      alert('すべてのフィールドを入力してください')
      return
    }

    onSubmit({
      title: title.trim(),
      url: url.trim(),
      reviewer: reviewer.trim(),
      review: review.trim()
    })

    // フォームをリセット
    setTitle('')
    setUrl('')
    setReviewer('')
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
          <label htmlFor="reviewer">レビュワー（名前） *</label>
          <input
            type="text"
            id="reviewer"
            value={reviewer}
            onChange={(e) => setReviewer(e.target.value)}
            required
            placeholder="あなたのお名前を入力してください"
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
