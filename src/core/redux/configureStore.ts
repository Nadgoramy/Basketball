import { rootReducer } from "./reducer";
import thunkMiddleware from "redux-thunk";
import { Action, ThunkAction } from "@reduxjs/toolkit";
//import { createLogger } from 'redux-logger';
//const loggerMiddleware = createLogger();
import { configureStore } from "@reduxjs/toolkit";

export const customConfigureStore = () => {
  return configureStore({
    reducer: rootReducer,

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ["TYPE"],
          ignoredActionPaths: [
            "payload.birthday",
            "meta.arg.birthday",
            "payload.players",
          ],
          ignoredPaths: ["player.player.birthday", "team.team.players"],
        },
      }).prepend(thunkMiddleware),
    // prepend and concat calls can be chained
    //.concat(logger),
  });
};

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;
export type InferActionsTypes<T> = T extends {
  [keys: string]: (...args: any[]) => infer U;
}
  ? U
  : never;
export type BaseThunkType<
  A extends Action = Action,
  R = Promise<void>
> = ThunkAction<R, AppStateType, unknown, A>;
