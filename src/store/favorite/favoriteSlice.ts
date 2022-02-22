import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  deleteFavoriteFilms,
  fetchFavoriteFilms,
  postFavoriteFilms,
} from "../../components/data/data";
import { FavoriteState } from "../storeTypes";

const initialState: FavoriteState = {
  favorite: [],
};

export const fetchFavoriteByEmail = createAsyncThunk(
  "favorite/fetchFavoriteByEmail",
  async (email: string, thunkAPI) => {
    const response = await fetchFavoriteFilms(email);
    return response;
  }
);

export const markFavorite = createAsyncThunk(
  "favorite/toggleFavorite",
  async (
    favorite: {
      userEmail: string;
      filmId: number;
    },
    thunkAPI
  ) => {
    await postFavoriteFilms(favorite.userEmail, favorite.filmId);
    return favorite.filmId;
  }
);

export const unmarkFavorite = createAsyncThunk(
  "favorite/toggleFavorite",
  async (
    favorite: {
      userEmail: string;
      filmId: number;
    },
    thunkAPI
  ) => {
    await deleteFavoriteFilms(favorite.userEmail, favorite.filmId);
    return favorite.filmId;
  }
);

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    InitFavorite: (state) => {
      state = initialState;
    },
    SetFavorite: (state, action: PayloadAction<{ filmsId: number[] }>) => {
      state.favorite = action.payload.filmsId;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFavoriteByEmail.fulfilled, (state, action) => {
      state.favorite = action.payload.map((el) => Number(el.filmid));
    });
    builder.addCase(markFavorite.fulfilled, (state, action) => {
      state.favorite.push(action.payload);
    });
    builder.addCase(unmarkFavorite.fulfilled, (state, action) => {
      state.favorite = state.favorite.filter((e) => !(e === action.payload));
    });
  },
});

// Action creators are generated for each case reducer function
export const { InitFavorite, SetFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;
