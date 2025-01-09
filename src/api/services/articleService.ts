import { fetchNewsArticles } from "../clients/newsApiClient";
import {
  Article,
  Category,
  CategoryEnum,
  FilterState,
} from "../../types/types";
import { NewsApiArticle } from "../types/newsApi.types";
import { GuardianArticle } from "api/types/guardianApi.types";
import { NYTArticle } from "api/types/nytApi.types";
import {
  fetchGuardianArticles,
  getGuardianCategory,
} from "api/clients/guardianAPIClient";
import { fetchNYTArticles, getNYTCategory } from "api/clients/nytApiClient";

const mapNewsApiToArticle = (article: NewsApiArticle): Article => ({
  id: `news-${article.source.name}-${article.publishedAt}`,
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
  id: `guardian-${article.id}`,
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
  id: `nyt-${article.web_url}`,
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

export const articleService = {
  async fetchArticles(
    category: Category,
    page: number = 1
  ): Promise<{ articles: Article[]; hasMore: boolean }> {
    const ITEMS_PER_SOURCE = 6;

    try {
      const [newsApi, guardian, nyt] = await Promise.allSettled([
        fetchNewsArticles({
          category: category.toLowerCase(),
          page,
          pageSize: ITEMS_PER_SOURCE,
        }),
        fetchGuardianArticles({
          section: getGuardianCategory(category),
          page,
          "page-size": ITEMS_PER_SOURCE,
        }),
        fetchNYTArticles({
          fq: `news_desk:("${getNYTCategory(category)}")`,
          page: page - 1,
        }),
      ]);

      const articles: Article[] = [];

      // Process API responses and map articles
      if (newsApi.status === "fulfilled") {
        articles.push(...newsApi.value.articles.map(mapNewsApiToArticle));
      }
      if (guardian.status === "fulfilled") {
        articles.push(
          ...guardian.value.response.results.map(mapGuardianToArticle)
        );
      }
      if (nyt.status === "fulfilled") {
        articles.push(...nyt.value.response.docs.map(mapNYTToArticle));
      }

      // Sort and deduplicate articles
      const uniqueArticles = articles
        .sort(
          (a, b) =>
            new Date(b.timeAgo).getTime() - new Date(a.timeAgo).getTime()
        )
        .filter(
          (article, index, self) =>
            index === self.findIndex((a) => a.title === article.title)
        );

      const hasMore = page < 5 && uniqueArticles.length >= ITEMS_PER_SOURCE;

      return {
        articles: uniqueArticles,
        hasMore,
      };
    } catch (error) {
      console.error("Error fetching articles:", error);
      throw error;
    }
  },
};
// export const articleService = {
//   async fetchArticles(category: Category, page: number = 1): Promise<{ articles: Article[], hasMore: boolean }> {
//     const ITEMS_PER_SOURCE = 6;

//     try {
//       const [newsApi, guardian, nyt] = await Promise.allSettled([
//         fetchNewsArticles({
//           category: category.toLowerCase(),
//           page,
//           pageSize: ITEMS_PER_SOURCE
//         }),
//         fetchGuardianArticles({
//           section: getGuardianCategory(category),
//           page,
//           'page-size': ITEMS_PER_SOURCE
//         }),
//         fetchNYTArticles({
//           fq: `news_desk:("${getNYTCategory(category)}")`,
//           page: page - 1,
//         })
//       ]);

//       const articles = [];
//       let hasMore = false;

//       // Check if any source has more articles
//       if (newsApi.status === 'fulfilled') {
//         const newsArticles = newsApi.value.articles.map(mapNewsApiToArticle);
//         articles.push(...newsArticles);
//         hasMore = newsApi.value.articles.length === ITEMS_PER_SOURCE;
//       }

//       if (guardian.status === 'fulfilled') {
//         const guardianArticles = guardian.value.response.results.map(mapGuardianToArticle);
//         articles.push(...guardianArticles);
//         hasMore = hasMore || guardian.value.response.results.length === ITEMS_PER_SOURCE;
//       }

//       if (nyt.status === 'fulfilled') {
//         const nytArticles = nyt.value.response.docs.map(mapNYTToArticle);
//         articles.push(...nytArticles);
//         hasMore = hasMore || nyt.value.response.docs.length === ITEMS_PER_SOURCE;
//       }

//       return {
//         articles,
//         hasMore
//       };
//     } catch (error) {
//       console.error('Error fetching articles:', error);
//       throw error;
//     }
//   }
// };
