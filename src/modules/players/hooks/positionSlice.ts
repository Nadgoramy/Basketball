import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PositionDto } from "api/Dto/positionDto";
import { PlayerService } from "api/players/playerService";
import { authorizationExpired, UserActions } from "common/helpers/userCheck";
import { AppStateType } from "core/redux/configureStore";
import { userActions } from "core/redux/userSlice";

export const getPositions = createAsyncThunk(
  `position/getOptions`,
  async (_, { rejectWithValue, getState, dispatch }) => {
    try {
      let list = (getState() as AppStateType).positions.list;
      if (list.length > 0) return list;

      let responce = await PlayerService.getPositions();
      if (!responce) {
        rejectWithValue("Unauthorized user");
      }
      if (responce) {
        return responce;
      } else throw new Error("No position found");
    } catch (error: any) {
      if (error.status === 401) {
        dispatch(userActions.removeUser());
        UserActions.clearUser();
        return rejectWithValue("Authorization error");
      }
      return rejectWithValue(error.message);
    }
  },
  {
    condition: (_, { getState }) => {
      const { positions, user } = getState() as AppStateType;
      if (positions.isFetching) return false;
      if (authorizationExpired(user.currentUser)) return false;
    },
  }
);

type PositionSliceStateType = {
  isFetching: boolean;
  list: PositionDto[];
};

const initialState = {
  isFetching: false,
  list: [],
} as PositionSliceStateType;

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
        state.list = action.payload;
      })
      .addCase(getPositions.rejected, (state, action) => {
        state.isFetching = false;
      });
  },
});

export default positionSlice.reducer;
