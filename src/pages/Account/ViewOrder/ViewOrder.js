import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import moment from 'moment';
import s from './ViewOrder.css';
// Components
import Subnav from '../../../components/Subnav';
import ContentWrapper from '../../../components/ContentWrapper';
import OrderDetailsTbl from '../../../components/Tables/OrderDetailsTbl';
import CustomerDetailsTbl from '../../../components/Tables/CustomerDetailsTbl';
// helpers
import { getOrderState } from '../../../utils/utils';

class ViewOrder extends React.Component {

  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    onLogout: PropTypes.func.isRequired,
    order: PropTypes.object.isRequired
  };

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
  };


  render() {
    const order = this.props.order;
    const billingAddress = order.bill_address;
    const shippingAddress = order.ship_address;
    return (
      <section className={s.page}>
        <Subnav isLogged={this.props.loggedIn} onLogout={this.props.onLogout} />
        <ContentWrapper tabsClass={'hide'}>
          <div>
            <p className={s.orderInfo}>
              Order <mark className="order-number">{order.number}</mark> was placed on&nbsp;
              <mark className="order-date">
                {moment(order.created_at).format('MMMM DD YYYY')}
              </mark>
              &nbsp;and is currently <mark className={s.orderstatus}>
                {getOrderState(order.state, order.has_refunds, order.shipment_state)}
              </mark>.
            </p>
            <h2 className={s.title}>Order Details</h2>
            <OrderDetailsTbl order={this.props.order} />
            <h2 className={s.title}>Customer Details</h2>
            <CustomerDetailsTbl order={this.props.order} />
            <div className={s.addressescontainer}>
              <address className={s.optiontext}>
                <span className={s.block}>{billingAddress.full_name}</span>
                <span className={s.block}>{billingAddress.address1}</span>
                {billingAddress.address2 &&
                  <span className={s.block}>{billingAddress.address2}</span>
                }
                <span className={s.block}>
                  {billingAddress.city}, {billingAddress.state_text} {billingAddress.zipcode}
                </span>
              </address>
              <address className={s.optiontext}>
                <span className={s.block}>{shippingAddress.full_name}</span>
                <span className={s.block}>{shippingAddress.address1}</span>
                {shippingAddress.address2 &&
                  <span className={s.block}>{shippingAddress.address2}</span>
                }
                <span className={s.block}>
                  {shippingAddress.city}, {shippingAddress.state_text} {shippingAddress.zipcode}
                </span>
              </address>
            </div>
          </div>
        </ContentWrapper>
      </section>
    );
  }
}

export default withStyles(s)(ViewOrder);
