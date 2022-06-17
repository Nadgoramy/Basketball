import React, { createContext, useState } from 'react';
import {connect, useSelector}  from 'react-redux'
import UnauthApp from 'modules/interface/UnauthApp';
import AuthService from 'api/authService';
import { AppStateType } from 'core/redux/configureStore';
import {ThemeProvider} from 'styled-components'
import AuthApp from 'modules/interface/AuthApp';
import { theme } from 'DefaultTheme';

function App() {
  const  user  = AuthService.getCurrentUser();
  const userFromStore = useSelector((state: AppStateType) => state.user); 
 
console.log(userFromStore);
  return (
    <ThemeProvider theme={theme}>
       {(user ) ? <AuthApp /> : <UnauthApp />    }
    </ThemeProvider> 
  );
}

export default App;




