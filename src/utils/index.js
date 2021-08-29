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
