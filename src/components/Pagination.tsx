import './Pagination.css'

interface PaginationProps {
  currentPage: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  onNextPage: () => void
  onPreviousPage: () => void
  loading?: boolean
}

export function Pagination({
  currentPage,
  hasNextPage,
  hasPreviousPage,
  onNextPage,
  onPreviousPage,
  loading = false
}: PaginationProps) {
  return (
    <div className="pagination-container">
      <div className="pagination-info">
        ページ {currentPage + 1}
      </div>
      <div className="pagination-buttons">
        <button
          onClick={onPreviousPage}
          disabled={!hasPreviousPage || loading}
          className="pagination-button prev-button"
        >
          前へ
        </button>
        <button
          onClick={onNextPage}
          disabled={!hasNextPage || loading}
          className="pagination-button next-button"
        >
          次へ
        </button>
      </div>
    </div>
  )
}
