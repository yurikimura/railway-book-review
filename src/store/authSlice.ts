import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { authApi, type SignInCredentials, type RegisterData, type User } from '../utils/api'


// 認証状態の型定義
interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
}

// 非同期アクション：ログイン
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: SignInCredentials, { rejectWithValue }) => {
    try {
      const result = await authApi.signin(credentials)
      
      // トークンが保存されたので、ユーザー情報を取得
      const user = await authApi.getCurrentUser()
      
      return { user, token: result.token }
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'ログインに失敗しました'
      )
    }
  }
)

// 非同期アクション：新規登録
export const register = createAsyncThunk(
  'auth/register',
  async (userData: RegisterData, { rejectWithValue }) => {
    try {
      await authApi.register(userData)
      
      // 登録成功後、自動的にログイン
      const result = await authApi.signin({
        email: userData.email,
        password: userData.password
      })
      
      // ユーザー情報を取得
      const user = await authApi.getCurrentUser()
      
      return { user, token: result.token }
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : '登録に失敗しました'
      )
    }
  }
)

// 非同期アクション：ログアウト
export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authApi.logout()
      return null
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'ログアウトに失敗しました'
      )
    }
  }
)

// 非同期アクション：認証状態の復元
export const restoreAuth = createAsyncThunk(
  'auth/restoreAuth',
  async (_, { rejectWithValue }) => {
    try {
      const isAuthenticated = authApi.isAuthenticated()
      if (isAuthenticated) {
        try {
          // 実際のAPIからユーザー情報を取得
          const user = await authApi.getCurrentUser()
          return { user, isAuthenticated: true }
        } catch (error) {
          // ユーザー情報の取得に失敗した場合、トークンをクリア
          authApi.logout()
          return { user: null, isAuthenticated: false }
        }
      }
      return { user: null, isAuthenticated: false }
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : '認証状態の復元に失敗しました'
      )
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    clearAuth: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.loading = false
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      // ログイン
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.user = null
        state.isAuthenticated = false
        state.error = action.payload as string
      })
      // 新規登録
      .addCase(register.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false
        state.user = null
        state.isAuthenticated = false
        state.error = action.payload as string
      })
      // ログアウト
      .addCase(logout.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false
        state.user = null
        state.isAuthenticated = false
        state.error = null
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // 認証状態の復元
      .addCase(restoreAuth.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(restoreAuth.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.isAuthenticated = action.payload.isAuthenticated
        state.error = null
      })
      .addCase(restoreAuth.rejected, (state, action) => {
        state.loading = false
        state.user = null
        state.isAuthenticated = false
        state.error = action.payload as string
      })
  },
})

export const { clearError, clearAuth } = authSlice.actions
export default authSlice.reducer
