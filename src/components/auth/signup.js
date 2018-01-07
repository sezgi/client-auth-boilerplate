import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {
  handleFormSubmit(formProps) {
    // Call action creator to sign up the user
    this.props.signupUser(formProps);
  }

  renderField(fieldType, isPassword) {
    let input = '';
    if (isPassword) {
      input = <input className="form-control" {...fieldType} type="password" />
    } else {
      input = <input className="form-control" {...fieldType} />
    }

    return (
      <fieldset className="form-group">
        <label>{_.startCase(fieldType.name)}:</label>
        {input}
        {fieldType.touched && fieldType.error && <div className="error">{fieldType.error}</div>}
      </fieldset>
    )
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      )
    }
  }

  render() {
    const { handleSubmit, fields: {email, password, passwordConfirm}} = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        {this.renderField(email)}
        {this.renderField(password, true)}
        {this.renderField(passwordConfirm, true)}
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign Up</button>
      </form>
    );
  }
}

function validate(formProps) {
  const errors = {};

  for (const prop in formProps) {
    if (!formProps[prop]) {
      if (prop == 'passwordConfirm') {
        errors[prop] = 'Please enter password confirmation';
      } else {
        errors[prop] = 'Please enter ' + prop;
      }
    }
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match';
  }

  return errors;
}

function mapStateToProps(state) {
  return {errorMessage: state.auth.error};
}

export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate
}, mapStateToProps, actions)(Signup);
