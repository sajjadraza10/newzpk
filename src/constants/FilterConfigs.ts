import { FilterOption } from '../types/types';

export const sources: FilterOption[] = [
  { value: "fortune", label: "Fortune" },
  { value: "forbes", label: "Forbes" },
  { value: "techcrunch", label: "TechCrunch" },
  { value: "wired", label: "Wired" },
];

export const categories: FilterOption[] = [
  { value: "technology", label: "Technology" },
  { value: "business", label: "Business" },
  { value: "science", label: "Science" },
  { value: "health", label: "Health" },
];

export const authors: FilterOption[] = [
  { value: "john_doe", label: "John Doe" },
  { value: "jane_smith", label: "Jane Smith" },
  { value: "mike_johnson", label: "Mike Johnson" },
];