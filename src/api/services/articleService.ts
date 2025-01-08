// import { Category, Article } from 'types/types';
// import { MOCK_ARTICLES } from '../constants/mockData';


// export const articleService = {
//   fetchArticles: async (category: Category): Promise<Article[]> => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         const articles = MOCK_ARTICLES.map(article => ({
//           ...article,
//           imageUrl: `${article.imageUrl}&category=${category}`
//         }));
//         resolve(articles);
//       }, 1500);
//     });
//   },
  
//   fetchMoreArticles: async (category: Category, currentLength: number): Promise<Article[]> => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         const moreArticles = MOCK_ARTICLES.map((article, index) => ({
//           ...article,
//           imageUrl: `https://picsum.photos/600/400?random=${currentLength + index + 1}&category=${category}`
//         }));
//         resolve(moreArticles);
//       }, 1500);
//     });
//   }
// };
import { fetchNewsArticles } from '../clients/newsApiClient';
import { Article, Category, FilterState } from '../../types/types';
import { NewsApiArticle } from '../types/newsApi.types';

const mapNewsApiToArticle = (article: NewsApiArticle): Article => ({
  title: article.title,
  source: article.source.name,
  author: article.author || 'Unknown',
  timeAgo: new Date(article.publishedAt).toLocaleDateString(),
  imageUrl: article.urlToImage || '',
  likes: 0,
  comments: 0,
  shares: 0
});

export const articleService = {
  async fetchArticles(category: Category, page: number = 1, filters?: FilterState): Promise<Article[]> {
    try {
      const response = await fetchNewsArticles({
        q: category.toLowerCase(),
        page,
        pageSize: 12,
        sources: filters?.sources
      });
      return response.articles.map(mapNewsApiToArticle);
    } catch (error) {
      console.error('Error fetching articles:', error);
      throw error;
    }
  }
};