import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {createConnectedRouter, createRender, resolver} from 'found';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import createStore from './redux';

const ConnectedRouter = createConnectedRouter({
  render: createRender({
    renderError: ({error}) =>
      <div>
        {error.status === 404 ? 'Not found' : 'Error'}
      </div>,
  }),
});

const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter resolver={resolver} />
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
