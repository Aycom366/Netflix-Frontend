import "./list.scss";
import { BsFillPlayFill } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { BsHandThumbsUp, BsHandThumbsDown } from "react-icons/bs";
import { useState } from "react";
import MovieData from "../../models";
import { useNavigate, Link } from "react-router-dom";

interface IList {
  index: number;
  list: MovieData;
}

const ListItem = ({ index, list }: IList) => {
  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate();

  return (
    <Link to={`watch/${list._id}`}>
      <div
        className="listItem"
        //calculating hoverStates, the left position
        style={{ left: isHovered ? index * 225 - 50 + index * 2.5 : 0 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={list.img} alt="movie poster" />

        {isHovered && (
          <>
            <video src={list.trailer} autoPlay={true} loop />
            <div className="itemInfo">
              <div className="icons">
                <BsFillPlayFill
                  onClick={() => {
                    navigate(`/watch/${list._id}`);
                  }}
                  className="icon"
                />
                <AiOutlinePlus className="icon" />
                <BsHandThumbsDown className="icon" />
                <BsHandThumbsUp className="icon" />
              </div>
              <div className="itemInfoTop">
                <span>{list.duration}</span>
                <span className="limit">{list.ageLimit}</span>
                <span>{list.year}</span>
              </div>
              <div className="desc">{list.description}</div>
              <div className="genre">{list.genre}</div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
};

export default ListItem;
