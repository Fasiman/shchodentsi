import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/usersSlice";
import Container from "../../components/Container/Container";

import ProfileDetail from "./components/ProfileDetail/ProfileDetail";
import ProfileArticles from "./components/ProfileArticles/ProfileArticles";
import ProfileLogout from "./components/ProfileLogout/ProfileLogout";

const ProfilePage = () => {
  useEffect(() => {
    document.title = "Щоденцi | Профіль";
  }, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.users);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const openLogoutModal = () => setShowLogoutModal(true);
  const closeLogoutModal = () => setShowLogoutModal(false);

  const handleLogout = () => {
    dispatch(logout());
    closeLogoutModal();
    navigate("/");
  };

  if (!currentUser) {
    return (
      <main>
        <Container>
          <p>
            Ви не увійшли. <Link to="/auth/login">Увійдіть</Link> або
            переглядайте сайт.
          </p>
        </Container>
      </main>
    );
  }

  return (
    <main>
      <ProfileDetail onLogoutClick={openLogoutModal} />
      <ProfileArticles />
      {showLogoutModal && (
        <ProfileLogout
          onClose={closeLogoutModal}
          onConfirm={handleLogout}
        />
      )}
    </main>
  );
};

export default ProfilePage;