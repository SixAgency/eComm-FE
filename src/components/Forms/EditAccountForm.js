import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Forms.css';

class EditAccountForm extends Component {
  static propTypes = {
    profile: PropTypes.object.isRequired,
    onUpdateProfile: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      ...props.profile,
      password: '',
      newpassword: '',
      confirmnewpassword: ''
    };
  }

  componentWillReceiveProps = (nextProps) => {
    this.state = {
      ...this.state,
      ...nextProps.profile,
    };
  }

  onFieldsUpdate = (e) => {
    switch (e.target.id) {
      case 'f_name' : this.setState({ f_name: e.target.value }); break;
      case 'l_name' : this.setState({ l_name: e.target.value }); break;
      case 'email' : this.setState({ email: e.target.value }); break;
      case 'password' : this.setState({ password: e.target.value }); break;
      case 'newpassword' : this.setState({ newpassword: e.target.value }); break;
      case 'confirmnewpassword' : this.setState({ confirmnewpassword: e.target.value }); break;
      default: // do nothing
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onUpdateProfile({
      f_name: this.state.f_name,
      l_name: this.state.l_name,
    });
  }

  render() {
    return (
      <div className={s.formcontent}>
        <h1 className={s.title}>Edit Account</h1>
        <h2 className={s.subtitle}>Change Password</h2>
        <form className={cx(s.form)} onSubmit={this.onSubmit}>
          <div className={cx(s.inputwrapper, s.inputleft)}>
            <label
              className={s.label}
              htmlFor="f_name"
            >
              First Name <abbr>*</abbr>
            </label>
            <input
              id="f_name"
              type="text"
              name="f_name"
              className={s.input}
              onChange={this.onFieldsUpdate}
              defaultValue={this.state.f_name}
            />
          </div>
          <div className={cx(s.inputwrapper, s.inputright)}>
            <label
              className={s.label}
              htmlFor="l_name"
            >
              Last Name <abbr>*</abbr>
            </label>
            <input
              id="l_name"
              type="text"
              name="l_name"
              className={s.input}
              onChange={this.onFieldsUpdate}
              defaultValue={this.state.l_name}
            />
          </div>
          <div className={cx(s.inputwrapper)}>
            <label
              className={s.label}
              htmlFor="email"
            >
              Email Address <abbr>*</abbr>
            </label>
            <input
              id="email"
              type="text"
              name="email"
              className={s.input}
              onChange={this.onFieldsUpdate}
              value={this.state.email}
            />
          </div>
          <div className={cx(s.inputwrapper)}>
            <label
              className={s.label}
              htmlFor="password"
            >
                Current Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              className={s.input}
              onChange={this.onFieldsUpdate}
            />
          </div>
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
          <div className={s.buttonwrapper}>
            <input
              className={s.submit}
              type="submit"
              value="save changes"
            />
            <button
              className={s.submit}
            >
              cancel
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default withStyles(s)(EditAccountForm);
