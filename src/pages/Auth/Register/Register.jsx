import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import Container from "../../../components/Container/Container";
import { registerUser } from "../../../redux/usersSlice";

import ExistsModal from "./components/ExistsModal/Exists";
import EmptyFields from "../Login/components/EmptyFields/EmptyFields";

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

  const showEmptyFieldsModal = (message) => {
    setErrorMessage(message);

    const modal = document.querySelector(".empty-fields__backdrop");
    if (modal) {
      modal.classList.add("active");
    }
  };

  const showExistsModal = () => {
    const modal = document.querySelector(".exists-modal__backdrop");
    if (modal) {
      modal.classList.add("active");
    }
  };

  const generateAvatarBase64 = async (seedName) => {
    try {
      const seed = seedName.trim().replace(/\s+/g, "");

      const response = await fetch(
        `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
          seed
        )}`
      );

      if (!response.ok) return "";

      const svg = await response.text();

      return (
        "data:image/svg+xml;base64," +
        btoa(unescape(encodeURIComponent(svg)))
      );
    } catch (error) {
      console.error("Avatar error:", error);
      return "";
    }
  };

  const checkEmailExists = async () => {
    const userEmail = email.trim().toLowerCase();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(userEmail)) {
      showEmptyFieldsModal("Будь ласка, введіть правильну пошту");
      return true;
    }

    try {
      console.log("Checking if email exists:", userEmail);
      
      const response = await fetch(
        `http://localhost:1487/user?email=${encodeURIComponent(userEmail)}`
      );
      
      if (!response.ok) {
        console.error("Email check failed with status:", response.status);
        return false;
      }
      
      const data = await response.json();
      console.log("Email check response:", data);

      if (Array.isArray(data)) {
        const exists = data.length > 0;
        console.log("Email exists (array):", exists);
        return exists;
      }

      const exists = !!data;
      console.log("Email exists (object):", exists);
      return exists;
    } catch (error) {
      console.error("Error checking email:", error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      return showEmptyFieldsModal("Будь ласка, введіть ім'я");
    }

    if (!email.trim()) {
      return showEmptyFieldsModal("Будь ласка, введіть пошту");
    }

    if (!password.trim()) {
      return showEmptyFieldsModal("Будь ласка, введіть пароль");
    }

    if (password.length < 6) {
      return showEmptyFieldsModal(
        "Пароль повинен містити мінімум 6 символів"
      );
    }

    const exists = await checkEmailExists();

    if (exists) {
      showExistsModal();
      return;
    }

    const avatar = await generateAvatarBase64(name);

    try {
      await dispatch(
        registerUser({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password,
          saved: 0,
          avatar,
        })
      );

      navigate("/profile");
    } catch (error) {
      console.error("Registration error:", error);
      showEmptyFieldsModal("Помилка під час реєстрації");
    }
  };

  return (
    <main>
      <ExistsModal
        onClose={() => {
          const modal = document.querySelector(".exists-modal__backdrop");
          if (modal) {
            modal.classList.remove("active");
          }
        }}
      />

      <EmptyFields message={errorMessage} />

      <section className="register__section">
        <Container>
          <h1 className="register__title">Реєстрація</h1>

          <p className="register__description">
            Покращуємо своє життя разом!
          </p>

          <form className="register__form" onSubmit={handleSubmit}>
            <ul className="register__list">
              <li className="register__item">
                <span className="register__name">
                  Імʼя та Прізвище*
                </span>

                <input
                  type="text"
                  className="register__input"
                  placeholder="Ваше імʼя та прізвище"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </li>

              <li className="register__item">
                <span className="register__name">
                  Пошта*
                </span>

                <input
                  type="email"
                  className="register__input"
                  placeholder="hello@podorozhnyky.ua"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </li>

              <li className="register__item">
                <span className="register__name">
                  Пароль*
                </span>

                <input
                  type="password"
                  className="register__input"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </li>
            </ul>

            <button
              type="submit"
              className="register__submit"
            >
              Зареєструватись
            </button>

            <p className="register__have">
              Вже є акаунт?{" "}
              <Link
                to="/auth/login"
                className="register__link"
              >
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