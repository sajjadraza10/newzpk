import { fetchNewsArticles } from "../clients/newsApiClient";
import { Article, Category, CategoryEnum } from "../../types/types";
import { NewsApiArticle } from "../types/newsApi.types";
import { GuardianArticle } from "api/types/guardianApi.types";
import { NYTArticle } from "api/types/nytApi.types";
import { fetchGuardianArticles, getGuardianCategory } from "api/clients/guardianAPIClient";
import { fetchNYTArticles, getNYTCategory } from "api/clients/nytApiClient";

const ITEMS_PER_SOURCE = 6;

const mapNewsApiToArticle = (article: NewsApiArticle): Article => ({
  id: `news-${article.source.name}-${article.publishedAt}-${Math.random()}`,
  title: article.title,
  source: article.source.name,
  author: article.author || "Unknown",
  timeAgo: new Date(article.publishedAt).toLocaleDateString(),
  imageUrl: article.urlToImage || "",
  likes: 0,
  comments: 0,
  shares: 0,
});

const mapGuardianToArticle = (article: GuardianArticle): Article => ({
  id: `guardian-${article.id}-${Math.random()}`,
  title: article.webTitle,
  source: "The Guardian",
  author: article.pillarName || "Unknown",
  timeAgo: new Date(article.webPublicationDate).toLocaleDateString(),
  imageUrl: article.fields?.thumbnail || "",
  likes: 0,
  comments: 0,
  shares: 0,
});

const mapNYTToArticle = (article: NYTArticle): Article => ({
  id: `nyt-${article.web_url}-${Math.random()}`,
  title: article.headline.main,
  source: "New York Times",
  author: article.byline?.original || "Unknown",
  timeAgo: new Date(article.pub_date).toLocaleDateString(),
  imageUrl: article.multimedia?.[0]?.url
    ? `https://www.nytimes.com/${article.multimedia[0].url}`
    : "",
  likes: 0,
  comments: 0,
  shares: 0,
});

const filterArticlesBySearch = (searchQuery?: string) => {
  const searchLower = searchQuery?.toLowerCase();
  return {
    newsApi: (article: NewsApiArticle) => 
      !searchQuery || 
      article.title?.toLowerCase().includes(searchLower!) ||
      article.description?.toLowerCase().includes(searchLower!),
    guardian: (article: GuardianArticle) =>
      !searchQuery ||
      article.webTitle?.toLowerCase().includes(searchLower!),
    nyt: (article: NYTArticle) =>
      !searchQuery ||
      article.headline.main?.toLowerCase().includes(searchLower!) ||
      article.abstract?.toLowerCase().includes(searchLower!)
  };
};

export const articleService = {
  async fetchArticles(
    category: Category,
    page: number = 1,
    searchQuery?: string
  ): Promise<{ articles: Article[]; hasMore: boolean }> {
    console.log('Fetching articles:', { category, page, searchQuery });
    
    try {
      const filters = filterArticlesBySearch(searchQuery);
      
      const [newsApi, guardian, nyt] = await Promise.allSettled([
        fetchNewsArticles({
          category: category.toLowerCase(),
          page,
          pageSize: ITEMS_PER_SOURCE,
          q: searchQuery
        }).catch(error => {
          console.error('NewsAPI Error:', error);
          return { articles: [] };
        }),
        fetchGuardianArticles({
          section: getGuardianCategory(category),
          page,
          "page-size": ITEMS_PER_SOURCE,
          q: searchQuery
        }).catch(error => {
          console.error('Guardian Error:', error);
          return { response: { results: [] } };
        }),
        fetchNYTArticles({
          fq: searchQuery 
            ? `${searchQuery}`  // Simplified query for better results
            : `news_desk:("${getNYTCategory(category)}")`,
          page: page - 1
        }).catch(error => {
          console.error('NYT Error:', error);
          return { response: { docs: [] } };
        })
      ]);

      const articles: Article[] = [];

      if (newsApi.status === "fulfilled") {
        const newsArticles = newsApi.value.articles
          .filter(filters.newsApi)
          .map(mapNewsApiToArticle);
        articles.push(...newsArticles);
      }
      
      if (guardian.status === "fulfilled") {
        const guardianArticles = guardian.value.response.results
          .filter(filters.guardian)
          .map(mapGuardianToArticle);
        articles.push(...guardianArticles);
      }
      
      if (nyt.status === "fulfilled") {
        const nytArticles = nyt.value.response.docs
          .filter(filters.nyt)
          .map(mapNYTToArticle);
        articles.push(...nytArticles);
      }

      const uniqueArticles = articles
        .sort((a, b) => new Date(b.timeAgo).getTime() - new Date(a.timeAgo).getTime())
        .filter((article, index, self) => 
          index === self.findIndex(a => a.title === article.title)
        );

      console.log('Processed articles:', {
        total: uniqueArticles.length,
        sources: [...new Set(uniqueArticles.map(a => a.source))]
      });

      const hasMore = page < 5 && uniqueArticles.length >= ITEMS_PER_SOURCE;

      return {
        articles: uniqueArticles,
        hasMore
      };

    } catch (error) {
      console.error("Error in article service:", error);
      return {
        articles: [],
        hasMore: false
      };
    }
  }
};