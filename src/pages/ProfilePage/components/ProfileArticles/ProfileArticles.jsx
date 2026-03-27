import Container from "../../../../components/Container/Container";
import "./ProfileArticles.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles, setCurrentArticle } from "../../../../redux/articlesSlice";
import { Link } from "react-router-dom";

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

  const displayedArticles = activeTab === 'my'
    ? items.filter(article => String(article.ownerId) === String(currentUser?.id))
    : activeTab === 'saved'
    ? items.filter(article => {
        const uniqueId = article.db_article_id || article.articleId || article.id;
        return currentUser?.saved_art_ids?.includes(uniqueId);
      })
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
        
        {displayedArticles.length > 0 ? (
          <ul className="profile-articles__list">
            {displayedArticles.map((article) => {
               const uniqueId = article.db_article_id || article.articleId || article.id;
               return (
              <li className="profile-articles__item" key={uniqueId}>
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
                    {article.saveCount || 0}
                  </p>
                </div>
                <div className="profile-articles__actions">
                  <Link
                    to={`/articles/${uniqueId}`}
                    className="profile-articles__button"
                    onClick={() => dispatch(setCurrentArticle(article))}
                  >
                    Переглянути статтю
                  </Link>
                </div>
              </li>
            )})}
          </ul>
        ) : (
          <div className="no-data-box">
            <h3 className="no-data-box__title">
              {activeTab === 'saved' ? "У вас немає збережених статтей" : "Ви ще не написали жодної статті"}
            </h3>
            <p className="no-data-box__text">
              {activeTab === 'saved' 
                ? "Зберігайте цікаві історії, щоб вони завжди були під рукою." 
                : "Почніть ділитися своїми думками з іншими прямо зараз!"}
            </p>
          </div>
        )}
      </Container>
    </section>
  );
};

export default ProfileArticles;