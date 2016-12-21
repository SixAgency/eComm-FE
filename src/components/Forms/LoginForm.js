import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Forms.css';
import Link from '../Link';

class LoginForm extends React.Component {
  submit = (event) => {
    event.preventDefault();
    console.log(event);
  }
  render() {
    return (
      <div className={s.formcontent}>
        <h1 className={s.title}>Login</h1>
        <h2 className={s.subtitle}>Your login details</h2>
        <form className={cx(s.form, s.login)} onSubmit={this.submit}>
          <div className={s.inputwrapper}>
            <label className={s.label} htmlFor="username">Username or Email Address <abbr>*</abbr></label>
            <input id="username" type="text" name="username" className={s.input} />
          </div>
          <div className={s.inputwrapper}>
            <label className={s.label} htmlFor="password">Password <abbr>*</abbr></label>
            <input id="password" type="password" name="password" className={s.input} />
          </div>
          <div className={s.buttonwrapper}>
            <input className={cx(s.submit, s.login)} type="submit" value="Login" />
            <label htmlFor="rememberme" className={cx(s.label, s.remember)}>
              <input id="rememberme" className={s.checkbox} name="rememberme" type="checkbox" value="forever" />
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
