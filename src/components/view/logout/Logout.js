import React from 'react';
import { Redirect, withRouter } from "react-router-dom";
import config from 'config/index';

@withRouter
class Logout extends React.Component {
  render() {
    return <Redirect to={{
      pathname: config.loginUrl,
      state: {from: this.props.location}
    }}/>
  }
}

export default Logout;
