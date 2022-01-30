export const BASE_URL = process.env.BACKEND_URL || "127.0.0.1:8080";
export const BASE_HTTP_URL = "http://" + BASE_URL;

export const websocket_channel_url = "ws://" + BASE_URL + "/ws/room/";

export const games_url = BASE_HTTP_URL + "/games/";
export const games_accepted_url = BASE_HTTP_URL + "/games/accepted/";
export const games_not_accepted_url = BASE_HTTP_URL + "/games/not-accepted/";
export const rooms_url = BASE_HTTP_URL + "/rooms/";
export const login_url = BASE_HTTP_URL + "/users/login/";
export const logout_url = BASE_HTTP_URL + "/users/logout/";
