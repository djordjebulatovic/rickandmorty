import axios from "axios";
// Question: Ovo bi islo u repo?
export const instance = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});
