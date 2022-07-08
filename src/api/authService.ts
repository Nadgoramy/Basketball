import {post} from './baseRequest';
import {AuthUserDto} from './AuthUserDto'

const API_URL = "auth/";
const throwError =(msg: string) => { throw Error(msg);}

const register = (username:string, login: string, password:string) => {
  return post(API_URL + "signup", {
    username,
    login,
    password,
  })
};
const login = (login: string, password:string) => {
  console.log(login+"/"+password);
  return post(API_URL + "signin", {
      login,
      password,
    })    
};

const change = (username: string, avatarUrl: string) => {
    return post(API_URL + "change", {
        username,
        avatarUrl,
      })
      .then((response) => {        
        return response.data;
      });
  };

const getCurrentUser = () : AuthUserDto|null => {
  
  let userFromStorage = localStorage.getItem("user");
  if(!userFromStorage) return null;
  let user = JSON.parse(userFromStorage);
  return {name: user.name, avatarUrl:user.avatarUrl, token:user.token} as AuthUserDto;
};

const AuthService = {
  register,
  login,
  getCurrentUser,
};
export default AuthService;

