import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from "../../redux/articlesSlice";

const ArticlesPage = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.articles);

  useEffect(() => {
    document.title = "Щоденці | Статті";
    if (status === "idle") {
      dispatch(fetchArticles());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <main><h1>Loading...</h1></main>;
  }

  if (status === "failed") {
    return <main><h1>Error: {error}</h1></main>;
  }

  return (
    <main>
      <h1>Articles</h1>
      <ul>
        {items.map((article) => (
          <li key={article.id}>
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            {/* Добавьте другие поля, которые приходят с API */}
          </li>
        ))}
      </ul>
    </main>
  );
};

export default ArticlesPage;