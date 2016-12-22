import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Forms.css';
import Link from '../Link';

class LoginForm extends React.Component {

  static propTypes = {
    onLogin: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      remember: '0',
    };
  }

  onSubmit = (event) => {
    event.preventDefault();
    const data = this.state;
    this.props.onLogin(data);
  }

  onUserChange = (event) => {
    this.setState({
      username: event.target.value,
    });
  }

  onPassChange = (event) => {
    this.setState({
      password: event.target.value,
    });
  }

  onToggleChange = (event) => {
    this.setState({
      remember: event.target.checked ? '1' : '0',
    });
  }

  render() {
    return (
      <div className={s.formcontent}>
        <h1 className={s.title}>Login</h1>
        <h2 className={s.subtitle}>Your login details</h2>
        <form className={cx(s.form, s.login)} onSubmit={this.onSubmit}>
          <div className={s.inputwrapper}>
            <label className={s.label} htmlFor="username">Username or Email Address <abbr>*</abbr></label>
            <input id="username" type="text" name="username" className={s.input} onChange={this.onUserChange} />
          </div>
          <div className={s.inputwrapper}>
            <label className={s.label} htmlFor="password">Password <abbr>*</abbr></label>
            <input id="password" type="password" name="password" className={s.input} onChange={this.onPassChange} />
          </div>
          <div className={s.buttonwrapper}>
            <input className={cx(s.submit, s.login)} type="submit" value="Login" />
            <label htmlFor="rememberme" className={cx(s.label, s.remember)}>
              <input id="rememberme" className={s.checkbox} name="rememberme" type="checkbox" onChange={this.onToggleChange} />
              &nbsp;Remember me
            </label>
          </div>
          <p className={s.lostpassword}>
            <Link className={s.lostlink} to="/my-account/lost-password">Lost your password?</Link>
          </p>
        </form>
      </div>
    );
  }
}

export default withStyles(s)(LoginForm);