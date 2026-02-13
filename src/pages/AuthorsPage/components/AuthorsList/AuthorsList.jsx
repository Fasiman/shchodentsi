import { Link } from "react-router-dom";
import Container from "../../../../components/Container/Container";
import "./AuthorsList.css";

const AuthorsList = ({ users, status }) => {
  return (
    <section className="authors-page">
      <Container>
        <h1 className="authors-page__title">Щоденці</h1>
        {status === "loading" ? (
          <h2>Loading...</h2>
        ) : (
          <ul className="authors-page__list">
            {users.map((user) => (
              <li className="authors-page__item" key={user.id}>
                <img
                  className="authors__avatar"
                  src={user.avatar}
                  alt={user.name}
                />
                <h4 className="authors-page__name">{user.name}</h4>
                <Link to={`/authors/${user.id}`}>
                  <button className="authors-page__more">
                    Переглянути профіль
                  </button>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
};

export default AuthorsList;