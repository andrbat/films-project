import { createSlice } from "@reduxjs/toolkit";

export const filmsSlice = createSlice({
  name: "films",
  initialState: {
    films: [
      {
        id: 1,
        title: "Шоу андроидов / Override / R.I.A. (2021)",
        director: "Ричард Колтон",
        duration: 93,
        price: 48.3,
        img: "/img/override.jpeg",
        featured: false,
        description:
          "Риа снова и снова переживает один и тот же день: по утрам она просыпается рядом со своим мужем Джеком, но каждый раз это другой мужчина. Ведь она — андроид. Она живет идеальной жизнью домохозяйки, пока однажды ей всё не надоедает. Риа решает сбежать из дома, взяв очередного Джека в заложники.",
      },
    ],
  },
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.films[0].id = 2;
    },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
  },
});

// Action creators are generated for each case reducer function
export const { increment } = filmsSlice.actions;

export default filmsSlice.reducer;
