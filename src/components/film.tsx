import { ifilm } from "../types/type";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GroupsIcon from "@mui/icons-material/Groups";
import StarIcon from "@mui/icons-material/Star";
import "./film.css";

interface FilmProps {
  curFilm: ifilm;
  handlerClick: (d: string) => void;
  onFavorite: (filmId: number, checkFav: boolean) => void;
}

function Film({ curFilm, handlerClick, onFavorite }: FilmProps) {
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
        onClick={() => onFavorite(curFilm.id, curFilm.featured)}
      >
        <StarIcon />
      </div>
    </>
  );
}

export default Film;
