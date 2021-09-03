import { MESS_ALERT } from "const";
import { WORK_TASKS_ACTIONS } from "./actions";

const INIT_STATE = {
  loading: false,
  res: [],
  mess: "",
  itemUpdate: {},
  indexItem: 0,
};

export default (state = INIT_STATE, action) => {
  console.log("action", action);
  switch (action.type) {
    // get data
    case WORK_TASKS_ACTIONS.GET_WORK_TASKS_PENDING: {
      return {
        ...state,
        loading: true,
      };
    }
    case WORK_TASKS_ACTIONS.GET_WORK_TASKS_FULFILLED: {
      return {
        ...state,
        loading: false,
        res: action.payload.data,
        mess: "",
      };
    }
    case WORK_TASKS_ACTIONS.GET_WORK_TASKS_REJECTED: {
      return {
        ...state,
        loading: false,
        mess: MESS_ALERT.GET_WORK_LIST_FAIL,
      };
    }
    case WORK_TASKS_ACTIONS.SET_ITEM_DATA_TO_MODAL: {
      return {
        ...state,
        loading: false,
        itemUpdate: action.payload,
      };
    }
    case WORK_TASKS_ACTIONS.RESET_DATA_MODAL: {
      return {
        ...state,
        loading: false,
        itemUpdate: {},
      };
    }
    case WORK_TASKS_ACTIONS.SET_INDEX_VALUE_MODAL: {
      return {
        ...state,
        loading: false,
        indexItem: action.payload,
      };
    }

    default:
      return state;
  }
};
