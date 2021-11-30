import axios from "axios";
import {
  axiosHandleResponse,
  get_request_config,
  IApiResponse,
} from "./utilsApi";
import { games_url, rooms_url } from "./urls";
import { Game } from "./gameApi";

export interface Room {
  id: string;
  game: Game;
  max_players: number;
  current_players: number;
}

interface Rooms {
  games: Room[];
}

export const get_rooms_in_game = async (id: string): Promise<IApiResponse<Room[]>> => {
  return axios
    .get(games_url + id + "/rooms/", get_request_config())
    .then((r) => axiosHandleResponse(r));
}

export const post_room = async (name: string, max_players: number) => {
  let data = {game: name, max_players: max_players}
  axios.post(rooms_url, data, get_request_config());
}; 

export const get_rooms = async (): Promise<IApiResponse<Room[]>> => {
  return axios
    .get(rooms_url, get_request_config())
    .then((r) => axiosHandleResponse(r));
};

export const get_room = async (id: string): Promise<IApiResponse<Room>> => {
  return axios
    .get(rooms_url + id, get_request_config())
    .then((r) => axiosHandleResponse(r));
};

export const delete_room = async (id: string): Promise<IApiResponse<Room>> => {
  return axios
    .delete(rooms_url + id, get_request_config())
    .then((r) => axiosHandleResponse(r));
};

