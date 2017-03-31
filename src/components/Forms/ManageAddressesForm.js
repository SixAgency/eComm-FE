import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Forms.css';
// Components
import ErrorPopup from '../ErrorPopup';
// Utils
import { STATES } from '../../constants/AppConsts';

class ManageAddressesForm extends Component {

  static propTypes = {
    addresses: PropTypes.object.isRequired,
    billing: PropTypes.object.isRequired,
    shipping: PropTypes.object.isRequired,
    deleteAddress: PropTypes.func.isRequired,
    setDefaultShipping: PropTypes.func.isRequired,
    setDefaultBilling: PropTypes.func.isRequired,
    handleDisplayState: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      showError: false,
      currentId: 0,
      currentAction: '',
      defaultFor: ''
    };
  }

  onDelete = (id) => {
    this.setState({
      currentId: id,
      currentAction: 'delete'
    }, () => {
      if (id === this.props.billing.address.id) {
        this.setState({
          showError: true,
          defaultFor: 'billing'
        });
      } else if (id === this.props.shipping.address.id) {
        this.setState({
          showError: true,
          defaultFor: 'shipping'
        });
      } else {
        this.props.deleteAddress(this.state.currentId);
      }
    });
  }

  onEdit = (id) => {
    this.setState({
      currentId: id,
      currentAction: 'edit'
    }, () => {
      if (id === this.props.billing.address.id || id === this.props.shipping.address.id) {
        this.setState({
          showError: true
        });
      } else {
        this.props.handleDisplayState('edit', this.state.currentId);
      }
    });
  }

  onCancelError = () => {
    this.setState({
      showError: false
    });
  }

  onProceedError = () => {
    this.setState({
      showError: false
    });
    if (this.state.currentAction === 'edit') {
      this.props.handleDisplayState('edit', this.state.currentId);
    } else if (this.state.currentAction === 'delete') {
      const address = this.getAvailable(this.props.addresses.addresses, this.state.defaultFor);
      const message = `${this.state.defaultFor} address updated successfully`;
      if (this.state.defaultFor === 'shipping') {
        this.props.setDefaultShipping(address, message);
      } else {
        this.props.setDefaultBilling(address, message);
      }
      this.props.deleteAddress(this.state.currentId);
    }
  }

  getAvailable = (addresses, type) => {
    if (type === 'billing') {
      const available = addresses.find((address) => (!address.isBilling));
      const id = available.id;
      const address = {
        default_bill_address: {
          id
        }
      };
      return address;
    } else if (type === 'shipping') {
      const available = addresses.find((address) => (!address.isShipping));
      const id = available.id;
      const address = {
        default_ship_address: {
          id
        }
      };
      return address;
    }
    return {};
  }

  getStateName = (id) => {
    const selected = STATES.find((state) => (state.id === id));
    return selected.abbr || '';
  };

  isActive = (id) => id === this.props.shipping.address.id || this.props.billing.address.id


  renderAddresses = (addresses) => (
    addresses.map((value, key) => (
      <div className={cx(s.addresswrapper)} key={key}>
        <div className={cx(s.radiowrapper, s.accountradio)} key={key}>
          <label htmlFor={value.id} className={s.labelradio}>
            {value.firstname} {value.lastname}<br />
            {value.address1} {value.address2}<br />
            {value.city}, {this.getStateName(value.state_id)}, {value.zipcode}<br />
            {value.phone}
          </label>
        </div>
        <button
          className={cx(s.submitadd, s.addressesoption)}
          onClick={(e) => { e.preventDefault(); this.onEdit(value.id); }}
        >
          Edit
        </button>
        <button
          className={cx(s.submitadd, s.addressesoption)}
          onClick={(e) => { e.preventDefault(); this.onDelete(value.id); }}
        >
           Delete
         </button>
      </div>
     ))
  );

  render() {
    console.log(this.props.addresses);
    return (
      <div className={cx(s.formcontent)}>
        <h1 className={s.title}>Manage addresses</h1>
        <h2 className={s.subtitle}>Available Addresses</h2>
        <form className={cx(s.form, s.addresses, s.addressesform)}>
          <div className={s.listwrapper}>
            {this.renderAddresses(this.props.addresses.addresses)}
          </div>
        </form>
        <ErrorPopup
          showError={this.state.showError}
          onCancel={this.onCancelError}
          onProceed={this.onProceedError}
        />
      </div>
    );
  }
}

export default withStyles(s)(ManageAddressesForm);
