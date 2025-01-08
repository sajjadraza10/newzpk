import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchArticles, loadMoreArticles } from '../store/slices/articleSlice';
import { Category, UseArticlesReturn } from '../types/types';

export const useArticles = (category: Category): UseArticlesReturn => {
  const dispatch = useAppDispatch();
  const { items, status, error, page } = useAppSelector(state => state.articles);

  useEffect(() => {
    if (category) {
      dispatch(fetchArticles({ category }));
    }
  }, [category, dispatch]);

  const loadMore = () => {
    dispatch(loadMoreArticles({ category, page: page + 1 }));
  };

  return {
    articles: items,
    loading: status === 'loading',
    categoryLoading: status === 'loading' && page === 1,
    error,
    loadMore
  };
};