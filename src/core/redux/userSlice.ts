import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "api/authService";
import { LoginFormDto, RegisterFormDto, UserDto } from "api/Dto/userDto";

export const login = createAsyncThunk(
  `user/login`,
  async (params : LoginFormDto, { rejectWithValue }) => {
    try {
        const responce = await AuthService.login(params.login, params.password) 
        return responce       
    } catch (error: any) {
      if(error.status == 401) return rejectWithValue("User with the specified username / password was not found.")
      return rejectWithValue(error.message);
    }
  }
);

export const register = createAsyncThunk(
    `user/register`,
    async (params : RegisterFormDto, { rejectWithValue }) => {
      try {
        const responce = await AuthService.register(params.userName, params.login, params.password) 
        return responce             
      } catch (error : any) {
        return rejectWithValue(error.message);
      }
    }
  );

interface UserState {
  currentUser?: UserDto;
  isLoggedIn: boolean;
  isFetching: boolean;
  error?: string;
}

const initialState = {
  currentUser: undefined,
  isLoggedIn: false,
  isFetching: false,
} as UserState;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser:(state, action) => {
      state.currentUser = action.payload;
    },
    removeUser:(state, action) => {
      state.currentUser = undefined;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isFetching = false;
        state.currentUser = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
        state.error = undefined;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.error.message + " :" + (action.payload as string);
      })
      .addCase(register.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isFetching = false;
        state.currentUser = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
        state.error = undefined;
        state.isLoggedIn = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.error.message + " :" + (action.payload as string);
      });
  },
});

export const userActions = { ...userSlice.actions };
export default userSlice.reducer;
