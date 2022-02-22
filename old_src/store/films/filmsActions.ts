import { ifilm } from "../../types/type";

export const GetFilms = "GET Films";
export const AddFilm = "ADD Film";
export const EditFilm = "Edit Film";
export const DeleteFilm = "DELETE Film";
export const MarkFavoriteFilms = "MARK Films";

export const FetchFilmsStart = "FETCH FILMS START";
export const FetchFilmsError = "FETCH FILMS Error";

export function actionFetchFilmsStart() {
  return {
    type: FetchFilmsStart,
  } as const;
}
type FetchFilmsStartType = ReturnType<typeof actionFetchFilmsStart>;

export function actionFetchFilmsError() {
  return {
    type: FetchFilmsError,
  } as const;
}
type FetchFilmsEroorType = ReturnType<typeof actionFetchFilmsError>;

export function actionSetFilms(films: ifilm[]) {
  return {
    type: GetFilms,
    payload: { films },
  } as const;
}
type SetFilmsType = ReturnType<typeof actionSetFilms>;

export function actionDeleteFilm(idx: number) {
  return {
    type: DeleteFilm,
    payload: { idx },
  } as const;
}
type DeleteFilmType = ReturnType<typeof actionDeleteFilm>;

export function actionEditFilm(film: ifilm) {
  return {
    type: EditFilm,
    payload: { film },
  } as const;
}
type EditFilmType = ReturnType<typeof actionEditFilm>;

export function actionMarkFilms(favoriteFilms: number[]) {
  return {
    type: MarkFavoriteFilms,
    payload: { favoriteFilms },
  } as const;
}
type MarkFilmsType = ReturnType<typeof actionMarkFilms>;

export type FilmsActions =
  | FetchFilmsStartType
  | SetFilmsType
  | DeleteFilmType
  | EditFilmType
  | FetchFilmsEroorType
  | MarkFilmsType;
