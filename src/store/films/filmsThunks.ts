import { Dispatch } from "redux";
import {
  deleteData,
  editData,
  fetchData,
  pushData,
} from "../../components/data/data";
import { addNotify } from "../../components/notyfy";
import { ifilm } from "../../types/type";
import {
  actionDeleteFilm,
  actionEditFilm,
  actionFetchFilmsError,
  actionFetchFilmsStart,
  actionSetFilms,
} from "./filmsActions";

export const fetchFilmsThunk = () => async (dispatch: Dispatch) => {
  dispatch(actionFetchFilmsStart());
  try {
    const films = await fetchData();
    dispatch(actionSetFilms(films));
  } catch (error) {
    dispatch(actionFetchFilmsError());
    console.log("Request failed", error);
  }
};

export const deleteFilmThunk = (id: number) => async (dispatch: Dispatch) => {
  try {
    await deleteData(id);
    dispatch(actionDeleteFilm(id));
    addNotify("Complited !!!", false);
  } catch (error) {
    console.log("Request failed", error);
  }
};

export const addFilmThunk = (film: ifilm) => async (dispatch: Dispatch) => {
  try {
    await pushData(film);
    addNotify("Complited !!!", false);
  } catch (error) {
    console.log("Request failed", error);
  }
};

export const editFilmThunk = (film: ifilm) => async (dispatch: Dispatch) => {
  try {
    const ret = await editData(film);
    if (ret.ok) {
      dispatch(actionEditFilm(film));
      addNotify("Complited !!!", false);
    }
  } catch (error) {
    console.log("Request failed", error);
  }
};
