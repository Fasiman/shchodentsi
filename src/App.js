import { Routes, useLocation } from "react-router-dom";
import { Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

import HomePage from "./pages/HomePage/HomePage";
import ArticlesPage from "./pages/ArticlesPage/ArticlesPage";
import AuthorsPage from "./pages/AuthorsPage/AuthorsPage";
import AuthorProfilePage from "./pages/AuthorProfilePage/AuthorProfilePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import CreateArticle from "./pages/CreateArticle/CreateArticle";
import ArticlePage from "./pages/ArticlePage/ArticlePage";
import Register from "./pages/Auth/Register/Register";
import Login from "./pages/Auth/Login/Login";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import MobileMenu from "./components/Header/components/MobileMenu/MobileMenu";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { fetchUsers, logout } from "./redux/usersSlice";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useSelector((state) => state.users);
  return currentUser ? children : <Navigate to="/auth/login" />;
};

function App() {
  const dispatch = useDispatch();
  const { currentUser, items: users, status } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser && status === "succeeded" && users.length > 0) {
      const serverUser = users.find(u => String(u.id) === String(currentUser.id));
      
      if (!serverUser || serverUser.password !== currentUser.password) {
        console.warn("Account validation failed. Logging out...");
        dispatch(logout());
      }
    }
  }, [currentUser, users, status, dispatch]);

  return (
    <div className="App">
      <ScrollToTop />
      <Header />
      <MobileMenu />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/articles" element={<ArticlesPage />}></Route>
        <Route path="/authors" element={<AuthorsPage />}></Route>
        <Route path="/authors/:id" element={<AuthorProfilePage />}></Route>
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/new-article"
          element={
            <PrivateRoute>
              <CreateArticle />
            </PrivateRoute>
          }
        ></Route>
        <Route path="/articles/:id" element={<ArticlePage />}></Route>
        <Route path="/auth/register" element={<Register />}></Route>
        <Route path="/auth/login" element={<Login />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;