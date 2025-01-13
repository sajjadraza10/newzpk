import { useCallback, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  clearArticles,
  fetchArticles,
  loadMoreArticles,
} from "../store/slices/articleSlice";
import { Category, CategoryEnum, UseArticlesReturn } from "../types/types";

export const useArticles = (category: Category): UseArticlesReturn => {
  const dispatch = useAppDispatch();
  const { items, status, error, page, hasMore, searchQuery, activeFilters } =
    useAppSelector((state) => state.articles);

  useEffect(() => {
    const isCustomizeFeed = category === CategoryEnum.CUSTOMIZE_FEED;

    dispatch(clearArticles());
    dispatch(
      fetchArticles({
        category,
        searchQuery,
        filters: isCustomizeFeed ? activeFilters : undefined,
      })
    );
  }, [category, activeFilters, searchQuery, dispatch]);

  const handleLoadMore = useCallback(() => {
    if (status !== "loading" && hasMore) {
      dispatch(
        loadMoreArticles({
          category: category,
          page: page + 1,
          searchQuery,
          filters:
            category === CategoryEnum.CUSTOMIZE_FEED
              ? activeFilters
              : undefined,
        })
      );
    }
  }, [status, hasMore, page, category, searchQuery, activeFilters, dispatch]);

  return {
    articles: items,
    loading: status === "loading",
    categoryLoading: status === "loading" && page === 1,
    error,
    loadMore: handleLoadMore,
    hasMore,
  };
};
