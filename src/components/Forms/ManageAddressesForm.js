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
    shipping: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      showError: false
    };
  }

  onDelete = (id) => {
    if (id === this.props.billing.address.id || this.props.shipping.address.id) {
      this.setState({
        showError: true
      });
    }
  }

  onEdit = (id) => {
    if (id === this.props.billing.address.id || this.props.shipping.address.id) {
      this.setState({
        showError: true
      });
    }
  }

  onCancelError = () => {
    this.setState({
      showError: false
    });
    // trigger action here
  }

  onProceedError = () => {
    this.setState({
      showError: false
    });
    // trigger action here
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
    return (
      <div className={cx(s.formcontent)}>
        <h1 className={s.title}>Manage addresses</h1>
        <form className={cx(s.form, s.addresses, s.addressesform)}>
          <div className={s.listwrapper}>
            <h4 className={s.accountsubtitle}>
              Available Addresses
            </h4>
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
