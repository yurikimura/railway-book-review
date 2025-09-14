import { useState } from 'react'
import { type BookReview } from '../utils/api'
import { BookReviewList } from './BookReviewList' // CSS Modules (既存)
import { BookReviewListStyled } from './BookReviewListStyled' // CSS-in-JS
import { BookReviewListTailwind } from './BookReviewListTailwind' // Tailwind CSS
import { BookReviewListModules } from './BookReviewListModules' // CSS Modules (新規)

type StylingMethod = 'css-modules-original' | 'css-modules-new' | 'css-in-js' | 'tailwind'

interface BookReviewListDemoProps {
  reviews: BookReview[]
}

export function BookReviewListDemo({ reviews }: BookReviewListDemoProps) {
  const [stylingMethod, setStylingMethod] = useState<StylingMethod>('css-modules-original')

  const renderComponent = () => {
    switch (stylingMethod) {
      case 'css-modules-original':
        return <BookReviewList reviews={reviews} />
      case 'css-modules-new':
        return <BookReviewListModules reviews={reviews} />
      case 'css-in-js':
        return <BookReviewListStyled reviews={reviews} />
      case 'tailwind':
        return <BookReviewListTailwind reviews={reviews} />
      default:
        return <BookReviewList reviews={reviews} />
    }
  }

  return (
    <div>
      <div style={{ 
        marginBottom: '2rem', 
        padding: '1rem', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '8px',
        border: '1px solid #dee2e6'
      }}>
        <h3 style={{ margin: '0 0 1rem 0', color: '#333' }}>
          スタイリング方法を選択してください
        </h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="radio"
              name="styling-method"
              value="css-modules-original"
              checked={stylingMethod === 'css-modules-original'}
              onChange={(e) => setStylingMethod(e.target.value as StylingMethod)}
            />
            CSS Modules (既存)
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="radio"
              name="styling-method"
              value="css-modules-new"
              checked={stylingMethod === 'css-modules-new'}
              onChange={(e) => setStylingMethod(e.target.value as StylingMethod)}
            />
            CSS Modules (新規)
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="radio"
              name="styling-method"
              value="css-in-js"
              checked={stylingMethod === 'css-in-js'}
              onChange={(e) => setStylingMethod(e.target.value as StylingMethod)}
            />
            CSS-in-JS (styled-components)
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="radio"
              name="styling-method"
              value="tailwind"
              checked={stylingMethod === 'tailwind'}
              onChange={(e) => setStylingMethod(e.target.value as StylingMethod)}
            />
            Tailwind CSS
          </label>
        </div>
        <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
          <p><strong>現在の方法:</strong> {
            stylingMethod === 'css-modules-original' ? 'CSS Modules (既存の実装)'
            : stylingMethod === 'css-modules-new' ? 'CSS Modules (新規の実装)'
            : stylingMethod === 'css-in-js' ? 'CSS-in-JS (styled-components)'
            : 'Tailwind CSS'
          }</p>
        </div>
      </div>
      
      {renderComponent()}
    </div>
  )
}
