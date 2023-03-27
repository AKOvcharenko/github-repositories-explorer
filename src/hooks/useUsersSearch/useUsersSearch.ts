import axios from 'axios';
import { useMemo } from 'react';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { USER_SEARCH_URL } from 'consts';
import { User } from 'models';

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

export const useUserSearch: UserSearch = (options) => {
  const url = useMemo(() => createUserSearchUrl(options), [options]);
  return useQuery({
    queryKey: ['users', options.userName],
    queryFn: () =>
      axios.get(url).then(({ data }: { data: { items: User[] } }) => {
        return data.items;
      }),
  });
};
