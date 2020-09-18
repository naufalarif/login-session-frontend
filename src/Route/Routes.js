import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import GuardRoute from './GuardRoute';
import ProfilePage from '../pages/ProfilePage';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import PageNotFound from '../pages/PageNotFound';
import UpdatePage from '../pages/UpdatePage';

class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <GuardRoute exact path='/' component={ProfilePage} />
          <Route path='/register' component={RegisterPage} />
          <Route path='/login' component={LoginPage} />
          <Route path='/update' component={UpdatePage} />
          <Route path='/404' component={PageNotFound} />
          <Redirect to='/404' />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;
