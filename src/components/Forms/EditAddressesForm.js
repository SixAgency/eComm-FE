import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Forms.css';
import { STATES } from '../../constants/AppConsts';

class EditAddressesForm extends React.Component {
  static propTypes = {
    addresses: PropTypes.object.isRequired,
    shipping: PropTypes.object.isRequired,
    billing: PropTypes.object.isRequired,
    onCreate: PropTypes.func.isRequired,
    setAddresses: PropTypes.func.isRequired,
    deleteAddress: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedBilling: this.props.billing.address.id,
      selectedShipping: this.props.shipping.address.id
    };
  }

  onSelect = (e) => {
    if (e.target.name === 'shipping') {
      this.setState({
        selectedShipping: parseInt(e.target.value, 10)
      });
    } else {
      this.setState({
        selectedBilling: parseInt(e.target.value, 10)
      });
    }
  };

  getStateName = (id) => {
    const selected = STATES.find((state) => (state.id === id));
    return selected.abbr || '';
  };

  setAddresses = (e) => {
    e.preventDefault();
    const addresses = this.props.addresses.addresses;
    const selectedBilling = this.state.selectedBilling;
    const selectedShipping = this.state.selectedShipping;
    const billing = addresses.find((address) => (address.id === selectedBilling));
    const shipping = addresses.find((address) => (address.id === selectedShipping));
    this.props.setAddresses(billing, shipping);
  }

  isActive = (tocheckId, loopId) => tocheckId === loopId

  renderAddresses = (addresses, tocheckId, type) => (
    addresses.map((value, key) => (
      <div className={cx(s.addresswrapper)} key={key}>
        <div className={cx(s.radiowrapper, s.accountradio)} key={key}>
          <input
            type="radio"
            value={value.id}
            defaultChecked={this.isActive(tocheckId, value.id)}
            name={type}
            className={cx(s.submitadd, s.addressesoption)}
            onChange={this.onSelect}
          />
          <label htmlFor={value.id} className={s.labelradio}>
            {value.firstname} {value.lastname}<br />
            {value.address1} {value.address2}<br />
            {value.city}, {this.getStateName(value.state_id)}, {value.zipcode}<br />
            {value.phone}
          </label>
        </div>
        <button
          className={cx(s.submitadd, s.addressesoption)}
          onClick={(e) => { e.preventDefault(); this.props.deleteAddress(value.id); }}
        >
          Delete
        </button>
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
          <div className={s.listwrapper}>
            <h4 className={s.accountsubtitle}>Available Shipping Addresses:</h4>
            {this.renderAddresses(this.props.addresses.addresses, shippingId, 'shipping')}
          </div>
          <div className={s.listwrapper}>
            <h4 className={s.accountsubtitle}>Available Billing Addresses:</h4>
            {this.renderAddresses(this.props.addresses.addresses, billingId, 'billing')}
          </div>
          <input
            className={s.submit}
            type="submit"
            value="save changes"
            onClick={this.setAddresses}
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
