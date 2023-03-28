import {
  Dispatch,
  AnyAction,
  PayloadAction,
  MiddlewareAPI,
} from '@reduxjs/toolkit';
import axios from 'axios';

import { setCustomAxiosHeaderCreator } from './axiosMiddleware';

jest.mock('axios', () => {
  const originalModule = jest.requireActual('axios');
  return {
    ...originalModule,
    defaults: {
      headers: {
        common: {},
      },
    },
  };
});

const MOCK_API = {} as MiddlewareAPI;
const MOCK_HEADER_VALUE = 'MOCK_HEADER_VALUE';
const MOCK_NEXT = (act: PayloadAction<unknown>) => act;
const MOCK_ACTION = { type: MOCK_HEADER_VALUE, payload: {} };

describe('setCustomAxiosHeaderCreator', () => {
  it('setCustomAxiosHeaderCreator should ignore header setting when it omitted', async () => {
    setCustomAxiosHeaderCreator()(MOCK_API)(MOCK_NEXT as Dispatch<AnyAction>)(
      MOCK_ACTION
    );
    expect(axios.defaults.headers.common.auth).toBeUndefined();
  });

  it('setCustomAxiosHeaderCreator should set header when it provided', async () => {
    setCustomAxiosHeaderCreator(MOCK_HEADER_VALUE)(MOCK_API)(
      MOCK_NEXT as Dispatch<AnyAction>
    )(MOCK_ACTION);
    expect(axios.defaults.headers.common.auth).toBe(MOCK_HEADER_VALUE);
  });
});
