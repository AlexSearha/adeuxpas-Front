import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';

import { backEndAPI } from '../../utils/axios';

interface UserState {
  name: string | '';
  email: string | '';
  password: string | '';
  error: string | undefined;
  isLogged: boolean;
  isLoading: boolean;
}

export const initialState: UserState = {
  name: '',
  email: '',
  password: '',
  error: '',
  isLogged: false,
  isLoading: false,
};

// LogOut action
export const logout = createAction('user/logout');

// LogIn action (thunk)
export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }: { email: string; password: string }) => {
    const bodyData = {
      email,
      password,
    };
    const { data } = await backEndAPI.post('login', bodyData);

    backEndAPI.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;

    delete data.accessToken;

    return data;
  }
);

// SignUp action (thunk)
export const register = createAsyncThunk(
  'user/register',
  async ({
    firstname,
    email,
    password,
  }: {
    firstname: string;
    email: string;
    password: string;
  }) => {
    const bodyData = {
      firstname,
      email,
      password,
    };

    const { data } = await backEndAPI.post('register', bodyData);

    return data;
  }
);

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(login.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLogged = true;
      state.email = action.payload.email;
      state.error = initialState.error;
    })
    .addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    })
    .addCase(logout, (state) => {
      state.isLogged = initialState.isLogged;
      state.email = initialState.email;
      state.name = initialState.name;

      delete backEndAPI.defaults.headers.common.Authorization;
    })
    .addCase(register.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.email = action.payload;
      state.name = action.payload;
      state.password = action.payload;
      state.error = initialState.error;
    });
});

export default userReducer;
