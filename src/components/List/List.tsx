import "./list.scss";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import ListItem from "./ListItem";
import MovieList, { Direction } from "../../models";
import { useRef, useState } from "react";
import useWindowSize from "../../utils/useWindowSize";

interface ListProps {
  list: MovieList;
}

export const List = ({ list }: ListProps) => {
  const { width } = useWindowSize();
  const listRef = useRef<HTMLDivElement>(null);
  const [slideNumber, setSlideNumber] = useState(0);
  const [clickLimit] = useState(window.innerWidth / 230);

  const handleClick = (direction: string) => {
    //gets the width from the left side

    let distance = listRef.current?.getBoundingClientRect().x
      ? listRef.current?.getBoundingClientRect().x - 50
      : 0;

    if (direction === Direction.Left && listRef.current && slideNumber > 0) {
      setSlideNumber((prev) => prev - 1);
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
    }
    if (
      direction === Direction.Right &&
      listRef.current &&
      slideNumber <
        (list.movie!.length >= 10 ? 10 : list.movie!.length) - clickLimit
    ) {
      setSlideNumber((prev) => prev + 1);
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
    }
  };

  return (
    <section className="list">
      <h2 className="listTitle">{list.title}</h2>
      <div className="wrapper">
        {slideNumber > 0 && (
          <HiArrowLeft
            onClick={() => handleClick(Direction.Left)}
            className="slideArrow left"
          />
        )}

        <div ref={listRef} className="container">
          {list.movie!.map((list, index) => (
            <ListItem index={index} key={index} list={list} />
          ))}
        </div>
        {list.movie!.length * 230 > width && (
          <>
            {slideNumber <
              (list.movie!.length < 10 ? 10 : list.movie!.length) && (
              <HiArrowRight
                onClick={() => handleClick(Direction.Right)}
                className="slideArrow right"
              />
            )}
          </>
        )}
      </div>
    </section>
  );
};
