// @flow
export type User = {};

export type AuthenticationState = {
  authenticationInProgress: boolean,
  loggedIn: boolean,
  user: ?User,
  token: ?string,
};
