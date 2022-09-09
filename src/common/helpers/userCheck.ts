import { UserDto } from "api/Dto/userDto";
import { AuthService } from "api/requests/authService";

const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    console.log(e);
  }
};
export const isUserAuthorised = () => {
  const currentUser = AuthService.getCurrentUser();
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
