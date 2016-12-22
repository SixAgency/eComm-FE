import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Forms.css';

class RegForm extends React.Component {

  static propTypes = {
    onRegister: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  onSubmit = (event) => {
    event.preventDefault();
    const data = this.state;
    this.props.onRegister(data);
  }

  onEmailChange = (event) => {
    this.setState({
      email: event.target.value,
    });
  }

  onPassChange = (event) => {
    this.setState({
      password: event.target.value,
    });
  }

  render() {
    return (
      <div className={s.formcontent}>
        <h1 className={s.title}>Register</h1>
        <h2 className={s.subtitle}>Create an account</h2>
        <form className={cx(s.form, s.register)} onSubmit={this.onSubmit}>
          <div className={s.inputwrapper}>
            <label className={s.label} htmlFor="email">Email Address <abbr>*</abbr></label>
            <input id="email" type="text" name="email" className={s.input} onChange={this.onEmailChange} />
          </div>
          <div className={s.inputwrapper}>
            <label className={s.label} htmlFor="password">Password <abbr>*</abbr></label>
            <input id="password" type="password" name="password" className={s.input} onChange={this.onPassChange} />
          </div>
          <div className={s.buttonwrapper}>
            <input className={s.submit} type="submit" value="Register" />
          </div>
        </form>
      </div>
    );
  }
}

export default withStyles(s)(RegForm);
