import { UserDto } from "api/dto/userDto";

const parseJwt = (token:string) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

export const authorizationExpired = (user: UserDto | undefined) =>{
    if (user) {
        const decodedJwt = parseJwt(user.token);
        if (!decodedJwt || decodedJwt.exp * 1000 < Date.now()) {
          return true
        }
        return false
      }
      else return true
}