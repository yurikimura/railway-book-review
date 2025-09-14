import { type BookReview } from '../utils/api'
import './BookReviewItem.css'

interface BookReviewItemProps {
  review: BookReview
}

export function BookReviewItem({ review }: BookReviewItemProps) {
  return (
    <div className="review-card">
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
          レビュワー: {review.reviewer || review.detail}
        </div>
        <div className="review-text">
          {review.review}
        </div>
      </div>
    </div>
  )
}
