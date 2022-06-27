import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PlayerDtoPageResult } from "api/Dto/playerDto";
import { NewTeamDto, TeamDto } from "api/Dto/teamDto";
import PlayerService from "api/players/playerService";
import TeamService from "api/teams/teamService";

export const getTeam = createAsyncThunk(
  `team/getPlayer`,
  async (id: number, { rejectWithValue }) => {
    try {
      const responce = await TeamService.getTeam(id);
      if (responce) {
        const teamPlayers = await PlayerService.getPlayers("", [id], 1, 100);
        responce.players = (teamPlayers as PlayerDtoPageResult).data;
      }
      return responce as TeamDto;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const updateTeam = createAsyncThunk(
  `team/updatePlayer`,
  async (params: TeamDto, { rejectWithValue }) => {
    try {
      const responce = await TeamService.updateTeam(params);
      return responce as TeamDto;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const deleteTeam = createAsyncThunk(
  `team/deletePlayer`,
  async (id: number, { rejectWithValue }) => {
    try {
      const responce = await TeamService.deleteTeam(id);
      return responce as TeamDto;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const addTeam = createAsyncThunk(
  `team/addPlayer`,
  async (player: NewTeamDto, { rejectWithValue }) => {
    try {
      const responce = await TeamService.addTeam(player);
      return responce as TeamDto;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

interface StateType {
  team: TeamDto;
  isFetching: boolean;
  error: string | undefined;
}
const initialState: StateType = {
  team: {} as TeamDto,
  isFetching: false,
  error: "" as string | undefined,
};
const teamSlice = createSlice({
  name: "team",
  initialState: initialState,
  reducers: {
    setPlayer: (state, action) => {
      state.team = action.payload;
    },
    setPlayerPhoto: (state, action) => {
      state.team.imageUrl = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTeam.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(getTeam.fulfilled, (state, action) => {
        state.isFetching = false;
        state.team = action.payload ? action.payload : ({} as TeamDto);
      })
      .addCase(getTeam.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.error.message;
      })
      .addCase(updateTeam.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(updateTeam.fulfilled, (state, action) => {
        state.isFetching = false;
        state.team = action.payload;
      })
      .addCase(updateTeam.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.error.message;
      })
      .addCase(deleteTeam.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(deleteTeam.fulfilled, (state, action) => {
        state.isFetching = false;
        state.team = action.payload;
      })
      .addCase(deleteTeam.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.error.message;
      })
      .addCase(addTeam.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(addTeam.fulfilled, (state, action) => {
        state.isFetching = false;
        state.team = action.payload;
      })
      .addCase(addTeam.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.error.message;
      });
  },
});

export const teamActions = { ...teamSlice.actions };
export default teamSlice.reducer;
