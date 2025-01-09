import { configureStore } from '@reduxjs/toolkit';
import articleReducer from './slices/articleSlice';
import filterReducer from './slices/filterSlice';

export const store = configureStore({
  reducer: {
    articles: articleReducer,
    filters: filterReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;