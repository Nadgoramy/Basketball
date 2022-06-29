import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PlayerDtoPageResult } from "api/Dto/playerDto";
import { NewTeamDto, TeamDto } from "api/Dto/teamDto";
import PlayerService from "api/players/playerService";
import TeamService from "api/teams/teamService";

export const getTeam = createAsyncThunk(
  `team/getTeam`,
  async (id: number, { rejectWithValue }) => {
    try {
      const responce = await TeamService.getTeam(id);
      if (responce) {
        const teamPlayers = await PlayerService.getPlayers("",  1, 100,[id]);
        responce.players = (teamPlayers as PlayerDtoPageResult).data;
      }
      return responce as TeamDto;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const updateTeam = createAsyncThunk(
  `team/updateTeam`,
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
  `team/deleteTeam`,
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
  `team/addTeam`,
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
  operationSucceded:boolean
}
const initialState: StateType = {
  team: {} as TeamDto,
  isFetching: false,
  error: "" as string | undefined,
  operationSucceded: false
};
const teamSlice = createSlice({
  name: "team",
  initialState: initialState,
  reducers: {
    setTeam: (state, action) => {
      state.team = action.payload;
    },
    setTeamImage: (state, action) => {
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
        state.operationSucceded=true;
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
        state.operationSucceded=true;
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
        state.operationSucceded = true;
      })
      .addCase(addTeam.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.error.message;
      });
  },
});

export const teamActions = { ...teamSlice.actions };
export default teamSlice.reducer;
