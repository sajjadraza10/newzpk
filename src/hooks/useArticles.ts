import { useCallback, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { clearArticles, fetchArticles, loadMoreArticles } from '../store/slices/articleSlice';
import { Category, CategoryEnum, UseArticlesReturn } from '../types/types';

export const useArticles = (category: Category): UseArticlesReturn => {
  const dispatch = useAppDispatch();
  const isInitialMount = useRef(true);
  const prevCategory = useRef(category);
  const prevFilters = useRef<any>(null);
  
  const { 
    items, 
    status, 
    error, 
    page, 
    hasMore,
    searchQuery,
    activeFilters 
  } = useAppSelector(state => state.articles);

//  useEffect(() => {
//     const categoryChanged = prevCategory.current !== category;
//     const filtersChanged = JSON.stringify(prevFilters.current) !== JSON.stringify(activeFilters);
//     const isCustomizeFeed = category === CategoryEnum.CUSTOMIZE_FEED;
//     const hasFilters = activeFilters.sources.length > 0 || activeFilters.categories.length > 0;

//     console.log('UseArticles Effect:', {
//       isInitialMount: isInitialMount.current,
//       category,
//       activeFilters,
//       categoryChanged,
//       filtersChanged,
//       hasFilters,
//       status
//     });

//     // Fetch conditions:
//     // 1. Initial mount OR
//     // 2. Category changed OR
//     // 3. In customize feed with filter changes OR
//     // 4. In customize feed with active filters
//     const shouldFetch = 
//       isInitialMount.current || 
//       categoryChanged || 
//       (isCustomizeFeed && filtersChanged && hasFilters);

//     if (shouldFetch) {
//       isInitialMount.current = false;
//       prevCategory.current = category;
//       prevFilters.current = {...activeFilters};

//       dispatch(clearArticles());
//       dispatch(fetchArticles({
//         category: category,
//         searchQuery,
//         filters: activeFilters
//       }));
//     }
//   }, [
//     category,
//     activeFilters, // Track all filter changes
//     searchQuery,
//     dispatch
//   ]); 
useEffect(() => {
  const isCustomizeFeed = category === CategoryEnum.CUSTOMIZE_FEED;

  dispatch(clearArticles());
  dispatch(fetchArticles({
    category,
    searchQuery,
    filters: isCustomizeFeed ? activeFilters : undefined
  }));
}, [category, activeFilters, searchQuery, dispatch]);

  const handleLoadMore = useCallback(() => {
    if (status !== 'loading' && hasMore) {
      dispatch(loadMoreArticles({
        category: category,
        page: page + 1,
        searchQuery,
        filters: category === CategoryEnum.CUSTOMIZE_FEED ? activeFilters : undefined
      }));
    }
  }, [
    status,
    hasMore,
    page,
    category,
    searchQuery,
    activeFilters,
    dispatch
  ]);

  return {
    articles: items,
    loading: status === 'loading',
    categoryLoading: status === 'loading' && page === 1,
    error,
    loadMore: handleLoadMore,
    hasMore
  };
};