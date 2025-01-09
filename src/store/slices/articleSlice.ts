import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ArticleState, Category, ArticleResponse } from "../../types/types";
import { articleService } from "../../api/services/articleService";

const initialState: ArticleState = {
  items: [],
  status: "idle",
  error: null,
  page: 1,
  hasMore: true,
};

export const fetchArticles = createAsyncThunk<
  ArticleResponse,
  { category: Category }
>("articles/fetchArticles", async ({ category }) => {
  return await articleService.fetchArticles(category);
});

export const loadMoreArticles = createAsyncThunk<
  ArticleResponse,
  { category: Category; page: number }
>("articles/loadMore", async ({ category, page }) => {
  console.log("LoadMore action triggered:", { category, page });
  const response = await articleService.fetchArticles(category, page);
  return response;
});
const articleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    clearArticles: (state) => {
      state.items = [];
      state.page = 1;
      state.hasMore = true;
      state.status = "loading"; // Set loading when clearing
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.articles;
        state.hasMore = action.payload.hasMore;
        state.error = null;
      })
      .addCase(loadMoreArticles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadMoreArticles.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = [...state.items, ...action.payload.articles];
        state.hasMore = action.payload.hasMore; // Add this line
        state.page += 1;
        state.error = null;
      })
      .addCase(loadMoreArticles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to load more articles";
      });
  },
});

export const { clearArticles } = articleSlice.actions;
export default articleSlice.reducer;
