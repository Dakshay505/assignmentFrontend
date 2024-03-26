import { configureStore } from '@reduxjs/toolkit';
import authReducer from './redux/slices/authSlice';
import studentReducer from "./redux/slices/studentSlice"
export const store = configureStore({
  reducer: {
    user: authReducer,
    student : studentReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
