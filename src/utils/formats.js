import moment from "moment";
import { isNullOrEmpty } from "utils";

export const formatTimeDisplay = (time) => {
  if (isNullOrEmpty(time)) return "";
  const initDate = moment(time);
  const result = initDate.format("DD/MM/YYYY HH:MM:SS");
  return result;
};
