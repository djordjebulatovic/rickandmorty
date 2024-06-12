import to from "await-to-js";
import { makeAutoObservable } from "mobx";

import { ICharacter, IGetCharactersParams } from "./characters.types";
import { charactersService } from "./characters.service";

class CharactersStore {
  characters: ICharacter[] = [];
  selectedCharacterId: number | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get selectedCharacter() {
    return charactersService.findSelectedCharacter(
      this.characters,
      this.selectedCharacterId
    );
  }

  setSelectedCharacterId(characterId: number | null) {
    this.selectedCharacterId = characterId;
  }

  setCharacters(characterList: ICharacter[]) {
    this.characters = characterList;
  }

  getCharacters = async (params?: IGetCharactersParams) => {
    const [err, res] = await to(charactersService.getCharacters(params));
    if (err) return Promise.reject(err);
    this.setCharacters(res.data.results);
    return Promise.resolve(res.data.results);
  };
}

export const charactersStore = new CharactersStore();
