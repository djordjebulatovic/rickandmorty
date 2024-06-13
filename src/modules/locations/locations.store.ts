import to from "await-to-js";
import { makeAutoObservable } from "mobx";

import { ILocation } from "./locations.types";
import { locationsService } from "./locations.service";

class LocationsStore {
  locations: ILocation[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setLocations(locationsList: ILocation[]) {
    this.locations = locationsList;
  }

  getLocations = async () => {
    const [err, res] = await to(locationsService.getLocations());
    if (err) return Promise.reject(err);
    this.setLocations(res.data.results);
    return Promise.resolve(res.data.results);
  };
}

export const locationsStore = new LocationsStore();
