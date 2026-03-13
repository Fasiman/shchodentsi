import Container from "../../../../components/Container/Container";
import "./ProfileDetail.css";
import { useSelector } from "react-redux";

const ProfileDetail = ({ onLogoutClick }) => {
  const { currentUser } = useSelector((state) => state.users);

  if (!currentUser) {
    return null;
  }


  const openEditForm = () => {
    const backdrop = document.querySelector('.profile__backdrop');
    if (backdrop) {
      backdrop.style.display = 'block';
    }
  }
  return (
    <section className="profile-detail">
      <div className="profile__backdrop">
        <form className="profile__form">
          <h2 className="profile__change">Давайте познайомимось ближче</h2>
          <div className="profile__photo">
            <p className="profile__photo-title">Аватар</p>
            <div className="profile__photo-load">
              <div className="avatar__preview"></div>
              <button className="profile__photo-button">
                Завантажити фото
              </button>
            </div>
          </div>
          <button className="profile__save">Зберегти</button>
        </form>
      </div>
      <Container>
        <img
          className="profile-detail__image"
          src={currentUser.avatar}
          alt=""
        />
        <div className="profile-detail__box">
          <h4 className="profile-detail__name">{currentUser.name}</h4>
          <p className="profile-detail__saved">
            Збережень: {currentUser.saved}
          </p>
          <button type="button" className="profile-detail__edit" onClick={openEditForm}>
            Редагувати
          </button>
          <button onClick={onLogoutClick} className="profile-detail__logout">
            Вийти
          </button>
        </div>
      </Container>
    </section>
  );
};

export default ProfileDetail;
