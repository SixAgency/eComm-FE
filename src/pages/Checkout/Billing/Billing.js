import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Billing.css';

// Constants
import {
  CHECKOUT_BILLING,
  CHECKOUT_BILLING_FIELDS,
  STATES
} from '../../../constants/FormConsts';

// Forms and inputs
import Form from '../../../components/Forms/Form';
import FormFields from '../../../components/Forms/FormField';

class Billing extends React.Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    address: PropTypes.object.isRequired,
    email: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onFieldChange: PropTypes.func.isRequired,
    showCancel: PropTypes.bool.isRequired,
    showRegister: PropTypes.bool.isRequired,
    passwordValid: PropTypes.bool.isRequired,
    onPassChange: PropTypes.func.isRequired,
    onRegisterCheck: PropTypes.func.isRequired,
    password: PropTypes.string.isRequired,
    editMode: PropTypes.bool.isRequired
  };

  getValue = (v) => {
    const { email, address } = this.props;
    if (v.value === 'email') {
      return email;
    }
    return address[v.value];
  };

  getDisabled = (v) => {
    if (v.value === 'email') {
      return this.props.editMode;
    }
    return v.disabled;
  };

  render() {
    const {
      formTitle,
      formSubtitle,
      buttonText
    } = CHECKOUT_BILLING;
    const passField = {
      name: 'password',
      value: 'password',
      label: 'Account Password *',
      className: '',
      isInput: true,
      type: 'password',
      placeholder: 'Password'
    };
    return (
      <Form
        formTitle={formTitle}
        formSubtitle={formSubtitle}
        buttonText={buttonText}
        buttonDisabled={!this.props.passwordValid}
        onSubmit={this.props.onSubmit}
        showCancel={this.props.showCancel}
        onCancel={this.props.onCancel}
      >
        <div>
          <div className={s.addressform_form}>
            {CHECKOUT_BILLING_FIELDS.map((v, k) => (
              <FormFields
                key={k}
                elem={v}
                value={this.getValue(v)}
                disabled={this.getDisabled(v)}
                onChange={this.props.onFieldChange}
                options={STATES}
              />
            ))}
            {!this.props.loggedIn &&
              <div>
                <div className={s.register}>
                  <input
                    id="register" name="register" type="checkbox"
                    onChange={this.props.onRegisterCheck} checked={this.props.showRegister}
                  />
                  <label htmlFor="register">Create an account?</label>
                </div>
                <div className={cx(s.registerform, this.props.showRegister ? '' : s.hidden)}>
                  <div className={s.info}>
                    Create an account by entering the information below. If you are a returning
                    customer please login at the top of the page.
                  </div>
                  <FormFields
                    elem={passField}
                    value={this.props.password}
                    onChange={this.props.onPassChange}
                  />
                  {this.props.password.length > 0 && !this.props.passwordValid &&
                    <div className={s.error}>
                      Your password needs to be at least 8 characters long.
                    </div>
                  }
                </div>
              </div>
            }
          </div>
        </div>
      </Form>
    );
  }
}

export default withStyles(s)(Billing);
