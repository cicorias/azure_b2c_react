import React from 'react';
import {makeRouteConfig, Route} from 'found';
import withAuthentication from './withAuthentication';
import App from './App';
import HomeContainer from './Containers/HomeContainer';
import StoryContainer from './Containers/StoryContainer';

const config = makeRouteConfig(
  <Route path="/" Component={withAuthentication(App)}>
    <Route Component={HomeContainer} />
    <Route path="/story" Component={StoryContainer} />
  </Route>,
);

export default config;
