import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Addresses.css';

import { STATES } from '../../constants/AppConsts';

class Addresses extends React.Component {

  static propTypes = {
    shippAddress: PropTypes.object,
    billAddress: PropTypes.object
  };

  getStateName = (id) => {
    const selected = STATES.find((state) => (state.id === id));
    return selected.abbr || '';
  };

  listAddress = (data) => {
    const { isLoaded, isEmpty, address } = data;
    if (isLoaded && !isEmpty) {
      const stateName = this.getStateName(address.state_id);
      return (
        <address className={s.optiontext}>
          <span className={s.block}>{address.firstname} {address.lastname}</span>
          <span className={s.block}>{address.company}</span>
          <span className={s.block}>{address.address1}</span>
          <span className={s.block}>{address.address2}</span>
          <span className={s.block}>{address.city}, {stateName}, {address.zipcode}</span>
        </address>
      );
    }
    return (<p className={s.optiontext}> Please set up your billing address </p>);
  };

  render() {
    return (
      <section className={s.addresses}>
        <h1 className={s.title}>MY ADDRESSES</h1>
        <p className={s.info}>Below you can manage your addresses.</p>
        <div className={s.addressescont}>
          <div className={s.addresseswrpr}>
            <Link
              className={s.options}
              to="/my-account/address/manage"
            >
              Manage Addresses
            </Link>
          </div>
        </div>
        <p className={s.info}>The following addresses will be used on the checkout page.</p>
        <div className={s.addressescont}>
          <div className={s.addresseswrpr}>
            <Link
              className={s.options}
              to="/my-account/address/billing"
            >
              Edit billing address
            </Link>
            { this.listAddress(this.props.billAddress) }
          </div>
          <div className={s.addresseswrpr}>
            <Link
              className={s.options}
              to="/my-account/address/shipping"
            >
            Edit shipping address
            </Link>
            { this.listAddress(this.props.shippAddress) }
          </div>
        </div>
      </section>
    );
  }
}

export default withStyles(s)(Addresses);
