import Container from "../../../../components/Container/Container";

import "./Subscribe.css"

const Subscribe = () => {
  return (
    <section className="subscribe">
      <Container>
        <h2 className="subscribe__title">
          Ставай частиною спільноти корисних звичок
        </h2>
        <p className="subscribe__description">
          Приєднуйся до “Щоденців” — людей, які щодня роблять маленькі кроки до
          здоров’я, продуктивності та балансу. Ділися своїм досвідом і надихай
          інших на зміни.
        </p>
        <button className="subscribe__button">Розпочати сьогодні</button>
      </Container>
    </section>
  );
};

export default Subscribe;
