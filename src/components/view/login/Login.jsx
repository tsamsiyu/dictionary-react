import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { BoxedInput } from 'components/ui/redux-form-fields/BoxedInput'
import actions from 'store/auth/actionCreators'
import { connect } from 'react-redux'
import { SubmissionError } from 'redux-form'

@reduxForm({
  form: 'loginForm',
})
@connect(null, (dispatch) => ({
  login: (data) => dispatch(actions.loginFetch(data)),
}))
export class Login extends React.Component {
  onSubmit(values) {
    return this.props.login(values).catch((err) => {
      throw new SubmissionError(err.formFails);
    })
  }

  render() {
    return (
      <div>
        <h1>Login form</h1>
        <form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
          <Field name="email" component={BoxedInput} />
          <Field name="password" type="password" component={BoxedInput} />
          <div className="form-group">
            <button type="submit" className="btn btn-success">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}