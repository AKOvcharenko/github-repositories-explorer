import axios from 'axios';
import { useMemo } from 'react';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { API } from 'consts';
import { User } from 'models';

type UserSearchOptions = { userName?: string; perPage?: number };
type UserSearch = (
  options: UserSearchOptions
) => UseQueryResult<User[], unknown>;

export const createUsearSearchUrl = ({
  userName = '',
  perPage = 5,
}: UserSearchOptions) =>
  API.USER_SEARCH_TEMPLATE.replace(/USER_NAME/, userName).replace(
    /PER_PAGE/,
    perPage.toString()
  );

export const useUserSearch: UserSearch = (options) => {
  const url = useMemo(() => createUsearSearchUrl(options), [options]);
  return useQuery({
    queryKey: ['users'],
    queryFn: (): Promise<User[]> =>
      axios.get(url).then(({ data }: { data: { items: User[] } }) => {
        return data.items;
      }),
  });
};
