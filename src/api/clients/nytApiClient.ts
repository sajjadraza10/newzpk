import axios from 'axios';
import { NYTApiResponse, NYTApiParams } from '../types/nytApi.types';
import { Category, CategoryEnum } from 'types/types';

const NYT_API_KEY = process.env.REACT_APP_NYT_API_KEY;

if (!NYT_API_KEY) {
  throw new Error('NYT_API_KEY is not defined in environment variables');
}

const nytApi = axios.create({
  baseURL: 'https://api.nytimes.com/svc/search/v2',
  params: {
    'api-key': NYT_API_KEY
  }
});

export const fetchNYTArticles = async (params: NYTApiParams): Promise<NYTApiResponse> => {
  const { data } = await nytApi.get<NYTApiResponse>('/articlesearch.json', {
    params: {
      ...params,
      'page-size': 12,
      sort: 'newest'
    }
  });
  return data;
};

// Category mapping for NYT
export const getNYTCategory = (category: Category): string => {
  const categoryMap: Record<Category, string> = {
    [CategoryEnum.NEWS]: 'news',
    [CategoryEnum.SPORTS]: 'sports',
    [CategoryEnum.ENTERTAINMENT]: 'arts',
    [CategoryEnum.TECHNOLOGY]: 'technology',
    [CategoryEnum.CUSTOMIZE_FEED]: 'news'
  };
  return categoryMap[category];
};