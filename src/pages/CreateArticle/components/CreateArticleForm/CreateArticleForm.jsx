import Container from "../../../../components/Container/Container";
import "./CreateArticleForm.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createArticle } from "../../../../redux/articlesSlice";

const CreateArticleForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.users);
  const { status } = useSelector((state) => state.articles);

  const categories = [
    "Продуктивність",
    "Здоров’я",
    "Особистісний розвиток",
    "Відпочинок і сон",
    "Харчування",
    "Екологічні звички",
    "Фінанси"
  ];

  const [formData, setFormData] = useState({
    title: "",
    category: categories[0],
    text: "",
    image: "",
    imageBase64: "",
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Файл занадто великий. Максимальний розмір: 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result;
        
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          
          let width = img.width;
          let height = img.height;
          
          const maxWidth = 800;
          const maxHeight = 800;
          
          if (width > height) {
            if (width > maxWidth) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
          
          const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7);
          
          setImagePreview(compressedBase64);
          setFormData((prev) => ({
            ...prev,
            imageBase64: compressedBase64,
            image: file.name,
          }));
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const generateUniqueId = () => {
    return 'art_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      alert("Потрібно логіну для створення статті");
      navigate("/auth/login");
      return;
    }

    if (!formData.title || !formData.text) {
      alert("Будь ласка, заповніть всі поля");
      return;
    }

    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];

    const articleData = {
      db_article_id: generateUniqueId(), 
      img: formData.imageBase64 || "",
      title: formData.title,
      article: formData.text,
      category: formData.category,
      rate: 5,
      saveCount: 0,
      ownerId: currentUser.id,
      name: currentUser.name,
      avatar: currentUser.avatar,
      date: dateStr,
      createdAt: new Date().toISOString(),
    };

    try {
      await dispatch(createArticle(articleData)).unwrap();
      navigate("/articles");
    } catch (error) {
      console.error("Помилка:", error);
    }
  };

  return (
    <section className="create">
      <Container>
        <h2 className="create__title">Створити нову статтю</h2>
        <form className="create__form" onSubmit={handleSubmit}>
          <ul className="create__list">
            <li className="create__item">
              <span className="create__name">Обкладинка статті</span>
              <input
                type="file"
                className="create__input"
                accept="image/*"
                onChange={handleImageChange}
              />
              {imagePreview && (
                <div className="create__preview">
                  <img src={imagePreview} alt="Preview" />
                </div>
              )}
            </li>
            <li className="create__item">
              <span className="create__name">Заголовок</span>
              <input
                type="text"
                className="create__input"
                placeholder="Введіть заголовок історії"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </li>
            <li className="create__item">
              <span className="create__name">Категорія</span>
              <select
                className="create__input"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </li>
            <li className="create__item">
              <span className="create__name">Текст статті</span>
              <textarea
                className="create__textarea"
                placeholder="Ваша стаття тут"
                name="text"
                value={formData.text}
                onChange={handleInputChange}
                required
              />
            </li>
          </ul>
          <div className="create__buttons">
            <button type="button" className="create__button create__button-cancel" onClick={() => navigate("/")}>Відмінити</button>
            <button type="submit" className="create__button create__button-save" disabled={status === "loading"}>
              {status === "loading" ? "Збереження..." : "Зберегти"}
            </button>
          </div>
        </form>
      </Container>
    </section>
  );
};

export default CreateArticleForm;