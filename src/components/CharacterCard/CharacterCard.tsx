import { FC } from "react";
import styles from "./CharacterCard.module.scss";
import CharacterType from "../../types/types";
import Button from "../Button/Button";

interface ICharcterCardProps {
  character: CharacterType;
  clickEvent: any;
  handleEdit?: any;
  favorites?: boolean;
  unf?: any;
}

const CharacterCard: FC<ICharcterCardProps> = ({
  character,
  favorites,
  clickEvent,
  handleEdit,
  unf,
}) => {
  return (
    <div>
    <div style={{display: 'flex', justifyContent:'space-between', marginBottom: '10px'}}>
    {favorites && <><Button onClick={() => unf()}>Unfavorite</Button>
      <Button onClick={handleEdit}>Edit</Button></>}
    </div>
      <div className={styles.container} onClick={clickEvent}>
        <img className={styles.card} src={character.image}></img>
      </div>
    </div>
  );
};

export default CharacterCard;
