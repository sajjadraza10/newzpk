import React from 'react';
import { Card, Skeleton } from 'antd';

function ArticleSkeleton() {
  return (
    <Card className="bg-[#1a1a1a] border-none overflow-hidden" bodyStyle={{ padding: '24px' }}>
      <Skeleton.Avatar active size={32} className="mb-4" />
      <Skeleton.Input active size="small" className="mb-4 w-1/3" />
      <div className="aspect-[16/9] mb-4 bg-gray-800 rounded-xl" />
      <Skeleton active paragraph={{ rows: 2 }} />
      <div className="flex justify-between mt-4">
        <Skeleton.Button active size="small" className="w-16" />
        <Skeleton.Button active size="small" className="w-16" />
        <Skeleton.Button active size="small" className="w-16" />
      </div>
    </Card>
  );
}

export default ArticleSkeleton;

