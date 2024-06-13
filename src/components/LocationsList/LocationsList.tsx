import React, { FC } from "react";
import { observer } from "mobx-react";

import { locationsStore } from "../../modules/locations/locations.store";
import { Location } from "../Location/Location";

import styles from "./LocationsList.module.scss";

const List: FC = observer(() => {
  locationsStore.getLocations();

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {locationsStore.locations.map((location, i) => (
          <Location location={location} key={i} />
        ))}
      </div>
    </div>
  );
});

function LocationsList() {
  return (
    <>
      <header>Locations List</header>
      <List />
    </>
  );
}

export default LocationsList;
