import { AppStateType } from "core/redux/configureStore";
import { createSelector } from "reselect";

export const getIsFetchingtPlayers = (state: AppStateType) => {
  return state.players.isFetching;
};

export const getPlayers = (state: AppStateType) => {
  return state.players.pageItems;
};

export const getCount = (state: AppStateType) => {
  return state.players.count;
};

export const getTeamIds = (state: AppStateType) => {
  return state.players.teamFilter;
};

export const getTeamsOptions = (state: AppStateType) => {
  return state.teamOptions.options;
};

export const getError = (state: AppStateType) => {
  return state.players.error;
};

export const getPlayersPageParams = createSelector(
  (state: AppStateType) => state.players.filter,
  (state: AppStateType) => state.players.teamFilter,
  (state: AppStateType) => state.players.page,
  (state: AppStateType) => state.players.pageSize,
  (filter, teamFilter, page, pageSize) => ({
    filter,
    teamFilter,
    page,
    pageSize,
  })
);
