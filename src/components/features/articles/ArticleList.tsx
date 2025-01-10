import React, { memo, useCallback, useMemo } from "react";
import { Button } from "antd";
import ArticleCard from "./ArticleCard";
import ArticleSkeleton from "./ArticleSkeleton";
import { useArticles } from "../../../hooks/useArticles";
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";
import { Article, CategoryEnum } from "../../../types/types";

interface ArticleListProps {
  category: CategoryEnum;
}

const ArticleList: React.FC<ArticleListProps> = memo(({ category }) => {
  const { articles, loading, categoryLoading, loadMore } = useArticles(
    category === CategoryEnum.CUSTOMIZE_FEED ? CategoryEnum.NEWS : category
  );

  const handleLoadMore = useCallback(() => {
    if (!loading) {
      loadMore();
    }
  }, [loading, loadMore]);

  const renderedArticles = useMemo(
    () =>
      articles.map((article: Article) => (
        <ArticleCard key={article.id} {...article} />
      )),
    [articles]
  );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Initial loading */}
        {categoryLoading && <ArticleSkeleton count={6} />}

        {/* Articles grid */}
        {!categoryLoading &&
          articles.map((article) => (
            <ArticleCard key={article.id} {...article} />
          ))}

        {/* No results */}
        {!loading && articles.length === 0 && (
          <div className="col-span-3 text-center py-8">No articles found</div>
        )}
      </div>

      {/* Load more button */}
      {articles.length > 0 && (
        <div className="flex justify-center mt-8">
          <Button
            onClick={loadMore}
            disabled={loading}
            type="primary"
            danger
            size="large"
          >
            {loading ? <LoadingSpinner /> : 'Read more'}
          </Button>
        </div>
      )}
    </div>
  );
});

export default ArticleList;
