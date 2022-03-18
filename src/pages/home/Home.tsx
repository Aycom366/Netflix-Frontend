/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useAppContext } from "../../AppContext";
import Featured from "../../components/featured/Featured";
import { List } from "../../components/List/List";
import Navbar from "../../components/navbar/Navbar";
import MovieList, { Type } from "../../models";
import instance from "../../utils/axiosInstance";
import PageWrapper from "../../utils/PageWrapper";
import "./home.scss";

interface HomeProps {
  category?: Type;
}

const Home = ({ category }: HomeProps) => {
  const { user } = useAppContext();
  const [lists, SetLists] = useState<MovieList[]>([]);
  const [genre, setGenre] = useState("");

  useEffect(() => {
    if (user?.isFirst) window.location.reload();
  }, []);

  useEffect(() => {
    const getRandomList = async () => {
      console.log(genre);
      try {
        // ?category=series&genre=error
        const { data } = await instance.get(
          `api/list${category ? "?category=" + category : ""}${
            genre ? "&genre=" + genre : ""
          }`
        );
        SetLists(data.data);
      } catch (error: any) {
        console.log(error.respone.data.msg);
        //  alert(error.response.data.msg);
      }
    };
    if (user) getRandomList();
  }, [category, genre]);

  return (
    <PageWrapper>
      <div className="home">
        <Navbar />
        <Featured category={category} setGenre={setGenre} />
        {lists.length > 0 &&
          lists.map((list, index) => {
            return <List key={index} list={list} />;
          })}
      </div>
    </PageWrapper>
  );
};

export default Home;
