import axios from "axios";
import { setupCache } from "axios-cache-adapter";

const cache = setupCache({
  maxAge: 15 * 60 * 1000,
});

const api = axios.create({
  adapter: cache.adapter,
});

const apiURL =
  "https://ws.weatherzone.com.au/?lt=aploc&lc=<LOCATION-CODE>&locdet=1&latlon=1&pdf=twc(period=48,detail=2)&u=1&format=json";

export function getWeatherData(locationCode) {
  let updatedApi = apiURL;
  if (locationCode && locationCode !== "") {
    updatedApi = apiURL.replace("<LOCATION-CODE>", locationCode);
  }

  // before the cache adapter
  // return axios.get(updatedApi);

  return api({
    url: updatedApi,
    method: "get",
  });
}
