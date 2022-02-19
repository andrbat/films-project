export const SetFavorite = "SET Favorite";
export const InitFavorite = "INIT Favorite";

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

type SetFavoriteType = ReturnType<typeof actionSetFavorite>;
type InitFavoriteType = ReturnType<typeof actionInitFavorite>;

export type FavoriteActions = SetFavoriteType | InitFavoriteType;
