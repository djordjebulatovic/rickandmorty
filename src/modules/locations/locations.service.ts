import { locationsRepo } from "./locations.repo";

class LocationsService {
  getLocations = () => {
    return locationsRepo.getLocations();
  };
}

export const locationsService = new LocationsService();
