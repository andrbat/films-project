export interface ifilm {
  id: string;
  title: string;
  director: string;
  duration: number;
  price: number;
  img: string;
  featured: boolean;
  description: string;
}

export interface ifechuser {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface iuser {
  name: string;
  password: string;
  email: string;
  agree: boolean;
}
