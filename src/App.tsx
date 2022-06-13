import React, { createContext, useState } from 'react';
import {connect, useSelector}  from 'react-redux'
import UnauthApp from 'modules/interface/UnauthApp';
import AuthService from 'api/authService';
import { AppStateType } from 'core/redux/configureStore';
import {ThemeProvider} from 'styled-components'
import AuthApp from 'modules/interface/AuthApp';

function App() {
  const  user  = AuthService.getCurrentUser();
  const userFromStore = useSelector((state: AppStateType) => state.user); 
  
  const theme={
    font:{

    },
    colors:{
      text: "#707070",
      white: "#FFFFFF",
      red: "#E4163A",
      light: "#9C9C9C",
      dark: "#303030",
      blue: "#344472"
    },
    mobile: "768px"
  }
console.log(userFromStore);
  return (
    <ThemeProvider theme={theme}>
       {(user ) ? <AuthApp /> : <UnauthApp />    }
    </ThemeProvider> 
  );
}

export default App;




