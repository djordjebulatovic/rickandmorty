import { observer } from "mobx-react";
import { useEffect, useState, FC } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Pagination } from "antd";
import { toast } from "react-toastify";

import CharacterCard from "../CharacterCard/CharacterCard";
import { CharacterModal } from "../Character/CharacterModal";
import {
  getLocalStorage,
  setLocalStorage,
} from "../Character/characters.service";

import styles from "./List.module.scss";
import "react-toastify/dist/ReactToastify.css";
import { charactersStore } from "../../modules/characters/characters.store";
import { IGetCharactersParams } from "../../modules/characters/characters.types";
import { ModalsEnum } from "../../modules/modals/modal.constants";
import { modalStore } from "../../modules/modals/modal.store";

interface IListProps {}

// Todo: naming ne valja, mora biti specificnije, da pri citanju odmah stices utisak cime se ova komponenta bavi
const List: FC<IListProps> = observer(() => {
  // Todo: ne zelimo da stvari cuvamo u komponentama osim ako bas ne moramo iz nekog razloga, za ovo se koristi context ili neka state biblioteka kao sto je mobx
  // Question : Da li da ubacim i character, items i filtere u Characters klasu i da smanjim stateove?

  const [itemOffset, setItemOffset] = useState(0);
  const [items] = useState(0);
  // Todo: nemoj da ti filteri budu niz, lakse je da budu objekat tipa { name: '', species: '', gender : ''}, onda posle ne moras da findujes nista vec samo pristupas preko key-a
  const [filters, setFilters] = useState<IGetCharactersParams>({
    name: "",
    species: "",
    gender: "",
    status: "",
    page: "",
  });

  function handleLocalStorage() {
    var favorites = getLocalStorage();
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
    setLocalStorage(favorites);
    toast.success("Character added to favorites", {
      position: "top-center",
    });
  }

  useEffect(() => {
    if (itemOffset > 0) {
      filters.page = itemOffset.toString();
    }
    console.log("test");

    charactersStore.getCharacters(filters);
  }, [filters, itemOffset]);

  // useEffect(() => {
  //   charactersStore.getCharacters(filters);
  // }, []);

  // Todo: vise stvari ovde ima
  // - instaliraj await-to-js i vidi kako se onda radi err handling, uprosti sintaksu malo i cini codebase preglednijim dosta
  // - treba ti jedan fajl u kome ces da napravis axios instancu, njoj da podesis baseURL, tu mozes da joj dodas interceptore
  // https://axios-http.com/docs/instance , https://axios-http.com/docs/interceptors interceptori su mega korisni da bi smanjili
  // repetitivni posao kao err handling, response transformation  itd, tu se cesto dodaju i headeri koji se salju pri svakom requestu
  // - sami axios pozivi ne treba da se direktno pozivaju iz komponente, koristimo na svim projektima repo-service pattern https://pmichaels.net/service-repository-pattern/
  // svaki segment biznis logike ima svoj modul folder, unutar njega se nalaze .repo.ts, .service.ts, .types.ts, .constants.ts fajlovi,
  // repo -> abstraction layer oko axios poziva koji komuniciraju sa backendom
  // service -> middle layer izmedju store-a i repo-a, service poziva repo pozive kako store ne bi morao da komunicira direkt sa repo fajlom, tu se uz to nalazi i sva js logika koja je potrebna za taj modul
  // types -> svi tipovi usko vezani za entitete u tom modulu
  // constants -> neke konstante koje se koriste, pa, za svasta nesto, filterOptions, mapiranje raznoraznih stvari ili neke mape podataka, u sustini sve sto nije dinamicno ide tu
  // store -> tu se cuva sva data vezana za taj jedan modul
  // Procicemo ovo detaljno zajedno

  function handleCharacterClick(id: number) {
    modalStore.setOpenModal(ModalsEnum.CHARACTER);
    // setCharacter(store.characters[i]);
    charactersStore.setSelectedCharacterId(id);
  }

  // Todo: los naming ko procita debounced nema pojma sta se zapravo desava dok ne istrazi dublje
  const debouncedInput = useDebouncedCallback((name, value) => {
    handleIncrementClick(name, value);
  }, 1000);

  // Todo: zasto se ovo zove handleIncrementClick
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
        {/* Todo: sve komponente koje ne traze dva dela taga, treba da budu <SelfClosing /> kao pagination dole ispod */}
        {renderCharacters()}

        {/* Todo: ne budi lenj, imas vec sve kao stilove unutar scss modula, zasto bi ove ostavio inline  */}
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
