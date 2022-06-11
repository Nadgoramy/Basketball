import { string } from "prop-types";

type InitialStateType={
    name:string,
    avatarUrl:string,
    token:string
}
const initialState:InitialStateType = {name:"", avatarUrl:"", token:""};

export function userReducer(state:InitialStateType = initialState, action:any) {
  switch (action.type) {
    case 'SET_USER':      
      return {
            name: action.name,
            avatarUrl: action.avatarUrl,
            token: action.token    
        };  
    case 'REMOVE_USER':      
      return {...state, name:"", avatarUrl:"", token:""  }  
    default:
      return state;
  }
}