import { FilmsState } from "../storeTypes";
import {
  DeleteFilm,
  EditFilm,
  FetchFilmsError,
  FetchFilmsStart,
  FilmsActions,
  GetFilms,
  MarkFavoriteFilms,
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
      state.films[idx] = action.payload.film;
      return { ...state, films: [...state.films] };
    case MarkFavoriteFilms:
      state.films.forEach(
        (e) =>
          (e.featured =
            action.payload.favoriteFilms.findIndex((el) => el === e.id) === -1
              ? false
              : true)
      );
      return { ...state, films: [...state.films] };

    default:
      return state;
  }
}
