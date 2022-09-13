import { UserDto } from "api/Dto/userDto";

const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    console.log(e);
  }
};
export const isUserAuthorised = () => {
  const currentUser = getCurrentUser();
  if (!currentUser || authorizationExpired(currentUser)) {
    return false;
  }
  return true;
};
export const authorizationExpired = (user?: UserDto) => {
  if (user && localStorage.getItem("user")) {
    return tokenExpired(user.token);
  } else return true;
};

export const tokenExpired = (token?: string) => {
  if (token) {
    const decodedJwt = parseJwt(token);
    if (!decodedJwt || decodedJwt.exp * 1000 < Date.now()) {
      return true;
    }
    return false;
  } else return true;
};

export const getCurrentUser = (): UserDto | null => {
  const userFromStorage = localStorage.getItem("user");
  if (!userFromStorage) return null;
  const user = JSON.parse(userFromStorage);
  if (tokenExpired(user.token)) return null;
  return {
    name: user.name,
    avatarUrl: user.avatarUrl,
    token: user.token,
  } as UserDto;
};

const setCurrentUser = (userInfo: string) => {
  localStorage.setItem("user", userInfo);
};

const clearUser = () => {
  localStorage.removeItem("user");
};

export const UserActions = {
  getCurrentUser,
  setCurrentUser,
  clearUser,
  isUserAuthorised,
  tokenExpired,
  authorizationExpired
};
