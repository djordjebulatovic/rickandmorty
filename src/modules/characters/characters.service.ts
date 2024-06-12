import { charactersRepo } from "./characters.repo";
import { ICharacter, IGetCharactersParams } from "./characters.types";

class CharactersService {
  findSelectedCharacter = (
    characters: ICharacter[],
    selectedCharacterId: number | null
  ) => {
    return characters.find((char) => char.id === selectedCharacterId);
  };

  getCharacters = (params?: IGetCharactersParams) => {
    return charactersRepo.getCharacters(params);
  };
}

export const charactersService = new CharactersService();
