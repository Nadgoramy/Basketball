import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppStateType, configureStore } from "./configureStore";


export const store = configureStore();
type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector