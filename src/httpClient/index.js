import axios from "axios";
import { COOKIE_KEYS } from "const";
import { TIME_OUT } from "const";
import { HOST } from "const";
import { deleteAllCookies } from "utils";
import { getCookie } from "utils";

const httpClient = axios.create({
  baseURL: HOST,
  timeout: TIME_OUT,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    Accept: "*/*",
  },
});

// TODO: check redirect login when call api after logout
httpClient.interceptors.request.use((request) => {
  const path = request.url.replace(request.baseURL, "");
  const endPointLogin = "/token/";
  if (endPointLogin !== path) {
    const isAuth = getCookie(COOKIE_KEYS.ACCESS_TOKEN);
    if (!isAuth) {
      window.location.href = "/login";
    }
  }

  return request;
});

httpClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response && error.response.status === 401) {
      // Go to login page
      const tokenExpired = getCookie(COOKIE_KEYS.TOKEN_EXPIRED_DATE);
      // const tokenExpiredDate = new Date(tokenExpired);
      if (tokenExpired.getTime() < new Date().getTime()) {
        deleteAllCookies();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default httpClient;
