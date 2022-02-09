import { Route, Routes, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ifilm } from "../types/type";
import "./App.css";
import { emptyF, fetchData } from "./data/data";
import Films from "./films";

import EditFilm from "./editFilm";
import { idTabs, NavigateTebs } from "./navigateTebs";
import { Home } from "./home";
import { SignUp } from "./signup";

function App() {
  const [films, setFilms] = useState<ifilm[]>([]);

  const location = useLocation();

  useEffect(() => {
    fetchData()
      .then((val) => {
        setFilms(val);
      })
      .catch((e) => console.log(e));
  }, []);

  const handleDelete = (id: string) => {
    setFilms((oldF) => {
      return oldF.filter((e) => e.id !== id);
    });
  };

  const handleAddEdit = (
    e: React.MouseEvent<HTMLButtonElement>,
    film: ifilm
  ) => {
    setFilms((oldF) => {
      const newF = [...oldF];
      const idx = newF.findIndex((e) => e.id === film.id);
      if (idx === -1) {
        newF.push(film);
      } else {
        newF[idx].img = film.img;
        newF[idx].title = film.title;
        newF[idx].director = film.director;
        newF[idx].duration = film.duration;
        newF[idx].price = film.price;
        newF[idx].description = film.description;
      }
      return newF;
    });
  };

  return (
    <Box sx={{ maxWidth: "1400px", width: "100%", margin: "auto" }}>
      <NavigateTebs idTab={idTabs(location.pathname)} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="films"
          element={
            <Films
              curFilms={films}
              onDelete={handleDelete}
              onEdit={handleAddEdit}
            />
          }
        />
        <Route
          path="addfilm"
          element={<EditFilm onNew={handleAddEdit} initVal={emptyF} />}
        />
        <Route path="signup" element={<SignUp />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </Box>
  );
}

export default App;
