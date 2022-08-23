import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TeamDto, TeamDtoPageResult } from "api/Dto/teamDto";
import TeamService from "api/requests/teamService";
import { AppStateType } from "core/redux/configureStore";
import { userActions } from "core/redux/userSlice";
import { authorizationExpired } from "common/helpers/userCheck";

export interface IParams {
  filter: string;
  page: number;
  pageSize: number;
}
export const getTeamsPage = createAsyncThunk(
  `teamsPage/getTeams`,
  async (params: IParams, { rejectWithValue, dispatch, getState }) => {
    try {
      const { page, pageSize, filter } = params;
      const responce = await TeamService.getTeams(filter, page, pageSize);

      return responce as TeamDtoPageResult;
    } catch (error: any) {
      if (error.status == 401) {
        dispatch(userActions.removeUser());
        return rejectWithValue("Authorization error");
      }
      return rejectWithValue(error.message);
    }
  },
  {
    condition: (_, { getState, extra }) => {
      const { teams, user } = getState() as AppStateType;
      if (teams.isFetching) return false;
      if (authorizationExpired(user.currentUser)) return false;
    },
  }
);

interface StateType {
  isFetching: boolean;
  page: number;
  count: number;
  pageSize: number;
  filter: string;
  pageItems: TeamDto[];
  error?: string;
}

const initialState: StateType = {
  isFetching: false,
  page: 1,
  count: 0,
  pageSize: 6,
  filter: "",
  pageItems: [],
  error: undefined,
};

const teamsPageSlice = createSlice({
  name: "teamsPage",
  initialState: initialState,
  reducers: {
    setTeamsPage: (state, action) => {
      state.pageItems = action.payload.data;
      state.count = action.payload.count;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
      state.page = 1;
    },
    setPageNumber: (state, action) => {
      state.page = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
      state.page = 1;
    },
    clearState: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTeamsPage.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(getTeamsPage.fulfilled, (state, action) => {
        state.isFetching = false;
        state.count = action.payload?.count;

        const existingIds = state.pageItems.map((x) => x.id);
        if (action.payload && existingIds.length > 0) {
          const newIds = action.payload.data.map((x) => x.id);
          const newDataContainsPrevious = existingIds.every(
            (id) => newIds.indexOf(id) >= 0
          );
          if (newDataContainsPrevious) {
            let previousItems: TeamDto[] = [];
            state.pageItems.forEach((team) => {
              const teamFromBd = action.payload.data.find(
                (t) => t.id === team.id
              );
              previousItems.push(teamFromBd ? teamFromBd : team);
            });

            const newTeams = action.payload.data.filter(
              (x) => existingIds.indexOf(x.id) === -1
            );

            state.pageItems = new Array<TeamDto>().concat(
              previousItems,
              newTeams
            );
          } else {
            state.pageItems = action.payload.data;
          }
        } else {
          state.pageItems = action.payload.data;
        }
      })
      .addCase(getTeamsPage.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.error.message + " :" + (action.payload as string);
      });
  },
});

export const teamsActions = { ...teamsPageSlice.actions, getTeamsPage };
export default teamsPageSlice.reducer;
