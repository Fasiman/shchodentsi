import Container from "../../../../components/Container/Container";
import "./ArticleDetails.css";

import placeholder from "../../images/placeholder.png";

const ArticleDetails = () => {
  return (
    <section className="article-details">
      <Container>
        <div className="article-details__box">
          <h1 className="article-details__title">
            Як сформувати звичку ранкового підйому
          </h1>
          <p className="article-details__author">
            Автор статті:{" "}
            <span className="article-details__name">Анастасия Землеройка</span>
          </p>
          <p className="article-details__date">
            Опубліковано:{" "}
            <span className="article-details__numbers">23.07.2025</span>
          </p>
        </div>
        <img className="article-details__image" src={placeholder} alt="Placeholder image" />
      </Container>
    </section>
  );
};

export default ArticleDetails;
