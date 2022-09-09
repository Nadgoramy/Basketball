import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PositionDto } from "api/Dto/positionDto";
import { PlayerService } from "api/players/playerService";
import { AuthService } from "api/requests/authService";
import { OptionTypeValueString } from "common/components/StyledSelect";
import { authorizationExpired } from "common/helpers/userCheck";
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
      if (error.status == 401) {
        dispatch(userActions.removeUser());
        AuthService.clearUser();
        return rejectWithValue("Authorization error");
      }
      return rejectWithValue(error.message);
    }
  },
  {
    condition: (_, { getState, extra }) => {
      const { positions, user } = getState() as AppStateType;
      if (positions.isFetching) return false;
      if (authorizationExpired(user.currentUser)) return false;
    },
  }
);

type PositionSliceStateType = {
  isFetching: boolean;
  list: PositionDto[];
  options: OptionTypeValueString[];
};

const initialState = {
  isFetching: false,
  list: [],
  options: [],
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
