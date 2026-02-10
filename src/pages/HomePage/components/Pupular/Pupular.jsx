import React, { useEffect } from "react";
import saved from "./images/logo.svg";
import testImage from "./images/testimage.png";
import "./Popular.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from "../../../../redux/articlesSlice";

const Popular = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.articles);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchArticles());
    }
  }, [status, dispatch]);

  // 🔥 Сортировка по rate (популярность)
  const popularArticles = [...items]
    .sort((a, b) => (b.rate || 0) - (a.rate || 0))
    .slice(0, 3);

  return (
    <section className="popular">
        <h2 className="popular__title">Популярні статті</h2>

        <ul className="popular__list">
          {popularArticles.map((article) => (
            <li
              className="popular__item"
              key={article._id?.$oid || article._id}
            >
              <img
                src={article.img || testImage}
                className="popular__image"
                alt={article.title}
              />

              <div className="popular__box">
                <span className="popular__type">
                  {article.category || "Категорія"}
                </span>

                <h4 className="popular__name">{article.title}</h4>

                <p className="popular__data">
                  {article.date
                    ? new Date(article.date).toLocaleDateString()
                    : "Дата невідома"}
                  {" • "}
                  {article.rate || 0}
                  <img
                    className="popular__icon"
                    src={saved}
                    alt="icon"
                  />
                </p>

               
              </div>
               <div className="popular__buttons">
                  <button className="popular__more">
                    Переглянути статтю
                  </button>

                  <button className="popular__save">
                    <img className="popular__save-icon" src={saved} alt="icon" />
                  </button>
                </div>
            </li>
          ))}
        </ul>
    </section>
  );
};

export default Popular;
