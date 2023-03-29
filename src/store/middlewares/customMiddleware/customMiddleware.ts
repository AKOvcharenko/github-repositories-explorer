import { identity } from 'lodash-es';
import { Middleware, PayloadAction } from '@reduxjs/toolkit';

export const customMiddlewareDependsOnEnvVarCreator: (
  envVar?: string
) => Middleware =
  (envVar) => (_) => (next) => (action: PayloadAction<unknown>) => {
    // it is just Middleware placeholder for possible future redux functionality
    if (envVar) {
      identity(envVar);
    }
    return next(action);
  };
