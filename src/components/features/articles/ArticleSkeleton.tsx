import React from 'react';
import { Card } from 'antd';

const ArticleSkeleton: React.FC<{ count: number }> = ({ count }) => (
  <>
    {Array(count).fill(null).map((_, index) => (
      <Card key={index} className="bg-[#1a1a1a] animate-pulse">
        {/* Source skeleton */}
        <div className="flex gap-3 mb-4">
          <div className="w-8 h-8 bg-gray-700 rounded-lg" />
          <div className="space-y-2">
            <div className="h-4 w-24 bg-gray-700 rounded" />
            <div className="h-3 w-32 bg-gray-700 rounded" />
          </div>
        </div>
        
        {/* Image skeleton */}
        <div className="aspect-[16/9] bg-gray-700 rounded-xl mb-4" />
        
        {/* Content skeleton */}
        <div className="space-y-4">
          <div className="h-6 bg-gray-700 rounded w-3/4" />
          <div className="h-4 bg-gray-700 rounded w-1/2" />
        </div>
      </Card>
    ))}
  </>
);

export default ArticleSkeleton;

