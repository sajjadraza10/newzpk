import { fetchNewsArticles } from "../clients/newsApiClient";
import {
  Article,
  ArticleResponse,
  ArticleServiceParams,
  Category,
  CategoryEnum,
} from "../../types/types";
import { NewsApiArticle } from "../types/newsApi.types";
import { GuardianArticle } from "api/types/guardianApi.types";
import { NYTArticle } from "api/types/nytApi.types";
import {
  fetchGuardianArticles,
  getGuardianCategory,
} from "api/clients/guardianAPIClient";
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
      !searchQuery || article.webTitle?.toLowerCase().includes(searchLower!),
    nyt: (article: NYTArticle) =>
      !searchQuery ||
      article.headline.main?.toLowerCase().includes(searchLower!) ||
      article.abstract?.toLowerCase().includes(searchLower!),
  };
};

export const articleService = {
  async fetchArticles({
    category,
    page = 1,
    searchQuery,
    filters,
  }: ArticleServiceParams): Promise<ArticleResponse> {
    try {
      const searchFilters = filterArticlesBySearch(searchQuery);
      const selectedSources = filters?.sources?.length
        ? filters.sources
        : ["newsapi", "guardian", "nyt"];

      // Handle category selection for customize feed
      const selectedCategory =
        category === CategoryEnum.CUSTOMIZE_FEED && filters?.categories?.length
          ? (filters.categories[0] as CategoryEnum)
          : category;

      const fetchPromises = [];

      if (selectedSources.includes("newsapi")) {
        fetchPromises.push(
          fetchNewsArticles({
            category: selectedCategory.toLowerCase(),
            page,
            pageSize: ITEMS_PER_SOURCE,
            q: searchQuery,
          }).catch((error) => {
            console.error("NewsAPI Error:", error);
            return { articles: [] };
          })
        );
      }

      if (selectedSources.includes("guardian")) {
        fetchPromises.push(
          fetchGuardianArticles({
            section: getGuardianCategory(selectedCategory),
            page,
            "page-size": ITEMS_PER_SOURCE,
            q: searchQuery,
          }).catch((error) => {
            console.error("Guardian Error:", error);
            return { response: { results: [] } };
          })
        );
      }

      if (selectedSources.includes("nyt")) {
        fetchPromises.push(
          fetchNYTArticles({
            fq: searchQuery
              ? `${searchQuery}`
              : `news_desk:("${getNYTCategory(selectedCategory)}")`,
            page: page - 1,
          }).catch((error) => {
            console.error("NYT Error:", error);
            return { response: { docs: [] } };
          })
        );
      }

      const responses = await Promise.allSettled(fetchPromises);
      const articles: Article[] = [];

      responses.forEach((response, index) => {
        if (response.status === "fulfilled") {
          switch (selectedSources[index]) {
            case "newsapi":
              articles.push(
                ...response.value.articles
                  .filter(searchFilters.newsApi)
                  .map(mapNewsApiToArticle)
              );
              break;
            case "guardian":
              articles.push(
                ...response.value.response.results
                  .filter(searchFilters.guardian)
                  .map(mapGuardianToArticle)
              );
              break;
            case "nyt":
              articles.push(
                ...response.value.response.docs
                  .filter(searchFilters.nyt)
                  .map(mapNYTToArticle)
              );
              break;
          }
        }
      });

      const uniqueArticles = articles
        .sort(
          (a, b) =>
            new Date(b.timeAgo).getTime() - new Date(a.timeAgo).getTime()
        )
        .filter(
          (article, index, self) =>
            index === self.findIndex((a) => a.title === article.title)
        );

      return {
        articles: uniqueArticles,
        hasMore: page < 5 && uniqueArticles.length >= ITEMS_PER_SOURCE,
      };
    } catch (error) {
      console.error("Error in article service:", error);
      return {
        articles: [],
        hasMore: false,
      };
    }
  },
};
