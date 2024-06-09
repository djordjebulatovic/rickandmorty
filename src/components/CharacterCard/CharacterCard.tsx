import { FC } from "react";
import styles from "./CharacterCard.module.scss";
import CharacterType from "../../types/types";
import Button from "../Button/Button";

interface ICharcterCardProps {
  character: CharacterType;
  clickEvent: any;
  handleEdit?: any;
  favorites?: boolean;
  // Todo: nemoj da zrtvujes razumljivost/citljivost koda da bi ustedeo par karaktera pri namingu funkcije, 
  // funkcija mora da se zove tako da je bez razmisljanja jasno sta radi, a koliko ce dugacak naziv funkcije biti zavisi od use case-a,
  // skroz je legit da funkcija ima 4-5-6 reci ako je toliko neophodno da bi sve bilo jasno
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
