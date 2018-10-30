import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';

import asyncPage from './utils/async-page';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
axios.defaults.baseURL = apiBaseUrl;

const App = () => (
  <Router>
    <Switch>
      <Route path="/portal" component={asyncPage('portal')} />
      <Route path="/gym/:id" component={asyncPage('gym-detail')} />
      <Route path="/food/:id" component={asyncPage('food-detail')} />
      <Redirect to="/portal" />
    </Switch>
  </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));
