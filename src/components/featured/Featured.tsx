import "./featured.scss";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { BsFillPlayFill } from "react-icons/bs";
import MovieData, { Type } from "../../models";
import { useEffect, useState } from "react";
import instance from "../../utils/axiosInstance";
import { BannerImage } from "../../Styled";
import { useAppContext } from "../../AppContext";
import { distinctValues } from "../../utils/extract";
import { useNavigate } from "react-router-dom";

interface IFeatured {
  category?: string;
  setGenre: React.Dispatch<React.SetStateAction<string>>;
}

const Featured = ({ category, setGenre }: IFeatured) => {
  const navigate = useNavigate();
  const { movies, user } = useAppContext();
  //random content
  const [content, setContent] = useState<MovieData>({});

  useEffect(() => {
    const getRandomContent = async () => {
      try {
        const { data } = await instance.get(
          `api/movie/random-movie${category ? "?category=" + category : ""}`
        );
        console.log(data);
        // const randomContent =
        //   data.data[Math.floor(Math.random() * data.data.length)].movie[
        //     Math.floor(
        //       Math.random() *
        //         data.data[Math.floor(Math.random() * data.data.length)].movie
        //           .length
        //     )
        //   ];
        setContent(data.data[0]);
      } catch (error: any) {
        console.log(error.response.data.msg);
      }
    };
    if (user) getRandomContent();
  }, [category, user]);

  return (
    <section className="featured">
      <BannerImage bgImage={content?.img!}>
        <div className="container">
          {category && (
            <div className="category">
              <span>{category === Type.Movie ? "Movies" : "Series"}</span>
              <select
                onChange={(e) => setGenre(e.target.value)}
                name="genre"
                id="genre"
              >
                {distinctValues(movies, "genre")?.map(
                  (genre: string, index: number) => (
                    <option key={index} value={genre}>
                      {genre}
                    </option>
                  )
                )}
              </select>
            </div>
          )}
          <div className="info">
            <img width="100%" src={content?.imgTitle} alt="MyPics" />
            <span className="desc">{content?.description}</span>
            <div className="buttons">
              <button
                onClick={() => {
                  navigate(`/watch/${content._id}`);
                }}
                className="play"
              >
                <BsFillPlayFill />
                <span>Play</span>
              </button>
              <button className="more">
                <AiOutlineInfoCircle />
                <span>Info</span>
              </button>
            </div>
          </div>
        </div>
      </BannerImage>
    </section>
  );
};

export default Featured;
