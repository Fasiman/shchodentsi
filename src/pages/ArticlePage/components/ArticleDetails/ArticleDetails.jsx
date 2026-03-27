import Container from "../../../../components/Container/Container";
import "./ArticleDetails.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import placeholder from "../../images/placeholder.png";

const ArticleDetails = ({ article }) => {
  const { items: users } = useSelector((state) => state.users);
  
  const foundUser = users.find((user) => user.id === article.ownerId);
  const authorName = article.name || (foundUser ? foundUser.name : "Анонім");
  const authorId = article.ownerId || (foundUser ? foundUser.id : null);

  return (
    <section className="article-details">
      <Container>
        <div className="article-details__box">
          <h1 className="article-details__title">
            {article.title}
          </h1>
          <p className="article-details__author">
            Автор статті:{" "}
            {authorId ? (
              <Link to={`/authors/${authorId}`} className="article-details__name">
                {authorName}
              </Link>
            ) : (
              <span className="article-details__name">{authorName}</span>
            )}
          </p>
          <p className="article-details__date">
            Опубліковано:{" "}
            <span className="article-details__numbers">{article.date}</span>
          </p>
        </div>
        <img className="article-details__image" src={article.img || placeholder} alt={article.title} />
      </Container>
    </section>
  );
};

export default ArticleDetails;
