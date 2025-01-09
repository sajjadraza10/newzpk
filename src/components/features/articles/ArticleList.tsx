import React, { memo, useCallback, useMemo } from 'react';
import { Button } from "antd";
import ArticleCard from "./ArticleCard";
import ArticleSkeleton from "./ArticleSkeleton";
import { useArticles } from "../../../hooks/useArticles";
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";
import { Article, CategoryEnum } from "../../../types/types";

interface ArticleListProps {
  category: CategoryEnum;
}

// const ArticleList: React.FC<ArticleListProps> = memo(({ category }) => {
//   const { articles, loading, error, loadMore } = useArticles(
//     category === CategoryEnum.CUSTOMIZE_FEED ? CategoryEnum.NEWS : category
//   );

//   const handleLoadMore = useCallback(() => {
//     if (!loading) {
//       loadMore();
//     }
//   }, [loading, loadMore]);

//   const renderedArticles = useMemo(() => 
//     articles.map((article: Article) => (
//       <ArticleCard key={article.id} {...article} />
//     ))
//   , [articles]);

//   return (
//     <div className="max-w-6xl mx-auto">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {loading && articles.length === 0 ? (
//           <ArticleSkeleton count={6} />
//         ) : articles.length > 0 ? (
//           renderedArticles
//         ) : (
//           <div className="col-span-3 text-center py-8 text-gray-400">
//             No articles found
//           </div>
//         )}
//       </div>

//       {articles.length > 0 && (
//         <div className="flex justify-center mt-8">
//           <Button
//             type="primary"
//             danger
//             size="large"
//             onClick={handleLoadMore}
//             disabled={loading}
//           >
//             {loading ? <LoadingSpinner /> : 'Read more'}
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// });

const ArticleList: React.FC<ArticleListProps> = memo(({ category }) => {
  const { articles, loading, error, loadMore } = useArticles(
    category === CategoryEnum.CUSTOMIZE_FEED ? CategoryEnum.NEWS : category
  );

  const handleLoadMore = useCallback(() => {
    if (!loading) {
      loadMore();
    }
  }, [loading, loadMore]);

  const renderedArticles = useMemo(() => 
    articles.map((article: Article) => (
      <ArticleCard key={article.id} {...article} />
    ))
  , [articles]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading && articles.length === 0 ? (
          <ArticleSkeleton count={6} />
        ) : articles.length > 0 ? (
          renderedArticles
        ) : (
          <div className="col-span-3 text-center py-8 text-gray-400">
            No articles found
          </div>
        )}
      </div>

      {articles.length > 0 && (
        <div className="flex justify-center mt-8">
          <Button
            type="primary"
            danger
            size="large"
            onClick={handleLoadMore}
            disabled={loading}
          >
            {loading ? <LoadingSpinner /> : 'Read more'}
          </Button>
        </div>
      )}
    </div>
  );
});

export default ArticleList;