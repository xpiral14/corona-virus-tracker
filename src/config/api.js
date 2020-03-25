import Axios from "axios";
import config from ".";

const api = Axios.create({
  headers: {
    "X-RapidAPI-Host": config.rapidApi.apiHost,
    "X-RapidAPI-Key": config.rapidApi.apiKey
  }
});

export default api;
