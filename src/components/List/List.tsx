import { observer } from "mobx-react";
import { useEffect, useState, FC } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Pagination } from "antd";

import CharacterCard from "../CharacterCard/CharacterCard";
import { CharacterModal } from "../Character/CharacterModal";
import { charactersStore } from "../../modules/characters/characters.store";
import { IGetCharactersParams } from "../../modules/characters/characters.types";
import { ModalsEnum } from "../../modules/modals/modal.constants";
import { modalStore } from "../../modules/modals/modal.store";
import { toast } from "react-toastify";
import { charactersService } from "../../modules/characters/characters.service";

import styles from "./List.module.scss";
import "react-toastify/dist/ReactToastify.css";

const List: FC = observer(() => {
  const [itemOffset, setItemOffset] = useState(0);
  const [items] = useState(0);
  const [filters, setFilters] = useState<IGetCharactersParams>({
    name: "",
    species: "",
    gender: "",
    status: "",
    page: "",
  });

  function handleLocalStorage() {
    var favorites = charactersService.getCharactersLocalStorage();
    if (favorites == null) {
      favorites = [];
    }
    favorites.push(charactersStore.selectedCharacter);
    const added = favorites.filter((fav) => {
      if (fav.id === charactersStore.selectedCharacter?.id) {
        return fav;
      }
    });
    if (added.length >= 2) {
      toast.error("Character already added", {
        position: "top-center",
      });
      return;
    }
    charactersService.setCharactersLocalStorage(favorites);
    toast.success("Character added to favorites", {
      position: "top-center",
    });
  }

  useEffect(() => {
    if (itemOffset > 0) {
      filters.page = itemOffset.toString();
    }
    charactersStore.getCharacters(filters);
  }, [filters, itemOffset]);

  function handleCharacterClick(id: number) {
    modalStore.setOpenModal(ModalsEnum.CHARACTER);
    charactersStore.setSelectedCharacterId(id);
  }

  const debouncedInput = useDebouncedCallback((name, value) => {
    handleIncrementClick(name, value);
  }, 1000);

  function handleIncrementClick(name, value) {
    setFilters({ ...filters, [name]: value });
    setItemOffset(0);
  }

  const renderFilters = () => {
    return (
      <div className={styles.filters}>
        <input
          className={styles.input}
          placeholder="Name"
          name="name"
          onChange={(e) => {
            debouncedInput("name", e.target.value);
          }}
          type="text"
        ></input>
        <select
          className={styles.input}
          name="status"
          onChange={(e) => {
            debouncedInput("status", e.target.value);
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
            debouncedInput("species", e.target.value);
          }}
        ></input>
        <select
          className={styles.input}
          name="gender"
          onChange={(e) => {
            debouncedInput("gender", e.target.value);
          }}
        >
          <option value="">Choose Gender</option>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
          <option value="Genderless">Genderless</option>
          <option value="Unknown">Unknown</option>
        </select>
      </div>
    );
  };

  const renderCharacters = () => {
    return charactersStore.characters.map((character, i) => (
      <CharacterCard
        clickEvent={() => handleCharacterClick(character.id)}
        key={i}
        character={character}
      />
    ));
  };

  return (
    <div className={styles.container}>
      <CharacterModal handleStorage={() => handleLocalStorage()} />
      <div className={styles.header}>{renderFilters()}</div>
      <div className={styles.wrapper}>
        {renderCharacters()}
        <div className={styles.pagination}>
          <Pagination
            defaultCurrent={itemOffset}
            total={items}
            defaultPageSize={20}
            onChange={(num) => setItemOffset(num)}
          />
        </div>
      </div>
    </div>
  );
});

function CharactersList() {
  return (
    <>
      <header>Character List</header>
      <List />
    </>
  );
}

export default CharactersList;
