//@flow
import type {AuthenticationState} from './auth/types';

export type Store = {
  auth: AuthenticationState,
};

export type Action = {
  type: string,
  payload: ?Object,
};
