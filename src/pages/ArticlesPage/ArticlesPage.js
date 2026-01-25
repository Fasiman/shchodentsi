import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from "../../redux/articlesSlice";

const ArticlesPage = () => {
  const dispatch = useDispatch();

  // Получаем нужные данные из Redux-стейта
  const { items, status, error } = useSelector((state) => state.articles);

  useEffect(() => {
    // Загружаем статьи, только если они еще не были загружены
    if (status === "idle") {
      dispatch(fetchArticles());
    }
    if (status === "succeeded") {
      console.log("Статьи из Redux state:", items);
    }
  }, [status, dispatch]);

  // Отображаем разные состояния UI в зависимости от статуса загрузки
  if (status === "loading") {
    return <div>Загрузка статей...</div>;
  }

  if (status === "failed") {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <div>
      <h1>Статьи</h1>
      <ul>
        {items.map((article) => (
          <li key={article.id}>{article.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ArticlesPage;