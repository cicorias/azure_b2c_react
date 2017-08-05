// @flow
import {
  Actions as FarceActions,
  BrowserProtocol,
  createHistoryEnhancer,
  queryMiddleware,
} from 'farce';
import {createMatchEnhancer, foundReducer, Matcher} from 'found';
import thunk from 'redux-thunk';
import {authReducer} from './auth';
import {composeWithDevTools} from 'redux-devtools-extension';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import routeConfig from '../routeConfig';

const middleware = applyMiddleware(thunk);
const rootReducer = combineReducers({
  auth: authReducer,
  found: foundReducer,
});

export default (initialState: ?Store) => {
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
      middleware,
      createHistoryEnhancer({
        protocol: new BrowserProtocol(),
        middlewares: [queryMiddleware],
      }),
      createMatchEnhancer(new Matcher(routeConfig)),
    ),
  );

  store.dispatch(FarceActions.init());

  return store;
};
