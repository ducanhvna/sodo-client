import { MESS_ALERT } from "const";
import { WORK_TASKS_ACTIONS } from "./actions";

const INIT_STATE = {
  loading: false,
  res: [],
  mess: "",
  itemUpdate: {},
  indexItem: 0,
  messUpdate: "",
};

export default (state = INIT_STATE, action) => {
  // console.log("action", action);
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
        messUpdate: "",
      };
    }
    case WORK_TASKS_ACTIONS.GET_WORK_TASKS_REJECTED: {
      return {
        ...state,
        loading: false,
        mess: MESS_ALERT.GET_WORK_LIST_FAIL,
        messUpdate: "",
      };
    }
    case WORK_TASKS_ACTIONS.SET_ITEM_DATA_TO_MODAL: {
      return {
        ...state,
        loading: false,
        itemUpdate: action.payload,
        messUpdate: "",
      };
    }
    case WORK_TASKS_ACTIONS.RESET_DATA_MODAL: {
      return {
        ...state,
        loading: false,
        itemUpdate: {},
        messUpdate: "",
      };
    }
    case WORK_TASKS_ACTIONS.SET_INDEX_VALUE_MODAL: {
      return {
        ...state,
        loading: false,
        indexItem: action.payload,
        messUpdate: "",
      };
    }

    case WORK_TASKS_ACTIONS.UPDATE_FILED_PENDING: {
      return {
        ...state,
        loading: true,
        messUpdate: "",
      };
    }
    case WORK_TASKS_ACTIONS.UPDATE_FILED_FULFILLED: {
      return {
        ...state,
        loading: false,
        mess: "",
        messUpdate: "",
      };
    }
    case WORK_TASKS_ACTIONS.UPDATE_FILED_REJECTED: {
      return {
        ...state,
        loading: false,
        messUpdate: MESS_ALERT.UPDATE_WORK_TASKS_FAIL,
      };
    }

    default:
      return state;
  }
};
