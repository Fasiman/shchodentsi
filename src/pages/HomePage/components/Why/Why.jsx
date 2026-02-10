import "./Why.css";

import botinok from "./images/botinok.svg";
import balans from "./images/balans.svg";

const Why = () => {
  return (
    <section className="why">
        <h2 className="why__title">Чому варто читати “Щоденці”?</h2>
        <div className="why__content">
          <p className="why__description">
            У світі, де все крутиться надто швидко, важливо мати прості
            орієнтири. “Щоденці” допоможуть зосередитися на головному: звичках,
            що формують баланс, ефективність і внутрішню гармонію.
          </p>
          <ul className="why__list">
            <li className="why__item">
              <img className="why__svg" src={botinok} alt="botinok" />
              <h4 className="why__item-title">Маленькі кроки щодня</h4>
              <p className="why__item-description">
                Ми показуємо, як прості дії — від ранкового запису в нотатнику
                до 10-хвилинної прогулянки — можуть змінювати життя.
              </p>
            </li>
            <li className="why__item">
              <img className="why__svg" src={balans} alt="balans" />
              <h4 className="why__item-title">Баланс без стресу</h4>
              <p className="why__item-description">
                Жодних виснажливих порад. Лише корисні практики, які легко
                вплітаються у твій ритм і справді працюють.
              </p>
            </li>
          </ul>
        </div>
    </section>
  );
};

export default Why;
