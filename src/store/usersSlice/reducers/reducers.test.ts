import { USERS } from 'mocks';

import {
  usersSlice,
  initialState,
  storeUsersAction,
  storeUsersRequestStateAction,
} from '../slice';

const state = { ...initialState };

describe('usersSlice Reducers', () => {
  it('storeUsers should put provided users array to state', async () => {
    const updatedState = usersSlice(state, storeUsersAction(USERS));
    expect(updatedState.users).toStrictEqual(USERS);
    expect(state).toStrictEqual(initialState);
  });

  it('storeUsersRequestState should put provided users array to state', async () => {
    const updatedState = usersSlice(state, storeUsersRequestStateAction(true));
    expect(updatedState.loading).toBe(true);
    expect(state).toStrictEqual(initialState);
  });
});
