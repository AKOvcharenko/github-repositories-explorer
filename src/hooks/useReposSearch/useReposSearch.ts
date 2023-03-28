import axios from 'axios';
import { useEffect } from 'react';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { Repository } from 'models';
import { useAppDispatch } from 'store';
import { openNotification } from 'common';
import {
  storeReposAction,
  storeReposRequestStateAction,
} from 'store/reposSlice';

type ReposSearchOptions = { url: string; perPage?: number; userName: string };
type RepoSearch = (
  options: ReposSearchOptions
) => UseQueryResult<Repository[], unknown>;

const errorNotification = () =>
  openNotification({
    type: 'error',
    message: 'Ups!',
    description: 'Repos request failed',
  });

export const useReposSearch: RepoSearch = ({
  url,
  userName,
  perPage = 9999999,
}) => {
  const dispatch = useAppDispatch();

  const query = useQuery({
    queryKey: ['repositories', url],
    queryFn: () =>
      axios
        .get(`${url}?per_page=${perPage}`)
        .then(({ data }: { data: Repository[] }) => data),
  });

  useEffect(() => {
    if (query.data) {
      dispatch(storeReposAction({ [userName]: query.data }));
    }
  }, [query.data, userName, dispatch]);

  useEffect(() => {
    dispatch(storeReposRequestStateAction({ [userName]: query.isFetching }));
  }, [query.isFetching, userName, dispatch]);

  useEffect(() => {
    if (query.isError) {
      errorNotification();
    }
  }, [query.isError]);

  return query;
};
