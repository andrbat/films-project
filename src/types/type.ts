export interface ifilm {
  id: number;
  title: string;
  director: string;
  duration: number;
  price: number;
  img: string;
  featured: boolean;
  description: string;
}

export interface ifetchuser {
  name: string;
  email: string;
  password: string;
  isadmin: boolean;
}

export interface iuser {
  name: string;
  password: string;
  email: string;
  agree: boolean;
}

export interface ifavoriteFilms {
  useremail: string;
  filmid: number;
}
