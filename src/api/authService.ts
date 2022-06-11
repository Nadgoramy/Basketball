import {post} from './baseRequest';
import {AuthUserDto} from './AuthUserDto'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppStateType } from '../core/redux/configureStore';

const API_URL = "auth/";

const register = (username:string, login: string, password:string) => {
  return post(API_URL + "signup", {
    username,
    login,
    password,
  });
};
const login = (login: string, password:string) => {
  return post(API_URL + "signin", {
      login,
      password,
    })
    .then((response) => {      
      if (response.token) {        
        localStorage.setItem("user", JSON.stringify(response));
      }
      return response;
    });
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

const logout = () => {
  localStorage.removeItem("user");
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
  logout,
  getCurrentUser,
};
export default AuthService;

