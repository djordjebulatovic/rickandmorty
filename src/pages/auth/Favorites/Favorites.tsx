import { useState } from "react";
import FavoritesList from "../../../components/FavoritesList/FavoritesList";
import Layout from "../Layout";
import styles from "./Favorites.module.scss";

function Favorites() {
  const [show, setShow] = useState<boolean>(false);

  const data = JSON.parse(window.localStorage.getItem("favorites"));

  return (
    <Layout>
    <div className={styles.container}>
      { data && <FavoritesList reRend={(prev) => setShow(!prev)} characters={data}></FavoritesList>}        
    </div>
    </Layout>
  );
}

export default Favorites;