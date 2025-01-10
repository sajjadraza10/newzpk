import axios from 'axios';
import { NYTApiResponse, NYTApiParams } from '../types/nytApi.types';
import { Category, CategoryEnum } from 'types/types';


//Add rate limit tracking to NYT client
//Because NYT has stricter rate limits (10 requests/minute)
//Add retry mechanism for NYT

const NYT_API_KEY = process.env.REACT_APP_NYT_API_KEY;
let lastRequestTime = Date.now() - 6100; // Initialize with offset

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
  try {
    // Check time since last request
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    if (timeSinceLastRequest < 6100) {
      await new Promise(resolve => setTimeout(resolve, 6100 - timeSinceLastRequest));
    }

    const { data } = await nytApi.get<NYTApiResponse>('/articlesearch.json', {
      params: {
        ...params,
        'page-size': 12,
        sort: 'newest'
      }
    });

    lastRequestTime = Date.now();
    return data;
  } catch (error: any) {
    if (error.response?.status === 429) {
      // On rate limit, wait and retry once
      await new Promise(resolve => setTimeout(resolve, 6100));
      const { data } = await nytApi.get<NYTApiResponse>('/articlesearch.json', {
        params: {
          ...params,
          'page-size': 12,
          sort: 'newest'
        }
      });
      lastRequestTime = Date.now();
      return data;
    }
    throw error;
  }
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