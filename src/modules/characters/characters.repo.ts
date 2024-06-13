import { IApiResponse, api } from "../../api/api";
import { ICharacter, IGetCharactersParams } from "./characters.types";

class CharactersRepo {
  charactersUrl = "/character";

  getCharacters = (params?: IGetCharactersParams) => {
    return api.get<IApiResponse<ICharacter[]>>(this.charactersUrl, { params });
  };

  getCharactersLocalStorage = () => {
    return JSON.parse(window.localStorage.getItem("favorites"));
  };

  setCharactersLocalStorage = (characters: ICharacter[]) => {
    return window.localStorage.setItem("favorites", JSON.stringify(characters));
  };
}

export const charactersRepo = new CharactersRepo();
