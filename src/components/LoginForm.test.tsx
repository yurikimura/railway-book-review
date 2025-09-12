import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { LoginForm } from './LoginForm'

describe('LoginForm コンポーネント', () => {
  const mockOnSubmit = vi.fn()

  beforeEach(() => {
    mockOnSubmit.mockClear()
  })

  test('ログインフォームが正しくレンダリングされている', () => {
    render(<LoginForm onSubmit={mockOnSubmit} />)
    
    // フォーム要素の存在確認
    expect(screen.getByRole('heading', { name: 'ログイン' })).toBeInTheDocument()
    expect(screen.getByLabelText('メールアドレス')).toBeInTheDocument()
    expect(screen.getByLabelText('パスワード')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'ログイン' })).toBeInTheDocument()
  })

  test('フォームの各入力フィールドが存在している', () => {
    render(<LoginForm onSubmit={mockOnSubmit} />)
    
    // 入力フィールドの確認
    const emailInput = screen.getByRole('textbox', { name: 'メールアドレス' })
    const passwordInput = screen.getByLabelText('パスワード')
    
    expect(emailInput).toBeInTheDocument()
    expect(emailInput).toHaveAttribute('type', 'email')
    expect(emailInput).toHaveAttribute('required')
    expect(emailInput).toHaveAttribute('placeholder', 'your@email.com')
    
    expect(passwordInput).toBeInTheDocument()
    expect(passwordInput).toHaveAttribute('type', 'password')
    expect(passwordInput).toHaveAttribute('required')
    expect(passwordInput).toHaveAttribute('placeholder', 'パスワードを入力')
  })

  test('ボタンがsubmitタイプで正しく設定されている', () => {
    render(<LoginForm onSubmit={mockOnSubmit} />)
    
    const submitButton = screen.getByRole('button', { name: 'ログイン' })
    expect(submitButton).toBeInTheDocument()
    expect(submitButton).toHaveAttribute('type', 'submit')
    expect(submitButton).toHaveClass('login-button')
  })

  test('入力フィールドの値が変更できる', async () => {
    const user = userEvent.setup()
    render(<LoginForm onSubmit={mockOnSubmit} />)
    
    const emailInput = screen.getByRole('textbox', { name: 'メールアドレス' })
    const passwordInput = screen.getByLabelText('パスワード')
    
    // メールアドレス入力
    await user.type(emailInput, 'test@example.com')
    expect(emailInput).toHaveValue('test@example.com')
    
    // パスワード入力
    await user.type(passwordInput, 'password123')
    expect(passwordInput).toHaveValue('password123')
  })

  test('フォーム送信時にonSubmitコールバックが正しい引数で呼ばれる', async () => {
    const user = userEvent.setup()
    render(<LoginForm onSubmit={mockOnSubmit} />)
    
    const emailInput = screen.getByRole('textbox', { name: 'メールアドレス' })
    const passwordInput = screen.getByLabelText('パスワード')
    const submitButton = screen.getByRole('button', { name: 'ログイン' })
    
    // フォームに入力
    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')
    
    // フォーム送信
    await user.click(submitButton)
    
    // onSubmitコールバックが正しい引数で呼ばれたことを確認
    expect(mockOnSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123'
    })
  })

  test('フォーム要素が存在し適切な構造を持っている', () => {
    render(<LoginForm onSubmit={mockOnSubmit} />)
    
    // フォーム要素をクラス名で取得
    const formElement = document.querySelector('form.login-form')
    expect(formElement).toBeTruthy()
    
    // フォーム内にボタンが存在することを確認
    const submitButton = screen.getByRole('button', { name: 'ログイン' })
    expect(submitButton).toBeInTheDocument()
    expect(submitButton.closest('form')).toBe(formElement)
  })
}) 