import Container from "../../../../components/Container/Container";
import "./ArticleDetails.css";

import placeholder from "../../images/placeholder.png";

const ArticleDetails = ({ article }) => {
  return (
    <section className="article-details">
      <Container>
        <div className="article-details__box">
          <h1 className="article-details__title">
            {article.title}
          </h1>
          <p className="article-details__author">
            Автор статті:{" "}
            <span className="article-details__name"></span>
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