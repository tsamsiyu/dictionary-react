import React from 'react';

class Login extends React.Component {
  render() {

    return (
      <div>
        <h1>Login form</h1>
        <form onSubmit={null}>
          {/* <GroupInput field={form.$('email')}/> */}
          {/* <GroupInput field={form.$('password')}/> */}
          <div className="form-group">
            <button type="submit" className="btn btn-success">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;