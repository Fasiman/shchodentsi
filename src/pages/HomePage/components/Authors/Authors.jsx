import Container from "../../../../components/Container/Container"

import "./Authors.css"

import avatar from "./images/avatar.png"

const Authors = () => {
    return (
        <section className="authors">
            <Container>
                <h2 className="authors__title">Наші Щоденці</h2>
                <ul className="authors__list">
                    <li className="authors__item">
                        <img src={avatar} alt="" />
                        <h4 className="authors__name">Назар Ткаченко</h4>
                        <button className="authors__button">Переглянути профіль</button>
                    </li>
                    <li className="authors__item">
                        <img src={avatar} alt="" />
                        <h4 className="authors__name">Назар Ткаченко</h4>
                        <button className="authors__button">Переглянути профіль</button>
                    </li>
                    <li className="authors__item">
                        <img src={avatar} alt="" />
                        <h4 className="authors__name">Назар Ткаченко</h4>
                        <button className="authors__button">Переглянути профіль</button>
                    </li>  <li className="authors__item">
                        <img src={avatar} alt="" />
                        <h4 className="authors__name">Назар Ткаченко</h4>
                        <button className="authors__button">Переглянути профіль</button>
                    </li>
                </ul>
                <button className="authors__all">Переглянути всіх</button>
            </Container>
        </section>
    )
}

export default Authors