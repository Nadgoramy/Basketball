import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TeamDto } from "api/dto/teamDto";
import TeamService from "api/requests/teamService";
import { OptionTypeValueNumber } from "common/components/StyledSelect";
import { authorizationExpired } from "common/helpers/userCheck";
import { AppStateType } from "core/redux/configureStore";
import { userActions } from "core/redux/userSlice";

async function LoadTeamOptions(){
  const totalCountResponce = await TeamService.getTeams("", 1, 1);

  if (totalCountResponce && totalCountResponce.count>0) {
    let iteration=0;
    let options = new Array<OptionTypeValueNumber>();
    do{
      iteration++;
    const responce = await TeamService.getTeams("", iteration, 25);    
    responce.data.map((t: TeamDto) =>
    options.push({ label: t.name, value: t.id })
    );
    }while(options.length < totalCountResponce.count)

    return  options
  } else throw new Error("No team found");
}

export const getTeamOptions = createAsyncThunk(
  `teamOptions/getOptions`,
  async (_, { rejectWithValue, getState, dispatch }) => {
    try {
      const state = getState() as AppStateType;
      if(state.teamOptions.options.length>0) return state.teamOptions.options 

      return LoadTeamOptions()
      
    } catch (error: any) {
      if(error.status == 401) {
        dispatch(userActions.removeUser())
      }
      return rejectWithValue(error.message);
    }
  },
  {
    condition: (_, { getState, extra }) => {
      const { teamOptions, user } = getState() as AppStateType      
      if (teamOptions.isFetching) return false
      if (authorizationExpired(user.currentUser)) return false
    }
  }
);

type StateType = {
  isFetching: boolean;
  options: OptionTypeValueNumber[];
  error: string|undefined
};

const initialState = {
  isFetching: false,
  options: [],
  error:undefined
} as StateType;

const teamOptionSlice = createSlice({
  name: "teamOptions",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTeamOptions.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(getTeamOptions.fulfilled, (state, action) => {
        state.isFetching = false;
        if (action.payload) {
          state.options = action.payload;
        }
      })
      .addCase(getTeamOptions.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.error.message
      });
  },
});

export default teamOptionSlice.reducer;
