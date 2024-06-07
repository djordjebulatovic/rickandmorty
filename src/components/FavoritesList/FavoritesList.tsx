import { useState } from "react";
import styles from "./FavoritesList.module.scss";
import CharacterCard from "../CharacterCard/CharacterCard";
import Character from "../Character/Character";
import CharacterType from "../../types/types";
import { FC } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditCharacter from "../EditCharacter/EditCharacter";

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
    var list = JSON.parse(window.localStorage.getItem("favorites")).filter(
      function (el) {
        return el.id !== obj.id;
      }
    );
    window.localStorage.setItem("favorites", JSON.stringify(list));
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
            unf={() => unfavorite(character)}
            handleEdit={() => handleEditCharacterClick(i)}
          ></CharacterCard>
        ))}
        {show && character && (
          <Character
            closeModal={() => setShow(false)}
            character={character}
            favorite={true}
          ></Character>
        )}
        {showEdit && character && (
          <EditCharacter
            character={character}
            closeEditModal={() => {setShowEdit(false);reRend();}}
          ></EditCharacter>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default FavoritesList;
