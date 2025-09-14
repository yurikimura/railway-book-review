import { type BookReview } from '../utils/api'
import './BookReviewList.css'

interface BookReviewListProps {
  reviews: BookReview[]
}

export function BookReviewList({ reviews }: BookReviewListProps) {
  // 先頭の10件のみを表示
  const displayedReviews = reviews.slice(0, 10)

  if (reviews.length === 0) {
    return (
      <div className="book-review-list-container">
        <h2>投稿されたレビュー</h2>
        <div className="no-reviews">
          <p>まだレビューが投稿されていません。</p>
          <p>最初のレビューを投稿してみましょう！</p>
        </div>
      </div>
    )
  }

  return (
    <div className="book-review-list-container">
      <h2>投稿されたレビュー (表示: {displayedReviews.length}件 / 全{reviews.length}件)</h2>
      <div className="reviews-grid">
        {displayedReviews.map((review) => (
          <div key={review.id} className="review-card">
            <div className="review-content">
              <div className="book-title">
                <a 
                  href={review.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="book-link"
                >
                  {review.title}
                </a>
              </div>
              <div className="book-url">
                URL: <a 
                  href={review.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="url-link"
                >
                  {review.url}
                </a>
              </div>
              <div className="reviewer-info">
                レビュワー: {review.reviewer}
              </div>
              <div className="review-date">
                投稿日: {new Date(review.createdAt).toLocaleDateString('ja-JP')}
              </div>
              <div className="review-text">
                {review.review}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
