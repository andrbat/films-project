import { FilmsState } from "../storeTypes";
import { DeleteFilm, EditFilm, FilmsActions, GetFilms } from "./filmsActions";

const initialState: FilmsState = {
  films: [],
};

export default function filmsReducer(
  state = initialState,
  action: FilmsActions
) {
  switch (action.type) {
    case GetFilms:
      return { ...state, films: action.payload.films };
    case DeleteFilm:
      return {
        ...state,
        films: state.films.filter((el) => el.id !== action.payload.idx),
      };
    case EditFilm:
      const idx = state.films.findIndex((e) => e.id === action.payload.film.id);
      state.films[idx] = action.payload.film;
      return { ...state, films: [...state.films] };

    default:
      return state;
  }
}
