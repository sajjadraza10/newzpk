import React, { useState } from "react";
import { Button, Space, Skeleton } from "antd";
import { Card as AntCard } from "antd";
import { Image } from "antd";
import {
  MessageOutlined,
  HeartOutlined,
  ShareAltOutlined,
  DownloadOutlined,
} from "@ant-design/icons";

import { Article } from "types/types";

function ArticleCard({
  title,
  source,
  author,
  timeAgo,
  imageUrl,
  likes,
  comments,
  shares,
}: Article) {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <AntCard
      className="bg-[#1a1a1a] border-none overflow-hidden"
      bodyStyle={{ padding: "24px" }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-semibold">
          {source[0]}
        </div>
        <div>
          <div className="text-white text-sm font-medium">{source}</div>
          <div className="text-gray-400 text-xs">flipped into Business</div>
        </div>
      </div>
      <div className="relative aspect-[16/9] mb-4 overflow-hidden rounded-xl">
        <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
          {imageLoading && (
            <div className="animate-pulse bg-gray-700 w-full h-full" />
          )}
        </div>
        <Image
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          loading="lazy"
          preview={false}
          placeholder={
            <div className="animate-pulse bg-gray-700 w-full h-full" />
          }
        />
      </div>
      <h2 className="text-white text-lg font-semibold mb-2 line-clamp-2 hover:text-red-500 transition-colors cursor-pointer">
        {title}
      </h2>
      <div className="text-gray-400 text-sm mb-4 flex items-center gap-2">
        <span>{source}</span>
        <span className="w-1 h-1 rounded-full bg-gray-400" />
        <span>{author}</span>
        <span className="w-1 h-1 rounded-full bg-gray-400" />
        <span>{timeAgo}</span>
      </div>
      <Space className="w-full justify-between text-gray-400">
        <Space size="large">
          <Button
            type="text"
            icon={<HeartOutlined />}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            {likes}
          </Button>
          <Button
            type="text"
            icon={<MessageOutlined />}
            className="text-gray-400 hover:text-blue-500 transition-colors"
          >
            {comments}
          </Button>
          <Button
            type="text"
            icon={<ShareAltOutlined />}
            className="text-gray-400 hover:text-green-500 transition-colors"
          >
            {shares}
          </Button>
        </Space>
        <Button
          type="text"
          icon={<DownloadOutlined />}
          className="text-gray-400 hover:text-purple-500 transition-colors"
        />
      </Space>
    </AntCard>
  );
}

export default ArticleCard;
