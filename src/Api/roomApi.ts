import axios from "axios";
import {
  axiosHandleResponse,
  get_request_config,
  handleError,
  IApiResponse,
} from "./utilsApi";
import { games_url, rooms_url } from "./urls";

export interface Room {
  id: string;
  name: string;
  game: string;
  max_players: number;
  current_players: number;
}

// interface Rooms {
//   games: Room[];
// }

export const get_rooms_in_game = async (id: string): Promise<IApiResponse<Room[]>> => {
  return axios
    .get(games_url + id + "/rooms/", get_request_config())
    .then((r) => axiosHandleResponse(r));
}

export const post_room = async (id: string, name: string, max_players: number) => {
  let data = {game: id, name: name, max_players: max_players}
  axios.post(rooms_url, data, get_request_config());
}; 

export const get_rooms = async (): Promise<IApiResponse<Room[]>> => {
  return axios
    .get(rooms_url, get_request_config())
    .then((r) => axiosHandleResponse(r))
    .catch((err) => {
      handleError(err);
      return err;
    });
};

export const get_room = async (id: string): Promise<IApiResponse<Room>> => {
  return axios
    .get(rooms_url + id + '/', get_request_config())
    .then((r) => axiosHandleResponse(r))
    .catch((err) => {
      handleError(err);
      return err;
    });
};

export const delete_room = async (id: string): Promise<IApiResponse<Room>> => {
  return axios
    .delete(rooms_url + id , get_request_config())
    .then((r) => axiosHandleResponse(r));
};

