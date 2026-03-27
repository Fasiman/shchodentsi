import { useEffect } from "react";


import ArticleDetails from "./components/ArticleDetails/ArticleDetails";
import Popular from "./components/Popular/Popular";

const ArticlesPage = () => {

  useEffect(() => {
    document.title = "Щоденцi | Статтi";
  }, []);
  return (
    <main>
      <ArticleDetails />
      <Popular />
    </main>
  );
};

export default ArticlesPage;
