import { Grid } from "@mui/material";
import { film } from "../types/type";

interface HomeProps {
  curFilms: film[];
}

function Home({ curFilms }: HomeProps) {
  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {curFilms.map((e) => (
        <Grid item xs={4} key={e.id}>
          <div>
            <img src={"." + e.img} alt="" />
          </div>
        </Grid>
      ))}
    </Grid>
  );
}

export default Home;
