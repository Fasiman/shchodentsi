import Container from "../../../../components/Container/Container";

import "./HabbitsArticles.css";

const HabbitsArticles = ({ article }) => {
  return (
    <section className="habbits-articles">
      <Container>
        <p className="habbits-articles__text">
          {article.article}
        </p>
        <div className="habbits-articles__box">
          <h3 className="habbits-articles__title">Збережіть собі статтю</h3>
          <p className="habbits-articles__description">
            Вона буде доступна у вашому профілі у розділі збережене
          </p>
          <button className="habbits-articles__button">Зберегти</button>
        </div>
      </Container>
    </section>
  );
};

export default HabbitsArticles;