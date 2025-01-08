import axios from 'axios';
import { NewsApiResponse, NewsApiParams } from '../types/newsApi.types';

const API_KEY = process.env.REACT_APP_NEWS_API_KEY;

if (!API_KEY) {
  throw new Error('NEWS_API_KEY is not defined in environment variables');
}

const newsApi = axios.create({
  baseURL: 'https://newsapi.org/v2',
  headers: {
    'X-Api-Key': API_KEY
  }
});

export const fetchNewsArticles = async (params: NewsApiParams): Promise<NewsApiResponse> => {
  const { data } = await newsApi.get<NewsApiResponse>('/everything', {
    params: {
      ...params,
      language: 'en',
      sortBy: 'publishedAt'
    }
  });
  return data;
};