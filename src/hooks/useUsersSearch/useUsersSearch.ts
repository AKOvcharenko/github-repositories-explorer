import axios from 'axios';
import { useMemo, useEffect } from 'react';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

import {
  storeUsersAction,
  storeUsersRequestStateAction,
} from 'store/usersSlice';
import { User } from 'models';
import { useAppDispatch } from 'store';
import { USER_SEARCH_URL } from 'consts';
import { openNotification } from 'common';

type UserSearchOptions = { userName?: string; perPage?: number };
type UserSearch = (
  options: UserSearchOptions
) => UseQueryResult<User[], unknown>;

export const createUserSearchUrl = ({
  userName = '',
  perPage = 5,
}: UserSearchOptions) =>
  USER_SEARCH_URL.replace(/USER_NAME/, userName).replace(
    /PER_PAGE/,
    perPage.toString()
  );

const errorNotification = () =>
  openNotification({
    type: 'error',
    message: 'Ups!',
    description: 'Users request failed',
  });

export const useUserSearch: UserSearch = (options) => {
  const dispatch = useAppDispatch();

  const url = useMemo(() => createUserSearchUrl(options), [options]);
  const query = useQuery({
    queryKey: ['users', options.userName],
    queryFn: () =>
      axios.get(url).then(({ data }: { data: { items: User[] } }) => {
        return data.items;
      }),
  });

  useEffect(() => {
    if (query.data) {
      dispatch(storeUsersAction(query.data));
    }
  }, [query.data, dispatch]);

  useEffect(() => {
    dispatch(storeUsersRequestStateAction(query.isFetching));
  }, [query.isFetching, dispatch]);

  useEffect(() => {
    if (query.isError) {
      errorNotification();
    }
  }, [query.isError, dispatch]);

  return query;
};
