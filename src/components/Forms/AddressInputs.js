import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Forms.css';
import { SHIPPING_STATES } from '../../constants/AppConsts';

class AddressInputs extends React.Component {

  static propTypes = {
    onFieldsUpdate: PropTypes.func.isRequired,
    showEmailPhone: PropTypes.bool.isRequired,
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
              className={s.input}
              onChange={this.props.onFieldsUpdate}
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
              className={s.input}
              onChange={this.props.onFieldsUpdate}
            />
          </div>
        </div>
      );
    }
    return null;
  }

  render() {
    const selections = [...SHIPPING_STATES];
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
            className={s.input}
            onChange={this.props.onFieldsUpdate}
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
            onChange={this.props.onFieldsUpdate}
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
            className={s.input}
            onChange={this.props.onFieldsUpdate}
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
          <input
            id="country"
            type="hidden"
            name="country"
            className={s.input}
            onChange={this.props.onFieldsUpdate}
          />
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
            className={s.input}
            onChange={this.props.onFieldsUpdate}
          />
          <input
            id="address2"
            type="text"
            placeholder="Apartment, suite, unit etc. (optional)"
            name="address2"
            className={s.input}
            onChange={this.props.onFieldsUpdate}
          />
        </div>
        <div className={s.inputwrapper}>
          <label
            className={s.label}
            htmlFor="town"
          >
            Town / City<abbr>*</abbr>
          </label>
          <input
            id="town"
            type="text"
            name="town"
            className={s.input}
            onChange={this.props.onFieldsUpdate}
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
            className={s[this.props.selectClass]}
            onChange={this.props.onFieldsUpdate}
          >
            {selections.map((state, key) => (
              <option value={state.value} key={key}>
                {state.name}
              </option>
            ))}
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
            className={s.input}
            onChange={this.props.onFieldsUpdate}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(AddressInputs);
