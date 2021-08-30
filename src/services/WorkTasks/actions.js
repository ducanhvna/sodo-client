import httpClient from "httpClient";
import { WORK_TASKS_API_URL } from "./api";

export const WORK_TASKS_ACTIONS = {
  GET_WORK_TASKS: "GET_WORK_TASKS",
  GET_WORK_TASKS_PENDING: "GET_WORK_TASKS_PENDING",
  GET_WORK_TASKS_FULFILLED: "GET_WORK_TASKS_FULFILLED",
  GET_WORK_TASKS_REJECTED: "GET_WORK_TASKS_REJECTED",
};

// export const getWorkTasksActions = () => ({
//   type: WORK_TASKS_ACTIONS.GET_WORK_TASKS,
//   payload: httpClient.get(WORK_TASKS_API_URL.GET_LIST),
// });

export const getWorkTasksActions = () => (dispatch) => {
  return dispatch({
    type: WORK_TASKS_ACTIONS.GET_WORK_TASKS,
    payload: httpClient.get(WORK_TASKS_API_URL.GET_LIST),
  });
};
