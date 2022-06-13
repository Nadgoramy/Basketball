import { AppStateType } from "core/redux/configureStore";

export const getCurrentPage=(state: AppStateType) => {
    return state.players.page;
}

export const getPageSize=(state: AppStateType) => {
    return state.players.pageSize;
}

export const getIsFetching = (state: AppStateType) => {
    return state.players.isFetching;
}

export const getFilter = (state: AppStateType) => {
    return state.players.filter;
}

export const getPlayers = (state: AppStateType) => {    
    return state.players.pageItems;
}

export const getCount=(state: AppStateType) => {       
    return state.players.count;
}