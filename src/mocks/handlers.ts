import { rest } from 'msw';

import { USER_SEARCH_URL_BASE } from 'consts';

import { REPOS } from './REPOS';
import { USERS, NON_EMPTY_REPOS_USER_NAME } from './USERS';

export const handlers = [
  rest.get(USER_SEARCH_URL_BASE, (req, res, ctx) => {
    if (req.url.href.includes(NON_EMPTY_REPOS_USER_NAME)) {
      return res(ctx.json({ items: USERS }));
    }
    return res(ctx.json({ items: [] }));
  }),

  // handler for case when user has no repositories
  rest.get(USERS[0].repos_url, (req, res, ctx) => {
    return res(ctx.json(REPOS));
  }),

  // handler for case when user has repositories
  rest.get(USERS[1].repos_url, (req, res, ctx) => {
    return res(ctx.json([]));
  }),
];
