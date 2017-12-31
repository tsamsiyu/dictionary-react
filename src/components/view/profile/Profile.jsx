import React from 'react';
import {LinkContainer} from "react-router-bootstrap";

class ProfileView extends React.Component {
  render() {
    return (
      <div>
        <div className="row">
          <LinkContainer to="/dicta">
            <a>Words</a>
          </LinkContainer>
        </div>
      </div>
    )
  }
}

export default ProfileView;