import { Dispatch } from "redux";
import { fetchData } from "../../components/data/data";
import {
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
