import { Route, Routes, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { ifilm } from "../types/type";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import { emptyF } from "./data/data";
import Films from "./films";

import EditFilm from "./editFilm";
import { idTabs, NavigateTabs } from "./navigateTabs";
import { Home } from "./home";
import { SignUp } from "./signup";
import { RootState } from "../store/storeTypes";
import { addFilmThunk, fetchFilmsThunk } from "../store/films/filmsThunks";
import {
  fetchFavoriteByEmail,
  InitFavorite,
} from "../store/favorite/favoriteSlice";
import { getUserTokenThunk } from "../store/user/userThunks";

function App() {
  const films = useSelector((e: RootState) => e.films.films);
  const loading = useSelector((e: RootState) => e.films.loading);
  const user = useSelector((e: RootState) => e.user.user);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFilmsThunk());
    dispatch(getUserTokenThunk());
  }, []);

  useEffect(() => {
    user.userEmail.length === 0
      ? dispatch(InitFavorite())
      : dispatch(fetchFavoriteByEmail(user.userEmail));
  }, [user]);

  const handleAddFilm = (film: ifilm) => {
    dispatch(addFilmThunk(film));
    dispatch(fetchFilmsThunk());
  };

  return (
    <Box sx={{ maxWidth: "1400px", width: "100%", margin: "auto" }}>
      <NavigateTabs idTab={idTabs(location.pathname)} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="films"
          element={loading ? <h1>Loading ...</h1> : <Films curFilms={films} />}
        />
        <Route
          path="addfilm"
          element={<EditFilm onNewEdit={handleAddFilm} initVal={emptyF} />}
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
