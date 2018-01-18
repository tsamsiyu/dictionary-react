import React from 'react';
import { LinkContainer } from "react-router-bootstrap";

export class Profile extends React.Component {
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