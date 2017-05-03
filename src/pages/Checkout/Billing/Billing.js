import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import { testPasswordStrength } from '../../../helpers/validators';
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
import AddressSelect from '../../../components/Forms/AddressSelect';

class Billing extends React.Component {

  static propTypes = {
    content: PropTypes.string.isRequired,
    toggleContent: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    emailAddress: PropTypes.string.isRequired,
    selectedAddress: PropTypes.number.isRequired,
    addresses: PropTypes.array.isRequired,
    address: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    showCancel: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
    const {
      selectedAddress,
      emailAddress
    } = props;
    const {
      firstname,
      lastname,
      company,
      phone,
      address1,
      address2,
      city,
      state,
      zipcode
    } = this.props.address;
    this.state = {
      addressId: selectedAddress,
      firstname,
      lastname,
      company,
      email: emailAddress,
      phone,
      address1,
      address2,
      city,
      state,
      country: 232,
      zipcode,
      register: false,
      password: '',
      passwordValid: true
    };
  }

  componentWillReceiveProps = (nextProps) => {
    const {
      firstname,
      lastname,
      company,
      phone,
      address1,
      address2,
      city,
      state,
      zipcode
    } = nextProps.address;
    this.setState({
      firstname,
      lastname,
      company,
      phone,
      address1,
      address2,
      city,
      state,
      country: 232,
      zipcode
    });
  };

  /**
   * Form submit handler
   * @param event
   */
  onSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state);
  };

  /**
   * (Input, Select) field change handler
   * @param key
   * @param value
   */
  onFieldChange = (key, value) => {
    const obj = {};
    obj[key] = value;
    this.setState(obj);
  };

  /**
   * Address list select handler
   * @param event
   */
  onSelect = (event) => {
    this.setState({
      addressId: parseInt(event.target.value, 10)
    });
  };

  onRegisterCheck = () => {
    if (!this.state.register) {
      this.setState({ password: '', passwordValid: false });
    } else {
      this.setState({ passwordValid: true });
    }
    this.setState({ register: !this.state.register });
  }

  onPasswordChange = (key, value) => {
    this.setState({
      password: value,
      passwordValid: !testPasswordStrength(value).isError
    });
  }

  render() {
    const {
      formTitle,
      formSubtitle,
      buttonText,
      bottomButtonText
    } = CHECKOUT_BILLING;
    const {
      addresses,
      content,
      toggleContent,
      showCancel
    } = this.props;
    const passField = {
      name: 'password',
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
        buttonDisabled={!this.state.passwordValid}
        onSubmit={this.onSubmit}
        showCancel={showCancel}
        onCancel={toggleContent}
      >
        <div>
          <div className={s[`addresslist_${content}`]}>
            <AddressSelect
              addresses={addresses}
              addressId={this.state.addressId}
              onSelect={this.onSelect}
              onBottomButtonClick={toggleContent}
              showBottomButton={content === 'list'}
              bottomButtonText={bottomButtonText}
              selectClass="mt20"
            />
          </div>
          <div className={s[`addressform_${content}`]}>
            {CHECKOUT_BILLING_FIELDS.map((v, k) => (
              <FormFields
                key={k}
                elem={v}
                value={this.state[v.value]}
                onChange={this.onFieldChange}
                options={STATES}
              />
            ))}
            {!this.props.loggedIn &&
              <div className={s.register}>
                <input
                  id="register" name="register" type="checkbox"
                  onChange={this.onRegisterCheck} checked={this.state.register}
                />
                <label htmlFor="register">Create an account?</label>
              </div>
            }
            <div className={cx(s.registerform, this.state.register ? '' : s.hidden)}>
              <div className={s.info}>
                Create an account by entering the information below. If you are a returning
                customer please login at the top of the page.
              </div>
              <FormFields
                elem={passField}
                value={this.state.password}
                onChange={this.onPasswordChange}
              />
              {this.state.password.length > 0 && !this.state.passwordValid &&
                <div className={s.error}>
                  Your password needs to be at least 8 characters long.
                </div>
              }
            </div>
          </div>
        </div>
      </Form>
    );
  }
}

export default withStyles(s)(Billing);
