import React, { FC } from "react";
import { ILocation } from "../../modules/locations/locations.types";

import styles from "./Location.module.scss";

interface ILocationProps {
  location: ILocation;
}

export const Location: FC<ILocationProps> = ({ location }) => {
  return (
    <div className={styles.wrapper}>
      <label>Name: {location?.name}</label>
      <label>Gender: {location?.type}</label>
      <label>Species: {location?.dimension}</label>
      <label>Status: {location?.residents.length}</label>
    </div>
  );
};
