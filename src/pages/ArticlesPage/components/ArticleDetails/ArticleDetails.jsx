import { useDispatch, useSelector } from "react-redux";
import Container from "../../../../components/Container/Container";
import { setFilter } from "../../../../redux/articlesSlice";

import "./ArticleDetails.css";

const ArticleDetails = () => {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state) => state.articles.filter);

  const categories = [
    "Всі статті",
    "Продуктивність",
    "Здоров’я",
    "Особистісний розвиток",
    "Відпочинок і сон",
    "Харчування",
    "Екологічні звички",
    "Фінанси",
  ];

  return (
    <section className="article-details">
      <Container>
       
        <ul className="articles__choose">
          {categories.map((category) => (
            <li className="articles__choose-item" key={category}>
              <button
                className={`articles__choose-item-btn ${
                  currentFilter === category ? "active" : ""
                }`}
                onClick={() => dispatch(setFilter(category))}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};

export default ArticleDetails;
