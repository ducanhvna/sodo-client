import { MESS_ALERT } from "const";
import { COOKIE_KEYS } from "const";
import { setCookie } from "utils";
import { LOGIN_ACTIONS } from "./actions";
import httpClient from "../../httpClient/index";
import { deleteAllCookies } from "utils";
import { setExpiredDateToken } from "utils";

const INIT_STATE = {
  loading: false,
  authUser: {},
  accessToken: "",
  mess: "",
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    // get data
    case LOGIN_ACTIONS.LOGIN_PENDING: {
      delete httpClient.defaults.headers.common["Authorization"];
      return {
        ...state,
        loading: true,
      };
    }
    case LOGIN_ACTIONS.LOGIN_FULFILLED: {
      const token = action.payload.data.access;
      delete httpClient.defaults.headers.common["Authorization"];
      httpClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setCookie(COOKIE_KEYS.ACCESS_TOKEN, token);
      setCookie(COOKIE_KEYS.TOKEN_EXPIRED_DATE, setExpiredDateToken());
      return {
        ...state,
        loading: false,
        authUser: action.payload.data,
        res: "",
      };
    }
    case LOGIN_ACTIONS.LOGIN_REJECTED: {
      return {
        ...state,
        loading: false,
        mess: MESS_ALERT.LOGIN_FAIL,
      };
    }

    case LOGIN_ACTIONS.LOG_OUT: {
      deleteAllCookies();
      delete httpClient.defaults.headers.common["Authorization"];
      return {
        ...state,
        loading: false,
        authUser: {},
      };
    }

    default:
      return state;
  }
};
