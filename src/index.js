/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import history from './history';
import { Router, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/index';
import App from './App';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
