import React from 'react'
import {Redirect, Route, withRouter} from 'react-router-dom'
import config from 'config/index'
import { connect } from 'react-redux'

const view = (Component, user) => {
  return (props) => {
    if (user) {
      return <Component {...props}/>
    } else {
      return <Redirect to={{
        pathname: config.loginUrl,
        state: {from: props.location}
      }}/>
    }
  }
};

const AuthRoute = ({component, user, ...routeProps}) => {
  console.log('auth route', user);
  return (
    <Route {...routeProps} render={view(component, user)}/>
  );
};

const connector = connect((state) => ({
  user: state.auth.user  
}))

export default withRouter(connector(AuthRoute));