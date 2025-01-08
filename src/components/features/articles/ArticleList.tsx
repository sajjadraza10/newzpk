// src/components/features/articles/ArticleList/index.js
import React from 'react';
import { Button } from 'antd';
import ArticleCard from './ArticleCard';
import ArticleSkeleton from './ArticleSkeleton';
import { useArticles } from '../../../hooks/useArticles';
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';
import { Category } from '../../../types/types';


interface ArticleListProps {
  category: Category;
}

export const ArticleList: React.FC<ArticleListProps> = ({ category }) => {
  const { articles, loading, categoryLoading, error, loadMore } = useArticles(category);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryLoading ? (
          Array(6).fill(null).map((_, index) => (
            <ArticleSkeleton key={index} />
          ))
        ) : (
          articles.map((article) => (
            <ArticleCard key={article.title} {...article} />
          ))
        )}
      </div>
      <div className="flex justify-center mt-8">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <Button 
            type="primary" 
            danger
            size="large"
            className="px-8 h-10 font-medium hover:scale-105 transition-transform"
            onClick={loadMore}
          >
            Read more
          </Button>
        )}
      </div>
    </div>
  );
};

export default ArticleList;