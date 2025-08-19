import { useState } from 'react'
import './LoginForm.css'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // ログイン処理はここに実装
    console.log('ログイン試行:', { email, password })
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
      </form>
    </div>
  )
} 