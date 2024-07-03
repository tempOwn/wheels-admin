export const getFromLocalStorage = (key: string) => {
  if (!key || typeof window == "undefined") {
    return "";
  } else {
    return window.localStorage.getItem(key);
  }
};

export const removeFromLocalStorage = (key: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  } else {
    return window.localStorage.removeItem(key);
  }
};
export const setToLocalStorage = (key: string, value: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  } else {
    return window.localStorage.setItem(key, value);
  }
};
