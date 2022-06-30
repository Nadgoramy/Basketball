
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducer';
import thunkMiddleware from 'redux-thunk';
import { Action, ThunkAction } from '@reduxjs/toolkit';
//import { createLogger } from 'redux-logger';
//const loggerMiddleware = createLogger();
import { composeWithDevTools } from 'redux-devtools-extension';


export const configureStore = ()=> {
  return createStore(
    rootReducer,
    composeWithDevTools(
    applyMiddleware(
      thunkMiddleware,
      //loggerMiddleware
    )
  )
  )
}

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>
export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

