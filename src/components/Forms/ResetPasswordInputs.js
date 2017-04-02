import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Forms.css';

class ResetPasswordInputs extends React.Component {

  static propTypes = {
    formTitle: PropTypes.string.isRequired,
    formSubtitle: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    resetMessages: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirmPassword: ''
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state);
  }

  handlePasswordField = (e) => {
    this.props.resetMessages();
    this.setState({
      password: e.target.value
    });
  }

  handleConfirmField = (e) => {
    this.props.resetMessages();
    this.setState({
      confirmPassword: e.target.value
    });
  }

  render() {
    return (
      <div className={s.cformcontent2}>
        <h1 className={s.title}>{this.props.formTitle}</h1>
        <h2 className={cx(s.subtitle, s.subtitlesmall)}>{this.props.formSubtitle}</h2>
        <form className={s.form} onSubmit={this.onSubmit} >
          <div className={s.inputwrapper2}>
            <label
              className={s.label}
              htmlFor="password"
            >
              New Password
            </label>
            <input
              id="password"
              type="password"
              className={s.input}
              onChange={this.handlePasswordField}
            />
          </div>
          <div className={s.inputwrapper2}>
            <label
              className={s.label}
              htmlFor="confirmpassword"
            >
              Confirm Password
            </label>
            <input
              id="confirmpassword"
              type="password"
              className={s.input}
              onChange={this.handleConfirmField}
            />
          </div>
          <div className={s.buttonwrapper2}>
            <input
              className={s.submit}
              type="submit"
              value={this.props.buttonText}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default withStyles(s)(ResetPasswordInputs);
