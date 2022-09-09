import { createSelector } from "reselect";
import { AppStateType } from "core/redux/configureStore";
import { IParams } from "./hooks/teamsPageSlice";

export const getIsFetchingTeams = (state: AppStateType) => {
  return state.teams.isFetching;
};

export const getTeams = (state: AppStateType) => {
  return state.teams.pageItems;
};

export const getTeamsCount = (state: AppStateType) => {
  return state.teams.count;
};

export const getTeamsError = (state: AppStateType) => {
  return state.teams.error;
};

export const getTeamsPageParams = createSelector(
  (state: AppStateType) => state.teams.filter,
  (state: AppStateType) => state.teams.page,
  (state: AppStateType) => state.teams.pageSize,
  (filter, page, pageSize): IParams => ({
    filter,
    page,
    pageSize,
  })
);
