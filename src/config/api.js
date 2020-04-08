import Axios from "axios";
import config from ".";

const api = Axios.create({
  baseURL: "https://coronavirus-monitor.p.rapidapi.com",
  headers: {
    "X-RapidAPI-Host": config.rapidApi.apiHost,
    "X-RapidAPI-Key": config.rapidApi.apiKey
  }
});

export default api;

