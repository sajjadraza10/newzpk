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

export const fetchNewsArticles = async (params: any) => {
  try {
    const response = await newsApi.get('/top-headlines', {
      params: {
        ...params,
        language: 'en',
        sortBy: 'publishedAt',
        apiKey: process.env.REACT_APP_NEWS_API_KEY
      },
      headers: {
        'X-RateLimit-Remaining': '0'
      }
    });
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 429) {
      // Return empty result on rate limit
      return {
        articles: [],
        totalResults: 0
      };
    }
    throw error;
  }
};