import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { clearArticles, fetchArticles, loadMoreArticles } from '../store/slices/articleSlice';
import { Category, RootState, UseArticlesReturn } from '../types/types';

export const useArticles = (category: Category): UseArticlesReturn => {
  const dispatch = useAppDispatch();
  const { items, status, error, page, hasMore } = useAppSelector(
    (state: RootState) => state.articles
  );

  useEffect(() => {
    dispatch(clearArticles());
    dispatch(fetchArticles({ category }));
  }, [category, dispatch]);

  const handleLoadMore = useCallback(() => {
    if (status !== 'loading' && hasMore) {
      dispatch(loadMoreArticles({ 
        category, 
        page: page + 1 
      }));
    }
  }, [status, hasMore, page, category, dispatch]);

  return {
    articles: items,
    loading: status === 'loading',
    categoryLoading: status === 'loading' && page === 1,
    error,
    loadMore: handleLoadMore,
    hasMore
  };
};