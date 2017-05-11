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

  listAddress = (data, type) => {
    if (data.id !== 0) {
      const stateName = this.getStateName(data.state);
      return (
        <address className={s.optiontext}>
          <span className={s.block}>{data.firstname} {data.lastname}</span>
          <span className={s.block}>{data.company}</span>
          <span className={s.block}>{data.address1} {data.address2}</span>
          <span className={s.block}>{data.city}, {stateName}, {data.zip}</span>
        </address>
      );
    }
    return (<p className={s.optiontext}> Please set up your {type} address </p>);
  };

  render() {
    return (
      <section className={s.addresses}>
        <h1 className={s.title}>MY ADDRESSES</h1>
        <p className={s.info}>The following addresses will be used on the checkout page.</p>
        <div className={s.addressescont}>
          <div className={s.addresseswrpr}>
            <Link
              className={s.options}
              to="/my-account/address/billing"
            >
              Edit billing address
            </Link>
            { this.listAddress(this.props.billAddress, 'billing') }
          </div>
          <div className={s.addresseswrpr}>
            <Link
              className={s.options}
              to="/my-account/address/shipping"
            >
            Edit shipping address
            </Link>
            { this.listAddress(this.props.shippAddress, 'shipping') }
          </div>
        </div>
      </section>
    );
  }
}

export default withStyles(s)(Addresses);
