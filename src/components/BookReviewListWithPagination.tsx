import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { fetchReviews, setCurrentPage } from '../store/reviewsSlice'
import { BookReviewItem } from './BookReviewItem'
import { Pagination } from './Pagination'
import './BookReviewListWithPagination.css'

export function BookReviewListWithPagination() {
  const dispatch = useAppDispatch()
  const state = useAppSelector((state) => state)
  
  // 状態が初期化されていない場合は何も表示しない
  if (!state || !state.reviews) {
    return <div>Loading...</div>
  }
  
  const { items = [], loading = false, error = null, currentPage = 0, hasNextPage = false, hasPreviousPage = false, totalCount = 0 } = state.reviews


  // コンポーネントマウント時とページ変更時にレビューを取得
  useEffect(() => {
    dispatch(fetchReviews(currentPage * 10))
  }, [dispatch, currentPage])

  const handleNextPage = () => {
    if (hasNextPage && !loading) {
      dispatch(setCurrentPage(currentPage + 1))
    }
  }

  const handlePreviousPage = () => {
    if (hasPreviousPage && !loading) {
      dispatch(setCurrentPage(currentPage - 1))
    }
  }

  if (loading && items.length === 0) {
    return (
      <div className="book-review-list-container">
        <h2>投稿されたレビュー</h2>
        <div className="loading-message">
          <p>レビューを読み込み中...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="book-review-list-container">
        <h2>投稿されたレビュー</h2>
        <div className="error-message">
          <p>エラー: {error}</p>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
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
      <h2>投稿されたレビュー (全{totalCount}件)</h2>
      
      <div className="reviews-grid">
        {items.map((review: any, index: number) => (
          <BookReviewItem key={index} review={review} />
        ))}
      </div>

      {totalCount > 10 && (
        <Pagination
          currentPage={currentPage}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
          onNextPage={handleNextPage}
          onPreviousPage={handlePreviousPage}
          loading={loading}
        />
      )}
    </div>
  )
}
