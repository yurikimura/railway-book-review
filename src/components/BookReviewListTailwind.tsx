import { useState } from 'react'
import { type BookReview } from '../utils/api'

interface BookReviewListTailwindProps {
  reviews: BookReview[]
}

export function BookReviewListTailwind({ reviews }: BookReviewListTailwindProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 10
  
  // 現在のページのレビューを計算
  const startIndex = currentPage * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const displayedReviews = reviews.slice(startIndex, endIndex)
  
  // ページネーション情報を計算
  const totalPages = Math.ceil(reviews.length / itemsPerPage)
  const hasNextPage = currentPage < totalPages - 1
  const hasPreviousPage = currentPage > 0
  
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

  if (reviews.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-gray-800 mb-8 text-center text-2xl">
          投稿されたレビュー
        </h2>
        <div className="text-center py-12 px-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
          <p className="text-gray-600 my-2 text-lg">
            まだレビューが投稿されていません。
          </p>
          <p className="text-gray-600 my-2 text-lg">
            最初のレビューを投稿してみましょう！
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-gray-800 mb-8 text-center text-2xl">
        投稿されたレビュー (全{reviews.length}件)
      </h2>
      <div className="grid grid-cols-1 gap-4 mt-4 max-w-4xl mx-auto">
        {displayedReviews.map((review, index) => (
          <div 
            key={index} 
            className="bg-white rounded-lg shadow-md p-5 transition-all duration-200 border border-gray-200 mb-4 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex flex-col gap-2">
              <div className="text-xl font-bold mb-1 leading-tight text-black">
                <a 
                  href={review.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-black font-bold no-underline hover:text-blue-600 hover:underline"
                >
                  {review.title}
                </a>
              </div>
              <div className="text-sm text-gray-700 my-1">
                URL: <a 
                  href={review.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 no-underline hover:underline"
                >
                  {review.url}
                </a>
              </div>
              <div className="text-sm text-gray-700 my-1 font-medium">
                レビュワー: {review.reviewer || review.detail}
              </div>
              <div className="leading-relaxed text-gray-700 mt-2 whitespace-pre-wrap break-words text-sm">
                {review.review}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* ページネーション */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-8 mb-4 px-4 py-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600 font-medium">
            ページ {currentPage + 1} / {totalPages}
          </div>
          <div className="flex gap-3">
            <button
              onClick={handlePreviousPage}
              disabled={!hasPreviousPage}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                hasPreviousPage
                  ? 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 shadow-sm'
                  : 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
              }`}
            >
              前へ
            </button>
            <button
              onClick={handleNextPage}
              disabled={!hasNextPage}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                hasNextPage
                  ? 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 shadow-sm'
                  : 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
              }`}
            >
              次へ
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
