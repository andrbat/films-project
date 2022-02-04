import { ifilm } from "../types/type";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GroupsIcon from "@mui/icons-material/Groups";
import StarIcon from "@mui/icons-material/Star";
import "./film.css";

interface FilmProps {
  curFilm: ifilm;
  handlerClick: (d: string) => void;
}

function Film({ curFilm, handlerClick }: FilmProps) {
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
      <div className="film_featured"></div>
      <StarIcon
        sx={{
          position: "absolute",
          display: "inline-block",
          top: 0,
          right: 0,
          color: curFilm.featured ? "yellow" : "#e2e2e2",
        }}
      />
    </>
  );
}

export default Film;
