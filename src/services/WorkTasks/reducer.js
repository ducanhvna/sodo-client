import { MESS_ALERT } from "const";
import { WORK_TASKS_ACTIONS } from "./actions";

const INIT_STATE = {
  loading: false,
  res: {},
  mess: "",
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    // get data
    case WORK_TASKS_ACTIONS.WORK_TASKS_PENDING: {
      return {
        ...state,
        loading: true,
      };
    }
    case WORK_TASKS_ACTIONS.WORK_TASKS_FULFILLED: {
      return {
        ...state,
        loading: false,
        res: action.payload.data,
      };
    }
    case WORK_TASKS_ACTIONS.WORK_TASKS_REJECTED: {
      return {
        ...state,
        loading: false,
        mess: MESS_ALERT.GET_WORK_LIST_FAIL,
      };
    }

    default:
      return state;
  }
};
