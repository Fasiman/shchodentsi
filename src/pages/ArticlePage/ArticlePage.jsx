import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ArticleDetails from "./components/ArticleDetails/ArticleDetails";
import HabbitsArticles from "./components/HabbitsArticles/HabbitsArticles";
import { fetchUsers } from "../../redux/usersSlice";

const ArticlePage = () => {
  const dispatch = useDispatch();
  const { currentArticle } = useSelector((state) => state.articles);
  const { status: usersStatus } = useSelector((state) => state.users);

  useEffect(() => {
    if (usersStatus === "idle") {
      dispatch(fetchUsers());
    }
  }, [dispatch, usersStatus]);

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