import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ArticleState, Category, ArticleResponse, CategoryEnum } from "../../types/types";
import { articleService } from "../../api/services/articleService";

const initialState: ArticleState = {
  items: [],
  status: "idle",
  error: null,
  page: 1,
  hasMore: true,
  searchQuery: '',
  category: CategoryEnum.NEWS
};

export const fetchArticles = createAsyncThunk<
  ArticleResponse,
  { category: Category; searchQuery?: string }
>("articles/fetchArticles", async ({ category, searchQuery }) => {
  return await articleService.fetchArticles(category, 1, searchQuery);
});

export const loadMoreArticles = createAsyncThunk<
  ArticleResponse,
  { category: Category; page: number; searchQuery?: string }
>("articles/loadMore", async ({ category, page, searchQuery }) => {
  return await articleService.fetchArticles(category, page, searchQuery);
});

export const searchArticles = createAsyncThunk(
  'articles/search',
  async (query: string, { dispatch, getState }) => {
    const state = getState() as { articles: ArticleState };
    if (query.length >= 3 || query.length === 0) {
      dispatch(articleSlice.actions.updateSearchQuery(query));
      await dispatch(fetchArticles({ 
        searchQuery: query,
        category: state.articles.category
      }));
    }
  }
);

const articleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    updateSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.page = 1;
      state.items = [];
      state.hasMore = true;
      state.status = "loading";
    },
    setCategory: (state, action: PayloadAction<CategoryEnum>) => {
      state.category = action.payload;
    },
    clearArticles: (state) => {
      state.items = [];
      state.page = 1;
      state.hasMore = true;
      state.status = "loading";
      state.searchQuery = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Articles
      .addCase(fetchArticles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.articles;
        state.hasMore = action.payload.hasMore;
        state.error = null;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch articles";
      })
      // Load More
      .addCase(loadMoreArticles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadMoreArticles.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = [...state.items, ...action.payload.articles];
        state.hasMore = action.payload.hasMore;
        state.page += 1;
        state.error = null;
      })
      .addCase(loadMoreArticles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to load more articles";
      });
  },
});

export const { clearArticles, updateSearchQuery, setCategory } = articleSlice.actions;
export default articleSlice.reducer;