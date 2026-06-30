import { IoClose } from "react-icons/io5";
import "./Exists.css";

import { Link } from "react-router-dom";


const ExistsModal = ({ onClose }) => {
  const handleClose = () => {
    const backdrop = document.querySelector(".exists-modal__backdrop");
    if (backdrop) {
      backdrop.classList.remove("active");
    }
    if (onClose) onClose();
  };

  return (
    <div className="exists-modal__backdrop" onClick={handleClose}>
      <div className="exists-modal" onClick={(e) => e.stopPropagation()}>
        <button
          className="exists-modal__close"
          onClick={handleClose}
          aria-label="Закрити модальне вікно"
        >
          <IoClose />
        </button>
        <h2 className="exists-modal__title">
          Користувач з такою поштою вже існує
        </h2>
        <p className="exists-modal__description">
          Спробуйте іншу пошту або авторизуйтесь, якщо у вас вже є акаунт.
        </p>
        <Link to="/auth/login" className="exists-modal__button">
          Авторизуватися
        </Link>
      </div>
    </div>
  );
};


export default ExistsModal;