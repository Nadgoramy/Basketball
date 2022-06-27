import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PositionDto } from "api/Dto/positionDto";
import PlayerService from "api/players/playerService";
import { OptionTypeValueNumber, OptionTypeValueString } from "common/components/StyledSelect";

export const getPositions = createAsyncThunk(
  `position/getOptions`,
  async (_, { rejectWithValue }) => {
    try {
      let responce = await PlayerService.getPositions();
      if (!responce) {
        rejectWithValue("Unauthorized user");
        return;
      }
      if (responce) {
        return responce;
      } else throw new Error("No position found");
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

type StateType = {
  isFetching: boolean;
  list: PositionDto[];
  options: OptionTypeValueString[];
};

const initialState = {
  isFetching: false,
  list: [],
  options: [],
} as StateType;

const positionSlice = createSlice({
  name: "position",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPositions.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(getPositions.fulfilled, (state, action: any) => {
        state.isFetching = false;
        if (action.payload) {
          let optopns = new Array<OptionTypeValueString>();
          action.payload.map((t: PositionDto) =>
            optopns.push({ label: t.title, value: t.title })
          );

          state.list = action.payload;
          state.options = optopns;
        }
      })
      .addCase(getPositions.rejected, (state, action) => {
        state.isFetching = false;
      });
  },
});

export default positionSlice.reducer;
