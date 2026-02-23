import "./Header.css";
import Container from "../Container/Container";
import { RxHamburgerMenu } from "react-icons/rx";
import MobileMenu from "./components/MobileMenu/MobileMenu";
import { Link } from "react-router-dom";
import logo from "./logo.svg";
import { useState } from "react";

const Header = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const openMobileMenu = () => {
    setIsMobileOpen(true);
  };

  const closeMobileMenu = () => {
    setIsMobileOpen(false);
  };

  return (
    <>
      <header className="header">
        <Container>
          <span className="header__logo">
            <img className="header__logo-svg" src={logo} alt="logo" /> Щоденці
          </span>

          <ul className="header__list">
            <li className="header__item">
              <Link className="header__link" to="/">
                Головна
              </Link>
            </li>
            <li className="header__item">
              <Link className="header__link" to="/articles">
                Статті
              </Link>
            </li>
            <li className="header__item">
              <Link className="header__link" to="/authors">
                Щоденці
              </Link>
            </li>
          </ul>

          <ul className="header__buttons">
            <li className="header__buttons-item">
              <Link to={"/auth/login"} className="header__buttons-button header__buttons-login">
                Вхід
              </Link>
            </li>
            <li className="header__buttons-item">
              <Link to={"/auth/register"} className="header__buttons-button header__buttons-register">
                Реєстрація
              </Link>
            </li>
          </ul>

          <button className="header__hamburger-button" onClick={openMobileMenu}>
            <RxHamburgerMenu />
          </button>
        </Container>
      </header>

      <MobileMenu isOpen={isMobileOpen} onClose={closeMobileMenu} />
    </>
  );
};

export default Header;
