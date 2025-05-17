const TOKEN_STORAGE_KEY = "DATN_TOKEN";

export const getAccessToken = () => {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);

  return token;
};

const setAccessToken = (token) => {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
};

export const logout = () => {
  localStorage.removeItem(TOKEN_STORAGE_KEY);

  window.location.href = "/login";
};

export const useAuth = () => {
  return {
    setAccessToken,
    getAccessToken,
    isLogged: !!getAccessToken(),
    logout,
  };
};
