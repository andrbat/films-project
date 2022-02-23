import { ifilm } from "../types/type";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GroupsIcon from "@mui/icons-material/Groups";
import StarIcon from "@mui/icons-material/Star";
import "./film.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/storeTypes";
import { markFavorite, unmarkFavorite } from "../store/favorite/favoriteSlice";

interface FilmProps {
  curFilm: ifilm;
  handlerClick: (d: string) => void;
}

function Film({ curFilm, handlerClick }: FilmProps) {
  const regUser = useSelector((e: RootState) => e.user.user);
  const dispatch = useDispatch();
  const favoriteFilms = useSelector((e: RootState) => e.favorite.favorite);

  const handlerToggleFavorite = (filmId: number) => {
    if (!(regUser.userEmail.length === 0)) {
      favoriteFilms.findIndex((e) => e === curFilm.id) === -1
        ? dispatch(
            markFavorite({
              userEmail: regUser.userEmail,
              filmId: filmId,
            })
          )
        : dispatch(
            unmarkFavorite({
              userEmail: regUser.userEmail,
              filmId: filmId,
            })
          );
    }
  };

  return (
    <>
      <img
        className="film_img"
        src={curFilm.img}
        alt=""
        onClick={() => handlerClick(curFilm.description)}
      />
      <h2>{curFilm.title}</h2>
      <h3>
        <GroupsIcon />
        &nbsp;
        {curFilm.director}
      </h3>
      <h3>
        <AccessTimeIcon />
        &nbsp;
        {curFilm.duration}
        &nbsp; min
      </h3>
      <div className="film_price">{"$ " + curFilm.price}</div>
      <div
        className={
          favoriteFilms.findIndex((e) => e === curFilm.id) === -1
            ? "film_star"
            : "film_star film_star__active"
        }
        onClick={() => handlerToggleFavorite(curFilm.id)}
      >
        <StarIcon />
      </div>
    </>
  );
}

export default Film;
