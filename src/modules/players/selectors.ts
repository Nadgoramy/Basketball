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

export const getTeamIds=(state: AppStateType) => {       
    return state.players.teamFilter;
}
export const getTeamsOptions=(state:AppStateType)=>{
    return state.teamOptions.options;
}
export const getError=(state: AppStateType)=>{
    return state.players.error
}