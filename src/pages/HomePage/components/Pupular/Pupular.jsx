import React, { useEffect } from "react";
import saved from "./images/logo.svg";
import testImage from "./images/testimage.png";
import "./Popular.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles, setCurrentArticle } from "../../../../redux/articlesSlice";
import { updateCurrentUser } from "../../../../redux/usersSlice";
import axios from "axios";
import { Link } from "react-router-dom";

const Popular = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.articles);
  const currentUser = useSelector((state) => state.users.currentUser);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchArticles());
    }
  }, [status, dispatch]);

  const saveArticle = (event) => {
    const articleId = event.target.id || event.target.closest('button').id;
    if (!currentUser) {
      return;
    }
    const savedArticle = { id: articleId };
    const updatedUser = {
      ...currentUser,
      savedArticles: [...(currentUser.savedArticles || []), savedArticle],
      saved: (currentUser.saved || 0) + 1
    };
    axios.put(`https://696f45bda06046ce6185fca4.mockapi.io/users/${currentUser.id}`, updatedUser)
      .then((response) => {
        console.log("Article saved:", response.data);
        dispatch(updateCurrentUser(updatedUser));
      })
      .catch((error) => {
        console.error("Error saving article:", error);
      });
  };

  const removeArticle = (event) => {
    const articleId = event.target.id || event.target.closest('button').id;
    if (!currentUser) {
      return;
    }
    const updatedUser = {
      ...currentUser,
      savedArticles: currentUser.savedArticles.filter(sa => sa.id !== articleId),
      saved: Math.max((currentUser.saved || 0) - 1, 0)
    };
    axios.put(`https://696f45bda06046ce6185fca4.mockapi.io/users/${currentUser.id}`, updatedUser)
      .then((response) => {
        console.log("Article removed:", response.data);
        dispatch(updateCurrentUser(updatedUser));
      })
      .catch((error) => {
        console.error("Error removing article:", error);
      });
  };
 

  const popularArticles = [...items]
    .sort((a, b) => (b.rate || 0) - (a.rate || 0))
    .slice(0, 3);

  return (
    <section className="popular">
        <h2 className="popular__title">Популярні статті</h2>

          {popularArticles.map((article) => {
            const isSaved = currentUser?.savedArticles?.some(sa => sa.id === (article._id?.$oid || article._id));
            return (
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
                  <Link
                    to={`/articles/${article._id.$oid}`}
                    className="popular__more"
                    onClick={() => dispatch(setCurrentArticle(article))}
                  >
                    Переглянути статтю
                  </Link>

                  <button onClick={isSaved ? removeArticle : saveArticle} id={article._id.$oid} className={`popular__save ${isSaved ? 'popular__saved' : ''}`}>
                    <img className="popular__save-icon" src={saved} alt={isSaved ? "remove" : "save"} />
                  </button>
                </div>
            </li>
            );
          })}
    </section>
  );
};

export default Popular;