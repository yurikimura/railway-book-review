import { useState } from 'react'
import './LoginForm.css'

interface LoginFormProps {
  onSubmit: (credentials: { email: string; password: string }) => void
  onSwitchToRegister?: () => void
}

export function LoginForm({ onSubmit, onSwitchToRegister }: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ email, password })
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>ログイン</h2>
        
        <div className="form-group">
          <label htmlFor="email">メールアドレス</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="your@email.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">パスワード</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="パスワードを入力"
          />
        </div>

        <button type="submit" className="login-button">
          ログイン
        </button>

        {onSwitchToRegister && (
          <div className="switch-form">
            <p>
              アカウントをお持ちでないですか？{' '}
              <button 
                type="button" 
                className="switch-button"
                onClick={onSwitchToRegister}
              >
                新規登録
              </button>
            </p>
          </div>
        )}
      </form>
    </div>
  )
} 