import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import ArticlesPage from "./pages/ArticlesPage/ArticlesPage";
import AuthorsPage from "./pages/AuthorsPage/AuthorsPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import CreateArticle from "./pages/CreateArticle/CreateArticle";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import MobileMenu from "./components/Header/components/MobileMenu/MobileMenu";

function App() {
  return (
    <div className="App">
      <Header />
      <MobileMenu />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/articles" element={<ArticlesPage />}></Route>
        <Route path="/authors" element={<AuthorsPage />}></Route>
        <Route path="/profile" element={<ProfilePage />}></Route>
        <Route path="/new-article" element={<CreateArticle />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
