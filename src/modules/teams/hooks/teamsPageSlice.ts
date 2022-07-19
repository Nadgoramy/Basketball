import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "api/requests/authService";
import { TeamDto, TeamDtoPageResult } from "api/dto/teamDto";
import TeamService from "api/requests/teamService";
import { AppStateType } from "core/redux/configureStore";
import { userActions } from "core/redux/userSlice";

interface IParams {
  filter: string;
  page: number;
  pageSize: number;
}
export const getTeamsPage = createAsyncThunk(
  `teamsPage/getTeams`,
  async (params: IParams, { rejectWithValue ,dispatch, getState }) => {
    try {      
      let { page, pageSize, filter } = params;
      const responce = await TeamService.getTeams(
        filter,
        page,
        pageSize
      );

      let teamsPage = responce as TeamDtoPageResult;
      return teamsPage;
    } catch (error: any) {
      if(error.status == 401) {
        dispatch(userActions.removeUser())
      }
      return rejectWithValue(error.message);
    }
  }
);

type StateType = {
  isFetching: boolean;
  page: number;
  count: number;
  pageSize: number;
  filter: string;
  pageItems: TeamDto[];
};

const initialState: StateType = {
  isFetching: false,
  page: 1,
  count: 0,
  pageSize: 6,
  filter: "",
  pageItems: [],
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTeamsPage.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(getTeamsPage.fulfilled, (state, action) => {
        state.isFetching = false;
        state.count = action.payload?.count;

        let existingIds = state.pageItems.map((x) => x.id);        
        if (action.payload && existingIds.length > 0) {
          let newIds= action.payload.data.map(x=> x.id);
          let newDataContainsPrevious = existingIds.every(id => newIds.indexOf(id)>=0);
          if (newDataContainsPrevious) {
            let newPlayers = action.payload.data.filter(
              (x) => existingIds.indexOf(x.id) == -1
            );
            state.pageItems = new Array<TeamDto>().concat(state.pageItems, newPlayers);
          } else {
            state.pageItems = action.payload.data;
          }
        } else {
          state.pageItems = action.payload.data;
        }
      })
      .addCase(getTeamsPage.rejected, (state, action) => {
        state.isFetching = false;
      });
  },
});

export const teamsActions = { ...teamsPageSlice.actions, getTeamsPage };
export default teamsPageSlice.reducer;
