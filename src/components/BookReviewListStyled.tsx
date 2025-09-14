import styled from 'styled-components'
import { type BookReview } from '../utils/api'

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

const ReviewDate = styled.div`
  font-size: 0.95rem;
  color: #666;
  margin: 0.1rem 0;
`

const ReviewText = styled.div`
  line-height: 1.7;
  color: #333;
  margin-top: 0.5rem;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-size: 0.95rem;
`

export function BookReviewListStyled({ reviews }: BookReviewListStyledProps) {
  // 先頭の10件のみを表示
  const displayedReviews = reviews.slice(0, 10)

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
      <Title>投稿されたレビュー (表示: {displayedReviews.length}件 / 全{reviews.length}件)</Title>
      <ReviewsGrid>
        {displayedReviews.map((review) => (
          <ReviewCard key={review.id}>
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
                レビュワー: {review.reviewer}
              </ReviewerInfo>
              <ReviewDate>
                投稿日: {new Date(review.createdAt).toLocaleDateString('ja-JP')}
              </ReviewDate>
              <ReviewText>
                {review.review}
              </ReviewText>
            </ReviewContent>
          </ReviewCard>
        ))}
      </ReviewsGrid>
    </Container>
  )
}
