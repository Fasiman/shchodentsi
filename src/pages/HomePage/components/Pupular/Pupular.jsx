import Container from "../../../../components/Container/Container";
import saved from "./images/logo.svg";

import testImage from "./images/testimage.png";

import "./Popular.css";

import { useDispatch, useSelector } from "react-redux";

const Popular = () => {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state);
  console.log(articles);

  return (
    <section className="popular">
      <Container>
        <h2 className="popular__title">Популярні статті</h2>
        <ul className="popular__list">
          <li className="popular__item">
            <img src={testImage} className="popular__image" alt="" />
            <div className="popular__box">
            <span className="popular__type">Продуктивність</span>
            <h4 className="popular__name">
              Як сформувати звичку ранкового підйому
            </h4>
            <span className="popular__author">Анастасія Олійник</span>
            <p className="popular__data">
              27.03.2025 • 5 <img className="popular__icon" src={saved} alt="icon" />
            </p>
            <div className="popular__buttons">
              <button className="popular__more">Переглянути статтю</button>
              <button className="popular__save">
                <img src={saved} alt="icon" />
              </button>
            </div>
            </div>
          </li>
          
          
        </ul>

      </Container>
    </section>
  );
};

export default Popular;
