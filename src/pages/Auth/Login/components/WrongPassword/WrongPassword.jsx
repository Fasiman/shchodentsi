import { IoClose } from "react-icons/io5";
import "./WrongPassword.css";

const WrongPassword = () => {
  const handleClose = () => {
    const backdrop = document.querySelector(".wrong-password__backdrop");
    if (backdrop) {
      backdrop.style.display = "none";
    }
  };

  return (
    <div className="wrong-password__backdrop">
      <div className="wrong-password__modal">
        <button onClick={handleClose} className="wrong-password__close">
          <IoClose />
        </button>
        <h2 className="wrong-password__title">Неправильний пароль</h2>
        <p className="wrong-password__description">
          Ви ввели неправильний пароль. Будь ласка, спробуйте ще раз.
        </p>
        <button onClick={handleClose} className="wrong-password__button">
          Спробувати знову
        </button>
      </div>
    </div>
  );
};

export default WrongPassword;
