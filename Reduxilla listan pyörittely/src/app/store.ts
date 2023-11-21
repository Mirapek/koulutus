import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import counterReducer from "../features/list/listSlice"
import listSlice from "../features/list/listSlice"

export const store = configureStore({
  reducer: {
    list: listSlice
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
