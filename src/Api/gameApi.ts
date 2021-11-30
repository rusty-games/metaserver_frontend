import axios from "axios";
import {
  axiosHandleResponse,
  get_requested_config_files,
  get_request_config,
  handleError,
  IApiResponse,
} from "./utilsApi";
import { games_accepted_url, games_not_accepted_url, games_url } from "./urls";

export interface Game {
  id: string;
  name: string;
  description: string;
  accepted: boolean;
  created_at: string;
  updated_at: string;
}

interface Games {
  games: Game[];
}

export const post_game = async (name: string, description: string, accepted?: boolean) => {
  let data = new FormData();
  data.append('name', name);
  data.append('description', description);
  if(accepted == undefined) axios.post(games_url, data, get_requested_config_files())
                                 .then((r)=> axiosHandleResponse(r))
                                 .catch((err) => {handleError(err); return err;});
  else {
    data.append('accepted', accepted.valueOf.toString());
    axios.post(games_url, {name: name, description: description, accepted: accepted}, get_requested_config_files())
            .then((r)=> axiosHandleResponse(r))
            .catch((err) => {handleError(err); return err;});;
  }
};

export const get_games = async (): Promise<IApiResponse<Game[]>> => {
  return axios
    .get(games_url, get_request_config())
    .then((r) => axiosHandleResponse(r));
};

export const get_games_accepted = async (): Promise<IApiResponse<Game[]>> => {
  return axios
    .get(games_accepted_url, get_request_config())
    .then((r) => axiosHandleResponse(r));
};

export const get_games_not_accepted = async (): Promise<IApiResponse<Game[]>> => {
  return axios
    .get(games_not_accepted_url, get_request_config())
    .then((r) => axiosHandleResponse(r));
};

export const get_game = async (id: string): Promise<IApiResponse<Game>> => {
  return axios
    .get(games_url + id + '/', get_request_config())
    .then((r) => axiosHandleResponse(r));
}

export const patch_game = async (id: string, name: string, description: string, accepted: boolean): Promise<IApiResponse<Game>> => {
  return axios
    .patch(games_url + id, {name: name, description: description, accepted: accepted, id: id},get_request_config())
    .then((r) => axiosHandleResponse(r));
}

export const delete_game = async (id: string): Promise<IApiResponse<Game>> => {
  return axios
    .delete(games_url + id, get_request_config())
    .then((r) => axiosHandleResponse(r))
    .catch((err) => {handleError(err); return err;});;
}

