import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../redux/usersSlice";
import Container from "../../components/Container/Container";
import "./AuthorProfilePage.css";

const AuthorProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items: users, status } = useSelector((state) => state.users);

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUsers());
    }
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      const user = users.find((u) => u.id == id);
      if (user) {
        document.title = `Щоденці | ${user.name}`;
      }
    }
  }, [users, id]);

  const user = users.find((u) => u.id == id);

  if (status === "loading") {
    return (
      <main>
        <Container>
          <p>Завантаження...</p>
        </Container>
      </main>
    );
  }

  if (!user) {
    return (
      <main>
        <Container>
          <p>Автор не знайдений</p>
          <button onClick={() => navigate("/authors")} style={{ marginTop: "20px", padding: "10px 20px", cursor: "pointer" }}>
            Повернутися до списку авторів
          </button>
        </Container>
      </main>
    );
  }

  return (
    <main>
      <section className="author-profile">
        <Container>
          <img
            className="author-profile__image"
            src={user.avatar}
            alt={user.name}
          />
          <div className="author-profile__box">
            <h4 className="author-profile__name">{user.name}</h4>
            <p className="author-profile__saved">Збережень: {user.saved}</p>
          </div>
        </Container>
      </section>
    </main>
  );
};

export default AuthorProfilePage;
