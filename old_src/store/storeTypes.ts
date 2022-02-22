import { ifilm, iRegUser } from "../types/type";

export interface FilmsState {
  films: ifilm[];
  loading: boolean;
}

export interface UserState {
  user: iRegUser;
}

export interface FavoriteState {
  favorite: number[];
}

export interface RootState {
  films: FilmsState;
  user: UserState;
  favorite: FavoriteState;
}
