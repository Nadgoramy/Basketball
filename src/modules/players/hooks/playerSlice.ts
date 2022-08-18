import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { NewPlayerDto, PlayerDto } from "api/Dto/playerDto";
import PlayerService from "api/players/playerService";
import { authorizationExpired } from "common/helpers/userCheck";
import { AppStateType } from "core/redux/configureStore";
import { userActions } from "core/redux/userSlice";
import { playersActions } from "modules/players/hooks/playersPageSlice";

export const getPlayer = createAsyncThunk(
  `player/getPlayer`,
  async (id: number, { rejectWithValue, dispatch, getState }) => {
    try {
      const currentPlayer = (getState() as AppStateType).player.player;
      if (id == currentPlayer.id) return currentPlayer;

      const responce = await PlayerService.getPlayer(id);
      if (responce && (responce as PlayerDto).id) {
        return responce as PlayerDto;
      } else throw new Error("Player not found");
    } catch (error: any) {
      if (error.status == 401) {
        dispatch(userActions.removeUser());
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
      return responce as PlayerDto;
    } catch (error: any) {
      if (error.status == 401) {
        dispatch(userActions.removeUser());
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
      return responce as PlayerDto;
    } catch (error: any) {
      if (error.status == 401) {
        dispatch(userActions.removeUser());
        return rejectWithValue("Authorization error");
      }
      return rejectWithValue(error.message);
    }
  }
);

interface StateType {
  player: PlayerDto;
  isFetching: boolean;
  error?: string;
  updateSucceded: boolean;
  deleteSucceded: boolean;
}
const initialState: StateType = {
  player: {} as PlayerDto,
  isFetching: false,
  error: "",
  updateSucceded: false,
  deleteSucceded: false,
};
const playerSlice = createSlice({
  name: "player",
  initialState: initialState,
  reducers: {
    setPlayer: (state, action) => {
      state.player = action.payload;
    },
    clearState: (state) => {
      state = initialState;
      state.deleteSucceded = false;
      state.updateSucceded = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPlayer.pending, (state, action) => {
        state.isFetching = true;
        state.updateSucceded = false;
        state.deleteSucceded = false;
      })
      .addCase(getPlayer.fulfilled, (state, action) => {
        state.isFetching = false;
        let player = action.payload as PlayerDto;
        if (typeof player.birthday == "string")
          player.birthday = new Date(player.birthday);
        state.player = player;
        state.error = undefined;
      })
      .addCase(getPlayer.rejected, (state, action) => {
        state.isFetching = false;
        state.error = "Error on getting player: " + (action.payload as string);
      })
      .addCase(updatePlayer.pending, (state, action) => {
        state.isFetching = true;
        state.updateSucceded = false;
      })
      .addCase(updatePlayer.fulfilled, (state, action) => {
        state.isFetching = false;

        let player = action.payload as PlayerDto;
        if (typeof player.birthday == "string")
          player.birthday = new Date(player.birthday);
        state.player = player;
        state.updateSucceded = true;
        state.error = undefined;
      })
      .addCase(updatePlayer.rejected, (state, action) => {
        state.isFetching = false;
        state.error = "Error on updating team: " + (action.payload as string);
      })
      .addCase(deletePlayer.pending, (state, action) => {
        state.isFetching = true;
        state.deleteSucceded = false;
      })
      .addCase(deletePlayer.fulfilled, (state, action) => {
        state.isFetching = false;

        let player = action.payload as PlayerDto;
        if (typeof player.birthday == "string")
          player.birthday = new Date(player.birthday);
        state.player = player;

        state.deleteSucceded = true;
        state.error = undefined;
      })
      .addCase(deletePlayer.rejected, (state, action) => {
        state.isFetching = false;
        state.error = "Error on deleting team: " + (action.payload as string);
      })
      .addCase(addPlayer.pending, (state, action) => {
        state.isFetching = true;
        state.updateSucceded = false;
      })
      .addCase(addPlayer.fulfilled, (state, action) => {
        state.isFetching = false;
        state.updateSucceded = true;
        state.error = undefined;

        let player = action.payload as PlayerDto;
        if (typeof player.birthday == "string")
          player.birthday = new Date(player.birthday);
        state.player = player;
      })
      .addCase(addPlayer.rejected, (state, action) => {
        state.isFetching = false;
        state.error = "Error on adding team: " + (action.payload as string);
      });
  },
});

export const playerActions = { ...playerSlice.actions };
export default playerSlice.reducer;
