import Container from "../../../components/Container/Container";
import { Link } from "react-router-dom";

import "./Register.css";

const Register = () => {
  return (
    <main>
      <section className="register__section">
        <Container>
          <h1 className="register__title">Реєстрація</h1>
          <p className="register__description">Покращуємо своє життя разом!</p>
          <form className="register__form">
            <ul className="register__list">
              <li className="register__item">
                <span className="register__name">Імʼя та Прізвище*</span>
                <input
                  type="text"
                  name="name"
                  className="register__input"
                  placeholder="Ваше імʼя та прізвище"
                />
              </li>
              <li className="register__item">
                <span className="register__name">Пошта*</span>
                <input
                  type="email"
                  name="email"
                  className="register__input"
                  placeholder="hello@podorozhnyky.ua"
                />
              </li>
              <li className="register__item">
                <span className="register__name">Пароль*</span>
                <input
                  type="password"
                  name="password"
                  className="register__input"
                  placeholder="********"
                />
              </li>
            </ul>
            <button type="submit" className="register__submit">Зареєструватись</button>
            <p className="register__have">Вже є аккаунт? <a href={"./login"} className="register__link">Авторизуватись</a></p>
          </form>
        </Container>
      </section>
    </main>
  );
};

export default Register;
