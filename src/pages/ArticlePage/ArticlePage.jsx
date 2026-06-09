import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ArticleDetails from "./components/ArticleDetails/ArticleDetails";
import HabbitsArticles from "./components/HabbitsArticles/HabbitsArticles";
import { fetchUsers } from "../../redux/usersSlice";
import { fetchArticleById } from "../../redux/articlesSlice";

const ArticlePage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { currentArticle, status: articleStatus } = useSelector((state) => state.articles);
  const { status: usersStatus } = useSelector((state) => state.users);

  useEffect(() => {
    if (usersStatus === "idle") {
      dispatch(fetchUsers());
    }
  }, [dispatch, usersStatus]);

  useEffect(() => {
    if (!id) {
      return;
    }

    const isCurrentArticleForId =
      currentArticle &&
      (String(currentArticle.id) === String(id) ||
        String(currentArticle.db_article_id) === String(id) ||
        String(currentArticle.articleId) === String(id) ||
        String(currentArticle._id) === String(id));

    if (!isCurrentArticleForId) {
      dispatch(fetchArticleById(id));
    }
  }, [dispatch, id, currentArticle]);

  if (articleStatus === "loading") {
    return <div>Завантаження...</div>;
  }

  if (!currentArticle) {
    return <div>Статтю не знайдено. Будь ласка, поверніться до списку статей і спробуйте ще раз.</div>;
  }

  return (
    <main>
      <ArticleDetails article={currentArticle} />
      <HabbitsArticles article={currentArticle} />
    </main>
  );
};

export default ArticlePage;