import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';

import s from './Forms.css';
import { testPasswordStrength } from '../../helpers/validators';

class EditPasswordForm extends Component {
  static propTypes = {
    profile: PropTypes.object.isRequired,
    onUpdatePassword: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      ...props.profile,
      newpassword: '',
      confirmnewpassword: '',
      passwordValid: false
    };
  }

  componentWillReceiveProps = (nextProps) => {
    this.state = {
      ...this.state,
      ...nextProps.profile
    };
  }

  onFieldsUpdate = (e) => {
    switch (e.target.id) {
      case 'newpassword' : this.setState({ newpassword: e.target.value }, this.checkPassword); break;
      case 'confirmnewpassword' : this.setState({ confirmnewpassword: e.target.value }, this.checkPassword); break;
      default: // do nothing
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onUpdatePassword({
      passwords: {
        password: this.state.newpassword,
        password_confirmation: this.state.confirmnewpassword
      },
      id: this.state.id
    });
  }

  checkPassword = () => {
    this.setState({
      passwordValid: !testPasswordStrength(this.state.newpassword).isError &&
      !testPasswordStrength(this.state.confirmnewpassword).isError
    });
  }

  isPasswordChanged = () =>
    (this.state.newpassword.length > 0 || this.state.confirmnewpassword.length > 0);

  render() {
    return (
      <div className={s.formcontent}>
        <h1 className={s.title}>Change Password</h1>
        <form className={cx(s.form)} onSubmit={this.onSubmit}>
          <input type="password" style={{ display: 'none' }} name="preventAutoComplete" />
          <div className={cx(s.inputwrapper, s.inputleft)}>
            <label
              className={s.label}
              htmlFor="newpassword"
            >
              New Password
            </label>
            <input
              id="newpassword"
              type="password"
              name="newpassword"
              className={s.input}
              onChange={this.onFieldsUpdate}
            />
          </div>
          <div className={cx(s.inputwrapper, s.inputright)}>
            <label
              className={s.label}
              htmlFor="confirmnewpassword"
            >
              Confirm New Password
            </label>
            <input
              id="confirmnewpassword"
              type="password"
              name="confirmnewpassword"
              className={s.input}
              onChange={this.onFieldsUpdate}
            />
          </div>
          <div className={cx(s.passwordmessage, this.isPasswordChanged() && !this.state.passwordValid ? s.show : '')}>
            <div className={s.passworderror}>
              Weak - Please enter a stronger password.
            </div>
            <div className={s.passwordhint}>
              The password should be at least eight characters long.
            </div>
          </div>
          <div className={s.buttonwrapper}>
            <input
              className={s.submit}
              type="submit"
              value="save changes"
              disabled={!this.state.passwordValid}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default withStyles(s)(EditPasswordForm);
