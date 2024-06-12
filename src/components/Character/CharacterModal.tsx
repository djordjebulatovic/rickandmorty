import { FC } from "react";
import styles from "./Character.module.scss";
import Button from "../Button/Button";
import { Modal } from "../Modal/Modal";
import { ModalsEnum } from "../../modules/modals/modal.constants";
import { charactersStore } from "../../modules/characters/characters.store";
import { observer } from "mobx-react";
import { ICharacter } from "../../modules/characters/characters.types";

interface ICharcterProps {
  handleStorage?: any;
  storageCharacter?: ICharacter;
  favorite?: boolean;
}

export const CharacterModal: FC<ICharcterProps> = observer(
  ({ handleStorage, favorite, storageCharacter }) => {
    const character = storageCharacter || charactersStore.selectedCharacter;

    return (
      <Modal
        // className={styles.container}
        title={+character?.name}
        modalName={ModalsEnum.CHARACTER}
        footer={null}
      >
        <div className={styles.wrapper}>
          <img src={character?.image}></img>
        </div>
        <div className={styles.wrapper}>
          <label>Name: {character?.name}</label>
          <label>Gender: {character?.gender}</label>
          <label>Species: {character?.species}</label>
          <label>Status: {character?.status}</label>
          <label>Location: {character?.location.name}</label>
          <label>Length: {character?.episode.length}</label>
          <label>Description:</label>
        </div>
        {!favorite && (
          <div className={styles["button-wrapper"]}>
            <Button testId="3" onClick={handleStorage}>
              Favorites
            </Button>
          </div>
        )}
      </Modal>
    );
  }
);
