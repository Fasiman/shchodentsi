import "./MobileMenu.css";
import { Link } from "react-router-dom";

const MobileMenu = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="header__mobile-overlay" onClick={onClose} />

      <div className="header__mobile">
        <button className="header__mobile-close" onClick={onClose}>
          ✕
        </button>

        <nav className="header__mobile-nav">
          <Link to="/" onClick={onClose}>Головна</Link>
          <Link to="/articles" onClick={onClose}>Статті</Link>
          <Link to="/profile" onClick={onClose}>Щоденці</Link>
        </nav>

        <div className="header__mobile-buttons">
          <Link onClick={onClose} className="header__mobile-button" to={"/auth/login"}>Вхід</Link>
          <Link onClick={onClose} className="header__mobile-button register" to={"/auth/register"}>Реєстрація</Link>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
