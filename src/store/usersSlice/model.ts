import { User } from 'models';

export interface UsersState {
  users: User[];
  loading: boolean;
}
