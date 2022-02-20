import { ifilm } from "../../types/type";

export const GetFilms = "GET Films";
export const AddFilm = "ADD Film";
export const EditFilm = "Edit Film";
export const DeleteFilm = "DELETE Film";
export const MarkFavoriteFilms = "MARK Films";

export function actionSetFilms(films: ifilm[]) {
  return {
    type: GetFilms,
    payload: { films },
  } as const;
}

export function actionDeleteFilm(idx: number) {
  return {
    type: DeleteFilm,
    payload: { idx },
  } as const;
}

export function actionEditFilm(film: ifilm) {
  return {
    type: EditFilm,
    payload: { film },
  } as const;
}

export function actionMarkFilms(favoriteFilms: number[]) {
  return {
    type: MarkFavoriteFilms,
    payload: { favoriteFilms },
  } as const;
}

type SetFilmsType = ReturnType<typeof actionSetFilms>;
type DeleteFilmType = ReturnType<typeof actionDeleteFilm>;
type EditFilmType = ReturnType<typeof actionEditFilm>;
type MarkFilmsType = ReturnType<typeof actionMarkFilms>;

export type FilmsActions =
  | SetFilmsType
  | DeleteFilmType
  | EditFilmType
  | MarkFilmsType;
