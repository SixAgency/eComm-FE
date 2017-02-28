import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Forms.css';
import { STATES } from '../../constants/AppConsts';

class EditAddressesForm extends React.Component {
  static propTypes = {
    addresses: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired,
    shipping: PropTypes.object.isRequired,
    billing: PropTypes.object.isRequired,
    onCreate: PropTypes.func.isRequired
  }

  getActive = (tocheckId, loopId) => {
    if (tocheckId === loopId) {
      return true;
    }
    return false;
  }

  getStateName = (id) => {
    const selected = STATES.find((state) => (state.id === id));
    return selected.abbr || '';
  };

  parseAddress = (address, tocheckId) => (
    address.map((value, key) => (
      <div className={s.addresswrapper} key={key}>
        <div className={cx(s.radiowrapper, s.accountradio)} key={key}>
          <label htmlFor={value.id} className={s.labelradio}>
            {value.firstname} {value.lastname}<br />
            {value.address1} {value.address2}<br />
            {value.city}, {this.getStateName(value.state_id)}, {value.zipcode}<br />
            {value.phone}
          </label>
          <input
            type="radio"
            value={value.id}
            checked={this.getActive(tocheckId, value.id) ? 'checked' : ''}
            name="addresses"
            className={cx(s.submitadd, s.addressesoption)}
            onChange={this.props.onSelect}
          />
        </div>
        <input
          type="button"
          value="edit"
          className={cx(s.submitadd, s.addressesoption)}
        />
        <input
          type="button"
          value="delete"
          className={cx(s.submitadd, s.addressesoption)}
        />
      </div>
    ))
  );


  render() {
    const shippingId = this.props.shipping.address.id;
    const billingId = this.props.billing.address.id;
    return (
      <div className={cx(s.formcontent, s.aformcontent)}>
        <h1 className={s.title}>Manage addresses</h1>
        <form className={cx(s.form, s.addresses, s.addressesform)}>
          <h4 className={s.accountsubtitle}>Available Shipping Addresses:</h4>
          {this.parseAddress(this.props.addresses.addresses, shippingId)}
          <input
            className={s.submit}
            type="submit"
            value="save changes"
          />
        </form>
        <form className={cx(s.form, s.addresses, s.addressesform)}>
          <h4 className={s.accountsubtitle}>Available Billing Addresses:</h4>
          {this.parseAddress(this.props.addresses.addresses, billingId)}
          <input
            className={s.submit}
            type="submit"
            value="save changes"
          />
        </form>
        <div className={s.buttonwrapper}>
          <input
            className={s.submitadd}
            type="button"
            value="Add another address"
            onClick={this.props.onCreate}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(EditAddressesForm);
