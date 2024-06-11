import { makeAutoObservable } from "mobx";
import { CharacterType } from "../../types/types";
// Question: Ovde ide mobx ?
// MobX implementation
class Characters {
  characters: CharacterType[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  newList(characterList: CharacterType[]) {
    this.characters = characterList;
  }
}

const store = new Characters();

export default store;
