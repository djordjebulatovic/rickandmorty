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

  getCharactersLocalStorage = () => {
    return charactersRepo.getCharactersLocalStorage();
  };

  setCharactersLocalStorage = (characters: ICharacter[]) => {
    return charactersRepo.setCharactersLocalStorage(characters);
  };

  editCharacterInLocalStorage = (character, value) => {
    const characters = charactersRepo.getCharactersLocalStorage();

    const char = characters.find((ch) => {
      return ch.id === character.id;
    });

    characters.find((ch) => {
      if (ch.id === character.id) {
        if (value.name !== undefined) {
          char.name = value.name;
        }
        if (value.species !== undefined) {
          char.species = value.species;
        }
        if (value.gender !== undefined) {
          char.gender = value.gender;
        }
        if (value.status !== undefined) {
          char.status = value.status;
        }
      }

      const index = characters.findIndex((c) => c.id === char.id);
      characters[index] = char;
      charactersRepo.setCharactersLocalStorage(characters);
    });
  };

  unfavoriteCharacter = (character: ICharacter) => {
    var list = charactersRepo.getCharactersLocalStorage().filter(function (ch) {
      return ch.id !== character.id;
    });
    charactersRepo.setCharactersLocalStorage(list);
    return list;
  };
}

export const charactersService = new CharactersService();
