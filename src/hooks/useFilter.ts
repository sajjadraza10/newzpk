import { useState, useCallback } from 'react';
import { FilterSectionConfig } from '../types/types';

// Clear type definitions
type FilterValues = string[];
interface FilterState {
  [key: string]: FilterValues;
}

// Helper functions for clarity
const createEmptyFilterState = (sections: FilterSectionConfig[]): FilterState => 
  Object.fromEntries(sections.map(section => [section.key, []]));

export const useFilter = (sections: FilterSectionConfig[]) => {
  // Initialize state with descriptive function
  const [filters, setFilters] = useState<FilterState>(() => 
    createEmptyFilterState(sections)
  );

  const updateFilter = useCallback((filterKey: string, newValues: FilterValues) => {
    setFilters(currentFilters => ({
      ...currentFilters,
      [filterKey]: newValues
    }));
  }, [])
  
  const clearAllFilters = useCallback(() => {
    setFilters(createEmptyFilterState(sections));
  }, [sections]);

  const getFilterByKey = useCallback((key: string): FilterValues => 
    filters[key] || [], 
    [filters]
  );

  const getSelectedFiltersCount = useCallback((): number => 
    Object.values(filters).reduce((total, values) => total + values.length, 0),
    [filters]
  );

  return {
    filters,
    updateFilter,
    clearAllFilters,
    getFilterByKey,
    getSelectedFiltersCount
  };
};