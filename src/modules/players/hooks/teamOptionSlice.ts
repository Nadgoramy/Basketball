import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TeamDto } from "api/Dto/teamDto";
import TeamService from "api/teams/teamService";
import { OptionTypeValueNumber } from "common/components/StyledSelect";
import { useAppSelector } from "core/redux/store";

export async function LoadTeamOptions(){
  const totalCountResponce = await TeamService.getTeams("", 1, 1);

  if (totalCountResponce && totalCountResponce.count>0) {
    const responce = await TeamService.getTeams("", 1, totalCountResponce.count);

    let options = new Array<OptionTypeValueNumber>();
    responce.data.map((t: TeamDto) =>
    options.push({ label: t.name, value: t.id })
    );
    return  options
  } else throw new Error("No team found");
}
export const getTeamOptions = createAsyncThunk(
  `teamOptions/getOptions`,
  async (_, { rejectWithValue }) => {
    try {
      //let teamOptions = useAppSelector(store => store.teamOptions)
      //if(teamOptions.options.length>0) return teamOptions
      return LoadTeamOptions()
      
    } catch (error: any) {
      return rejectWithValue(error.message);
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
      .addCase(getTeamOptions.fulfilled, (state, action: any) => {
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
