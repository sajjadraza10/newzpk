import { useCallback } from 'react';
import { useAppDispatch } from '../store/hooks';
import { searchArticles } from '../store/slices/articleSlice';
import debounce from 'lodash/debounce';

export const useSearch = () => {
  const dispatch = useAppDispatch();

  const handleSearch = useCallback(
    debounce((value: string) => {
      // Validate and clean search input
      const searchTerm = value.trim().toLowerCase();
      
      // Only search if valid term
      if (searchTerm.length >= 3 || searchTerm.length === 0) {
        dispatch(searchArticles(searchTerm));
      }
    }, 500),
    [dispatch]
  );

  return { handleSearch };
};