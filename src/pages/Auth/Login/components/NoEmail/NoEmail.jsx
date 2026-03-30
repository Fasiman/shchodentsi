import { IoClose } from "react-icons/io5";
import "./NoEmail.css";
import { Link } from "react-router-dom";

const NoEmail = () => {
  const handleClose = () => {
    const backdrop = document.querySelector(".no-email__backdrop");
    if (backdrop) {
      backdrop.style.display = "none";
    }
  };
  return (
    <div className="no-email__backdrop">
      <div className="no-email__modal">
        <button onClick={handleClose} className="no-email__close">
          <IoClose />
        </button>
        <h2 className="no-email__title">Пошта не знайдена</h2>
        <p className="no-email__description">
          Ви ввели неправильну пошту. Спробуйте ще раз.
        </p>
        <Link to="/auth/login" onClick={handleClose} className="no-email__link">
          Спробувати знову
        </Link>
      </div>
    </div>
  );
};

export default NoEmail;
