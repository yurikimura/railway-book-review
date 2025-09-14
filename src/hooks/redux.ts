import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch } from '../store'

// 型安全なhooksを作成
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector = <T>(selector: (state: any) => T) => useSelector(selector)
