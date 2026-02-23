import { useSelector } from "react-redux";
import ArticleDetails from "./components/ArticleDetails/ArticleDetails";
import HabbitsArticles from "./components/HabbitsArticles/HabbitsArticles";

const ArticlePage = () => {
  const { currentArticle } = useSelector((state) => state.articles);

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