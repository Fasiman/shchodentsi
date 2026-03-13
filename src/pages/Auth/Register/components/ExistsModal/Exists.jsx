import { IoClose } from "react-icons/io5";
import "./Exists.css";

import { Link } from "react-router-dom";


const ExistsModal = ({ onClose }) => {
  return (
    <div className="exists-modal__backdrop" onClick={onClose}>
      <div className="exists-modal">
        <button
          className="exists-modal__close"
          onClick={onClose}
          aria-label="close modal"
        >
          <IoClose />
        </button>
        <h2 className="exists-modal__title">
          Користувач з такою поштою вже існує
        </h2>
        <p className="exists-modal__description">
          Спробуйте іншу пошту або авторизуйтесь, якщо у вас вже є аккаунт.
        </p>
        <Link to="/auth/login" className="exists-modal__button">
          Авторизуватися
        </Link>
      </div>
    </div>
  );
};


export default ExistsModal;