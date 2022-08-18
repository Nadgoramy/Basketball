import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PlayerDto, PlayerDtoPageResult } from "api/Dto/playerDto";
import { NewTeamDto, TeamDto } from "api/Dto/teamDto";
import PlayerService from "api/players/playerService";
import TeamService from "api/requests/teamService";
import { authorizationExpired } from "common/helpers/userCheck";
import { AppStateType } from "core/redux/configureStore";
import { userActions } from "core/redux/userSlice";

import debounce from "lodash.debounce";

export const getTeam = createAsyncThunk(
  `team/getTeam`,
  async (id: number, { rejectWithValue, dispatch }) => {
    try {
      const responce = await TeamService.getTeam(id);
      if (responce && (responce as TeamDto).id) {
        const teamPlayers = await PlayerService.getPlayers("", 1, 100, [id]);
        responce.players = (teamPlayers as PlayerDtoPageResult).data;
        responce.players.forEach((p: PlayerDto) => {
          if (typeof p.birthday == "string") p.birthday = new Date(p.birthday);
        });
      } else throw new Error("Team not found");
      return responce as TeamDto;
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
      const { teamOptions, user, team } = getState() as AppStateType;
      if (teamOptions.isFetching) return false;
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
      if (error.status == 401) {
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
      if (error.status == 401) {
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
      if (error.status == 401) {
        dispatch(userActions.removeUser());
        return rejectWithValue("Authorization error");
      }
      return rejectWithValue(error.message);
    }
  }
);

interface StateType {
  team: TeamDto;
  isFetching: boolean;
  error?: string;
  updateSucceded: boolean;
  deleteSucceded: boolean;
}
const initialState: StateType = {
  team: {} as TeamDto,
  isFetching: false,
  error: "",
  updateSucceded: false,
  deleteSucceded: false,
};
const teamSlice = createSlice({
  name: "team",
  initialState: initialState,
  reducers: {
    setTeam: (state, action) => {
      state.team = action.payload;
      state.deleteSucceded = false;
      state.updateSucceded = false;
    },    
    clearState: (state) => {
      state = initialState;
      state.deleteSucceded = false;
      state.updateSucceded = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTeam.pending, (state, action) => {
        state.isFetching = true;
        state.updateSucceded = false;
        state.deleteSucceded = false;
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
        state.updateSucceded = false;
      })
      .addCase(updateTeam.fulfilled, (state, action) => {
        state.isFetching = false;
        state.team.name = action.payload.name;
        state.team.conference = action.payload.conference;
        state.team.division = action.payload.division;
        state.team.foundationYear = action.payload.foundationYear;
        state.team.imageUrl = action.payload.imageUrl;
        state.updateSucceded = true;
        state.error = undefined;
      })
      .addCase(updateTeam.rejected, (state, action) => {
        state.isFetching = false;
        state.error = "Error on updating team: " + (action.payload as string);
      })
      .addCase(deleteTeam.pending, (state, action) => {
        state.isFetching = true;
        state.deleteSucceded = false;
      })
      .addCase(deleteTeam.fulfilled, (state, action) => {
        state.isFetching = false;
        state.team = action.payload;
        state.deleteSucceded = true;
        state.error = undefined;
      })
      .addCase(deleteTeam.rejected, (state, action) => {
        state.isFetching = false;
        state.error = "Error on deleting team: " + (action.payload as string);
      })
      .addCase(addTeam.pending, (state, action) => {
        state.isFetching = true;
        state.updateSucceded = false;
      })
      .addCase(addTeam.fulfilled, (state, action) => {
        state.isFetching = false;
        state.team = action.payload;
        state.updateSucceded = true;
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
