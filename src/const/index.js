export const HOST = "https://sodolive.herokuapp.com/api";
export const TIME_OUT = 20000;
export const EXPIRED_DATE_TOKEN = 30;
export const COOKIE_KEYS = {
  ACCESS_TOKEN: "token",
  TOKEN_EXPIRED_DATE: "token_expired_date",
};

export const MESS_ALERT = {
  LOGIN_FAIL: "Sai tên đăng nhập hoặc mật khẩu !",
  GET_WORK_LIST_FAIL: "Lỗi trong quá trình lấy dữ liệu !",
  UPDATE_WORK_TASKS_FAIL: "Cập nhật dữ liệu thất bại !",
  UPDATE_WORK_TASKS_SUCCESS: "Cập nhật dữ liệu thành công !",
};

export const STORE_TITLE = {
  AUTH: "authStore",
  WORK_TASKS: "workTasksStore",
};

export const VALIDATE_FIELD_MESS = {
  REQUIRED: "Vui lòng không để trống trường này !",
  EMAIL: "Vui lòng điền đúng định dạng Email !",
};
