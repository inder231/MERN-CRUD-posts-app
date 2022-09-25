const saveLoginCredToLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
  return;
};
const getLoginCredFromLocalStorage = (key) => {
  return localStorage.getItem(key);
};
export { saveLoginCredToLocalStorage, getLoginCredFromLocalStorage };
