import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ifilm, iuser } from "../types/type";
import "./App.css";
import {
  deleteData,
  editData,
  emptyF,
  fetchData,
  pushData,
  pushUser,
  uid,
} from "./data/data";
import Films from "./films";

import EditFilm from "./editFilm";
import { idTabs, NavigateTebs } from "./navigateTebs";
import { Home } from "./home";
import { SignUp } from "./signup";
import { addNotify } from "./notyfy";
import SignOut from "./signout";

export const UserContext = React.createContext("");

function App() {
  const [films, setFilms] = useState<ifilm[]>([]);
  const [regUser, setRegUser] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData()
      .then((val) => {
        setFilms(val);
      })
      .catch((e) => console.log("Request failed", e));
  }, []);

  const handleDelete = (id: string) => {
    deleteData(id)
      .then((val) => {
        // console.log(id, val);
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
        .catch((e) => console.log("Request failed", e));
    } else {
      editData(film)
        .then((val) => {
          newF[idx] = film;
          setFilms(newF);
          addNotify("Complited !!!", false);
        })
        .catch((e) => console.log("Request failed", e));
    }
  };

  const handleNewUser = (curUser: iuser) => {
    const user = {
      id: uid(),
      name: curUser.name,
      email: curUser.email,
      password: curUser.password,
    };
    pushUser(user)
      .then((val) => {
        addNotify("Complited !!!", false);
        setRegUser(user.id);
        navigate("/films");
      })
      .catch((e) => console.log("Request failed", e));
  };

  const handlerLogin = (userId: string) => {
    setRegUser(userId);
    navigate("/films");
  };

  return (
    <Box sx={{ maxWidth: "1400px", width: "100%", margin: "auto" }}>
      <UserContext.Provider value={regUser}>
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
          <Route
            path="signup"
            element={<SignUp onSave={handleNewUser} onLogin={handlerLogin} />}
          />
          <Route path="signout" element={<SignOut />} />

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
