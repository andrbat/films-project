import { FilmsState } from "../storeTypes";
import {
  DeleteFilm,
  EditFilm,
  FetchFilmsError,
  FetchFilmsStart,
  FilmsActions,
  GetFilms,
} from "./filmsActions";

const initialState: FilmsState = {
  films: [],
  loading: false,
};

export default function filmsReducer(
  state = initialState,
  action: FilmsActions
) {
  switch (action.type) {
    case FetchFilmsStart:
      return { ...state, loading: true };
    case FetchFilmsError:
      return { ...state, loading: false };
    case GetFilms:
      return { ...state, films: action.payload.films, loading: false };
    case DeleteFilm:
      return {
        ...state,
        films: state.films.filter((el) => el.id !== action.payload.idx),
      };
    case EditFilm:
      const idx = state.films.findIndex((e) => e.id === action.payload.film.id);
      const newS = [...state.films];
      newS[idx] = action.payload.film;
      return { ...state, films: newS };

    default:
      return state;
  }
}
