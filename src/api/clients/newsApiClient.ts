import axios from 'axios';
import { NewsApiResponse, NewsApiParams } from '../types/newsApi.types';

const API_KEY = 'a7fe58c3c0d249cbb7b9f6a14e48dbd7';

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