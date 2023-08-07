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
  isLogged: boolean;
  isLoading: boolean;
}

export const initialState: UserState = {
  name: '',
  email: '',
  password: '',
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

    backEndAPI.defaults.headers.common.Authorization = `Bearer ${data.token}`;

    delete data.token;

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
      state.name = action.payload.pseudo;
    })
    .addCase(logout, (state) => {
      state.isLogged = initialState.isLogged;
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
    });
});

export default userReducer;
