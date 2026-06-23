import Container from "../../../../components/Container/Container";
import { useSelector, useDispatch } from "react-redux";
import { updateCurrentUser } from "../../../../redux/usersSlice";
import { updateArticleSaves } from "../../../../redux/articlesSlice";
import axios from "axios";
import "./HabbitsArticles.css";
import { useEffect } from "react";

const HabbitsArticles = ({ article }) => {
  const currentUser = useSelector((state) => state.users.currentUser);
  const dispatch = useDispatch();

  const uniqueId = article.id || article.db_article_id || article.articleId;
  
  const isSaved = currentUser?.saved_art_ids?.includes(uniqueId);
  const isOwner = currentUser && String(article.ownerId) === String(currentUser.id);

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    console.log("Current user from localStorage:", user);
    if (user) {
      const saveBox = document.querySelector(".habbits-articles__box");
      saveBox.style.display = "block";
    } else {
      const saveBox = document.querySelector(".habbits-articles__box");
      if (saveBox) {
        saveBox.style.display = "none";
      }
    }
  }, []);

  const saveArticle = () => {
    if (!currentUser || !uniqueId) return;

    const currentSaved = (currentUser.saved_art_ids || []);
    if (currentSaved.includes(uniqueId)) return;

    const updatedUser = {
      ...currentUser,
      saved_art_ids: [...currentSaved, uniqueId],
    };

    dispatch(updateCurrentUser(updatedUser));
    
    const newSaveCount = (article.saveCount || 0) + 1;
    dispatch(updateArticleSaves({ id: article.id, saveCount: newSaveCount }));

    axios.put(`http://localhost:1487/user/${currentUser.id}`, updatedUser);
  };

  const removeArticle = () => {
    if (!currentUser || !uniqueId) return;

    const updatedUser = {
      ...currentUser,
      saved_art_ids: (currentUser.saved_art_ids || []).filter(id => id !== uniqueId),
    };

    dispatch(updateCurrentUser(updatedUser));

    const newSaveCount = Math.max((article.saveCount || 0) - 1, 0);
    dispatch(updateArticleSaves({ id: article.id, saveCount: newSaveCount }));

    axios.put(`http://localhost:1487/user/${currentUser.id}`, updatedUser);
  };

  return (
    <section className="habbits-articles">
      <Container>
        <p className="habbits-articles__text">
          {article.article}
        </p>
        {!isOwner && (
        <div className="habbits-articles__box">
          <h3 className="habbits-articles__title">Збережіть собі статтю</h3>
          <p className="habbits-articles__description">
            Вона буде доступна у вашому профілі у розділі збережене
          </p>
          <button 
            className="habbits-articles__button" 
            onClick={isSaved ? removeArticle : saveArticle}
            aria-label={isSaved ? "Видалити статтю з збережених" : "Зберегти статтю"}
          >
            {isSaved ? "Видалити з збережених" : "Зберегти"}
          </button>
        </div>
        )}
      </Container>
    </section>
  );
};

export default HabbitsArticles;