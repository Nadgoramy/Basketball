import { UserDto } from "api/Dto/userDto";

const parseJwt = (token:string) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

export const authorizationExpired = (user: UserDto | undefined) =>{
    if (user) {
        return tokenExpired(user.token);        
      }
      else return true
}

export const tokenExpired = (token: string | undefined) =>{
  if (token) {
      const decodedJwt = parseJwt(token);
      if (!decodedJwt || decodedJwt.exp * 1000 < Date.now()) {
        return true
      }
      return false
    }
    else return true
}