import { AxiosResponse } from "axios";
import { Game } from "./gameApi";
import placeholderLogo from "../Resources/placeholderLogo.png";
import { BASE_HTTP_URL } from "./urls";

export interface IApiResponse<T> {
  isError: boolean;
  errorMessage?: string;
  responseCode: number;
  data?: T;
}

export const handleResponse = async <T>(
  response: Response
): Promise<IApiResponse<T>> => {
  if (response.ok) {
    return {
      isError: false,
      responseCode: response.status,
      data: response.status !== 204 ? await response.json() : null,
    };
  } else {
    return {
      isError: true,
      responseCode: response.status,
      errorMessage: await response.text(),
    };
  }
};
export const axiosHandleResponse = async <T>(
  response: AxiosResponse
): Promise<IApiResponse<T>> => {
  if (response.status >= 200 && response.status < 300) {
    return {
      isError: false,
      responseCode: response.status,
      data: response.status !== 204 ? await response.data : null,
    };
  } else {
    return {
      isError: true,
      responseCode: response.status,
      errorMessage: await response.data,
    };
  }
};

export const handleError = async <T>(error: any): Promise<IApiResponse<T>> => {
  return {
    isError: true,
    responseCode: error.status,
    errorMessage: error.message,
  };
};

export const getLogoUrl = (game: Game | undefined): string => {
  if (game === undefined)
    return placeholderLogo;

  let result = game.files.replace("index.html", "logo.png");

  if (result.startsWith("http"))
    return result;
  else
    return BASE_HTTP_URL + result;
}

export const getRequestConfig = () => {
  return {
    headers: {
      "Content-Type": "application/json",
    },
  };
};

export const getRequestConfigFiles = () => {
  return {
    headers: {
      "Content-Type": "multipart/form-data",
      "accept": "application/json",
    },
  };
};

export const getAdminRequestConfig = () => {
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };
};

export const getAdminRequestConfigFiles = () => {
  return {
    headers: {
      "Content-Type": "multipart/form-data",
      "accept": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };
};
