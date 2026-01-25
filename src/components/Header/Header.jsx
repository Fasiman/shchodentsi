import "./Header.css"

import Container from "../Container/Container";

import { Link } from "react-router-dom";

import logo from "./logo.svg";

const Header = () => {
  return (
    <header className="header">
      <Container>
        <span className="header__logo">
          <img className="header__logo-svg" src={logo} alt="logo" /> Щоденці
        </span>
        <ul className="header__list">
          <li className="header__item">
            {/* <a className="header__link" href="./">
              Головна
            </a> */}
            <Link className="header__link" to={"/"}>
              Головна
            </Link>
          </li>
          <li className="header__item">
            <Link className="header__link" to={"/articles"}>
              Статті
            </Link>
          </li>
          <li className="header__item">
            <Link className="header__link" to={"/profile"}>
              Щоденці
            </Link>
          </li>
        </ul>
        <ul className="header__buttons">
          <li className="header__buttons-item">
            <button className="header__buttons-button header__buttons-login">Вхід</button>
          </li>
          <li className="header__buttons-item">
            <button className="header__buttons-button header__buttons-register">Реєстрація</button>
          </li>
        </ul>
      </Container>
    </header>
  );
};

export default Header;
