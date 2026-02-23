import React, { useEffect } from "react";
import "./Popular.css";
import { useDispatch, useSelector } from "react-redux";
import Container from "../../../../components/Container/Container";
import { fetchArticles, setCurrentArticle } from "../../../../redux/articlesSlice";

import { Link } from "react-router-dom";

const Popular = () => {
  const dispatch = useDispatch();
  const { items, status, filter } = useSelector((state) => state.articles);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchArticles());
    }
  }, [status, dispatch]);

  const filteredItems =
    filter === "Всі статті"
      ? items
      : items.filter((item) => item.category === filter);

  const popularArticles = [...filteredItems]
    .sort((a, b) => (b.rate || 0) - (a.rate || 0))
    .slice(0, 9);

  return (
    <section className="popular-articles">
      <Container>
        <ul className="popular-articles__list">
          {popularArticles.map((article) => (
            <li
              className="popular-articles__item"
              key={article._id?.$oid || article._id || article.id}
            >
              <img
                className="popular-articles__image"
                src={article.img}
                alt={article.title}
              />
              <div className="popular-articles__content">
                <span className="popular-articles__category">
                  {article.category || "Категорія"}
                </span>

                <h4 className="popular-articles__name">{article.title}</h4>

                <p className="popular-articles__meta">
                  {article.date
                    ? new Date(article.date).toLocaleDateString()
                    : "Дата невідома"}
                  {" • "}
                  {article.rate || 0}
                </p>
              </div>

              <div className="popular-articles__actions">
                <Link 
                  to={`/articles/${article._id.$oid}`} 
                  className="popular-articles__button"
                  onClick={() => dispatch(setCurrentArticle(article))}
                >
                  Переглянути статтю
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};

export default Popular;