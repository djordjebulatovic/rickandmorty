import { IApiResponse, api } from "../../api/api";
import { ILocation } from "./locations.types";

class LocationsRepo {
  locationsUrl = "/location";

  getLocations = () => {
    return api.get<IApiResponse<ILocation[]>>(this.locationsUrl);
  };
}

export const locationsRepo = new LocationsRepo();
