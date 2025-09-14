import { type BookReview } from '../utils/api'

interface BookReviewListTailwindProps {
  reviews: BookReview[]
}

export function BookReviewListTailwind({ reviews }: BookReviewListTailwindProps) {
  // 先頭の10件のみを表示
  const displayedReviews = reviews.slice(0, 10)

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
        投稿されたレビュー (表示: {displayedReviews.length}件 / 全{reviews.length}件)
      </h2>
      <div className="grid grid-cols-1 gap-4 mt-4 max-w-4xl mx-auto">
        {displayedReviews.map((review) => (
          <div 
            key={review.id} 
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
                レビュワー: {review.reviewer}
              </div>
              <div className="text-sm text-gray-600 my-1">
                投稿日: {new Date(review.createdAt).toLocaleDateString('ja-JP')}
              </div>
              <div className="leading-relaxed text-gray-700 mt-2 whitespace-pre-wrap break-words text-sm">
                {review.review}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
