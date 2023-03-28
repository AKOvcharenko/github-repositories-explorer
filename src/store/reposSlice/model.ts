import { Repository } from 'models';

export interface ReposState {
  repos: {
    [userName: string]: {
      repositories: Repository[];
      loading: boolean;
    };
  };
}
