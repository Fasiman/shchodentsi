import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../redux/usersSlice";
import AuthorsList from "./components/AuthorsList/AuthorsList";

const AuthorsPage = () => {
  const dispatch = useDispatch();
  const { items: users, status } = useSelector((state) => state.users);

  useEffect(() => {
    document.title = "Щоденці | Автори";
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <main>
      <AuthorsList users={users} status={status} />
    </main>
  );
};

export default AuthorsPage;