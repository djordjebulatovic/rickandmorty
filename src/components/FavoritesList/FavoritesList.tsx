import { useState } from "react";
import { FC } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import EditCharacter from "../EditCharacter/EditCharacter";
import CharacterCard from "../CharacterCard/CharacterCard";
import Character from "../Character/Character";
import { CharacterType } from "../../types/types";
import {
  getLocalStorage,
  setLocalStorage,
} from "../Character/characters.service";

import styles from "./FavoritesList.module.scss";

interface IFavoritesListProps {
  characters: Array<CharacterType>;
  reRend: any;
}

const FavoritesList: FC<IFavoritesListProps> = ({ characters, reRend }) => {
  const [character, setCharacter] = useState<CharacterType>();
  const [show, setShow] = useState<boolean>(false);
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
    setShow(true);
    setCharacter(characters[i]);
  }

  function handleEditCharacterClick(i: number) {
    setShowEdit(true);
    setCharacter(characters[i]);
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
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
          <Character
            closeModal={() => setShow(false)}
            character={character}
            favorite={true}
            show={show}
          ></Character>
        )}
        {character && (
          <EditCharacter
            character={character}
            show={showEdit}
            closeEditModal={() => {
              setShowEdit(false);
              reRend();
            }}
          ></EditCharacter>
        )}
      </div>
    </div>
  );
};

export default FavoritesList;
