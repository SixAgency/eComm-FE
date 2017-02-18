import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';

import s from './Forms.css';

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
      confirmnewpassword: ''
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
      case 'newpassword' : this.setState({ newpassword: e.target.value }); break;
      case 'confirmnewpassword' : this.setState({ confirmnewpassword: e.target.value }); break;
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

  render() {
    return (
      <div className={s.formcontent}>
        <h1 className={s.title}>Change Password</h1>
        <form className={cx(s.form)} onSubmit={this.onSubmit}>
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

export default withStyles(s)(EditPasswordForm);
