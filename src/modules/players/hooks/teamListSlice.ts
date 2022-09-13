import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TeamDto } from "api/Dto/teamDto";
import { TeamService } from "api/requests/teamService";
import { authorizationExpired, UserActions } from "common/helpers/userCheck";
import { AppStateType } from "core/redux/configureStore";
import { userActions } from "core/redux/userSlice";

async function LoadTeams() {
  let teamCount = 25;
  let iteration = 0;
  let allTeams = new Array<TeamDto>();
  do {
    iteration++;
    let responce = await TeamService.getTeams("", iteration, 25);
    teamCount = responce.count;
    responce.data.map((t: TeamDto) => allTeams.push(t));
  } while (allTeams.length < teamCount);
  return allTeams;
}

export const getTeamOptions = createAsyncThunk(
  `teamOptions/getOptions`,
  async (_, { rejectWithValue, getState, dispatch }) => {
    try {
      const state = getState() as AppStateType;
      if (state.teamList.list.length > 0)
        return state.teamList.list;

      return LoadTeams();
    } catch (error: any) {
      if (error.status === 401) {
        dispatch(userActions.removeUser());
        UserActions.clearUser()
        return rejectWithValue("Authorization error");
      }
      return rejectWithValue(error.message);
    }
  },
  {
    condition: (_, { getState }) => {
      const { teamList, user } = getState() as AppStateType;
      if (teamList.isFetching) return false;
      if (authorizationExpired(user.currentUser)) return false;
    },
  }
);

type TeamOptionSliceStateType = {
  isFetching: boolean;
  list: TeamDto[];
  error: string | undefined;
};

const initialState = {
  isFetching: false,
  list: [],
  error: undefined,
} as TeamOptionSliceStateType;

const teamListSlice = createSlice({
  name: "teamOptions",
  initialState: initialState,
  reducers: {
    clearState: (state) => {
      state.list = [];
      state.error = undefined;
      state.isFetching = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTeamOptions.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(getTeamOptions.fulfilled, (state, action) => {
        state.isFetching = false;
        if (action.payload) {
          state.list = action.payload;
        }
      })
      .addCase(getTeamOptions.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.error.message;
      });
  },
});

export const teamOptionActions = { ...teamListSlice.actions };
export default teamListSlice.reducer;
