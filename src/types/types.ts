// 1. Core Enums & Types
export enum CategoryEnum {
  NEWS = "general",
  SPORTS = "sports",
  ENTERTAINMENT = "entertainment",
  TECHNOLOGY = "technology",
  CUSTOMIZE_FEED = "customize feed"
}

export type Category = CategoryEnum;

// 2. Article Related Types
export type Article = {
  id: string;
  title: string;
  source: string;
  author: string;
  timeAgo: string;
  imageUrl: string;
  likes: number;
  comments: number;
  shares: number;
};

export interface ArticleState {
  items: Article[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  page: number;
  hasMore: boolean;
}

export type ArticleResponse = {
  articles: Article[];
  hasMore: boolean;
};

export type FetchArticlesParams = {
  category: Category;
  page?: number;
  searchQuery?: string;
}

// 3. Filter Related Types
export type FilterOption = {
  value: string;
  label: string;
};

export type FilterState = {
  sources: string[];
  categories: string[];
  authors: string[];
  searchQuery: string;
};

// 4. Component Props Types
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
};

// 5. Hook Return Types
export type UseArticlesReturn = {
  articles: Article[];
  loading: boolean;
  categoryLoading: boolean;
  error: string | null;
  loadMore: () => void;
  hasMore: boolean;
}


// 6. Store Types
export type RootState = {
  articles: ArticleState;
  filters: FilterState;
};