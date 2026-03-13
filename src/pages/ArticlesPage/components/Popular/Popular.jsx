import React, { useEffect } from "react";
import "./Popular.css";
import { useDispatch, useSelector } from "react-redux";
import Container from "../../../../components/Container/Container";
import { fetchArticles, setCurrentArticle, setCurrentPage } from "../../../../redux/articlesSlice";

import { Link } from "react-router-dom";

const Popular = () => {
  const dispatch = useDispatch();
  const { items, status, filter, currentPage, articlesPerPage } = useSelector((state) => state.articles);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchArticles());
    }
  }, [status, dispatch]);

  const filteredItems =
    filter === "Всі статті"
      ? items
      : items.filter((item) => item.category === filter);

  const sortedItems = [...filteredItems].sort(
    (a, b) => (b.rate || 0) - (a.rate || 0)
  );

  const totalPages = Math.ceil(sortedItems.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const currentArticles = sortedItems.slice(startIndex, endIndex);

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
              {currentArticles.map((article) => (
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
                      to={`/articles/${article._id?.$oid || article._id || article.id}`} 
                      className="popular-articles__button"
                      onClick={() => dispatch(setCurrentArticle(article))}
                    >
                      Переглянути статтю
                    </Link>
                  </div>
                </li>
              ))}
            </ul>

            {/* Пагинация */}
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  className="pagination__btn pagination__btn-prev"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  ← Попередня
                </button>

                <div className="pagination__numbers">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      className={`pagination__number ${currentPage === page ? "active" : ""}`}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  className="pagination__btn pagination__btn-next"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Наступна →
                </button>
              </div>
            )}
          </>
        )}
      </Container>
    </section>
  );
};

export default Popular;