import axios from "axios";
import {
  axiosHandleResponse,
  getRequestConfig,
  IApiResponse,
} from "./utilsApi";
import { games_rul } from "./urls";

export interface Game {
  id: string;
}

interface Games {
  games: Game[];
}

export const postGame = async () => {
  axios.post(games_rul, {}, getRequestConfig());
};

export const getGames = async (): Promise<IApiResponse<Games>> => {
  return axios
    .get(games_rul, getRequestConfig())
    .then((r) => axiosHandleResponse(r));
};
