import { login_url, logout_url } from "./urls";
import axios from "axios";
import { AxiosResponse } from "axios";
import {
  axiosHandleResponse,
  get_request_config,
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
    window.location.href = "/"; // refresh and redirect to main page
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

export const postLogin = async (login: string, password: string) => {
  // post(login_url, {
  //   login: login,
  //   password: password,
  // })
  axios
    . post(login_url, {
            username: login,
            password: password,
      })
    .then((r) => axiosHandleLoginResponse(r))
    .catch((r) => {
      if (r.response.status === 401) alert("Bad credentials");
      else console.log("error");
      alert("Error");
    });
};

export const postLogout = async () => {
  axios
    .post(logout_url, {}, get_request_config())
    .then((r) => {
      axiosHandleResponse(r);
      sessionStorage.clear();
      window.location.href = "/";
    })
    .catch(() => {
      console.log("error");
    });
};
