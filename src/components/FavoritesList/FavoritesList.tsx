import { useState } from "react";
import { FC } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import EditCharacter from "../EditCharacter/EditCharacter";
import CharacterCard from "../CharacterCard/CharacterCard";
import { CharacterModal } from "../Character/CharacterModal";
import { CharacterType } from "../../types/types";
import {
  getLocalStorage,
  setLocalStorage,
} from "../Character/characters.service";

import styles from "./FavoritesList.module.scss";
import { modalStore } from "../../modules/modals/modal.store";
import { ModalsEnum } from "../../modules/modals/modal.constants";

interface IFavoritesListProps {
  characters: Array<CharacterType>;
  getCharactersFromStorage: () => void;
}

const FavoritesList: FC<IFavoritesListProps> = ({
  characters,
  getCharactersFromStorage,
}) => {
  const [character, setCharacter] = useState<CharacterType>();

  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [listCharacters, setListCharacters] =
    useState<Array<CharacterType>>(characters);

  function unfavorite(obj) {
    var list = getLocalStorage().filter(function (el) {
      return el.id !== obj.id;
    });
    setLocalStorage(list);
    setListCharacters(list);
    toast.success("Character removed from favorites", {
      position: "top-center",
    });
  }

  function handleCharacterClick(i: number) {
    modalStore.setOpenModal(ModalsEnum.CHARACTER);
    setCharacter(characters[i]);
  }

  function handleEditCharacterClick(i: number) {
    setShowEdit(true);
    setCharacter(characters[i]);
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <CharacterModal favorite={true} storageCharacter={character} />
        {listCharacters.map((character, i) => (
          <CharacterCard
            clickEvent={() => handleCharacterClick(i)}
            key={i}
            character={character}
            favorites={true}
            unfavoriteCharacter={() => unfavorite(character)}
            handleEdit={() => handleEditCharacterClick(i)}
          ></CharacterCard>
        ))}
        {character && (
          <EditCharacter
            character={character}
            show={showEdit}
            closeEditModal={() => {
              setShowEdit(false);
              getCharactersFromStorage();
            }}
          ></EditCharacter>
        )}
      </div>
    </div>
  );
};

export default FavoritesList;
