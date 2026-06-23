import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Container from "../../../components/Container/Container";
import { Link } from "react-router-dom";
import { registerUser } from "../../../redux/usersSlice";

import ExistsModal from "./components/ExistsModal/Exists";
import EmptyFields from "../Login/components/EmptyFields/EmptyFields";
import axios from "axios";

import "./Register.css";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.users);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (currentUser) {
      navigate("/profile");
    }
  }, [currentUser, navigate]);

  const showEmptyFieldsModal = (msg) => {
    setErrorMessage(msg);
    const emptyFieldsModal = document.querySelector(".empty-fields__backdrop");
    if (emptyFieldsModal) {
      emptyFieldsModal.style.display = "flex";
    }
  };

  const generateAvatarBase64 = async (seedName) => {
    try {
      const seed = seedName.trim().replace(/\s+/g, "");
      const url = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(seed)}`;
      const res = await fetch(url);
      if (!res.ok) return "";
      const svg = await res.text();
      const base64 = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svg)));
      return base64;
    } catch (error) {
      console.error("Error generating avatar base64:", error);
      return "";
    }
  };

  const handleCheckEmailExists = async (email) => {
    if (!email.trim()) {
      return false;
    }
    
    const userEmail = email.trim().toLowerCase();
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      showEmptyFieldsModal("Будь ласка, введіть правильну пошту");
      return null;
    }

    try {
      const response = await axios.get(
        `http://localhost:1487/user?email=${userEmail}`
      );
      const data = response.data;
      if (Array.isArray(data)) return data.length > 0;
      if (data && typeof data === 'object') return Object.keys(data).length > 0;
      return !!data;
    } catch (error) {
      console.error("Error checking email existence", error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      showEmptyFieldsModal("Будь ласка, введіть ім'я");
      return;
    }

    if (!email.trim()) {
      showEmptyFieldsModal("Будь ласка, введіть пошту");
      return;
    }

    if (!password.trim()) {
      showEmptyFieldsModal("Будь ласка, введіть пароль");
      return;
    }

    if (password.length < 6) {
      showEmptyFieldsModal("Пароль повинен мати мінімально 6 символів");
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
      const avatarBase64 = await generateAvatarBase64(name);

      dispatch(
        registerUser({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password,
          saved: 0,
          avatar: avatarBase64 || "",
        })
      );
    }
  };

  return (
    <main>
      <ExistsModal onClose={() => {
        const backdrop = document.querySelector(".exists-modal__backdrop");
        if (backdrop) backdrop.style.display = "none";
      }} />
      <EmptyFields message={errorMessage} />
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
              Вже є акаунт?{" "}
              <Link to="/auth/login" className="register__link">
                Авторизуватись
              </Link>
            </p>
          </form>
        </Container>
      </section>
    </main>
  );
};

export default Register;
