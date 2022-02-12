import { ifilm, ifetchuser } from "../../types/type";

// export function uid() {
//   return Date.now().toString(36) + Math.random().toString(36).substr(2);
// }

// const restApiUrl = "http://192.168.0.80/restapi/";
// const restApiUrl = "http://andrbat.pp.ua/restapi/";
const restApiUrl = "http://192.168.0.10:8000/";

export async function fetchData() {
  const response = await fetch(`${restApiUrl}films`, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
}

export async function pushData(data: ifilm) {
  const response = await fetch(`${restApiUrl}films`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify(data),
  });
  return response;
}

export async function editData(data: ifilm) {
  const response = await fetch(`${restApiUrl}films/${data.id}`, {
    method: "PUT", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify(data),
  });
  return response;
}

export async function deleteData(id: number) {
  const response = await fetch(`${restApiUrl}films/${id}`, {
    method: "DELETE", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  return response;
}

// ---------- users -----------------

export async function fetchUser(email: string, password: string) {
  const response = await fetch(`${restApiUrl}users`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  });
  return response;
}

export async function pushUser(data: ifetchuser) {
  const response = await fetch(`${restApiUrl}users`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}

export async function fetchFavoriteFilms(email: string) {
  const response = await fetch(`${restApiUrl}favorite?email=${email}`, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
}

export async function postFavoriteFilms(useremail: string, filmid: number) {
  const response = await fetch(`${restApiUrl}favorite`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ useremail: useremail, filmid: filmid }),
  });
  await response.json().catch((e) => console.log("Request failed", e));
}

export async function deleteFavoriteFilms(useremail: string, filmid: number) {
  const response = await fetch(`${restApiUrl}favorite/${useremail}`, {
    method: "DELETE", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    },
  });
  await response.json().catch((e) => console.log("Request failed", e));
}

//
//
export const emptyF: ifilm = {
  id: -1,
  title: "",
  director: "",
  duration: 0,
  price: -1,
  img: "",
  featured: false,
  description: "",
};

//
//
//
//
//
//
//
//
//

// export const testfilms: ifilm[] = [
//   {
//     id: uid(),
//     title: "Шоу андроидов / Override / R.I.A. (2021)",
//     director: "Ричард Колтон",
//     duration: 93,
//     price: 48.3,
//     img: "/img/override.jpeg",
//     featured: false,
//     description:
//       "Риа снова и снова переживает один и тот же день: по утрам она просыпается рядом со своим мужем Джеком, но каждый раз это другой мужчина. Ведь она — андроид. Она живет идеальной жизнью домохозяйки, пока однажды ей всё не надоедает. Риа решает сбежать из дома, взяв очередного Джека в заложники.",
//   },
//   {
//     id: uid(),
//     title: "Пылающее море / Nordsjoen / The Burning Sea (2021)",
//     director: "Йон Андреас Андерсен",
//     duration: 88,
//     price: 31.2,
//     img: "/img/fire_sea.jpeg",
//     featured: true,
//     description:
//       "Мощный взрыв в одночасье затягивает огромную нефтяную платформу на дно Северного моря. Выяснив причину катастрофы, группа ученых понимает — это было лишь началом. Крупнейшая в истории подводная трещина грозит обрушением десятка платформ в районе и ударом по всему побережью. Объявляется эвакуация, но небольшая спасательная миссия отправляется к эпицентру аварии, чтобы спасти застрявшего там героя. Они еще не знают, что образовавшееся нефтяное пятно вот-вот загорится, и выбираться им придётся по бескрайнему пылающему морю.",
//   },
//   {
//     id: uid(),
//     title: "Акулы / Рекуин / The Requin (2022)",
//     director: "Ле-Ван Киэт",
//     duration: 110,
//     price: 55.2,
//     img: "/img/requin.jpeg",
//     featured: false,
//     description:
//       "Пара во время романтического отдыха оказывается в море, когда тропический шторм сметает их виллу. Чтобы выжить, они вынуждены бороться со стихией, пока внизу кружат акулы.",
//   },
//   {
//     id: uid(),
//     title: "Одинокий волк / Clean (2020)",
//     director: "Пол Солет",
//     duration: 88,
//     price: 35.2,
//     img: "/img/clean.jpeg",
//     featured: true,
//     description:
//       "Мучимый своим прошлым, мусорщик по имени Клин пытается вести спокойную жизнь и получить искупление. Однако вскоре ему предстоит вновь столкнуться со своим прошлым, полным насилия и жестокости.",
//   },
//   {
//     id: uid(),
//     title: "День курка / Boss Level (2020)",
//     director: "Джо Карнахан",
//     duration: 112,
//     price: 55.2,
//     img: "/img/boss_level.jpeg",
//     featured: false,
//     description:
//       "Каждый день бывший спецназовец Рой Палвер начинает, отбиваясь от всевозможных убийц: здоровяка с мачете, пулемётчика на вертолёте, двух красоток на быстром авто, виртуозно владеющей мечом китаянки, карлика-подрывника и прочих психопатов. И каждый раз Рой неизменно погибает и снова оказывается в том же дне. Однажды он узнаёт, что его бывшая жена, которая занималась секретными разработками, мертва. Рой решает докопаться до причин её смерти, а заодно выяснить, как ему самому выбраться из этой невыносимой временной петли.",
//   },
// ];
