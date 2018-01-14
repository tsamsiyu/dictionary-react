import React from 'react'
import { Redirect, Route, withRouter } from 'react-router-dom'
import config from 'config/index'
import { connect } from 'react-redux'

const view = (Component, user) => {
  return (props) => {
    if (user) {
      return <Redirect to={{
        pathname: config.loggedInUrl,
        state: {from: props.location}
      }}/>
    } else {
      return <Component {...props}/>
    }
  }
};

const GuestRoute = ({component, user, ...routeProps}) => {
  return (
    <Route {...routeProps} render={view(component, user)}/>
  );
};

const connector = connect((state) => ({
  user: state.auth.user
}))

export default withRouter(connector(GuestRoute))