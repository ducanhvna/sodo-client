import { httpClient } from "httpClient";
import { AUTH_API_URL } from "./api";

export const LOGIN_ACTIONS = {
  LOGIN: "LOGIN",
  LOGIN_PENDING: "LOGIN_PENDING",
  LOGIN_FULFILLED: "LOGIN_FULFILLED",
  LOGIN_REJECTED: "LOGIN_REJECTED",
  LOG_OUT: "LOG_OUT",
};

export const loginActions = (data) => ({
  type: LOGIN_ACTIONS.LOGIN,
  payload: httpClient.post(AUTH_API_URL.LOGIN, data),
});

export const logOutUser = () => ({
  type: LOGIN_ACTIONS.LOG_OUT,
});
