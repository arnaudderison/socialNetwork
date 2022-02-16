import React from 'react';
import ReactDOM from 'react-dom';
import './style/style.scss';
import App from './App';
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
//dev tools
import { composeWithDevTools } from 'redux-devtools-extension'
import { getUsers } from './actions/users.actions';

const store = createStore(
  //retirer le dev tools pour la mise en ligne
  rootReducer, composeWithDevTools(applyMiddleware(thunk))
);

store.dispatch(getUsers())

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
