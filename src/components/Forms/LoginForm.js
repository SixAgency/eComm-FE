import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Forms.css';

class LoginForm extends React.Component {

  static propTypes = {
    onLogin: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      remember: '0',
    };
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.onLogin(this.state);
  }

  onUserChange = (event) => {
    this.setState({
      email: event.target.value,
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
            <label className={s.label} htmlFor="email">Email Address <abbr>*</abbr></label>
            <input id="email" type="text" name="email" className={s.input} onChange={this.onUserChange} />
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
