import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PlayerDto, PlayerDtoPageResult } from "api/Dto/playerDto";
import PlayerService from "api/players/playerService";
import { OptionTypeValueNumber } from "common/components/StyledSelect";

interface IParams {
  filter: string;
  teamFilter: number[] | null;
  page: number;
  pageSize: number;
}
export const getPlayersPage = createAsyncThunk(
  `playersPage/getPlayers`,
  async (params: IParams, { rejectWithValue, getState }) => {
    try {      
      const {page, pageSize, filter, teamFilter} = params;//(getState() as AppStateType).players;
      const responce = await PlayerService.getPlayers(filter,       
        page,
        pageSize,
        teamFilter
      );

      let playerPage = responce as PlayerDtoPageResult;
      return playerPage;
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
  teamFilter: number[];
  pageItems: PlayerDto[];
};

const initialState: StateType = {
  isFetching: false,
  page: 1,
  count: 0,
  pageSize: 6,
  filter: "",
  teamFilter: [],
  pageItems: [],
};

const playersPageSlice = createSlice({
  name: "playersPage",
  initialState: initialState,
  reducers: {
    setPlayersPage: (state, action) => {
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
      state.page = 1;
      state.pageSize = action.payload;      
    },
    setTeamFilter: (state, action) => {
      state.teamFilter = action.payload;
      state.page = 1;
    },
    setPlayerTeamName: (state, action) => {
      let options = action.payload as OptionTypeValueNumber[];
      state.pageItems.forEach(
        (item) =>
          (item.teamName = action.payload.find(
            (t: OptionTypeValueNumber) => t.value == item.team
          ).label)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPlayersPage.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(getPlayersPage.fulfilled, (state, action) => {
        state.isFetching = false;
        state.pageItems = action.payload?.data;
        state.count = action.payload?.count;
      })
      .addCase(getPlayersPage.rejected, (state, action) => {
        state.isFetching = false;
      });
  },
});

export const playersActions = { ...playersPageSlice.actions, getPlayersPage };
export default playersPageSlice.reducer;
