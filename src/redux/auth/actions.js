// @flow
import {createAction} from '../actionCreator';
import * as actions from './actionTypes';
import type {Action} from '../types';

/** @namespace process.env.REACT_APP_AD_CLIENT_ID */
/** @namespace process.env.REACT_APP_AD_AUTHORITY */
/** @namespace process.env.REACT_APP_AD_APP_ID_URL */

const appIdUrl = process.env.REACT_APP_AD_APP_ID_URL;
const clientId = process.env.REACT_APP_AD_CLIENT_ID;
const authority = process.env.REACT_APP_AD_AUTHORITY;
const b2cScopes = [`${appIdUrl}/links.create`];

const application = new window.Msal
  .UserAgentApplication(clientId, authority, () => {}, {
  cacheLocation: 'localStorage',
  redirectUri: window.location.origin,
});

application._requestContext.logger.localCallback = (level, message) =>
  console.log(level, message);

export default {
  logout: () => {
    return (dispatch: Action => void) => {
      dispatch(createAction(actions.LOG_OUT));
      application.logout();
    };
  },
  authenticate: () => {
    return (dispatch: Action => void) => {
      dispatch(createAction(actions.AUTHENTICATE));

      const succeed = token =>
        dispatch(
          createAction(actions.AUTHENTICATE_SUCCESS, {
            token,
            user: application.getUser(),
          }),
        );

      const fail = error =>
        dispatch(createAction(actions.AUTHENTICATE_FAILURE, {error}));

      const getToken = () =>
        application
          .acquireTokenSilent(b2cScopes, null, user)
          .then(succeed, e => {
            console.warn('acquireTokenSilent', e);
            application
              .acquireTokenPopup(b2cScopes, null, user)
              .then(succeed, fail);
          });

      const user = application.getUser();

      if (!user) {
        application.loginPopup(b2cScopes).then(getToken, fail);
      } else {
        getToken();
      }
    };
  },
};
