import { login_url, logout_url } from "./urls";
import axios from "axios";
import { AxiosResponse } from "axios";
import {
  axiosHandleResponse,
  getAdminRequestConfig,
  IApiResponse,
} from "./utilsApi";

export interface Admin {
  id: string;
  name: string;
}

const axiosHandleLoginResponse = async <T>(
  response: AxiosResponse
): Promise<IApiResponse<T>> => {
  if (response.status >= 200 && response.status < 300) {
    sessionStorage.setItem("token", response.data.token);
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

export const postLogin = async (username: string, password: string) => {
  axios
    .post(login_url, {
      username: username,
      password: password,
    })
    .then((r) => axiosHandleLoginResponse(r))
    .then(() => window.location.href = "/")
    .catch((r) => {
      if (r.response.status === 401) alert("Bad credentials");
      else alert("error");
    });
};

export const postLogout = async () => {
  axios
    .post(logout_url, {}, getAdminRequestConfig())
    .then((r) => {
      axiosHandleResponse(r);
      sessionStorage.clear();
    })
    .then(() => window.location.reload())
    .catch(() => {
      console.log("error");
    });
};
