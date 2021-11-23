import axios from "axios";
import {
  axiosHandleResponse,
  getRequestConfig,
  IApiResponse,
} from "./utilsApi";
import { rooms_rul } from "./urls";

export interface Room {
  id: string;
}

interface Rooms {
  games: Room[];
}

export const postRoom = async () => {
  axios.post(rooms_rul, {}, getRequestConfig());
};

export const getRooms = async (): Promise<IApiResponse<Rooms>> => {
  return axios
    .get(rooms_rul, getRequestConfig())
    .then((r) => axiosHandleResponse(r));
};
