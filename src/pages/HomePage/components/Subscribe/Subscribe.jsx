import "./Subscribe.css"
import { Link } from "react-router-dom";

const Subscribe = () => {
  return (
    <section className="subscribe" id="join">
        <div className="subscribe__content">
            <h2 className="subscribe__title">
            Ставай частиною спільноти корисних звичок
            </h2>
            <p className="subscribe__description">
            Приєднуйся до “Щоденців” — людей, які щодня роблять маленькі кроки до
            здоров’я, продуктивності та балансу. Ділися своїм досвідом і надихай
            інших на зміни.
            </p>
            <Link to={"/auth/register"} className="subscribe__button">Розпочати сьогодні</Link>
        </div>
    </section>
  );
};

export default Subscribe;
