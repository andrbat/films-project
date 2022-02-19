import { configureStore } from "@reduxjs/toolkit";
import filmsSlice from "./films/filmsSlice";

export default configureStore({
  reducer: {
    films: filmsSlice,
  },
});
