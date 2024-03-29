import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PlayerDto, PlayerDtoPageResult } from "api/Dto/playerDto";
import { NewTeamDto, TeamDto } from "api/Dto/teamDto";
import { PlayerService } from "api/players/playerService";
import { TeamService } from "api/requests/teamService";
import { authorizationExpired } from "common/helpers/userCheck";
import { AppStateType } from "core/redux/configureStore";
import { userActions } from "core/redux/userSlice";

export const getTeam = createAsyncThunk(
  `team/getTeam`,
  async (id: number, { rejectWithValue, dispatch }) => {
    try {
      const responce = (await TeamService.getTeam(id)) as TeamDto;
      if (responce && (responce as TeamDto).id) {
        const teamPlayers = await PlayerService.getPlayers("", 1, 100, [id]);
        responce.players = (teamPlayers as PlayerDtoPageResult).data;
        responce.players.forEach((p: PlayerDto) => {
          if (typeof p.birthday == "string") p.birthday = new Date(p.birthday);
        });
      } else throw new Error("Team not found");
      return responce as TeamDto;
    } catch (error: any) {
      if (error.status === 401) {
        dispatch(userActions.removeUser());
        return rejectWithValue("Authorization error");
      }
      return rejectWithValue(error.message);
    }
  },
  {
    condition: (id: number, { getState, extra }) => {
      const { user, team } = getState() as AppStateType;
      if (authorizationExpired(user.currentUser)) return false;
      if (team.team.id === id) return false;
    },
  }
);
export const updateTeam = createAsyncThunk(
  `team/updateTeam`,
  async (params: TeamDto, { rejectWithValue, dispatch }) => {
    try {
      const responce = await TeamService.updateTeam(params);
      return responce as TeamDto;
    } catch (error: any) {
      if (error.status === 401) {
        dispatch(userActions.removeUser());
        return rejectWithValue("Authorization error");
      }
      return rejectWithValue(error.message);
    }
  }
);
export const deleteTeam = createAsyncThunk(
  `team/deleteTeam`,
  async (id: number, { rejectWithValue, dispatch }) => {
    try {
      const responce = await TeamService.deleteTeam(id);
      return responce as TeamDto;
    } catch (error: any) {
      if (error.status === 401) {
        dispatch(userActions.removeUser());
        return rejectWithValue("Authorization error");
      }
      return rejectWithValue(error.message);
    }
  }
);
export const addTeam = createAsyncThunk(
  `team/addTeam`,
  async (player: NewTeamDto, { rejectWithValue, dispatch }) => {
    try {
      const responce = await TeamService.addTeam(player);
      return responce as TeamDto;
    } catch (error: any) {
      if (error.status === 401) {
        dispatch(userActions.removeUser());
        return rejectWithValue("Authorization error");
      }
      return rejectWithValue(error.message);
    }
  }
);

interface TeamSliseStateType {
  team: TeamDto;
  isFetching: boolean;
  error?: string;
}
const initialState: TeamSliseStateType = {
  team: {} as TeamDto,
  isFetching: false,
  error: undefined,
};
const teamSlice = createSlice({
  name: "team",
  initialState: initialState,
  reducers: {
    setTeam: (state, action) => {
      state.team = action.payload;
    },
    clearState: (state) => {
      state.team = {} as TeamDto;
      state.error = undefined;
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
        state.error = undefined;
      })
      .addCase(getTeam.rejected, (state, action) => {
        state.isFetching = false;
        state.error = "Error on getting team: " + (action.payload as string);
      })
      .addCase(updateTeam.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(updateTeam.fulfilled, (state, action) => {
        state.isFetching = false;
        state.team.name = action.payload.name;
        state.team.conference = action.payload.conference;
        state.team.division = action.payload.division;
        state.team.foundationYear = action.payload.foundationYear;
        state.team.imageUrl = action.payload.imageUrl;
        state.error = undefined;
      })
      .addCase(updateTeam.rejected, (state, action) => {
        state.isFetching = false;
        state.error = "Error on updating team: " + (action.payload as string);
      })
      .addCase(deleteTeam.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(deleteTeam.fulfilled, (state, action) => {
        state.isFetching = false;
        state.team = action.payload;
        state.error = undefined;
      })
      .addCase(deleteTeam.rejected, (state, action) => {
        state.isFetching = false;
        state.error = "Error on deleting team: " + (action.payload as string);
      })
      .addCase(addTeam.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(addTeam.fulfilled, (state, action) => {
        state.isFetching = false;
        state.team = action.payload;
        state.error = undefined;
      })
      .addCase(addTeam.rejected, (state, action) => {
        state.isFetching = false;
        state.error = "Error on adding team: " + (action.payload as string);
      });
  },
});

export const teamActions = { ...teamSlice.actions };
export default teamSlice.reducer;
