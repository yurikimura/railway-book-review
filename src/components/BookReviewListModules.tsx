import { useState, useMemo } from 'react'
import { type BookReview } from '../utils/api'
import { Pagination } from './Pagination'
import styles from './BookReviewListModules.module.css'

interface BookReviewListModulesProps {
  reviews: BookReview[]
}

export function BookReviewListModules({ reviews }: BookReviewListModulesProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 6

  // ページネーション用のデータを計算
  const paginatedData = useMemo(() => {
    const startIndex = currentPage * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return {
      items: reviews.slice(startIndex, endIndex),
      totalPages: Math.ceil(reviews.length / itemsPerPage),
      hasNextPage: currentPage < Math.ceil(reviews.length / itemsPerPage) - 1,
      hasPreviousPage: currentPage > 0,
      totalCount: reviews.length
    }
  }, [reviews, currentPage, itemsPerPage])

  const handleNextPage = () => {
    if (paginatedData.hasNextPage) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePreviousPage = () => {
    if (paginatedData.hasPreviousPage) {
      setCurrentPage(currentPage - 1)
    }
  }

  if (reviews.length === 0) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>投稿されたレビュー</h2>
        <div className={styles.noReviews}>
          <p className={styles.noReviewsText}>まだレビューが投稿されていません。</p>
          <p className={styles.noReviewsText}>最初のレビューを投稿してみましょう！</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        投稿されたレビュー (表示: {paginatedData.items.length}件 / 全{paginatedData.totalCount}件)
      </h2>
      <div className={styles.reviewsGrid}>
        {paginatedData.items.map((review, index) => (
          <div key={index} className={styles.reviewCard}>
            <div className={styles.reviewContent}>
              <div className={styles.bookTitle}>
                <a 
                  href={review.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.bookLink}
                >
                  {review.title}
                </a>
              </div>
              <div className={styles.bookUrl}>
                URL: <a 
                  href={review.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.urlLink}
                >
                  {review.url}
                </a>
              </div>
              <div className={styles.reviewerInfo}>
                レビュワー: {review.reviewer || review.detail}
              </div>
              <div className={styles.reviewText}>
                {review.review}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {paginatedData.totalPages > 1 && (
        <div className={styles.paginationContainer}>
          <Pagination
            currentPage={currentPage}
            hasNextPage={paginatedData.hasNextPage}
            hasPreviousPage={paginatedData.hasPreviousPage}
            onNextPage={handleNextPage}
            onPreviousPage={handlePreviousPage}
          />
        </div>
      )}
    </div>
  )
}
