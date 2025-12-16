import api from "./axios";

export const register = async (username, password) => {
  const res = await api.post(
    "/auth/register?username=" + username + "&password=" + password
  );
  return res.data;
};

export const login = async (username, password) => {
  const res = await api.post(
    "/auth/login?username=" + username + "&password=" + password
  );
  return res.data;
};

export const logout = async (userId) => {
  await api.get("/auth/logout?userId=" + userId);
};
