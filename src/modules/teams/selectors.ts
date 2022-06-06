import { AppStateType } from "../../core/redux/configureStore";

export const getCurrentPage=(state: AppStateType) => {
    return state.teams.page;
}

export const getPageSize=(state: AppStateType) => {
    return state.teams.pageSize;
}

export const getIsFetching = (state: AppStateType) => {
    return state.teams.isFetching;
}

export const getFilter = (state: AppStateType) => {
    return state.teams.filter;
}

export const getTeams = (state: AppStateType) => {    
    return state.teams.pageItems;
}