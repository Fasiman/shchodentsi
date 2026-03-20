import Container from "../../../../components/Container/Container";
import { useSelector, useDispatch } from "react-redux";
import { updateCurrentUser } from "../../../../redux/usersSlice";
import axios from "axios";
import "./HabbitsArticles.css";

const HabbitsArticles = ({ article }) => {
  const currentUser = useSelector((state) => state.users.currentUser);
  const dispatch = useDispatch();

  const isSaved = currentUser?.savedArticles?.some(sa => sa.id === (article._id?.$oid || article._id));

  const articleOwnerId = article.ownerId?.$oid || article.ownerId;
  const isOwner = currentUser?.id === articleOwnerId;

  const saveArticle = () => {
    if (!currentUser) {
      return;
    }
    const savedArticle = { id: article._id?.$oid || article._id };
    const updatedUser = {
      ...currentUser,
      savedArticles: [...(currentUser.savedArticles || []), savedArticle],
      saved: (currentUser.saved || 0) + 1
    };
    axios.put(`https://696f45bda06046ce6185fca4.mockapi.io/users/${currentUser.id}`, {
      savedArticles: updatedUser.savedArticles,
      saved: updatedUser.saved,
    })
      .then((response) => {
        console.log("Article saved:", response.data);
        dispatch(updateCurrentUser(updatedUser));
      })
      .catch((error) => {
        console.error("Error saving article:", error);
      });
  };

  const removeArticle = () => {
    if (!currentUser) {
      return;
    }
    const updatedUser = {
      ...currentUser,
      savedArticles: currentUser.savedArticles.filter(sa => sa.id !== (article._id?.$oid || article._id)),
      saved: Math.max((currentUser.saved || 0) - 1, 0)
    };
    axios.put(`https://696f45bda06046ce6185fca4.mockapi.io/users/${currentUser.id}`, {
      savedArticles: updatedUser.savedArticles,
      saved: updatedUser.saved,
    })
      .then((response) => {
        console.log("Article removed:", response.data);
        dispatch(updateCurrentUser(updatedUser));
      })
      .catch((error) => {
        console.error("Error removing article:", error);
      });
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
          <button className="habbits-articles__button" onClick={isSaved ? removeArticle : saveArticle}>
            {isSaved ? "Видалити з збережених" : "Зберегти"}
          </button>
        </div>
        )}
      </Container>
    </section>
  );
};

export default HabbitsArticles;