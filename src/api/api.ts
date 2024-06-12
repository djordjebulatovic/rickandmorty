import axios from "axios";

export interface IApiResponse<IData = any> {
  info: {
    count: number;
    pages: number;
    prev: string;
    next: string;
  };
  results: IData;
}

export const api = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((res) => {
  // console.log(res);
  return res;
});

api.interceptors.response.use((res) => {
  // console.log(res);
  return res;
});
