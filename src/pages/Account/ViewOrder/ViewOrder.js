import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ViewOrder.css';
// Components
import Subnav from '../../../components/Subnav';
import ContentWrapper from '../../../components/ContentWrapper';
import OrderDetailsTbl from '../../../components/Tables/OrderDetailsTbl';
import CustomerDetailsTbl from '../../../components/Tables/CustomerDetailsTbl';

class ViewOrder extends React.Component {

  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    onLogout: PropTypes.func.isRequired,
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
      <section className={s.page}>
        <Subnav isLogged={this.props.loggedIn} onLogout={this.props.onLogout} />
        <ContentWrapper tabsClass={'hide'}>
          <p className={s.orderInfo}>
            Order <mark className="order-number">
              order number</mark> was placed on <mark className="order-date">
              order date</mark> and is currently <mark className="order-sts">order status</mark>.
          </p>
          <h2 className={s.title}>Order Details</h2>
          <OrderDetailsTbl />
          <h2 className={s.title}>Customer Details</h2>
          <CustomerDetailsTbl />
          <div className={s.addressescontainer}>
            <address className={s.optiontext}>
              <span className={s.block}>{'Levente Csordas'}</span>
              <span className={s.block}>{'Glendale, 10075'}</span>
              <span className={s.block}>{'7th Avenue'}</span>
              <span className={s.block}>{'New York'}, {'NY'} {'10001'} </span>
            </address>
          </div>
          <div className={s.addressescontainer}>
            <address className={s.optiontext}>
              <span className={s.block}>{'Levente Csordas'}</span>
              <span className={s.block}>{'Glendale, 10075'}</span>
              <span className={s.block}>{'7th Avenue'}</span>
              <span className={s.block}>{'New York'}, {'NY'} {'10001'} </span>
            </address>
          </div>
        </ContentWrapper>
      </section>
    );
  }
}

export default withStyles(s)(ViewOrder);
