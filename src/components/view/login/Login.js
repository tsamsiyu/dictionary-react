import React from 'react';
import Form from 'mobx-react-form';
import { observer, inject } from 'mobx-react';
import GroupInput from "components/ui/controls/GroupInput";

@inject('authStore')
@observer
class Login extends React.Component {
  render() {
    const form = new Form({
      fields: [
        {
          name: 'email',
          label: 'Email',
        },
        {
          name: 'password',
          label: 'Password',
          type: 'password'
        }
      ]
    }, {
      hooks: {
        onSuccess(data) {
          this.props.authStore.login(data.$('email').value, data.$('password').value)
        }
      }
    });

    return (
      <div>
        <h1>Login form</h1>
        <form onSubmit={form.onSubmit}>
          <GroupInput field={form.$('email')}/>
          <GroupInput field={form.$('password')}/>
          <div className="form-group">
            <button type="submit" className="btn btn-success" onClick={form.onSubmit}>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;