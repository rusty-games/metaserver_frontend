import axios from "axios";
import {
  axiosHandleResponse,
  getRequestedConfigFiles,
  getRequestConfig,
  handleError,
  IApiResponse,
} from "./utilsApi";
import { games_accepted_url, games_not_accepted_url, games_url } from "./urls";

export interface Game {
  id: string;
  name: string;
  description: string;
  files: string;
  accepted: boolean;
  created_at: string;
  updated_at: string;
}

interface Games {
  games: Game[];
}

export const postGame = async (name: string, description: string, file: any, accepted?: boolean) => {
  let data = new FormData();
  data.append('name', name);
  data.append('description', description);
  if (accepted == undefined) {
    data.append('files', file, file.name);
  } else {
    data.append('accepted', accepted.valueOf.toString());
  }
  axios.post(games_url, data, getRequestedConfigFiles())
    .then((r) => axiosHandleResponse(r))
    .catch((err) => { handleError(err); return err; });
};

export const getGames = async (): Promise<IApiResponse<Game[]>> => {
  return axios
    .get(games_url, getRequestConfig())
    .then((r) => axiosHandleResponse(r));
};

export const getGamesAccepted = async (): Promise<IApiResponse<Game[]>> => {
  return axios
    .get(games_accepted_url, getRequestConfig())
    .then((r) => axiosHandleResponse(r));
};

export const getGamesNotAccepted = async (): Promise<IApiResponse<Game[]>> => {
  return axios
    .get(games_not_accepted_url, getRequestConfig())
    .then((r) => axiosHandleResponse(r));
};

export const getGame = async (id: string): Promise<IApiResponse<Game>> => {
  return axios
    .get(games_url + id + '/', getRequestConfig())
    .then((r) => axiosHandleResponse(r))
    .catch((err) => {
      handleError(err);
      return err;
    });
}

export const patchGameAccept = async (id: string, accepted: boolean): Promise<IApiResponse<Game>> => {
  return axios
    .patch(games_url + id + '/', { accepted: accepted}, getRequestConfig())
    .then((r) => axiosHandleResponse(r));
}

export const deleteGame = async (id: string): Promise<IApiResponse<Game>> => {
  return axios
    .delete(games_url + id + '/', getRequestConfig())
    .then((r) => axiosHandleResponse(r))
    .catch((err) => { handleError(err); return err; });;
}

