import axios from 'axios';
import { GuardianApiResponse, GuardianApiParams } from '../types/guardianApi.types';
import { Category, CategoryEnum } from 'types/types';

const GUARDIAN_API_KEY = process.env.REACT_APP_GUARDIAN_API_KEY;

if (!GUARDIAN_API_KEY) {
  throw new Error('GUARDIAN_API_KEY is not defined in environment variables');
}

const guardianApi = axios.create({
  baseURL: 'https://content.guardianapis.com',
  params: {
    'api-key': GUARDIAN_API_KEY
  }
});

export const fetchGuardianArticles = async (params: GuardianApiParams): Promise<GuardianApiResponse> => {
  const { data } = await guardianApi.get<GuardianApiResponse>('/search', {
    params: {
      ...params,
      'page-size': 12,
      'show-fields': 'headline,thumbnail,bodyText',
      'order-by': 'newest'
    }
  });
  return data;
};

// Category mapping for Guardian
export const getGuardianCategory = (category: Category): string => {
  const categoryMap: Record<Category, string> = {
    [CategoryEnum.NEWS]: 'news',
    [CategoryEnum.SPORTS]: 'sport',
    [CategoryEnum.ENTERTAINMENT]: 'culture',
    [CategoryEnum.TECHNOLOGY]: 'technology',
    [CategoryEnum.CUSTOMIZE_FEED]: 'news'
  };
  return categoryMap[category];
};