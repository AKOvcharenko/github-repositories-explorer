import { PayloadAction } from '@reduxjs/toolkit';

import { User } from 'models';

import { UsersState } from '../model';

export const storeUsers = (
  state: UsersState,
  { payload }: PayloadAction<User[]>
) => ({
  ...state,
  users: payload,
});

export const storeUsersRequestState = (
  state: UsersState,
  { payload }: PayloadAction<boolean>
) => ({
  ...state,
  loading: payload,
});
