import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Addresses.css';

class Addresses extends React.Component {

  static propTypes = {
    shippAddress: PropTypes.object,
    billAddress: PropTypes.object,
  }

  listAddress = (address) => {
    if (address) {
      return (
        <address className={s.optiontext}>
          <span className={s.block}>{address.firstname} {address.lastname}</span>
          <span className={s.block}>{address.company}</span>
          <span className={s.block}>{address.address1}</span>
          <span className={s.block}>{address.address2}</span>
          <span className={s.block}>{address.city}, {address.state_name} {address.zipcode}</span>
        </address>
      );
    }
    return (<p className={s.optiontext}> Please set up your billing address </p>);
  }

  render() {
    return (
      <section className={s.addresses}>
        <h1 className={s.title}>MY ADDRESSES</h1>
        <p className={s.info}>The following addresses will be used on the checkout page.</p>
        <div className={s.addressescont}>
          <div className={s.addresseswrpr}>
            <Link
              className={s.options}
              to="/my-account/edit-address/billing"
            >
              Edit billing address
            </Link>
            { this.listAddress(this.props.billAddress) }
          </div>
          <div className={s.addresseswrpr}>
            <Link
              className={s.options}
              to="/my-account/edit-address/shipping"
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
