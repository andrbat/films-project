import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ifavoriteFilms, ifilm } from "../types/type";
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

export const UserContext = React.createContext({
  userEmail: "",
  isAdmin: false,
});

function App() {
  const [films, setFilms] = useState<ifilm[]>([]);
  const [regUser, setRegUser] = useState({ userEmail: "", isAdmin: false });
  const [favoriteFilms, setFavoriteFilms] = useState<ifavoriteFilms[]>([]);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData()
      .then((val) => {
        setFilms(val);
      })
      .catch((e) => console.log("Request failed", e));
  }, []);

  useEffect(() => {
    setFilms((oldS) => {
      const newS = [...oldS];
      newS.forEach(
        (e) =>
          (e.featured =
            favoriteFilms.findIndex((el) => el.filmid === e.id) === -1
              ? false
              : true)
      );
      return newS;
    });
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
        setFilms((oldF) => {
          return oldF.filter((e) => e.id !== id);
        });
        addNotify("Complited !!!", false);
      })
      .catch((e) => console.log("Request failed", e));
  };

  const handleAddEdit = (film: ifilm) => {
    const newF = [...films];
    const idx = newF.findIndex((e) => e.id === film.id);
    if (idx === -1) {
      pushData(film)
        .then((val) => {
          newF.push(film);
          setFilms(newF);
          addNotify("Complited !!!", false);
        })
        .catch((e) => console.log("Request failed (push)", e));
    } else {
      editData(film)
        .then((val) => {
          if (val.ok) {
            newF[idx] = film;
            setFilms(newF);
            addNotify("Complited !!!", false);
          }
        })
        .catch((e) => console.log("Request failed", e));
    }
  };

  const handleNewUser = (userEmail: string, isAdmin: boolean) => {
    setRegUser({ userEmail: userEmail, isAdmin: isAdmin });
    navigate("/films");
  };

  const handlerLogin = (useremail: string, isadmin: boolean) => {
    setRegUser((oldS) => {
      return { ...oldS, userEmail: useremail, isAdmin: isadmin };
    });
    navigate("/films");
    getFavorite(useremail);
  };

  const handlerLogOut = () => {
    setRegUser({ ...{ userEmail: "", isAdmin: false } });
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
                onEdit={handleAddEdit}
                onFavorite={handlerSetFavorite}
              />
            }
          />
          <Route
            path="addfilm"
            element={<EditFilm onNew={handleAddEdit} initVal={emptyF} />}
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
