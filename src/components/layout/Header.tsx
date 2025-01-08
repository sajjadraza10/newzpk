import React, { useState } from "react";
import { Input, Button, Badge } from "antd";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import FilterModal from "../common/FilterModal";
import { Category, CategoryEnum } from "types/types";

interface HeaderProps {
  onCategoryChange: (category: Category) => void;
}
const navigationItems: Category[] = [
  CategoryEnum.NEWS,
  CategoryEnum.SPORTS,
  CategoryEnum.ENTERTAINMENT,
  CategoryEnum.TECHNOLOGY,
];

const Header: React.FC<HeaderProps> = ({ onCategoryChange }) => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState(0);
  const [activeCategory, setActiveCategory] = useState<Category>("NEWS");

  const handleCategoryChange = (category: Category): void => {
    setActiveCategory(category);
    onCategoryChange(category);
  };
  return (
    <header className="bg-[#1a1a1a] text-white sticky top-0 z-50 backdrop-blur-lg bg-opacity-90">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <a
            href="/"
            className="text-3xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent"
          >
            newsPK
          </a>
          <div className="flex items-center gap-4">
            <Badge count={activeFilters} offset={[-2, 2]}>
              <Button
                type="text"
                icon={<FilterOutlined />}
                onClick={() => setIsFilterModalOpen(true)}
                className="text-white hover:text-red-500 transition-colors"
              >
                Filters
              </Button>
            </Badge>
            <Input
              prefix={<SearchOutlined className="text-gray-400" />}
              placeholder="Search Flipboard"
              className="w-48 md:w-64 bg-[#333] hover:bg-[#404040] transition-colors"
              bordered={false}
            />
          </div>
        </div>
        <nav className="flex space-x-8 py-4 text-sm overflow-x-auto scrollbar-hide">
          {navigationItems.map((item) => (
            <button
              key={item}
              onClick={() => handleCategoryChange(item)}
              className={`nav-link text-gray-300 hover:text-white whitespace-nowrap transition-colors ${
                activeCategory === item ? "text-white font-semibold" : ""
              }`}
            >
              {item}
            </button>
          ))}
        </nav>
      </div>
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApply={(count) => setActiveFilters(count)}
      />
    </header>
  );
};

export default Header;
