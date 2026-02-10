import "./Hero.css"

import image from "./images/hero-image.png"

const Hero = () => {
  return (
    <section className="hero">
        <div className="hero__content">
          <h1 className="hero__title">Маленькі кроки — великі зміни</h1>
          <p className="hero__description">
            “Щоденці” — це блог про корисні звички, баланс і продуктивність. Ми
            ділимося простими ідеями та практиками, які допоможуть тобі бути
            ефективнішим щодня без зайвого стресу
          </p>
          <button className="hero__button">Доєднатися</button>
        </div>
        <img className="hero__image" src={image} alt="hero__image" />
    </section>
  );
};

export default Hero;
