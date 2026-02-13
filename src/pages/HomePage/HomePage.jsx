import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "../../components/Container/Container";
import { fetchUsers } from "../../redux/usersSlice";

import Hero from "./components/Hero/Hero";
import Why from "./components/Why/Why";
import Popular from "./components/Pupular/Pupular";
import Authors from "./components/Authors/Authors";
import Subscribe from "./components/Subscribe/Subscribe";

const HomePage = () => {
  const dispatch = useDispatch();
  const { items: users } = useSelector((state) => state.users);

  useEffect(() => {
    document.title = "Щоденці | Головна";
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <main>
      <Container>
        <Hero />
        <Why />
        <Popular />
        <Authors users={users} />
        <Subscribe />
      </Container>
    </main>
  );
};

export default HomePage;