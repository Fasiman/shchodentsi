import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Container from "../../../components/Container/Container";
import { fetchUsers, login, resetError } from "../../../redux/usersSlice";

import axios from "axios";

import NoEmail from "./components/NoEmail/NoEmail";
import WrongPassword from "./components/WrongPassword/WrongPassword";
import EmptyFields from "./components/EmptyFields/EmptyFields";

import "./Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, error } = useSelector((state) => state.users);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      navigate("/profile");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    if (error === "wrong_password") {
      const wrongPasswordModal = document.querySelector(".wrong-password__backdrop");
      if (wrongPasswordModal) {
        wrongPasswordModal.style.display = "flex";
      }
      dispatch(resetError());
    }
  }, [error, dispatch]);

  const showEmptyFieldsModal = (msg) => {
    setErrorMessage(msg);
    const emptyFieldsModal = document.querySelector(".empty-fields__backdrop");
    if (emptyFieldsModal) {
      emptyFieldsModal.style.display = "flex";
    }
  };

  const handleNoEmail = async () => {
    if (!email.trim()) {
      showEmptyFieldsModal("Будь ласка, введіть пошту");
      return null;
    }

    try {
      const response = await axios.get(
        `http://localhost:1487/users?email=${email.trim().toLowerCase()}`
      );
      return response.data.length > 0;
    } catch (error) {
      console.error("Error checking email existence", error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailExists = await handleNoEmail();
    
    if (emailExists === null) return;

    if (!emailExists) {
      const noEmailModal = document.querySelector(".no-email__backdrop");
      if (noEmailModal) {
        noEmailModal.style.display = "flex";
      }
    } else {
      if (!password.trim()) {
        showEmptyFieldsModal("Будь ласка, введіть пароль");
        return;
      }
      dispatch(login({ email: email.trim().toLowerCase(), password }));
    }
  };

  return (
    <main>
      <NoEmail />
      <WrongPassword />
      <EmptyFields message={errorMessage} />
      <section className="login__section">
        <Container>
          <h1 className="login__title">Вхід</h1>
          <p className="login__description">
            Раді знову бачити ефективну людину!
          </p>
          <form className="login__form" onSubmit={handleSubmit}>
            <ul className="login__list">
              <li className="login__item">
                <span className="login__name">Пошта*</span>
                <input
                  type="email"
                  name="email"
                  className="login__input"
                  placeholder="hello@podorozhnyky.ua"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </li>
              <li className="login__item">
                <span className="login__name">Пароль*</span>
                <input
                  type="password"
                  name="password"
                  className="login__input"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </li>
            </ul>
            <button type="submit" className="login__submit">
              Увійти
            </button>
            <p className="login__have">
              Немає акаунту?{" "}
              <Link to={"/auth/register"} className="login__link">
                Зареєструватись
              </Link>
            </p>
          </form>
        </Container>
      </section>
    </main>
  );
};

export default Login;
