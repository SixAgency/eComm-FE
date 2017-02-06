import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './../Forms.css';
import AddressInputs from './../AddressInputs';

class BillingAddress extends React.Component {

  static propTypes = {
    loggedIn: PropTypes.bool,
    formTitle: PropTypes.string,
    formSubtitle: PropTypes.string,
    buttonText: PropTypes.string,
    selectClass: PropTypes.string,
    emailAddress: PropTypes.string,
    billingAddress: PropTypes.object.isRequired,
    nextCheckout: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      email: this.props.emailAddress,
      fname: this.props.billingAddress.firstname,
      lname: this.props.billingAddress.lastname,
      company: this.props.billingAddress.company,
      phone: this.props.billingAddress.phone,
      address1: this.props.billingAddress.address1,
      address2: this.props.billingAddress.address2,
      city: this.props.billingAddress.city,
      state: this.props.billingAddress.state_id,
      zip: this.props.billingAddress.zipcode,
      createaccount: false,
      password: '',
    };
  }

  onFieldsUpdate = (e) => {
    switch (e.target.id) {
      case 'fname' : this.setState({ fname: e.target.value }); break;
      case 'lname' : this.setState({ lname: e.target.value }); break;
      case 'company' : this.setState({ company: e.target.value }); break;
      case 'email' : this.setState({ email: e.target.value }); break;
      case 'phone' : this.setState({ phone: e.target.value }); break;
      case 'address1' : this.setState({ address1: e.target.value }); break;
      case 'address2' : this.setState({ address2: e.target.value }); break;
      case 'city' : this.setState({ city: e.target.value }); break;
      case 'state' : this.setState({ state: e.target.value }); break;
      case 'zip' : this.setState({ zip: e.target.value }); break;
      case 'createaccount' : this.setState({ createaccount: e.target.checked }); break;
      case 'password' : this.setState({ password: e.target.value }); break;
      default: // do nothing
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const billingAddress = {
      id: this.state.id,
      firstname: this.state.fname,
      lastname: this.state.lname,
      company: this.state.company || '',
      phone: this.state.phone,
      address1: this.state.address1,
      address2: this.state.address2 || '',
      city: this.state.city,
      state_id: this.state.state,
      zipcode: this.state.zip,
      country_id: 232,
      user_id: this.state.user_id,
    };
    this.props.nextCheckout(billingAddress);
  }

  getRegisterClass = () => {
    if (this.state.createaccount) {
      return '';
    }
    return 'disabled';
  }

  getButtonDisabled = () => {
    if (this.state.createaccount) {
      if (this.state.password) {
        return '';
      }
      return 'disabled';
    }
    return '';
  }

  render() {
    return (
      <div className={s.cformcontent}>
        <h1 className={s.title}>{this.props.formTitle}</h1>
        <h2 className={s.subtitle}>{this.props.formSubtitle}</h2>
        <form className={cx(s.form)} onSubmit={this.onSubmit}>
          <AddressInputs
            firstName={this.state.fname || ''}
            lastName={this.state.lname || ''}
            company={this.state.company || ''}
            emailAddress={this.state.email || ''}
            phoneNumber={this.state.phone || ''}
            address1={this.state.address1 || ''}
            address2={this.state.address2 || ''}
            city={this.state.city || ''}
            state={this.state.state || 0}
            zip={this.state.zip || ''}
            onFirstNameUpdate={this.onFieldsUpdate}
            onLastNameUpdate={this.onFieldsUpdate}
            onCompanyUpdate={this.onFieldsUpdate}
            onPhoneNumberUpdate={this.onFieldsUpdate}
            onAddressOneUpdate={this.onFieldsUpdate}
            onAddressTwoUpdate={this.onFieldsUpdate}
            onCityUpdate={this.onFieldsUpdate}
            onStateUpdate={this.onFieldsUpdate}
            onZipUpdate={this.onFieldsUpdate}
            onEmailUpdate={this.onFieldsUpdate}
            showEmailPhone
            disableEmail={false}
            selectClass={this.props.selectClass}
          />
          {!this.props.loggedIn &&
            <div>
              <div className={cx(s.inputwrapper, s.full)}>
                <input
                  id="createaccount"
                  type="checkbox"
                  name="createaccount"
                  className={s.inputcheck}
                  onChange={this.onFieldsUpdate}
                />
                <label
                  className={s.label}
                  htmlFor="createaccount"
                >
                  Create an account?
                </label>
              </div>
              <div className={cx(s.submitregister, s[this.getRegisterClass()])}>
                <p className={s.message}>
                  Create an account by entering the information below. If you are a returning
                  customer please login at the top of the page.
                </p>
                <div className={s.inputwrapper}>
                  <label
                    className={s.label}
                    htmlFor="password"
                  >
                    Account Password <abbr>*</abbr>
                  </label>
                  <input
                    id="password"
                    type="password"
                    className={s.input}
                    onChange={this.onFieldsUpdate}
                  />
                </div>
              </div>
            </div>
          }
          <div className={s.buttonwrapper}>
            <input
              className={s.submit}
              type="submit"
              value={this.props.buttonText}
              disabled={this.getButtonDisabled()}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default withStyles(s)(BillingAddress);
