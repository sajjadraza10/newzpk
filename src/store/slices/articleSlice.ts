import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ArticleState, Category } from '../../types/types';
import { articleService } from '../../api/services/articleService';

const initialState: ArticleState = {
  items: [],
  status: 'idle',
  error: null,
  page: 1
};

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async ({ category }: { category: Category }) => {
    return await articleService.fetchArticles(category);
  }
);

export const loadMoreArticles = createAsyncThunk(
  'articles/loadMore',
  async ({ category, page }: { category: Category; page: number }) => {
    return await articleService.fetchArticles(category, page);
  }
);

const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch articles';
      });
  }
});

export default articleSlice.reducer;