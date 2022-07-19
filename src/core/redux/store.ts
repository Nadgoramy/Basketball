import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppStateType, customConfigureStore as configureStore } from "./configureStore";


export const store = configureStore();

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector