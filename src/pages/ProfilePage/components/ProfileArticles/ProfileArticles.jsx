import Container from "../../../../components/Container/Container";
import "./ProfileArticles.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles, setCurrentArticle } from "../../../../redux/articlesSlice";
import { updateCurrentUser } from "../../../../redux/usersSlice";
import axios from "axios";
import { Link } from "react-router-dom";

import saved from "../../../HomePage/components/Pupular/images/logo.svg"

const ProfileArticles = () => {
  const [activeTab, setActiveTab] = useState('saved');
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.articles);
  const { currentUser } = useSelector((state) => state.users);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchArticles());
    }
  }, [status, dispatch]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const removeArticle = (articleId) => {
    if (!currentUser) {
      return;
    }
    const updatedUser = {
      ...currentUser,
      savedArticles: currentUser.savedArticles.filter(sa => sa.id !== articleId),
      saved: Math.max((currentUser.saved || 0) - 1, 0)
    };
    axios.patch(`https://696f45bda06046ce6185fca4.mockapi.io/users/${currentUser.id}`, {
      savedArticles: updatedUser.savedArticles,
      saved: updatedUser.saved,
    })
      .then((response) => {
        console.log("Article removed:", response.data);
        dispatch(updateCurrentUser(updatedUser));
      })
      .catch((error) => {
        console.error("Error removing article:", error);
      });
  };

  const displayedArticles = activeTab === 'my'
    ? items.filter(article => article.ownerId === currentUser?.id)
    : activeTab === 'saved'
    ? items.filter(article => currentUser?.savedArticles?.some(sa => sa.id === (article._id?.$oid || article._id)))
    : [];

  return (
    <section className="profile-articles">
      <Container>
        <div className="profile-articles__switch">
          <button
            type="button"
            className={activeTab === 'saved' ? "profile-articles__active" : "profile-articles__variant"}
            onClick={() => handleTabChange('saved')}
          >
            Збережені статті
          </button>
          <button
            type="button"
            className={activeTab === 'my' ? "profile-articles__active" : "profile-articles__variant"}
            onClick={() => handleTabChange('my')}
          >
            Мої статті
          </button>
        </div>
        <ul className="profile-articles__list">
          {displayedArticles.map((article) => (
            <li className="profile-articles__item" key={article._id?.$oid || article._id || article.id}>
              <img
                className="profile-articles__image"
                src={article.img}
                alt={article.title}
              />
              <div className="profile-articles__content">
                <span className="profile-articles__category">
                  {article.category || "Категорія"}
                </span>
                <h4 className="profile-articles__name">{article.title}</h4>
                <p className="profile-articles__meta">
                  {article.date
                    ? new Date(article.date).toLocaleDateString()
                    : "Дата невідома"}
                  {" • "}
                  {article.rate || 0}
                </p>
              </div>
              <div className="profile-articles__actions">
                <Link
                  to={`/articles/${article._id?.$oid || article._id || article.id}`}
                  className="profile-articles__button"
                  onClick={() => dispatch(setCurrentArticle(article))}
                >
                  Переглянути статтю
                </Link>
                {activeTab === 'saved' && (
                  <button
                    className="profile-articles__remove"
                    onClick={() => removeArticle(article._id?.$oid || article._id || article.id)}
                  >
                    <img src={saved} alt="remove" />
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};

export default ProfileArticles;
