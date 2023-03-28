import { createSlice } from '@reduxjs/toolkit';

import { UsersState } from './model';
import { storeUsers, storeUsersRequestState } from './reducers';

const initialState: UsersState = {
  users: [],
  loading: false,
};

const usersState = createSlice({
  name: 'users',
  initialState,
  reducers: {
    storeUsers,
    storeUsersRequestState,
  },
});

export const usersSlice = usersState.reducer;
export const {
  storeUsers: storeUsersAction,
  storeUsersRequestState: storeUsersRequestStateAction,
} = usersState.actions;
