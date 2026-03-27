import { IoClose } from "react-icons/io5";
import "./EmptyFields.css";

const EmptyFields = ({ message }) => {
  const handleClose = () => {
    const backdrop = document.querySelector(".empty-fields__backdrop");
    if (backdrop) {
      backdrop.style.display = "none";
    }
  };

  return (
    <div className="empty-fields__backdrop">
      <div className="empty-fields__modal">
        <button onClick={handleClose} className="empty-fields__close">
          <IoClose />
        </button>
        <h2 className="empty-fields__title">Помилка заповнення</h2>
        <p className="empty-fields__description">
          {message || "Будь ласка, заповніть усі обов'язкові поля."}
        </p>
        <button onClick={handleClose} className="empty-fields__button">
          Зрозуміло
        </button>
      </div>
    </div>
  );
};

export default EmptyFields;
