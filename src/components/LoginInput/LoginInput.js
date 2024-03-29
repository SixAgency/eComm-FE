import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './LoginInput.css';

class LoginInput extends React.Component {
  static propTypes = {
    onLogin: PropTypes.func.isRequired,
    showLoginForm: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      remember: '0'
    };
  }

  onSubmit = (event) => {
    event.preventDefault();
    const data = this.state;
    this.props.onLogin(data);
  };

  onUserChange = (event) => {
    this.setState({
      email: event.target.value
    });
  };

  onPassChange = (event) => {
    this.setState({
      password: event.target.value
    });
  };

  onToggleChange = (event) => {
    this.setState({
      remember: event.target.checked ? '1' : '0'
    });
  };

  render() {
    const className = this.props.showLoginForm ? 'show' : 'hide';
    return (
      <div className={s.loginwrpr}>
        <div className={cx(s.formcontent, s[className])}>
          <p className={s.message}>
            If you have shopped with us before, please enter your details in the boxes below.
            If you are a new customer, please proceed to the Billing & Shipping section.
          </p>
          <form onSubmit={this.onSubmit}>
            <div className={s.inputwrapper}>
              <p className={cx(s.col, s.left)}>
                <label htmlFor="email">Username or Email <abbr>*</abbr></label>
                <input id="email" type="text" name="email" onChange={this.onUserChange} />
              </p>
              <p className={cx(s.col, s.right)}>
                <label htmlFor="password">Password <abbr>*</abbr></label>
                <input id="password" type="password" name="password" onChange={this.onPassChange} />
              </p>
              <p className={s.row}>
                <label htmlFor="rememberme">
                  <input id="rememberme" name="rememberme" type="checkbox" onChange={this.onToggleChange} />
                  &nbsp;Remember me
                </label>
                <input className={s.submit} type="submit" value="Login" />
              </p>
              <p className={s.lostpass}>
                <Link to="/my-account/lost-password">
                  Lost your password?
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(LoginInput);
