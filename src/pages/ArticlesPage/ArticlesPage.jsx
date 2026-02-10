import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from "../../redux/articlesSlice";

import ArticleDetails from "./components/ArticleDetails/ArticleDetails";
import Popular from "./components/Popular/Popular";

const ArticlesPage = () => {
  return (
    <main>
      <ArticleDetails />
      <Popular />
    </main>
  );
};

export default ArticlesPage;
