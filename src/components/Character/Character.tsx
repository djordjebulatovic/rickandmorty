import { FC } from "react";
import { CharacterType } from "../../types/types";
import styles from "./Character.module.scss";
import Button from "../Button/Button";
import { Modal } from "antd";

interface ICharcterProps {
  character: CharacterType;
  show: boolean;
  handleStorage?: any;
  closeModal: any;
  favorite?: boolean;
}

const Character: FC<ICharcterProps> = ({
  character,
  closeModal,
  handleStorage,
  favorite,
  show,
}) => {
  return (
    <Modal
      className={styles.container}
      title={+character.name}
      open={show}
      onCancel={() => closeModal()}
      footer={null}
    >
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
          <Button testId="3" onClick={handleStorage}>
            Favorites
          </Button>
        </div>
      )}
    </Modal>
  );
};

export default Character;
