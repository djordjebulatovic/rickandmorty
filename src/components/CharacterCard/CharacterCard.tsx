import { FC } from "react";
import styles from "./CharacterCard.module.scss";
import { CharacterType } from "../../types/types";
import Button from "../Button/Button";

interface ICharcterCardProps {
  character: CharacterType;
  clickEvent: any;
  handleEdit?: any;
  favorites?: boolean;
  unfavoriteCharacter?: any;
}

const CharacterCard: FC<ICharcterCardProps> = ({
  character,
  favorites,
  clickEvent,
  handleEdit,
  unfavoriteCharacter,
}) => {
  return (
    <div>
      <div className={styles["button-wrapper"]}>
        {favorites && (
          <>
            <Button testId="1" onClick={() => unfavoriteCharacter()}>
              Unfavorite
            </Button>
            <Button testId="2" onClick={handleEdit}>
              Edit
            </Button>
          </>
        )}
      </div>
      <div className={styles.container} onClick={clickEvent}>
        <img className={styles.card} src={character.image}></img>
      </div>
    </div>
  );
};

export default CharacterCard;
