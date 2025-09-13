import { buildApiUrl, API_CONFIG } from '../config/api'

// 書籍レビューの型定義
export interface BookReview {
  id: string
  title: string
  url: string
  reviewer: string
  review: string
  createdAt: string
}

// ログイン情報の型定義
export interface SignInCredentials {
  email: string
  password: string
}

// ユーザー登録情報の型定義
export interface RegisterData {
  name: string
  email: string
  password: string
}

// APIエラーの型定義
export interface ApiError {
  message: string
  status: number
}

// 認証トークンの管理
class AuthManager {
  private static token: string | null = null

  static setToken(token: string) {
    this.token = token
    localStorage.setItem('auth_token', token)
  }

  static getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('auth_token')
    }
    return this.token
  }

  static clearToken() {
    this.token = null
    localStorage.removeItem('auth_token')
  }
}

// HTTPメソッドの型定義
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

// 汎用APIリクエスト関数
async function apiRequest<T>(
  endpoint: string,
  method: HttpMethod = 'GET',
  body?: any,
  requireAuth: boolean = true
): Promise<T> {
  const url = buildApiUrl(endpoint)
  
  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  }

  // 認証が必要な場合、トークンを追加
  if (requireAuth) {
    const token = AuthManager.getToken()
    if (token) {
      config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${token}`
      }
    }
  }

  if (body) {
    config.body = JSON.stringify(body)
  }

  try {
    const response = await fetch(url, config)
    
    // 401エラーの場合、トークンをクリア
    if (response.status === 401) {
      AuthManager.clearToken()
      throw new Error('認証が必要です。ログインしてください。')
    }
    
    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`
      
      try {
        const errorData = await response.json()
        errorMessage = errorData.message || errorMessage
      } catch {
        // JSONパースに失敗した場合はデフォルトメッセージを使用
      }
      
      throw new Error(errorMessage)
    }

    return await response.json()
  } catch (error) {
    if (error instanceof Error) {
      // ネットワークエラーの場合
      if (error.message.includes('Failed to fetch')) {
        throw new Error('ネットワークエラー: サーバーに接続できません。インターネット接続を確認してください。')
      }
      throw new Error(`API request failed: ${error.message}`)
    }
    throw new Error('API request failed: Unknown error')
  }
}

// 書籍レビュー関連のAPI関数
export const reviewsApi = {
  // 全てのレビューを取得
  getAll: (): Promise<BookReview[]> => {
    return apiRequest<BookReview[]>(API_CONFIG.ENDPOINTS.BOOKS)
  },

  // 新しいレビューを作成
  create: (review: Omit<BookReview, 'id' | 'createdAt'>): Promise<BookReview> => {
    return apiRequest<BookReview>(API_CONFIG.ENDPOINTS.BOOKS, 'POST', review)
  },

  // レビューを更新
  update: (id: string, review: Partial<BookReview>): Promise<BookReview> => {
    return apiRequest<BookReview>(`${API_CONFIG.ENDPOINTS.BOOKS}/${id}`, 'PUT', review)
  },

  // レビューを削除
  delete: (id: string): Promise<void> => {
    return apiRequest<void>(`${API_CONFIG.ENDPOINTS.BOOKS}/${id}`, 'DELETE')
  }
}

// 認証関連のAPI関数
export const authApi = {
  // ユーザー登録
  register: async (userData: RegisterData): Promise<{ message: string }> => {
    return apiRequest<{ message: string }>(
      API_CONFIG.ENDPOINTS.REGISTER, 
      'POST', 
      userData, 
      false // 登録時は認証不要
    )
  },

  // ログイン
  signin: async (credentials: SignInCredentials): Promise<{ token: string }> => {
    const result = await apiRequest<{ token: string }>(
      API_CONFIG.ENDPOINTS.LOGIN, 
      'POST', 
      credentials, 
      false // ログイン時は認証不要
    )
    
    // トークンを保存
    if (result.token) {
      AuthManager.setToken(result.token)
    }
    
    return result
  },

  // ログアウト
  logout: (): Promise<void> => {
    AuthManager.clearToken()
    return apiRequest<void>(API_CONFIG.ENDPOINTS.LOGOUT, 'POST')
  },

  // 認証状態を確認
  isAuthenticated: (): boolean => {
    return AuthManager.getToken() !== null
  }
}
