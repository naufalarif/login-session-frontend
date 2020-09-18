import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';

class GuardRoute extends Component {
  render() {
    const { component: Component, ...rest } = this.props;
    const jwtToken = localStorage.getItem('jwtToken');

    return (
      <Route 
        {...rest}
        render={props => (
          jwtToken !== null 
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
              }} />
        )}
      />  
    )
  }
}

export default GuardRoute
