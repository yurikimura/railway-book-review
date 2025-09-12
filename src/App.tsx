import { useState } from 'react'
import { BookReviewForm } from './components/BookReviewForm'
import { BookReviewList } from './components/BookReviewList'
import './App.css'

interface BookReview {
  id: string
  title: string
  url: string
  reviewer: string
  review: string
  createdAt: Date
}

function App() {
  const [reviews, setReviews] = useState<BookReview[]>([])

  const handleReviewSubmit = (reviewData: Omit<BookReview, 'id' | 'createdAt'>) => {
    const newReview: BookReview = {
      ...reviewData,
      id: Date.now().toString(),
      createdAt: new Date()
    }
    setReviews(prevReviews => [newReview, ...prevReviews])
  }

  return (
    <div className="App">
      <header className="app-header">
        <h1>書籍レビューアプリ</h1>
        <p>お気に入りの書籍をレビューして共有しましょう</p>
      </header>
      
      <main className="app-main">
        <BookReviewForm onSubmit={handleReviewSubmit} />
        <BookReviewList reviews={reviews} />
      </main>
    </div>
  )
}

export default App
