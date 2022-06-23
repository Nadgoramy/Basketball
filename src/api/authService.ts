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
    /*.then((response) => {      
      if (response.token) {        
        localStorage.setItem("user", JSON.stringify(response));
      }
      return response;
    })
    .catch (err =>{
      err.status == 401 ? throwError("User not found") : console.log(err)
    });*/
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
  return new AuthUserDto(user.name,user.avatarUrl, user.token);
};

const AuthService = {
  register,
  login,
  getCurrentUser,
};
export default AuthService;

