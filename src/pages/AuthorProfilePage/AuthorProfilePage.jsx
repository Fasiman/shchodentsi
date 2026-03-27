import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../redux/usersSlice";
import { fetchArticles, setCurrentArticle } from "../../redux/articlesSlice";
import Container from "../../components/Container/Container";
import "./AuthorProfilePage.css";
import testImage from "../HomePage/components/Pupular/images/testimage.png";

const AuthorProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items: users, status: usersStatus } = useSelector((state) => state.users);
  const { items: articles, status: articlesStatus } = useSelector((state) => state.articles);

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUsers());
    }
    if (articles.length === 0) {
      dispatch(fetchArticles());
    }
  }, [dispatch, users.length, articles.length]);

  const user = users.find((u) => String(u.id) === String(id));

  useEffect(() => {
    if (user) {
      document.title = `Щоденці | ${user.name}`;
    }
  }, [user]);

  if (usersStatus === "loading" || articlesStatus === "loading") {
    return (
      <main>
        <Container>
          <p>Завантаження...</p>
        </Container>
      </main>
    );
  }

  if (!user) {
    return (
      <main>
        <Container>
          <p>Автор не знайдений</p>
          <button onClick={() => navigate("/authors")} style={{ marginTop: "20px", padding: "10px 20px", cursor: "pointer" }}>
            Повернутися до списку авторів
          </button>
        </Container>
      </main>
    );
  }

  const userArticles = articles.filter(article => String(article.ownerId) === String(user.id));

  return (
    <main>
      <section className="author-profile">
        <Container>
          <div className="author-profile__header">
            <img
              className="author-profile__avatar"
              src={user.avatar}
              alt={user.name}
            />
            <div className="author-profile__info">
              <h1 className="author-profile__name">{user.name}</h1>
              <p className="author-profile__stats">
                <span>Статей: {userArticles.length}</span>
                <span>Збережень: {user.saved || 0}</span>
              </p>
            </div>
          </div>

          <div className="author-profile__content">
            <h2 className="author-profile__subtitle">Статті автора</h2>
            {userArticles.length > 0 ? (
              <ul className="author-profile__articles-list">
                {userArticles.map((article) => {
                  const articleIdentifier = article.db_article_id || article.articleId || article.id || article._id;
                  return (
                    <li className="author-profile__article-item" key={articleIdentifier}>
                      <img
                        src={article.img || testImage}
                        className="author-profile__article-image"
                        alt={article.title}
                      />
                      <div className="author-profile__article-info">
                        <span className="author-profile__article-category">
                          {article.category || "Категорія"}
                        </span>
                        <h4 className="author-profile__article-title">{article.title}</h4>
                        <div className="author-profile__article-footer">
                           <p className="author-profile__article-date">
                            {article.date ? new Date(article.date).toLocaleDateString() : "Дата невідома"}
                          </p>
                          <Link
                            to={`/articles/${articleIdentifier}`}
                            className="author-profile__article-link"
                            onClick={() => dispatch(setCurrentArticle(article))}
                          >
                            Читати далі
                          </Link>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="no-data-box">
                <h3 className="no-data-box__title">Цей користувач ще не публікував статей</h3>
                <p className="no-data-box__text">Ви можете переглянути цікаві історії інших авторів.</p>
                <Link to="/articles" className="no-data-box__button">
                  Перейти до всіх статей
                </Link>
              </div>
            )}
          </div>
        </Container>
      </section>
    </main>
  );
};

export default AuthorProfilePage;