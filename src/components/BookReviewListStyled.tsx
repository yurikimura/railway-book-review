import { useState, useMemo } from 'react'
import styled from 'styled-components'
import { type BookReview } from '../utils/api'
import { Pagination } from './Pagination'

interface BookReviewListStyledProps {
  reviews: BookReview[]
}

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`

const Title = styled.h2`
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
  font-size: 1.5rem;
`

const NoReviewsContainer = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  background: #f8f9fa;
  border-radius: 12px;
  border: 2px dashed #dee2e6;
`

const NoReviewsText = styled.p`
  color: #6c757d;
  margin: 0.5rem 0;
  font-size: 1.1rem;
`

const ReviewsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-top: 1rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`

const ReviewCard = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1.25rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: 1px solid #e9ecef;
  margin-bottom: 1rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`

const ReviewContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const BookTitle = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  margin: 0 0 0.25rem 0;
  line-height: 1.4;
  color: #000;
`

const BookLink = styled.a`
  color: #000;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    color: #007bff;
    text-decoration: underline;
  }
`

const BookUrl = styled.div`
  font-size: 0.95rem;
  color: #333;
  margin: 0.1rem 0;
`

const UrlLink = styled.a`
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

const ReviewerInfo = styled.div`
  font-size: 0.95rem;
  color: #333;
  margin: 0.1rem 0;
  font-weight: 500;
`

const ReviewText = styled.div`
  line-height: 1.7;
  color: #333;
  margin-top: 0.5rem;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-size: 0.95rem;
`

// ページネーション用のStyled Components
const PaginationContainer = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  .pagination-container {
    background: transparent;
    border: none;
    box-shadow: none;
    margin: 0;
    padding: 0;
  }

  .pagination-info {
    color: #666;
    font-weight: 500;
  }

  .pagination-button {
    background: #fff;
    border: 1px solid #ddd;
    color: #333;
    transition: all 0.2s ease;

    &:hover:not(:disabled) {
      background: #e9ecef;
      border-color: #adb5bd;
      transform: translateY(-1px);
    }

    &:disabled {
      background: #f8f9fa;
      color: #adb5bd;
      border-color: #e9ecef;
      cursor: not-allowed;
    }
  }

  @media (max-width: 768px) {
    padding: 0.75rem;

    .pagination-container {
      flex-direction: column;
      gap: 0.75rem;
    }

    .pagination-buttons {
      width: 100%;
      justify-content: center;
    }

    .pagination-button {
      flex: 1;
      max-width: 120px;
    }
  }
`

export function BookReviewListStyled({ reviews }: BookReviewListStyledProps) {
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
      <Container>
        <Title>投稿されたレビュー</Title>
        <NoReviewsContainer>
          <NoReviewsText>まだレビューが投稿されていません。</NoReviewsText>
          <NoReviewsText>最初のレビューを投稿してみましょう！</NoReviewsText>
        </NoReviewsContainer>
      </Container>
    )
  }

  return (
    <Container>
      <Title>投稿されたレビュー (表示: {paginatedData.items.length}件 / 全{paginatedData.totalCount}件)</Title>
      <ReviewsGrid>
        {paginatedData.items.map((review, index) => (
          <ReviewCard key={index}>
            <ReviewContent>
              <BookTitle>
                <BookLink 
                  href={review.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {review.title}
                </BookLink>
              </BookTitle>
              <BookUrl>
                URL: <UrlLink 
                  href={review.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {review.url}
                </UrlLink>
              </BookUrl>
              <ReviewerInfo>
                レビュワー: {review.reviewer || review.detail}
              </ReviewerInfo>
              <ReviewText>
                {review.review}
              </ReviewText>
            </ReviewContent>
          </ReviewCard>
        ))}
      </ReviewsGrid>
      
      {paginatedData.totalPages > 1 && (
        <PaginationContainer>
          <Pagination
            currentPage={currentPage}
            hasNextPage={paginatedData.hasNextPage}
            hasPreviousPage={paginatedData.hasPreviousPage}
            onNextPage={handleNextPage}
            onPreviousPage={handlePreviousPage}
          />
        </PaginationContainer>
      )}
    </Container>
  )
}
