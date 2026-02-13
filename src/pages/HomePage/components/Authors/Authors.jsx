import { Link } from "react-router-dom";
import "./Authors.css";

const Authors = ({ users }) => {
  return (
    <section className="authors">
      <h2 className="authors__title">Наші Щоденці</h2>
      <ul className="authors__list">
        {users.slice(0, 4).map((user) => (
          <li className="authors__item" key={user.id}>
            <img src={user.avatar} alt={user.name} />
            <h4 className="authors__name">{user.name}</h4>
            <Link to={`/authors/${user.id}`}>
              <button className="authors__button">Переглянути профіль</button>
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/authors">
        <button className="authors__all">Переглянути всіх</button>
      </Link>
    </section>
  );
};

export default Authors;