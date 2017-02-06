import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Forms.css';
import { STATES } from '../../constants/AppConsts';

class AddressInputs extends React.Component {

  static propTypes = {
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    company: PropTypes.string,
    emailAddress: PropTypes.string,
    phoneNumber: PropTypes.string,
    address1: PropTypes.string,
    address2: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.number,
    zip: PropTypes.string,
    onFirstNameUpdate: PropTypes.func.isRequired,
    onLastNameUpdate: PropTypes.func.isRequired,
    onCompanyUpdate: PropTypes.func.isRequired,
    onPhoneNumberUpdate: PropTypes.func.isRequired,
    onAddressOneUpdate: PropTypes.func.isRequired,
    onAddressTwoUpdate: PropTypes.func.isRequired,
    onCityUpdate: PropTypes.func.isRequired,
    onStateUpdate: PropTypes.func.isRequired,
    onZipUpdate: PropTypes.func.isRequired,
    onEmailUpdate: PropTypes.func,
    showEmailPhone: PropTypes.bool.isRequired,
    disableEmail: PropTypes.bool.isRequired,
    selectClass: PropTypes.string,
  }

  showPhoneEmail = () => {
    if (this.props.showEmailPhone) {
      return (
        <div className={s.phoneemailwrapper}>
          <div className={cx(s.inputwrapper, s.inputleft)}>
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
              value={this.props.emailAddress}
              className={s.input}
              disabled={this.props.disableEmail}
              onChange={this.props.onEmailUpdate}
            />
          </div>
          <div className={cx(s.inputwrapper, s.inputright)}>
            <label
              className={s.label}
              htmlFor="phone"
            >
              Phone <abbr>*</abbr>
            </label>
            <input
              id="phone"
              type="text"
              name="phone"
              value={this.props.phoneNumber}
              className={s.input}
              onChange={this.props.onPhoneNumberUpdate}
            />
          </div>
        </div>
      );
    }
    return null;
  }

  render() {
    const selections = [...STATES];
    return (
      <div className={s.addresscontent}>
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
            value={this.props.firstName}
            className={s.input}
            onChange={this.props.onFirstNameUpdate}
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
            value={this.props.lastName}
            className={s.input}
            onChange={this.props.onLastNameUpdate}
          />
        </div>
        <div className={s.inputwrapper}>
          <label
            className={s.label}
            htmlFor="company"
          >
            Company Name
          </label>
          <input
            id="company"
            type="text"
            name="company"
            value={this.props.company}
            className={s.input}
            onChange={this.props.onCompanyUpdate}
          />
        </div>
        { this.showPhoneEmail() }
        <div className={s.inputwrapper}>
          <label
            className={s.label}
            htmlFor="country"
          >
            Country <abbr>*</abbr>
          </label>
          <strong>United States (US)</strong>
        </div>
        <div className={s.inputwrapper}>
          <label
            className={s.label}
            htmlFor="address1"
          >
            Address
          </label>
          <input
            id="address1"
            type="text"
            placeholder="Street address"
            name="address1"
            value={this.props.address1}
            className={s.input}
            onChange={this.props.onAddressOneUpdate}
          />
          <input
            id="address2"
            type="text"
            placeholder="Apartment, suite, unit etc. (optional)"
            name="address2"
            value={this.props.address2}
            className={s.input}
            onChange={this.props.onAddressTwoUpdate}
          />
        </div>
        <div className={s.inputwrapper}>
          <label
            className={s.label}
            htmlFor="city"
          >
            Town / City<abbr>*</abbr>
          </label>
          <input
            id="city"
            type="text"
            name="city"
            value={this.props.city}
            className={s.input}
            onChange={this.props.onCityUpdate}
          />
        </div>
        <div className={cx(s.inputwrapper, s.inputleft)}>
          <label
            className={s.label}
            htmlFor="state"
          >
            State <abbr>*</abbr>
          </label>
          <select
            name="state"
            id="state"
            value={this.props.state}
            className={s[this.props.selectClass]}
            onChange={this.props.onStateUpdate}
          >
            <option value={''}>Select an option...</option>
            {selections.map((state) => {
              return (
                <option value={state.id} key={state.id}>
                  {state.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className={cx(s.inputwrapper, s.inputright)}>
          <label
            className={s.label}
            htmlFor="zip"
          >
            Zip <abbr>*</abbr>
          </label>
          <input
            id="zip"
            type="text"
            name="zip"
            value={this.props.zip}
            className={s.input}
            onChange={this.props.onZipUpdate}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(AddressInputs);
