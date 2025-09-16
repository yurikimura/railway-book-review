import { useState } from 'react'
import { type BookReview } from '../utils/api'
import { Pagination } from './Pagination'
import './BookReviewList.css'

interface BookReviewListProps {
  reviews: BookReview[]
}

export function BookReviewList({ reviews }: BookReviewListProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 10

  // ページネーションの計算
  const totalPages = Math.ceil(reviews.length / itemsPerPage)
  const startIndex = currentPage * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const displayedReviews = reviews.slice(startIndex, endIndex)
  
  const hasNextPage = currentPage < totalPages - 1
  const hasPreviousPage = currentPage > 0

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

  const handleNextPage = () => {
    if (hasNextPage) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePreviousPage = () => {
    if (hasPreviousPage) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div className="book-review-list-container">
      <h2>投稿されたレビュー (ページ {currentPage + 1}/{totalPages} - 表示: {displayedReviews.length}件 / 全{reviews.length}件)</h2>
      <div className="reviews-grid">
        {displayedReviews.map((review, index) => (
          <div key={index} className="review-card">
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
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
        onNextPage={handleNextPage}
        onPreviousPage={handlePreviousPage}
      />
    </div>
  )
}
