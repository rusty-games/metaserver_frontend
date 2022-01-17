import axios from "axios";
import {
  axiosHandleResponse,
  getRequestConfig,
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

interface Rooms {
  games: Room[];
}

export const getRoomsInGame = async (id: string): Promise<IApiResponse<Room[]>> => {
  return axios
    .get(games_url + id + "/rooms/", getRequestConfig())
    .then((r) => axiosHandleResponse(r));
}

export const postRoom = async (id: string, name: string, max_players: number) => {
  let data = {game: id, name: name, max_players: max_players}
  axios.post(rooms_url, data, getRequestConfig());
}; 

export const getRooms = async (): Promise<IApiResponse<Room[]>> => {
  return axios
    .get(rooms_url, getRequestConfig())
    .then((r) => axiosHandleResponse(r))
    .catch((err) => {
      handleError(err);
      return err;
    });
};

export const getRoom = async (id: string): Promise<IApiResponse<Room>> => {
  return axios
    .get(rooms_url + id + '/', getRequestConfig())
    .then((r) => axiosHandleResponse(r))
    .catch((err) => {
      handleError(err);
      return err;
    });
};

export const deleteRoom = async (id: string): Promise<IApiResponse<Room>> => {
  return axios
    .delete(rooms_url + id , getRequestConfig())
    .then((r) => axiosHandleResponse(r));
};

