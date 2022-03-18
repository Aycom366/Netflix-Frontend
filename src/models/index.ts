export enum Type {
  Movie = "movies",
  Series = "series",
}

export enum Direction {
  Left = "Left",
  Right = "Right",
}

export default interface MovieData {
  _id?: string;
  title?: string;
  description?: string;
  img?: string;
  imgTitle?: string;
  imgThumbnail?: string;
  duration?: string;
  trailer?: string;
  video?: string;
  year?: number;
  ageLimit?: number;
  genre?: string;
  category?: string;
}

export default interface MovieList {
  _id?: string;
  title?: string;
  genre?: string;
  category?: string;
  createdAt?: string;
  updatedAt?: string;
  movie?: MovieData[];
  __v?: number;
}
