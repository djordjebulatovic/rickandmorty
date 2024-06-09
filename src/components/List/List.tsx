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

// Todo: naming ne valja, mora biti specificnije, da pri citanju odmah stices utisak cime se ova komponenta bavi
const List: FC<IListProps> = () => {
  // Todo: ne zelimo da stvari cuvamo u komponentama osim ako bas ne moramo iz nekog razloga, za ovo se koristi context ili neka state biblioteka kao sto je mobx
  const [characters, setCharacters] = useState<Array<CharacterType>>([]);
  const [character, setCharacter] = useState<CharacterType>();
  const [show, setShow] = useState<boolean>(false);
  const [itemOffset, setItemOffset] = useState(0);
  const [items, setItems] = useState(0);
  // Todo: nemoj da ti filteri budu niz, lakse je da budu objekat tipa { name: '', species: '', gender : ''}, onda posle ne moras da findujes nista vec samo pristupas preko key-a
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

  // Todo: los naming ko procita debounced nema pojma sta se zapravo desava dok ne istrazi dublje
  const debounced = useDebouncedCallback((name, value) => {
    handleIncrementClick(name, value);
  }, 1000);

  // Todo: zasto se ovo zove handleIncrementClick
  function handleIncrementClick(name, value) {
    // Todo: Da imas filtere kao objekat a ne niz ovaj korak bi bio nepotreban
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
          {/* Todo: filteri bi trebalo da stoje van liste, pazi onda kako ces da datu prosledjujes,
           najbolje je imati filter.context / store kako bi filteri bili segmentirani i dostupni svuda bez prop drillovanja , uzmi ant input i ant select za to*/}
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
        {/* Todo: sve komponente koje ne traze dva dela taga, treba da budu <SelfClosing /> kao pagination dole ispod */}
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
        {/* Todo: ne budi lenj, imas vec sve kao stilove unutar scss modula, zasto bi ove ostavio inline  */}
        <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
          <Pagination
            defaultCurrent={itemOffset}
            total={items}
            defaultPageSize={20}
            onChange={(num) => setItemOffset(num)}
          />
        </div>
      </div>
      {/* Todo: izbaciti u app */}
      <ToastContainer />
    </div>
  );
};

export default List;
