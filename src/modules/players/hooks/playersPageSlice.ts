import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "api/authService";
import { PlayerDto, PlayerDtoPageResult } from "api/Dto/playerDto";
import PlayerService from "api/players/playerService";
import { OptionTypeValueNumber } from "common/components/StyledSelect";
import { AppStateType } from "core/redux/configureStore";
import { userActions } from "core/redux/userSlice";

interface IParams {
  filter: string;
  teamFilter: number[] | null;
  page: number;
  pageSize: number;
}
export const getPlayersPage = createAsyncThunk(
  `playersPage/getPlayers`,
  async (params: IParams, { rejectWithValue, getState, dispatch }) => {
    try {
      const { page, pageSize, filter, teamFilter } = params; 
      const {teamOptions} = getState() as AppStateType
      const responce = await PlayerService.getPlayers(
        filter,
        page,
        pageSize,
        teamFilter
      );

      let playerPage = responce as PlayerDtoPageResult;
        if(teamOptions.options){
          playerPage.data.forEach(x=>x.teamName = teamOptions.options.find(to=>to.value == x.team)?.label)
        }

      return playerPage;
    } catch (error: any) {
      if (error.message.indexOf("Failed to fetch") >= 0) {
        dispatch(userActions.removeUser);
      }
      return rejectWithValue(error.message);
    }
  },
  {
    condition: (_, { getState, extra }) => {
      const { players } = getState() as AppStateType;
      if (players.isFetching) {
        return false;
      }
    },
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
  error?: string;
};

const initialState: StateType = {
  isFetching: false,
  page: 1,
  count: 0,
  pageSize: 6,
  filter: "",
  teamFilter: [],
  pageItems: [],
  error: undefined,
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
        if(state.pageItems && options){
          state.pageItems.forEach(
          (item) =>
            (item.teamName = options.find(t => t.value == item.team)?.label)
        );
      }
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
        state.error = undefined;
      })
      .addCase(getPlayersPage.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.error.message + " :" + (action.payload as string);
      });
  },
});

export const playersActions = { ...playersPageSlice.actions, getPlayersPage };
export default playersPageSlice.reducer;
