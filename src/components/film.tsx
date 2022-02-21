import { ifilm } from "../types/type";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GroupsIcon from "@mui/icons-material/Groups";
import StarIcon from "@mui/icons-material/Star";
import "./film.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/storeTypes";
import { actionToggleFavorite } from "../store/favorite/favoriteActions";
import { deleteFavoriteFilms, postFavoriteFilms } from "./data/data";

interface FilmProps {
  curFilm: ifilm;
  handlerClick: (d: string) => void;
}

function Film({ curFilm, handlerClick }: FilmProps) {
  const regUser = useSelector((e: RootState) => e.user.user);
  const dispatch = useDispatch();

  const handlerSetFavorite = (filmId: number, checkFav: boolean) => {
    if (!(regUser.userEmail.length === 0)) {
      dispatch(actionToggleFavorite(regUser.userEmail, filmId, checkFav));
      checkFav
        ? deleteFavoriteFilms(regUser.userEmail, filmId)
        : postFavoriteFilms(regUser.userEmail, filmId);
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
          !curFilm.featured ? "film_star" : "film_star film_star__active"
        }
        onClick={() => handlerSetFavorite(curFilm.id, curFilm.featured)}
      >
        <StarIcon />
      </div>
    </>
  );
}

export default Film;
