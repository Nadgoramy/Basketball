import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PlayerDto, PlayerDtoPageResult } from "api/Dto/playerDto";
import { PlayerService } from "api/players/playerService";
import { AuthService } from "api/requests/authService";
import { OptionTypeValueNumber } from "common/components/StyledSelect";
import { authorizationExpired, UserActions } from "common/helpers/userCheck";
import { AppStateType } from "core/redux/configureStore";
import { userActions } from "core/redux/userSlice";

export interface IParams {
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
      const { teamOptions } = getState() as AppStateType;
      const response = await PlayerService.getPlayers(
        filter,
        page,
        pageSize,
        teamFilter
      );

      let playerPage = response as PlayerDtoPageResult;
      if (teamOptions.options) {
        playerPage.data.forEach((x) => {
          x.teamName = teamOptions.options.find(
            (to: OptionTypeValueNumber) => to.value == x.team
          )?.label;
        });
      }

      return playerPage;
    } catch (error: any) {
      if (error.status == 401) {
        dispatch(userActions.removeUser());
        UserActions.clearUser();
        return rejectWithValue("Authorization error");
      }
      return rejectWithValue(error.message);
    }
  },
  {
    condition: (_, { getState, extra }) => {
      const { players, user } = getState() as AppStateType;
      if (players.isFetching) return false;
      if (authorizationExpired(user.currentUser)) return false;
    },
  }
);

type PlayerPageSliceStateType = {
  isFetching: boolean;
  page: number;
  count: number;
  pageSize: number;
  filter: string;
  teamFilter: number[];
  pageItems: PlayerDto[];
  error?: string;
};

const initialState: PlayerPageSliceStateType = {
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
      if (state.pageItems && options) {
        state.pageItems.forEach(
          (item) =>
            (item.teamName = options.find((t) => t.value == item.team)?.label)
        );
      }
    },
    clearState: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPlayersPage.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(getPlayersPage.fulfilled, (state, action) => {
        state.isFetching = false;

        const existingIds = state.pageItems.map((x) => x.id);
        if (action.payload && existingIds.length > 0) {
          const newIds = action.payload.data.map((x) => x.id);
          const newDataContainsPrevious = existingIds.every(
            (id) => newIds.indexOf(id) >= 0
          );
          if (newDataContainsPrevious) {
            let previousItems: PlayerDto[] = [];
            state.pageItems.forEach((player) => {
              const teamFromBd = action.payload.data.find(
                (t) => t.id === player.id
              );
              previousItems.push(teamFromBd ? teamFromBd : player);
            });

            const newPlayers = action.payload.data.filter(
              (x) => existingIds.indexOf(x.id) == -1
            );
            state.pageItems = new Array<PlayerDto>().concat(
              previousItems,
              newPlayers
            );
          } else {
            state.pageItems = action.payload.data;
          }
        } else {
          state.pageItems = action.payload.data;
        }
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
