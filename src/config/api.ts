// API設定
export const API_CONFIG = {
  BASE_URL: 'https://railway.bookreview.techtrain.dev',
  ENDPOINTS: {
    BOOKS: '/books',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
  }
} as const

// API URLを構築するヘルパー関数
export const buildApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`
}
