import React, { useEffect } from "react";
import "./Popular.css";
import { useDispatch, useSelector } from "react-redux";
import Container from "../../../../components/Container/Container";
import { fetchArticles, setCurrentArticle, setCurrentPage, updateArticleSaves } from "../../../../redux/articlesSlice";
import { updateCurrentUser } from "../../../../redux/usersSlice";
import axios from "axios";
import { Link } from "react-router-dom";

const Popular = () => {
  const dispatch = useDispatch();
  const { items, status, filter, currentPage, articlesPerPage } = useSelector((state) => state.articles);
  const currentUser = useSelector((state) => state.users.currentUser);

  useEffect(() => {
    if (status === "idle") dispatch(fetchArticles());
  }, [status, dispatch]);

  const saveArticle = (article) => {
    if (!currentUser || !article) return;
    const uniqueId = article.db_article_id || article.articleId || article.id;

    const currentSaved = (currentUser.saved_art_ids || []);
    if (currentSaved.includes(uniqueId)) return;

    const updatedUser = {
      ...currentUser,
      saved_art_ids: [...currentSaved, uniqueId],
    };

    dispatch(updateCurrentUser(updatedUser));
    const newSaveCount = (article.saveCount || 0) + 1;
    dispatch(updateArticleSaves({ id: article.id, saveCount: newSaveCount }));
    axios.put(`https://696f45bda06046ce6185fca4.mockapi.io/users/${currentUser.id}`, updatedUser);
  };

  const removeArticle = (article) => {
    if (!currentUser || !article) return;
    const uniqueId = article.db_article_id || article.articleId || article.id;

    const updatedUser = {
      ...currentUser,
      saved_art_ids: (currentUser.saved_art_ids || []).filter(id => id !== uniqueId),
    };

    dispatch(updateCurrentUser(updatedUser));
    const newSaveCount = Math.max((article.saveCount || 0) - 1, 0);
    dispatch(updateArticleSaves({ id: article.id, saveCount: newSaveCount }));
    axios.put(`https://696f45bda06046ce6185fca4.mockapi.io/users/${currentUser.id}`, updatedUser);
  };

  const filteredItems = filter === "Всі статті" ? items : items.filter((item) => item.category === filter);
  const sortedItems = [...filteredItems].sort((a, b) => (b.saveCount || 0) - (a.saveCount || 0));

  const totalPages = Math.ceil(sortedItems.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const currentArticles = sortedItems.slice(startIndex, startIndex + articlesPerPage);

  const handlePageChange = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="popular-articles">
      <Container>
        {status === "loading" ? (
          <p>Завантаження...</p>
        ) : (
          <>
            <ul className="popular-articles__list">
              {currentArticles.map((article) => {
                const uniqueId = article.db_article_id || article.articleId || article.id;
                const isSaved = currentUser?.saved_art_ids?.includes(uniqueId);
                const isOwner = currentUser && String(article.ownerId) === String(currentUser.id);

                return (
                <li className="popular-articles__item" key={uniqueId}>
                  <img className="popular-articles__image" src={article.img} alt={article.title} />
                  <div className="popular-articles__content">
                    <span className="popular-articles__category">{article.category || "Категорія"}</span>
                    <h4 className="popular-articles__name">{article.title}</h4>
                    <p className="popular-articles__meta">
                      {article.date ? new Date(article.date).toLocaleDateString() : "Дата невідома"}
                      {" • "} {article.saveCount || 0}
                    </p>
                  </div>
                  <div className="popular-articles__actions">
                    <Link to={`/articles/${uniqueId}`} className="popular-articles__button" onClick={() => dispatch(setCurrentArticle(article))}>
                      Переглянути статтю
                    </Link>
                    {!isOwner && (
                      <button onClick={() => isSaved ? removeArticle(article) : saveArticle(article)} className={`popular-articles__save-btn ${isSaved ? 'saved' : ''}`}>
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
              )})}
            </ul>
            {totalPages > 1 && (
              <div className="pagination">
                <button className="pagination__btn pagination__btn-prev" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>← Попередня</button>
                <div className="pagination__numbers">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button key={page} className={`pagination__number ${currentPage === page ? "active" : ""}`} onClick={() => handlePageChange(page)}>{page}</button>
                  ))}
                </div>
                <button className="pagination__btn pagination__btn-next" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Наступна →</button>
              </div>
            )}
          </>
        )}
      </Container>
    </section>
  );
};

export default Popular;
