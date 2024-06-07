import { FC } from "react";
import CharacterType from "../../types/types";
import styles from "./Character.module.scss";
import Button from "../Button/Button";

interface ICharcterProps {
  character: CharacterType;
  handleStorage?: any;
  closeModal: any;
  favorite?: boolean;
}

const Character: FC<ICharcterProps> = ({
  character,
  closeModal,
  handleStorage,
  favorite,
}) => {
  return (
    <div className={styles.container}>
      <button className={styles.close} onClick={closeModal}>
        X
      </button>
      <div className={styles.wrapper}>
        <img src={character.image}></img>
      </div>
      <div className={styles.wrapper}>
        <label>Name: {character.name}</label>
        <label>Gender: {character.gender}</label>
        <label>Species: {character.species}</label>
        <label>Status: {character.status}</label>
        <label>Location: {character.location.name}</label>
        <label>Length: {character.episode.length}</label>
        <label>Description:</label>
      </div>
      {!favorite && (
        <div className={styles["button-wrapper"]}>
          <Button onClick={handleStorage}>Favorites</Button>
        </div>
      )}
    </div>
  );
};

export default Character;
