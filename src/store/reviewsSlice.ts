import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { BookReview, reviewsApi } from '../utils/api'

// 非同期アクション：レビュー一覧を取得
export const fetchReviews = createAsyncThunk(
  'reviews/fetchReviews',
  async (offset: number = 0) => {
    const response = await reviewsApi.getAll(offset)
    return response
  }
)

// 非同期アクション：新しいレビューを作成
export const createReview = createAsyncThunk(
  'reviews/createReview',
  async (reviewData: Omit<BookReview, 'id' | 'createdAt'>) => {
    const response = await reviewsApi.create(reviewData)
    return response
  }
)

interface ReviewsState {
  items: BookReview[]
  loading: boolean
  error: string | null
  currentPage: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  totalCount: number
}

const initialState: ReviewsState = {
  items: [],
  loading: false,
  error: null,
  currentPage: 0,
  hasNextPage: false,
  hasPreviousPage: false,
  totalCount: 0,
}

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
    clearReviews: (state) => {
      state.items = []
      state.currentPage = 0
      state.hasNextPage = false
      state.hasPreviousPage = false
      state.totalCount = 0
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchReviews
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.reviews
        state.totalCount = action.payload.totalCount
        state.hasNextPage = action.payload.hasNextPage
        state.hasPreviousPage = action.payload.hasPreviousPage
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'レビューの取得に失敗しました'
      })
      // createReview
      .addCase(createReview.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.loading = false
        state.items.unshift(action.payload)
        state.totalCount += 1
      })
      .addCase(createReview.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'レビューの投稿に失敗しました'
      })
  },
})

export const { setCurrentPage, clearError, clearReviews } = reviewsSlice.actions
export default reviewsSlice.reducer
