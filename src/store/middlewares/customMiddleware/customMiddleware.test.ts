import {
  Dispatch,
  AnyAction,
  PayloadAction,
  MiddlewareAPI,
} from '@reduxjs/toolkit';
import { identity } from 'lodash-es';

import { customMiddlewareDependsOnEnvVarCreator } from './customMiddleware';

jest.mock('lodash-es', () => {
  const originalModule = jest.requireActual('lodash-es');
  return {
    ...originalModule,
    identity: jest.fn(),
  };
});

const MOCK_API = {} as MiddlewareAPI;
const MOCK_ENV_VALUE = 'MOCK_ENV_VALUE';
const MOCK_NEXT = (act: PayloadAction<unknown>) => act;
const MOCK_ACTION = { type: 'mock-redux-action', payload: {} };

describe('customMiddlewareDependsOnEnvVarCreator', () => {
  it('customMiddlewareDependsOnEnvVarCreator should ignore function call when env is omitted', async () => {
    customMiddlewareDependsOnEnvVarCreator()(MOCK_API)(
      MOCK_NEXT as Dispatch<AnyAction>
    )(MOCK_ACTION);
    expect(identity).not.toBeCalledWith();
  });

  it('customMiddlewareDependsOnEnvVarCreator should call function when env is provided', async () => {
    customMiddlewareDependsOnEnvVarCreator(MOCK_ENV_VALUE)(MOCK_API)(
      MOCK_NEXT as Dispatch<AnyAction>
    )(MOCK_ACTION);
    expect(identity).toBeCalledWith(MOCK_ENV_VALUE);
  });
});
