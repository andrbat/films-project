import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { ifilm } from "../types/type";
import { useSelector, useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import "./App.css";
import {
  deleteData,
  editData,
  emptyF,
  fetchData,
  fetchFavoriteFilms,
  pushData,
} from "./data/data";
import Films from "./films";

import EditFilm from "./editFilm";
import { idTabs, NavigateTabs } from "./navigateTabs";
import { Home } from "./home";
import { SignUp } from "./signup";
import { addNotify } from "./notyfy";
import { RootState } from "../store/storeTypes";
import {
  actionDeleteFilm,
  actionEditFilm,
  actionMarkFilms,
  actionSetFilms,
} from "../store/films/filmsActions";
import { actionInitUser, actionSetUser } from "../store/user/userActions";
import {
  actionInitFavorite,
  actionSetFavorite,
} from "../store/favorite/favoriteActions";

function App() {
  const films = useSelector((e: RootState) => e.films.films);
  const favoriteFilms = useSelector((e: RootState) => e.favorite.favorite);

  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  function getFilms() {
    fetchData()
      .then((val: ifilm[]) => {
        dispatch(actionSetFilms(val));
      })
      .catch((e) => console.log("Request failed", e));
  }

  useEffect(() => {
    getFilms();
    const token = localStorage.getItem("token");
    if (token !== null) {
      try {
        const decoded: { email: string; isadmin: string } = jwt_decode(token);
        dispatch(actionSetUser(decoded.email, decoded.isadmin === "true"));
        getFavorite(decoded.email);
      } catch (error) {
        console.log("decoded JWT: ", error);
      }
    }
  }, []);

  useEffect(() => {
    dispatch(actionMarkFilms(favoriteFilms));
  }, [favoriteFilms]);

  function getFavorite(email: string) {
    if (!(email.length === 0)) {
      fetchFavoriteFilms(email)
        .then((val: { email: string; filmid: string }[]) =>
          dispatch(actionSetFavorite(val.map((el) => Number(el.filmid))))
        )
        .catch((e) => console.log("Request failed", e));
    }
  }

  const handleDelete = (id: number) => {
    deleteData(id)
      .then((val) => {
        dispatch(actionDeleteFilm(id));
        addNotify("Complited !!!", false);
      })
      .catch((e) => console.log("Request failed", e));
  };

  const handleAddFilm = (film: ifilm) => {
    pushData(film)
      .then((val) => {
        getFilms();
        addNotify("Complited !!!", false);
      })
      .catch((e) => console.log("Request failed (push)", e));
  };

  const handleEditFilm = (film: ifilm) => {
    editData(film)
      .then((val) => {
        if (val.ok) {
          dispatch(actionEditFilm(film));
          addNotify("Complited !!!", false);
        }
      })
      .catch((e) => console.log("Request failed", e));
  };

  const handleNewUser = (userEmail: string, isAdmin: boolean) => {
    dispatch(actionSetUser(userEmail, isAdmin));
    navigate("/films");
  };

  const handlerLogin = (useremail: string, isadmin: boolean) => {
    dispatch(actionSetUser(useremail, isadmin));
    navigate("/films");
    getFavorite(useremail);
  };

  const handlerLogOut = () => {
    dispatch(actionInitUser());
    dispatch(actionInitFavorite());
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Box sx={{ maxWidth: "1400px", width: "100%", margin: "auto" }}>
      <NavigateTabs
        idTab={idTabs(location.pathname)}
        onLogOut={handlerLogOut}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="films"
          element={
            <Films
              curFilms={films}
              onDelete={handleDelete}
              onEdit={handleEditFilm}
            />
          }
        />
        <Route
          path="addfilm"
          element={<EditFilm onNew={handleAddFilm} initVal={emptyF} />}
        />
        <Route
          path="signup"
          element={<SignUp onSave={handleNewUser} onLogin={handlerLogin} />}
        />
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
