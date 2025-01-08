import React, { useState } from 'react';
import { ConfigProvider, theme } from 'antd';
import Header from './components/layout/Header';
import ArticleList from './components/features/articles/ArticleList';
import Footer from './components/layout/Footer';
import './styles/globals.css';


type Category = "NEWS" | "SPORTS" | "ENTERTAINMENT" | "TECHNOLOGY";
function App() {
  const [currentCategory, setCurrentCategory] = useState<Category>("NEWS");

  const handleCategoryChange = (category: Category): void => {
    setCurrentCategory(category);
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#ff1a1a',
          borderRadius: 8,
          colorBgContainer: '#1a1a1a',
          colorBgElevated: '#262626',
          fontFamily: 'Inter, sans-serif',
        },
      }}
    >
      <div className="min-h-screen bg-black flex flex-col">
        <Header onCategoryChange={handleCategoryChange} />
        <main className="container mx-auto px-4 py-8 flex-grow">
          <ArticleList category={currentCategory} />
        </main>
        <Footer />
      </div>
    </ConfigProvider>
  );
}

export default App;

