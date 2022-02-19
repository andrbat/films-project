import { FavoriteState } from "../storeTypes";
import { FavoriteActions, InitFavorite, SetFavorite } from "./favoriteActions";

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

    default:
      return state;
  }
}
