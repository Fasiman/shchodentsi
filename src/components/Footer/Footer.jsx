import Container from "../Container/Container";

import logo from "./logo.svg";

import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";

import { Link } from "react-router-dom";

import "./Footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <div className="footer__content">
          <span className="footer__logo">
            <img className="footer__logo-svg" src={logo} alt="logo" /> Щоденці
          </span>
          <ul className="footer__list">
            <li className="footer__item">
              <a className="footer__icon" href="/">
                <FaFacebook />
              </a>
            </li>
            <li className="footer__item">
              <a
                className="footer__icon"
                href="https://www.instagram.com/d.yakov29"
              >
                <FaInstagram />
              </a>
            </li>
            <li className="footer__item">
              <a className="footer__icon" href="https://x.com/">
                <FaXTwitter />
              </a>
            </li>
            <li className="footer__item">
              <a
                className="footer__icon"
                href="https://youtu.be/dQw4w9WgXcQ?si=_V80xm7AJXp78VLk"
              >
                <FaYoutube />
              </a>
            </li>
          </ul>
          <ul className="footer__links">
            <li className="footer__links-item">
              <Link to={"/"} className="footer__link">
                Головна
              </Link>
            </li>
            <li className="footer__links-item">
              <Link to={"/articles"} className="footer__link">
                Статті
              </Link>
            </li>
            <li className="footer__links-item">
              <Link to={"/authors"} className="footer__link">
                Щоденці
              </Link>
            </li>
          </ul>
        </div>
        <p className="footer__copyright">© 2026 Щоденці. Усі права захищені.</p>
      </Container>
    </footer>
  );
};

export default Footer;
