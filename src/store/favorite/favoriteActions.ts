export const SetFavorite = "SET Favorite";
export const InitFavorite = "INIT Favorite";
export const ToggleFavorite = "TOGGLE Favorite";

export function actionSetFavorite(filmsId: number[]) {
  return {
    type: SetFavorite,
    payload: { filmsId: filmsId },
  } as const;
}

export function actionInitFavorite() {
  return {
    type: InitFavorite,
  } as const;
}

export function actionToggleFavorite(
  userEmail: string,
  filmId: number,
  checkFav: boolean
) {
  return {
    type: ToggleFavorite,
    payload: { userEmail: userEmail, filmId: filmId, checkFav: checkFav },
  } as const;
}

type SetFavoriteType = ReturnType<typeof actionSetFavorite>;
type InitFavoriteType = ReturnType<typeof actionInitFavorite>;
type ToggleFavoriteType = ReturnType<typeof actionToggleFavorite>;

export type FavoriteActions =
  | SetFavoriteType
  | InitFavoriteType
  | ToggleFavoriteType;
