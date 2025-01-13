import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { articleService } from "../../api/services/articleService";
import { Article, ArticleResponse, ArticleState, Category, CategoryEnum } from "../../types/types";

const initialState: ArticleState = {
  items: [],
  status: "idle",
  error: null,
  page: 1,
  hasMore: true,
  searchQuery: '',
  category: CategoryEnum.NEWS,
  activeFilters: {
    sources: [],
    categories: []
  }
};

export const fetchArticles = createAsyncThunk<
  ArticleResponse,
  { category: Category; searchQuery?: string; filters?: ArticleState['activeFilters'] }
>("articles/fetchArticles", async (params) => {
  return await articleService.fetchArticles(params);
});

export const setFilters = createAsyncThunk(
  'articles/setFilters',
  async (filters: ArticleState['activeFilters'], { dispatch }) => {
    console.log('Setting filters in Redux:', filters); // Debug log
    dispatch(articleSlice.actions.updateActiveFilters(filters));
    return filters;
  }
);

export const loadMoreArticles = createAsyncThunk<
  ArticleResponse,
  { category: Category; page: number; searchQuery?: string; filters?: ArticleState['activeFilters'] }
>("articles/loadMore", async (params) => {
  return await articleService.fetchArticles({ ...params });
});

export const searchArticles = createAsyncThunk(
  'articles/search',
  async (query: string, { dispatch, getState }) => {
    const state = getState() as { articles: ArticleState };
    dispatch(articleSlice.actions.updateSearchQuery(query));
    return await dispatch(fetchArticles({ 
      category: state.articles.category,
      searchQuery: query,
      filters: state.articles.activeFilters
    }));
  }
);

const articleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    clearArticles: (state) => {
      state.items = [];
      state.page = 1;
      state.hasMore = true;
      state.status = "idle";
    },
    updateSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.page = 1;
      state.items = [];
    },
    updateActiveFilters: (state, action: PayloadAction<ArticleState['activeFilters']>) => {
      state.activeFilters = action.payload;
      state.page = 1;
      state.items = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.articles;
        state.hasMore = action.payload.hasMore;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(loadMoreArticles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadMoreArticles.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = [...state.items, ...action.payload.articles];
        state.hasMore = action.payload.hasMore;
        state.page += 1;
      })
      .addCase(loadMoreArticles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to load more articles";
      });
  },
});

export const { clearArticles, updateSearchQuery, updateActiveFilters } = articleSlice.actions;
export default articleSlice.reducer;