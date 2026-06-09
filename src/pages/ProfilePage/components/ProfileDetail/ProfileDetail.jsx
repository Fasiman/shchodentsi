import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "../../../../components/Container/Container";
import "./ProfileDetail.css";
import axios from "axios";
import { updateCurrentUser } from "../../../../redux/usersSlice";

const ProfileDetail = ({ onLogoutClick }) => {
  const { currentUser } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const fileInputRef = useRef(null);

  if (!currentUser) {
    return null;
  }

  const handleEditClick = () => {
    setAvatarPreview(currentUser.avatar);
    setIsEditing(true);
    console.log(isEditing);
    const backdrop = document.querySelector(".profile__backdrop");
    backdrop.style.display = "flex";
  };

  const handleCloseEdit = (e) => {
    const backdrop = document.querySelector(".profile__backdrop");
    backdrop.style.display = "none";
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert(
          "Файл занадто великий. Будь ласка, виберіть зображення менше 5МБ.",
        );
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          const MAX_SIZE = 300;
          if (width > height) {
            if (width > MAX_SIZE) {
              height *= MAX_SIZE / width;
              width = MAX_SIZE;
            }
          } else {
            if (height > MAX_SIZE) {
              width *= MAX_SIZE / height;
              height = MAX_SIZE;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
          setAvatarPreview(dataUrl);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
    console.log(e);
    const backdrop = document.querySelector(".profile__backdrop");
    backdrop.style.display = "flex";
  };

  const handleSave = async (e) => {
    e.preventDefault();
     const backdrop = document.querySelector(".profile__backdrop");
    backdrop.style.display = "none";
    if (!avatarPreview) return;

    try {
      const updatedUser = { ...currentUser, avatar: avatarPreview };

      await axios.put(
        `http://localhost:1487/users/${currentUser.id}`,
        updatedUser,
      );

      dispatch(updateCurrentUser(updatedUser));

      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      if (error.response && error.response.status === 413) {
        alert("Зображення все ще занадто велике. Спробуйте інше фото.");
      } else {
        alert("Помилка при оновленні профілю");
      }
    }
  };

  return (
    <section className="profile-detail">
      <div
        className="profile__backdrop profile__backdrop--open"
      
      >
        <form   onSubmit={handleSave} className="profile__form">
          
          <h2 className="profile__change">Давайте познайомимось ближче</h2>
          <div className="profile__photo">
            <p className="profile__photo-title">Аватар</p>
            <div className="profile__photo-load">
              <div
                className="avatar__preview"
                style={{
                  backgroundImage: `url(${avatarPreview || currentUser.avatar})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
                accept="image/*"
              />
              <button
                className="profile__photo-button"
                onClick={handleUploadClick}
                type="submit"
              >
                Завантажити фото
              </button>
            </div>
          </div>
          <button
            className="profile__save profile__save--primary"
            type="submit"
          >
            Зберегти
          </button>
          <button
            className="profile__cancel"
            type="button"
            onClick={() => setIsEditing(false)}
          >
            Скасувати
          </button>
        </form>
      </div>

      <Container>
        <img
          className="profile-detail__image"
          src={currentUser.avatar}
          alt={currentUser.name}
        />
        <div className="profile-detail__box">
          <h4 className="profile-detail__name">{currentUser.name}</h4>
          <p className="profile-detail__saved">
            Збережень:{" "}
            {currentUser.saved_art_ids ? currentUser.saved_art_ids.length : 0}
          </p>
          <button
            type="button"
            className="profile-detail__edit"
            onClick={handleEditClick}
          >
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
