import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterState } from '../../types/types';

const initialState: FilterState = {
  sources: [],
  categories: [],
  authors: [],
  searchQuery: '',
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    updateFilters: (state, action: PayloadAction<Partial<FilterState>>) => {
      return { ...state, ...action.payload };
    },
    resetFilters: () => initialState
  }
});

export const { updateFilters, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;