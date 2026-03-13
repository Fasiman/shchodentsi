import { IoClose } from "react-icons/io5";
import "./ProfileLogout.css";

import { useEffect } from "react";

const ProfileLogout = ({ onClose, onConfirm }) => {
  const handleBackdropClick = (e) => {
    if (e.target.classList.contains("profile-logout__backdrop")) {
      onClose();
    }
  };

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="profile-logout__backdrop"
      onClick={handleBackdropClick}
    >
      <div className="profile-logout">
        <button
          className="profile-logout__close"
          onClick={onClose}
          aria-label="close modal"
        >
          <IoClose />
        </button>
        <h2 className="profile-logout__title">Ви точно хочете вийти?</h2>
        <p className="profile-logout__description">
          Ми будемо сумувати за вами!
        </p>
        <div className="profile-logout__buttons">
          <button
            className="profile-logout__button profile-logout__button--cancel"
            onClick={onClose}
          >
            Відмінити
          </button>
          <button
            className="profile-logout__button profile-logout__button--confirm"
            onClick={onConfirm}
          >
            Вийти
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileLogout;
