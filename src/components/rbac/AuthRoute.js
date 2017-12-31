import React from 'react';
import {Redirect, Route, withRouter} from 'react-router-dom';
import config from 'config/index';
import { inject, observer } from 'mobx-react';

const view = (Component, authStore) => {
  return (props) => {
    if (authStore.isAuthenticated) {
      return <Component {...props}/>
    } else {
      return <Redirect to={{
        pathname: config.loginUrl,
        state: {from: props.location}
      }}/>
    }
  }
};


const AuthRoute = ({component, authStore, ...routeProps}) => {
  return (
    <Route {...routeProps} render={view(component, authStore)}/>
  );
};

export default inject('authStore')(observer(withRouter(AuthRoute)));
