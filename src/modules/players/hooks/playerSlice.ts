import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { NewPlayerDto, PlayerDto } from "api/dto/playerDto";
import PlayerService from "api/players/playerService";
import { authorizationExpired } from "common/helpers/userCheck";
import { AppStateType } from "core/redux/configureStore";
import { userActions } from "core/redux/userSlice";

export const getPlayer = createAsyncThunk(
  `player/getPlayer`,
  async (id: number, { rejectWithValue, dispatch, getState }) => {
    try {
      let currentPlayer = (getState() as AppStateType).player.player;
      if (id == currentPlayer.id) return currentPlayer;

      const responce = await PlayerService.getPlayer(id);
      if (responce && (responce as PlayerDto).id) {
        return responce as PlayerDto;
      } else throw new Error("Player not found");
    } catch (error: any) {
      if(error.status == 401) {
        dispatch(userActions.removeUser())
      }
      return rejectWithValue(error.message);
    }
  },
  {
    condition: (_, { getState, extra }) => {
      const { player, user } = getState() as AppStateType;
      if (player.isFetching) return false      
      if (authorizationExpired(user.currentUser)) return false
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
      if(error.status == 401) {
        dispatch(userActions.removeUser())
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
      if(error.status == 401) {
        dispatch(userActions.removeUser())
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
      if(error.status == 401) {
        dispatch(userActions.removeUser())
      }
      return rejectWithValue(error.message);
    }
  }
);

interface StateType {
  player: PlayerDto;
  isFetching: boolean;
  error?: string;
  operationSucceded: boolean;
}
const initialState: StateType = {
  player: {} as PlayerDto,
  isFetching: false,
  error: "",
  operationSucceded: false,
};
const playerSlice = createSlice({
  name: "player",
  initialState: initialState,
  reducers: {
    setPlayer: (state, action) => {
      state.player = action.payload;
    },
    setPlayerPhoto: (state, action) => {
      state.player.avatarUrl = action.payload;
    },
    setPlayerBirthday: (state, action) => {
      state.player.birthday = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPlayer.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(getPlayer.fulfilled, (state, action) => {
        state.isFetching = false;
        let player = action.payload as PlayerDto;
        if (typeof player.birthday == "string")
          player.birthday = new Date(player.birthday);
        state.player = player;
        state.operationSucceded = false;
        state.error = undefined;
      })
      .addCase(getPlayer.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.error.message + " :" + (action.payload as string);
      })
      .addCase(updatePlayer.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(updatePlayer.fulfilled, (state, action) => {
        state.isFetching = false;

        let player = action.payload as PlayerDto;
        if (typeof player.birthday == "string")
          player.birthday = new Date(player.birthday);
        state.player = player;
        state.operationSucceded = true;
        state.error = undefined;
      })
      .addCase(updatePlayer.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.error.message + " :" + (action.payload as string);
      })
      .addCase(deletePlayer.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(deletePlayer.fulfilled, (state, action) => {
        state.isFetching = false;

        let player = action.payload as PlayerDto;
        if (typeof player.birthday == "string")
          player.birthday = new Date(player.birthday);
        state.player = player;

        state.operationSucceded = true;
        state.error = undefined;
      })
      .addCase(deletePlayer.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.error.message + " :" + (action.payload as string);
      })
      .addCase(addPlayer.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(addPlayer.fulfilled, (state, action) => {
        state.isFetching = false;

        let player = action.payload as PlayerDto;
        if (typeof player.birthday == "string")
          player.birthday = new Date(player.birthday);
        state.player = player;

        state.operationSucceded = true;
        state.error = undefined;
      })
      .addCase(addPlayer.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.error.message + " :" + (action.payload as string);
      });
  },
});

export const playerActions = { ...playerSlice.actions };
export default playerSlice.reducer;
