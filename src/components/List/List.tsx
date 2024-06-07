import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./List.module.scss";
import CharacterCard from "../CharacterCard/CharacterCard";
import Character from "../Character/Character";
import CharacterType from "../../types/types";
import Filters from "../../types/filters";
import { FC } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Pagination } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IListProps {}

const List: FC<IListProps> = () => {
  const [characters, setCharacters] = useState<Array<CharacterType>>([]);
  const [character, setCharacter] = useState<CharacterType>();
  const [show, setShow] = useState<boolean>(false);
  const [itemOffset, setItemOffset] = useState(0);
  const [items, setItems] = useState(0);
  const [filters, setFilters] = useState<Array<Filters>>([
    { name: "name", value: "" },
    { name: "species", value: "" },
    { name: "gender", value: "" },
    { name: "status", value: "" },
  ]);

  function handleLocalStorage(character) {
    var favorites = JSON.parse(window.localStorage.getItem("favorites"));
    if(favorites == null) {
      favorites = [];
    }
    favorites.push(character);
    const added = favorites.filter((fav) => {
      if (fav.id === character.id) {
        return fav;
      }
    });

    if (added.length >= 2) {
      toast.error("Character already added", {
        position: "top-center",
      });
      return;
    }
    window.localStorage.setItem("favorites", JSON.stringify(favorites));
    toast.success("Character added to favorites", {
      position: "top-center",
    });
  }

  useEffect(() => {
    var url = "https://rickandmortyapi.com/api/character/";

    const params = new URLSearchParams();
    filters.forEach((element) => {
      params.append(element.name, element.value);
    });

    if (itemOffset > 0) {
      params.append("page", itemOffset.toString());
    }
    axios
      .get(url, {
        params,
      })
      .then(function (response) {
        const { results } = response.data;
        setCharacters(results);
        setItems(response.data.info.count);
      })
      .catch(function () {
        toast.error("No characters found", {
          position: "top-center",
        });
      });
  }, [filters, itemOffset]);

  function handleCharacterClick(i: number) {
    setShow(true);
    setCharacter(characters[i]);
  }

  const debounced = useDebouncedCallback((name, value) => {
    handleIncrementClick(name, value);
  }, 1000);

  function handleIncrementClick(name, value) {
    const nextFilters = filters.map((f) => {
      if (f.name === name) {
        f.value = value;
      }
      return f;
    });
    setFilters(nextFilters);
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.filters}>
          <input
            className={styles.input}
            placeholder="Name"
            name="name"
            onChange={(e) => {
              debounced("name", e.target.value);
            }}
            type="text"
          ></input>
          <select
            className={styles.input}
            name="status"
            onChange={(e) => {
              debounced("status", e.target.value);
            }}
          >
            <option value="">Choose Status</option>
            <option value="Alive">Alive</option>
            <option value="Dead">Dead</option>
            <option value="Unknown">Unknown</option>
          </select>
          <input
            className={styles.input}
            placeholder="Species"
            name="species"
            type="text"
            onChange={(e) => {
              debounced("species", e.target.value);
            }}
          ></input>
          <select
            className={styles.input}
            name="gender"
            onChange={(e) => {
              debounced("gender", e.target.value);
            }}
          >
            <option value="">Choose Gender</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Genderless">Genderless</option>
            <option value="Unknown">Unknown</option>
          </select>
        </div>
      </div>
      <div className={styles.wrapper}>
        {characters.map((character, i) => (
          <CharacterCard
            clickEvent={() => handleCharacterClick(i)}
            key={i}
            character={character}
          ></CharacterCard>
        ))}
        {show && character && (
          <Character
            closeModal={() => setShow(false)}
            character={character}
            handleStorage={() => handleLocalStorage(character)}
          ></Character>
        )}
        <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
          <Pagination
            defaultCurrent={itemOffset}
            total={items}
            defaultPageSize={20}
            onChange={(num) => setItemOffset(num)}
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default List;
