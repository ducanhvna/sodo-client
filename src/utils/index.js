import { EXPIRED_DATE_TOKEN } from "const";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export const getCookie = (cookieKey) => {
  const cookie = document.cookie;
  const cookieArray = cookie.split(";");
  const cookieObject = cookieArray.reduce((ck, pair) => {
    const [key, value] = pair.trim().split("=");
    return {
      ...ck,
      [key]: value,
    };
  }, {});
  return cookieObject[cookieKey];
};

export const setCookie = (cookieKey, cookieValue) => {
  document.cookie = `${cookieKey}=${cookieValue};`;
};

export const deleteCookie = (cookieKey) => {
  document.cookie = `${cookieKey}=;expires = Thu, 01 Jan 1970 00:00:00 GMT`;
};

export function deleteAllCookies() {
  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}

export function dispatchActions() {
  const dispatch = useDispatch();
  return dispatch;
}
export function getValueStore(storeTitle) {
  const result = useSelector((state) => state[storeTitle]);
  return result;
}

export const isNull = (data) => {
  return data === undefined || data === null;
};

export const isEmptyArray = (data) => {
  return Array.isArray(data) && data.length === 0;
};

export const isEmptyString = (data) => {
  return typeof data === "string" && data.length === 0;
};

export const isEmptyObject = (data) => {
  return typeof data === "object" && Object.keys(data).length === 0;
};

export const isNullOrEmpty = (data) => {
  let result = false;
  const dataIsNull = isNull(data);
  if (dataIsNull) {
    result = true;
  } else {
    const dataIsEmptyArray = isEmptyArray(data);
    const dataIsEmptyObject = isEmptyObject(data);
    const dataIsEmptyString = isEmptyString(data);
    if (dataIsEmptyArray || dataIsEmptyObject || dataIsEmptyString) {
      result = true;
    }
  }
  return result;
};

export const setExpiredDateToken = () => {
  const now = new Date();
  now.setDate(now.getDate() + EXPIRED_DATE_TOKEN);
  return now;
};
