import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ifavoriteFilms, ifilm } from "../types/type";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import {
  deleteData,
  deleteFavoriteFilms,
  editData,
  emptyF,
  fetchData,
  fetchFavoriteFilms,
  postFavoriteFilms,
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
  actionSetFilms,
} from "../store/films/filmsActions";
import { actionInitUser, actionSetUser } from "../store/user/userActions";

export const UserContext = React.createContext({
  userEmail: "",
  isAdmin: false,
});

function App() {
  const films = useSelector((e: RootState) => e.films.films);
  const regUser = useSelector((e: RootState) => e.user.user);
  const [favoriteFilms, setFavoriteFilms] = useState<ifavoriteFilms[]>([]);

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
  }, []);

  useEffect(() => {
    // setFilms((oldS) => {
    //   const newS = [...oldS];
    //   newS.forEach(
    //     (e) =>
    //       (e.featured =
    //         favoriteFilms.findIndex((el) => el.filmid === e.id) === -1
    //           ? false
    //           : true)
    //   );
    //   return newS;
    // });
  }, [favoriteFilms]);

  function getFavorite(email: string) {
    if (!(email.length === 0)) {
      fetchFavoriteFilms(email)
        .then((val) => setFavoriteFilms(val))
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
    setFavoriteFilms([]);
    localStorage.removeItem("token");
    navigate("/");
  };

  const handlerSetFavorite = (filmId: number, checkFav: boolean) => {
    if (!(regUser.userEmail.length === 0)) {
      setFavoriteFilms((oldS) => {
        if (checkFav) {
          oldS
            .filter((e) => e.filmid === filmId)
            .forEach((e) => deleteFavoriteFilms(e.useremail, e.filmid));
          return oldS.filter((e) => !(e.filmid === filmId));
        } else {
          postFavoriteFilms(regUser.userEmail, filmId);
          return [...oldS, { useremail: regUser.userEmail, filmid: filmId }];
        }
      });
    }
  };

  return (
    <Box sx={{ maxWidth: "1400px", width: "100%", margin: "auto" }}>
      <UserContext.Provider value={regUser}>
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
                onFavorite={handlerSetFavorite}
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
      </UserContext.Provider>
    </Box>
  );
}

export default App;
