import { IApiResponse, api } from "../../api/api";
import { ICharacter, IGetCharactersParams } from "./characters.types";

class CharactersRepo {
  charactersUrl = "/character";

  getCharacters = (params?: IGetCharactersParams) => {
    return api.get<IApiResponse<ICharacter[]>>(this.charactersUrl, { params });
  };
}

export const charactersRepo = new CharactersRepo();
