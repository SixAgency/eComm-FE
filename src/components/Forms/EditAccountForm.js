import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Forms.css';

class EditAccountForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fname: '',
      lname: '',
      email: '',
      password: '',
      newpassword: '',
      confirmnewpassword: ''
    };
  }

  onFieldsUpdate = (e) => {
    switch (e.target.id) {
      case 'fname' : this.setState({ fname: e.target.value }); break;
      case 'lname' : this.setState({ lname: e.target.value }); break;
      case 'email' : this.setState({ email: e.target.value }); break;
      case 'password' : this.setState({ password: e.target.value }); break;
      case 'newpassword' : this.setState({ newpassword: e.target.value }); break;
      case 'confirmnewpassword' : this.setState({ confirmnewpassword: e.target.value }); break;
      default: // do nothing
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
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
              htmlFor="fname"
            >
              First Name <abbr>*</abbr>
            </label>
            <input
              id="fname"
              type="text"
              name="fname"
              className={s.input}
              onChange={this.onFieldsUpdate}
            />
          </div>
          <div className={cx(s.inputwrapper, s.inputright)}>
            <label
              className={s.label}
              htmlFor="lname"
            >
              Last Name <abbr>*</abbr>
            </label>
            <input
              id="lname"
              type="text"
              name="lname"
              className={s.input}
              onChange={this.onFieldsUpdate}
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
          </div>
        </form>
      </div>
    );
  }
}

export default withStyles(s)(EditAccountForm);
