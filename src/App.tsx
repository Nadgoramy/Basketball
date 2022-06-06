import React, { createContext, useState } from 'react';
import {connect, useSelector}  from 'react-redux'
import logo from './logo.svg';
import './App.css';
import AuthApp from './common/components/AuthApp';
import UnauthApp from './common/components/UnauthApp';
import AuthService from './api/authService';
import { AuthUserDto } from './api/AuthUserDto';
import { AppStateType } from './core/redux/configureStore';

function App() {
  //const UserContext = createContext(new AuthUserDto("","",""));
  const  user  = AuthService.getCurrentUser();
  const userFromStore = useSelector((state: AppStateType) => state.user);
  console.log(userFromStore);
  console.log(user);
  return (
    
       (user ) ? <AuthApp /> : <UnauthApp />    
  );
}

export default App;




