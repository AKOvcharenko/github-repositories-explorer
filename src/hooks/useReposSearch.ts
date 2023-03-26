import axios from 'axios';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { Repository } from 'models';

type ReposSearchOptions = { url: string; perPage?: number };
type RepoSearch = (
  options: ReposSearchOptions
) => UseQueryResult<Repository[], unknown>;

export const useReposSearch: RepoSearch = ({ url, perPage = 9999999 }) => {
  return useQuery({
    queryKey: ['repositories', url],
    queryFn: () =>
      axios
        .get(`${url}?per_page=${perPage}`)
        .then(({ data }: { data: Repository }) => data),
  });
};