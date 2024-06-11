// Todo: ovo je losa praksa,
// tipovi treba da budu grupisani uz biznis logiku i odvojeni po modulima,
// proci cemo zajedno folder strukturu na projektu pa cu dodatno pojasniti na sta mislim

export interface CharacterType {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: [];
  url: string;
  created: string;
}

// ne bi trebalo da bude export default, u slucaju da treba da se skalira,
// jos jedan razlog zasto preferiram named exports jeste zbog konzistentnosti importovanja samog elementa,
// default export intellisense cesto ne razaznaje, a i moze vise ljudi jednu komponentu da importuju po celom projektu i da je nazivaju kako im se cefne
// dok named exports moramo svi importovati sa istim nazivom, a u slucaju da naziv nije odgovarajuci u nekom fajlu, importu mozemo da damo alias import { smthng as smthnElse } from '...;
// more info https://medium.com/@heshramsis/understanding-the-difference-between-export-default-and-export-with-named-exports-in-javascript-f0569c221a3
