import React from "react";
import { post } from "../baseRequest";
import { AuthUserDto } from "../Dto/AuthUserDto";

export const AUTH_API_URL = "auth/";
const throwError = (msg: string) => {
  throw Error(msg);
};

const register = (username: string, login: string, password: string) => {
  return post(AUTH_API_URL + "signup", {
    username,
    login,
    password,
  });
};
const login = (login: string, password: string) => {
  console.log(login + "/" + password);
  return post(AUTH_API_URL + "signin", {
    login,
    password,
  });
};

const change = (username: string, avatarUrl: string) => {
  return post(AUTH_API_URL + "change", {
    username,
    avatarUrl,
  }).then((response) => {
    return response.data;
  });
};

const getCurrentUser = (): AuthUserDto | null => {
  const userFromStorage = localStorage.getItem("user");
  if (!userFromStorage) return null;
  const user = JSON.parse(userFromStorage);
  return {
    name: user.name,
    avatarUrl: user.avatarUrl,
    token: user.token,
  } as AuthUserDto;
};
const clearUser = () => {
  localStorage.removeItem("user");
};

export const AuthService = {
  register,
  login,
  getCurrentUser,
  clearUser
};
