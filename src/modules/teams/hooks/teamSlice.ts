import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PlayerDtoPageResult } from "api/Dto/playerDto";
import { NewTeamDto, TeamDto } from "api/Dto/teamDto";
import PlayerService from "api/players/playerService";
import TeamService from "api/teams/teamService";
import { AppStateType } from "core/redux/configureStore";
import { userActions } from "core/redux/userSlice";

export const getTeam = createAsyncThunk(
  `team/getTeam`,
  async (id: number, { rejectWithValue, dispatch }) => {
    try {
      const responce = await TeamService.getTeam(id);
      if (responce && (responce as TeamDto).id) {
        const teamPlayers = await PlayerService.getPlayers("",  1, 100,[id]);
        responce.players = (teamPlayers as PlayerDtoPageResult).data;
      }
      else throw new Error("Team not found")
      return responce as TeamDto;
    } catch (error: any) {
      if(error.status == 401) {
        dispatch(userActions.removeUser(null))
      }
      return rejectWithValue(error.message);
    }
  },
  {
    condition: (_, { getState, extra }) => {
      const { teamOptions } = getState() as AppStateType      
      if (teamOptions.isFetching) {        
        return false
      }
    }
  }
);
export const updateTeam = createAsyncThunk(
  `team/updateTeam`,
  async (params: TeamDto, { rejectWithValue, dispatch }) => {
    try {
      const responce = await TeamService.updateTeam(params);
      return responce as TeamDto;
    } catch (error: any) {
      if(error.status == 401) {
        dispatch(userActions.removeUser(null))
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
      if(error.status == 401) {
        dispatch(userActions.removeUser(null))
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
      if(error.status == 401) {
        dispatch(userActions.removeUser(null))
      }
      return rejectWithValue(error.message);
    }
  }
);

interface StateType {
  team: TeamDto;
  isFetching: boolean;
  error?: string ;
  operationSucceded:boolean
}
const initialState: StateType = {
  team: {} as TeamDto,
  isFetching: false,
  error: "",
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
        state.operationSucceded=false;
        state.error=undefined
      })
      .addCase(getTeam.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.error.message+" :"+(action.payload as string);
      })
      .addCase(updateTeam.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(updateTeam.fulfilled, (state, action) => {
        state.isFetching = false;
        state.team = action.payload;
        state.operationSucceded=true;
        state.error=undefined
      })
      .addCase(updateTeam.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.error.message+" :"+(action.payload as string);
      })
      .addCase(deleteTeam.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(deleteTeam.fulfilled, (state, action) => {
        state.isFetching = false;
        state.team = action.payload;
        state.operationSucceded=true;
        state.error=undefined
      })
      .addCase(deleteTeam.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.error.message+" :"+(action.payload as string);
      })
      .addCase(addTeam.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(addTeam.fulfilled, (state, action) => {
        state.isFetching = false;
        state.team = action.payload;
        state.operationSucceded = true;
        state.error=undefined
      })
      .addCase(addTeam.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.error.message+" :"+(action.payload as string);
      });
  },
});

export const teamActions = { ...teamSlice.actions };
export default teamSlice.reducer;
