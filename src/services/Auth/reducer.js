import { MESS_ALERT } from "const";
import { COOKIE_KEYS } from "const";
import { deleteCookie } from "utils";
import { setCookie } from "utils";
import { LOGIN_ACTIONS } from "./actions";
// import httpClient from "../HttpClient";

const INIT_STATE = {
  loading: false,
  authUser: {},
  accessToken: "",
  mess: "",
};

export default (state = INIT_STATE, action) => {
  console.log("actions", action);
  switch (action.type) {
    // get data
    case LOGIN_ACTIONS.LOGIN_PENDING: {
      //   delete httpClient.defaults.headers.common["key"];
      return {
        ...state,
        loading: true,
      };
    }
    case LOGIN_ACTIONS.LOGIN_FULFILLED: {
      const token = action.payload.data.access;
      //   delete httpClient.defaults.headers.common["apikey"];
      //   httpClient.defaults.headers.common["key"] = token;
      setCookie(COOKIE_KEYS.ACCESS_TOKEN, token);
      return {
        ...state,
        loading: false,
        authUser: action.payload.data,
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
      deleteCookie(COOKIE_KEYS.ACCESS_TOKEN);
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
