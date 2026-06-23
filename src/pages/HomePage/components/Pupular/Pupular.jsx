import React, { useEffect } from "react";
import saved from "./images/logo.svg";
import testImage from "./images/testimage.png";
import "./Popular.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchArticles,
  setCurrentArticle,
  updateArticleSaves,
} from "../../../../redux/articlesSlice";
import { updateCurrentUser } from "../../../../redux/usersSlice";
import axios from "axios";
import { Link } from "react-router-dom";

const Popular = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.articles);
  const currentUser = useSelector((state) => state.users.currentUser);
console.log(items)
  useEffect(() => {
    if (status === "idle") dispatch(fetchArticles());
  }, [status, dispatch]);

  const saveArticle = (article) => {
    if (!currentUser || !article) return;
    const uniqueId = article.id || article.db_article_id || article.articleId;

    const currentSaved = (currentUser.saved_art_ids || []);
    if (currentSaved.includes(uniqueId)) return;

    const updatedUser = {
      ...currentUser,
      saved_art_ids: [...currentSaved, uniqueId],
    };

    dispatch(updateCurrentUser(updatedUser));
    const newSaveCount = (article.saveCount || 0) + 1;
    dispatch(updateArticleSaves({ id: article.id, saveCount: newSaveCount }));
    axios.put(`http://localhost:1487/user/${currentUser.id}`, updatedUser);
  };

  const removeArticle = (article) => {
    if (!currentUser || !article) return;
    const uniqueId = article.id || article.db_article_id || article.articleId;

    const updatedUser = {
      ...currentUser,
      saved_art_ids: (currentUser.saved_art_ids || []).filter(id => id !== uniqueId),
    };

    dispatch(updateCurrentUser(updatedUser));
    const newSaveCount = Math.max((article.saveCount || 0) - 1, 0);
    dispatch(updateArticleSaves({ id: article.id, saveCount: newSaveCount }));
    axios.put(`http://localhost:1487/user/${currentUser.id}`, updatedUser);
  };

  const popularArticles = [...items].sort((a, b) => (b.saveCount || 0) - (a.saveCount || 0)).slice(0, 3);

  return (
    <section className="popular">
      <h2 className="popular__title">Популярні статті</h2>
      <ul className="popular__list">
        {popularArticles.map((article) => {
          const uniqueId = article.id || article.db_article_id || article.articleId;
          const isSaved = currentUser?.saved_art_ids?.includes(uniqueId);
          const isOwner = currentUser && String(article.ownerId) === String(currentUser.id);

          return (
            <li className="popular__item" key={uniqueId}>
              <img src={article.img || testImage} className="popular__image" alt={article.title} />
              <div className="popular__box">
                <span className="popular__type">{article.category || "Категорія"}</span>
                <h4 className="popular__name">{article.title}</h4>
                <p className="popular__data">
                  {article.date ? new Date(article.date).toLocaleDateString() : "Дата невідома"}
                  {" • "} {article.saveCount || 0}
                  <img className="popular__icon" src={saved} alt="icon" />
                </p>
              </div>
              <div className="popular__buttons">
                <Link to={`/articles/${uniqueId}`} className="popular__more" onClick={() => dispatch(setCurrentArticle(article))}>
                  Переглянути статтю
                </Link>
                {!isOwner && (
                  <button
                    onClick={() => isSaved ? removeArticle(article) : saveArticle(article)}
                    className={`popular__save ${isSaved ? "popular__saved" : ""}`}
                  >
                    <svg
                      width="15"
                      height="18"
                      viewBox="0 0 15 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.1495 15.448L2.381 17.488C1.81333 17.7327 1.27458 17.6867 0.76475 17.3502C0.254917 17.0137 0 16.5376 0 15.9218V1.70925C0 1.24758 0.168916 0.847332 0.50675 0.508499C0.844416 0.169499 1.24325 0 1.70325 0H12.5957C13.0574 0 13.4577 0.169499 13.7965 0.508499C14.1355 0.847332 14.305 1.24758 14.305 1.70925V15.9218C14.305 16.5376 14.0491 17.0137 13.5372 17.3502C13.0254 17.6867 12.4857 17.7327 11.918 17.488L7.1495 15.448ZM7.1495 13.6257L12.5957 15.9218V1.70925H1.70325V15.9218L7.1495 13.6257ZM7.1495 1.70925H1.70325H12.5957H7.1495Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Popular;
