import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TeamDto, TeamDtoPageResult } from "api/Dto/teamDto";
import TeamService from "api/teams/teamService";

interface IParams {
  filter: string;
  page: number;
  pageSize: number;
}
export const getTeamsPage = createAsyncThunk(
  `teamsPage/getTeams`,
  async (params: IParams, { rejectWithValue }) => {
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
        state.pageItems = action.payload?.data;
        state.count = action.payload?.count;
      })
      .addCase(getTeamsPage.rejected, (state, action) => {
        state.isFetching = false;
      });
  },
});

export const teamsActions = { ...teamsPageSlice.actions, getTeamsPage };
export default teamsPageSlice.reducer;
