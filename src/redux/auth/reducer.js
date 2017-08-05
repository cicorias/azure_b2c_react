// @flow

import type {AuthenticationState} from './types';
import * as actions from './actionTypes';
import type {Action} from '../types';

const initialState: AuthenticationState = {
  authenticationInProgress: false,
  loggedIn: false,
  user: undefined,
  token: undefined,
};

export default (
  state: AuthenticationState = initialState,
  {type, payload}: Action,
) => {
  switch (type) {
    case actions.AUTHENTICATE:
      return {
        ...state,
        authenticationInProgress: true,
      };

    case actions.LOG_OUT:
    case actions.AUTHENTICATE_FAILURE:
      return {...initialState};

    case actions.AUTHENTICATE_SUCCESS:
      return {
        ...state,
        authenticationInProgress: false,
        loggedIn: true,
        token: payload.token,
        user: payload.user,
      };

    default:
      return state;
  }
};
