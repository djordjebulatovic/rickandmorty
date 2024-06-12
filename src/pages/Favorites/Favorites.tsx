import { useState } from "react";
import FavoritesList from "../../components/FavoritesList/FavoritesList";
import styles from "./Favorites.module.scss";

const getCharactersFromStorage = () =>
  JSON.parse(window.localStorage.getItem("favorites"));

function Favorites() {
  const [characters, setCharacters] = useState(getCharactersFromStorage());

  return (
    <div className={styles.container}>
      {characters && (
        <FavoritesList
          getCharactersFromStorage={() =>
            setCharacters(getCharactersFromStorage())
          }
          characters={characters}
        ></FavoritesList>
      )}
    </div>
  );
}

export default Favorites;
