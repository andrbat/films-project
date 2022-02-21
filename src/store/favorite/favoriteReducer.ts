import { FavoriteState } from "../storeTypes";
import {
  FavoriteActions,
  InitFavorite,
  SetFavorite,
  ToggleFavorite,
} from "./favoriteActions";

const initialState: FavoriteState = {
  favorite: [],
};

export default function favoriteReducer(
  state = initialState,
  action: FavoriteActions
) {
  switch (action.type) {
    case InitFavorite:
      return { ...initialState };
    case SetFavorite:
      return { ...state, favorite: action.payload.filmsId };
    case ToggleFavorite:
      if (action.payload.checkFav) {
        return {
          ...state,
          favorite: state.favorite.filter(
            (e) => !(e === action.payload.filmId)
          ),
        };
      } else {
        return {
          ...state,
          favorite: [...state.favorite, action.payload.filmId],
        };
      }

    default:
      return state;
  }
}
