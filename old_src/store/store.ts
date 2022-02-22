import { configureStore } from "@reduxjs/toolkit";
import favoriteSlice from "./favorite/favoriteSlice";
import filmsReducer from "./films/filmsReducer";
import userReducer from "./user/userReducer";

export const store = configureStore({
  reducer: {
    films: filmsReducer,
    user: userReducer,
    favorite: favoriteSlice,
  },
});

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
