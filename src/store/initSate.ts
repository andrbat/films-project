const initialState = {
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
  favoriteFilms: [],
  regUser: {},
};

export default initialState;
