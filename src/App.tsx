import { CategoryEnum } from "./types/types";
import Header from "./components/layout/Header";
import ArticleList from "./components/features/articles/ArticleList";
import Footer from "./components/layout/Footer";
import { ConfigProvider, theme } from "antd";
import "./styles/globals.css";
import { useEffect, useState } from "react";
import { testAPIs } from './utils/testAPIs';



function App() {
  const [currentCategory, setCurrentCategory] = useState<CategoryEnum>(CategoryEnum.NEWS);

  const handleCategoryChange = (category: CategoryEnum): void => {
    setCurrentCategory(category);
  };

  return (
    <ConfigProvider theme={{
      algorithm: theme.darkAlgorithm,
      token: {
        colorPrimary: "#ff1a1a",
        borderRadius: 8,
        colorBgContainer: "#1a1a1a",
        colorBgElevated: "#262626",
        fontFamily: "Inter, sans-serif",
      },
    }}>
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
