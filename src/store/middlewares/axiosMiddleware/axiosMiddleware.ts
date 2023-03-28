import axios from 'axios';
import { Middleware, PayloadAction } from '@reduxjs/toolkit';

export const setCustomAxiosHeaderCreator: (header?: string) => Middleware =
  (header) => (_) => (next) => (action: PayloadAction<unknown>) => {
    // github api does not require auth header, but in case if it will be
    if (header) {
      axios.defaults.headers.common.auth = header;
    }

    return next(action);
  };
