export enum CategoryEnum {
  NEWS = "NEWS",
  SPORTS = "SPORTS",
  ENTERTAINMENT = "ENTERTAINMENT",
  TECHNOLOGY = "TECHNOLOGY",
}
export type Category = "NEWS" | "SPORTS" | "ENTERTAINMENT" | "TECHNOLOGY";

export type Article = {
  title: string;
  source: string;
  author: string;
  timeAgo: string;
  imageUrl: string;
  likes: number;
  comments: number;
  shares: number;
};

export type FilterOption = {
  value: string;
  label: string;
};

export type FilterModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onApply: (count: number) => void;
  sections?: FilterSectionConfig[];
  title?: string;
  width?: number;
};

export type FilterSectionConfig = {
  key: string;
  title: string;
  options: FilterOption[];
}

export type FilterSectionProps = {
  title: string;
  options: FilterOption[];
  value: string[];
  onChange: (values: string[]) => void;
};

export type FilterState = {
  sources: string[];
  categories: string[];
  authors: string[];
  searchQuery: string;
  dateRange?: [Date, Date];
}

export type ArticleParams = {
  category: Category;
  page?: number;
  filters?: FilterState;
};

export interface ArticleState {
  items: Article[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  page: number;
}

export interface UseArticlesReturn {
  articles: Article[];
  loading: boolean;
  categoryLoading: boolean;
  error: string | null;
  loadMore: () => void;
}

export type RootState = {
  articles: ArticleState;
  filters: FilterState;
}