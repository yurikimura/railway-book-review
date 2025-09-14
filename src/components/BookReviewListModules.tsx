import { type BookReview } from '../utils/api'
import styles from './BookReviewListModules.module.css'

interface BookReviewListModulesProps {
  reviews: BookReview[]
}

export function BookReviewListModules({ reviews }: BookReviewListModulesProps) {
  // 先頭の10件のみを表示
  const displayedReviews = reviews.slice(0, 10)

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
        投稿されたレビュー (表示: {displayedReviews.length}件 / 全{reviews.length}件)
      </h2>
      <div className={styles.reviewsGrid}>
        {displayedReviews.map((review) => (
          <div key={review.id} className={styles.reviewCard}>
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
                レビュワー: {review.reviewer}
              </div>
              <div className={styles.reviewDate}>
                投稿日: {new Date(review.createdAt).toLocaleDateString('ja-JP')}
              </div>
              <div className={styles.reviewText}>
                {review.review}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
