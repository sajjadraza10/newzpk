import { FilterOption } from '../types/types';

export const sources: FilterOption[] = [
  { value: "newsapi", label: "NewsAPI" },
  { value: "guardian", label: "The Guardian" },
  { value: "nyt", label: "New York Times" },
];

export const categories: FilterOption[] = [
  { value: "general", label: "General" },
  { value: "sports", label: "Sports" },
  { value: "entertainment", label: "Entertainment" },
  { value: "technology", label: "Technology" },
];