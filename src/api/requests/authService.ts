import { UserDto } from "api/Dto/userDto";
import { post } from "../baseRequest";

export const AUTH_API_URL = "auth/";
const throwError = (msg: string) => {
  throw Error(msg);
};

const register = (username: string, login: string, password: string): Promise<UserDto> => {
  return post(AUTH_API_URL + "signup", {
    username,
    login,
    password,
  });
};
const login = (login: string, password: string): Promise<UserDto> => {
  console.log(login + "/" + password);
  return post(AUTH_API_URL + "signin", {
    login,
    password,
  });
};

const change = (username: string, avatarUrl: string): Promise<UserDto> => {
  return post(AUTH_API_URL + "change", {
    username,
    avatarUrl,
  }).then((response) => {
    return response.data;
  });
};


export const AuthService = {
  register,
  login,
  //getCurrentUser,
  //clearUser
};
