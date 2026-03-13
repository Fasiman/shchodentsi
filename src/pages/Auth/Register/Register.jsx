import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Container from "../../../components/Container/Container";
import { registerUser } from "../../../redux/usersSlice";

import ExistsModal from "./components/ExistsModal/Exists";
import axios from "axios";

import "./Register.css";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.users);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (currentUser) {
      navigate("/profile");
    }
  }, [currentUser, navigate]);

  const handleCheckEmailExists = async (email) => {
    if (!email.trim()) {
      return false;
    }
    
    const userEmail = email.trim().toLowerCase();
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      alert("Будь ласка, введіть правильну пошту");
      return null;
    }

    try {
      const response = await axios.get(
        `https://696f45bda06046ce6185fca4.mockapi.io/users?email=${userEmail}`
      );
      return response.data.length > 0;
    } catch (error) {
      console.error("Error checking email existence", error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Будь ласка, введіть ім'я");
      return;
    }

    if (!email.trim()) {
      alert("Будь ласка, введіть пошту");
      return;
    }

    if (!password.trim()) {
      alert("Будь ласка, введіть пароль");
      return;
    }

    if (password.length < 3) {
      alert("Пароль повинен мати мінімально 3 символи");
      return;
    }

    const exists = await handleCheckEmailExists(email);
    
    if (exists === null) {
      return;
    }

    if (exists === true) {
      const backdrop = document.querySelector(".exists-modal__backdrop");
      if (backdrop) {
        backdrop.style.display = "flex";
      }
    } else {
      dispatch(
        registerUser({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password,
          saved: 0,
          avatar:
            "https://api.dicebear.com/7.x/avataaars/svg?seed=" +
            name.trim().replace(/\s+/g, ""),
        })
      );
    }
  };

  return (
    <main>
      <ExistsModal isOpen={false} onClose={() => {}} />
      <section className="register__section">
        <Container>
          <h1 className="register__title">Реєстрація</h1>
          <p className="register__description">Покращуємо своє життя разом!</p>
          <form className="register__form" onSubmit={handleSubmit}>
            <ul className="register__list">
              <li className="register__item">
                <span className="register__name">Імʼя та Прізвище*</span>
                <input
                  type="text"
                  name="name"
                  className="register__input"
                  placeholder="Ваше імʼя та прізвище"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </li>
              <li className="register__item">
                <span className="register__name">Пошта*</span>
                <input
                  type="email"
                  name="email"
                  className="register__input"
                  placeholder="hello@podorozhnyky.ua"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </li>
              <li className="register__item">
                <span className="register__name">Пароль*</span>
                <input
                  type="password"
                  name="password"
                  className="register__input"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </li>
            </ul>
            <button type="submit" className="register__submit">
              Зареєструватись
            </button>
            <p className="register__have">
              Вже є аккаунт?{" "}
              <a href={"./login"} className="register__link">
                Авторизуватись
              </a>
            </p>
          </form>
        </Container>
      </section>
    </main>
  );
};

export default Register;
