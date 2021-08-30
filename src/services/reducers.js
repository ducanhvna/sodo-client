import { combineReducers } from "redux";
import authReducers from "./Auth/reducer";
import workTaskReducers from "./WorkTasks/reducer";
import { STORE_TITLE } from "../const";
const { AUTH, WORK_TASKS } = STORE_TITLE;
const reducers = {
  [AUTH]: authReducers,
  [WORK_TASKS]: workTaskReducers,
};

const reducer = combineReducers(reducers);
export default function root(state, action) {
  return reducer(state, action);
}
