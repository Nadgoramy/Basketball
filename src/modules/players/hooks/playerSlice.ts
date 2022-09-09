import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { NewPlayerDto, PlayerDto } from "api/Dto/playerDto";
import { PlayerService } from "api/players/playerService";
import { AuthService } from "api/requests/authService";
import { authorizationExpired } from "common/helpers/userCheck";
import { AppStateType } from "core/redux/configureStore";
import { userActions } from "core/redux/userSlice";

export const getPlayer = createAsyncThunk(
  `player/getPlayer`,
  async (id: number, { rejectWithValue, dispatch, getState }) => {
    try {
      const currentPlayer = (getState() as AppStateType).player.player;
      if (id == currentPlayer.id) return currentPlayer;

      const responce = await PlayerService.getPlayer(id);
      if (responce && (responce as PlayerDto).id) {
        return correctPlayerBirthdayIfNeeded(responce as PlayerDto);
      } else throw new Error("Player not found");
    } catch (error: any) {
      if (error.status == 401) {
        dispatch(userActions.removeUser());
        AuthService.clearUser();
        return rejectWithValue("Authorization error");
      }
      return rejectWithValue(error.message);
    }
  },
  {
    condition: (id: number, { getState, extra }) => {
      const { player, user } = getState() as AppStateType;
      if (player.isFetching) return false;
      if (authorizationExpired(user.currentUser)) return false;
      if (player.player.id === id) return false;
    },
  }
);
export const updatePlayer = createAsyncThunk(
  `player/updatePlayer`,
  async (params: PlayerDto, { rejectWithValue, dispatch }) => {
    try {
      const responce = await PlayerService.updatePlayer(params);
      return correctPlayerBirthdayIfNeeded(responce as PlayerDto);
    } catch (error: any) {
      if (error.status == 401) {
        dispatch(userActions.removeUser());
        AuthService.clearUser();
        return rejectWithValue("Authorization error");
      }
      return rejectWithValue(error.message);
    }
  }
);
export const deletePlayer = createAsyncThunk(
  `player/deletePlayer`,
  async (id: number, { rejectWithValue, dispatch }) => {
    try {
      const responce = await PlayerService.deletePlayer(id);
      return responce as PlayerDto;
    } catch (error: any) {
      if (error.status == 401) {
        dispatch(userActions.removeUser());
        AuthService.clearUser();
        return rejectWithValue("Authorization error");
      }
      return rejectWithValue(error.message);
    }
  }
);
export const addPlayer = createAsyncThunk(
  `player/addPlayer`,
  async (player: NewPlayerDto, { rejectWithValue, dispatch }) => {
    try {
      const responce = await PlayerService.addPlayer(player);
      return correctPlayerBirthdayIfNeeded(responce as PlayerDto);
    } catch (error: any) {
      if (error.status == 401) {
        dispatch(userActions.removeUser());
        AuthService.clearUser();
        return rejectWithValue("Authorization error");
      }
      return rejectWithValue(error.message);
    }
  }
);

const correctPlayerBirthdayIfNeeded = (player: PlayerDto) => {
  if (typeof player.birthday == "string")
    player.birthday = new Date(player.birthday);
  return player;
};

interface PlayerSliceStateType {
  player: PlayerDto;
  isFetching: boolean;
  error?: string;
}
const initialState: PlayerSliceStateType = {
  player: {} as PlayerDto,
  isFetching: false,
  error: "",
};
const playerSlice = createSlice({
  name: "player",
  initialState: initialState,
  reducers: {
    setPlayer: (state, action) => {
      state.player = action.payload;
    },
    clearState: (state) => {
      state.player = {} as PlayerDto;
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPlayer.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(getPlayer.fulfilled, (state, action) => {
        state.isFetching = false;
        state.player = action.payload as PlayerDto;
        state.error = undefined;
      })
      .addCase(getPlayer.rejected, (state, action) => {
        state.isFetching = false;
        state.error = "Error on getting player: " + (action.payload as string);
      })
      .addCase(updatePlayer.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(updatePlayer.fulfilled, (state, action) => {
        state.isFetching = false;
        state.player = action.payload as PlayerDto;
        state.error = undefined;
      })
      .addCase(updatePlayer.rejected, (state, action) => {
        state.isFetching = false;
        state.error = "Error on updating team: " + (action.payload as string);
      })
      .addCase(deletePlayer.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(deletePlayer.fulfilled, (state, action) => {
        state.isFetching = false;
        state.player = {} as PlayerDto;
        state.error = undefined;
      })
      .addCase(deletePlayer.rejected, (state, action) => {
        state.isFetching = false;
        state.error = "Error on deleting team: " + (action.payload as string);
      })
      .addCase(addPlayer.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(addPlayer.fulfilled, (state, action) => {
        state.isFetching = false;
        state.error = undefined;
        state.player = action.payload as PlayerDto;
      })
      .addCase(addPlayer.rejected, (state, action) => {
        state.isFetching = false;
        state.error = "Error on adding team: " + (action.payload as string);
      });
  },
});

export const playerActions = { ...playerSlice.actions };
export default playerSlice.reducer;
