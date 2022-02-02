import { Button, Grid } from "@mui/material";
import { film } from "../types/type";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GroupsIcon from "@mui/icons-material/Groups";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import "./home.css";

interface HomeProps {
  curFilms: film[];
}

function Home({ curFilms }: HomeProps) {
  return (
    <Grid container spacing={2}>
      {curFilms.map((e) => (
        <Grid item xs={12} md={6} xl={4} key={e.id}>
          <div className="home-film">
            <img className="home-film_img" src={"." + e.img} alt="" />
            <h2>{e.title}</h2>
            <h3>
              <GroupsIcon />
              &nbsp;
              {e.director}
            </h3>
            <h3>
              <AccessTimeIcon />
              &nbsp;
              {e.duration}
              &nbsp; min
            </h3>
            <div className="home-film_buttons">
              <Button
                variant="outlined"
                size="medium"
                startIcon={<NoteAltOutlinedIcon />}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                size="medium"
                color="error"
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </div>
            <div className="home-film_price">{"$ " + e.price}</div>
          </div>
        </Grid>
      ))}
    </Grid>
  );
}

export default Home;
