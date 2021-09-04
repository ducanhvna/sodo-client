import httpClient from "httpClient";
import { WORK_TASKS_API_URL } from "./api";

export const WORK_TASKS_ACTIONS = {
  GET_WORK_TASKS: "GET_WORK_TASKS",
  GET_WORK_TASKS_PENDING: "GET_WORK_TASKS_PENDING",
  GET_WORK_TASKS_FULFILLED: "GET_WORK_TASKS_FULFILLED",
  GET_WORK_TASKS_REJECTED: "GET_WORK_TASKS_REJECTED",

  SET_ITEM_DATA_TO_MODAL: "SET_ITEM_DATA_TO_MODAL",
  RESET_DATA_MODAL: "RESET_DATA_MODAL",
  SET_INDEX_VALUE_MODAL: "SET_INDEX_VALUE_MODAL",

  UPDATE_FILED: "UPDATE_FILED",
  UPDATE_FILED_PENDING: "UPDATE_FILED_PENDING",
  UPDATE_FILED_FULFILLED: "UPDATE_FILED_FULFILLED",
  UPDATE_FILED_REJECTED: "UPDATE_FILED_REJECTED",
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

export const setValueItemToModalActions = (payload) => (dispatch) => {
  return dispatch({
    type: WORK_TASKS_ACTIONS.SET_ITEM_DATA_TO_MODAL,
    payload: payload,
  });
};

export const resetValueModalActions = () => (dispatch) => {
  return dispatch({
    type: WORK_TASKS_ACTIONS.RESET_DATA_MODAL,
  });
};

export const setIndexValueModalActions = (index) => (dispatch) => {
  return dispatch({
    type: WORK_TASKS_ACTIONS.SET_INDEX_VALUE_MODAL,
    payload: index,
  });
};

export const updateFieldValueActions = (id, payload) => (dispatch) => {
  return dispatch({
    type: WORK_TASKS_ACTIONS.UPDATE_FILED,
    payload: httpClient.put(
      `${WORK_TASKS_API_URL.UPDATE_FIELD}/${id}/`,
      payload
    ),
  });
};
