import axios from "axios";
import {
  axiosHandleResponse,
  getRequestConfigFiles,
  getRequestConfig,
  handleError,
  IApiResponse,
  getAdminRequestConfig,
  getAdminRequestConfigFiles,
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

export const postGame = async (name: string, description: string, file: any, accepted?: boolean) => {
  let data = new FormData();
  data.append('name', name);
  data.append('description', description);
  if (accepted === undefined) {
    data.append('files', file, file.name);
  } else {
    data.append('accepted', accepted.valueOf.toString());
  }
  axios.post(games_url, data, getRequestConfigFiles())
    .then((r) => {
      axiosHandleResponse(r);
    })
    .then(() => window.location.reload())
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

export const patchGameAccept = async (game: Game): Promise<IApiResponse<Game>> => {
  let data = new FormData();
  data.append('name', game.name);
  data.append('description', game.description);
  data.append('accepted', 'true');
  return axios.patch(games_url + game.id + '/', data, getAdminRequestConfigFiles())
    .then((r) => axiosHandleResponse(r))
    .then(() => window.location.reload())
    .catch((err) => { handleError(err); return err; });
}

export const deleteGame = async (id: string): Promise<IApiResponse<Game>> => {
  return axios
    .delete(games_url + id + '/', getAdminRequestConfig())
    .then((r) => axiosHandleResponse(r))
    .then(() => window.location.reload())
    .catch((err) => { handleError(err); return err; });
}

export const downloadGame = (game: Game) => {
  let url = game.files.replace("/index.html", ".zip");
  let link = document.createElement("a");
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}