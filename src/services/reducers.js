import { combineReducers } from "redux";
import authReducers from "./Auth/reducer";
import { STORE_TITLE } from "../const";
const { AUTH } = STORE_TITLE;
const reducers = {
  [AUTH]: authReducers,
};

const reducer = combineReducers(reducers);
export default function root(state, action) {
  return reducer(state, action);
}
