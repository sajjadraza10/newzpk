import { fetchNewsArticles } from '../api/clients/newsApiClient';
import { fetchGuardianArticles } from '../api/clients/guardianAPIClient';
import { fetchNYTArticles } from '../api/clients/nytApiClient';
import { CategoryEnum } from '../types/types';

export const testAPIs = async () => {
  try {
    const newsApiResponse = await fetchNewsArticles({
      category: 'technology',
      page: 1,
      pageSize: 5
    });
    //console.log('NewsAPI Response:', newsApiResponse);
   

   
    const guardianResponse = await fetchGuardianArticles({
      section: 'technology',
      page: 1,
      'page-size': 5
    });
    //console.log('Guardian Response:', guardianResponse);
  

    
    const nytResponse = await fetchNYTArticles({
      fq: 'news_desk:("technology")',
      page: 0
    });
    //console.log('NYT Response:', nytResponse);
    

  } catch (error) {
    console.error('API Test Error:', error);
  }
};