import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';

import { backEndAPI } from '../../utils/axios';

interface ContactState {
  name: string | '';
  email: string | '';
  message: string | '';
}

export const initialState: ContactState = {
  name: '',
  email: '',
  message: '',
};

// sendMessage action (thunk)
export const sendMessage = createAsyncThunk(
  '/contact',
  async (FormData: FormData) => {
    const objData = Object.fromEntries(FormData);
    console.log(objData);

    const { data } = await backEndAPI.post('/random', objData);

    backEndAPI.defaults.headers.common.Authorization = `Bearer ${data.token}`;

    delete data.token;

    return data;
  }
);

const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(sendMessage.fulfilled, (state, action) => {
    state.email = action.payload.sent;
    state.name = action.payload.pseudo;
  });
});

export default userReducer;
