import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import accounting from 'accounting';

import s from './Dashboard.css';
// Components
import Subnav from '../../../components/Subnav';
import ContentWrapper from '../../../components/ContentWrapper';
import Addresses from '../../../components/Addresses';
import OrderHistory from '../../../components/OrderHistory';
import ErrorDisplay from '../../../components/ErrorDisplay';

class Dashboard extends React.Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    onLogout: PropTypes.func.isRequired,
    addresses: PropTypes.object.isRequired,
    orders: PropTypes.object.isRequired,
    messages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired,
    breadcrumbs: PropTypes.array,
    profile: PropTypes.object.isRequired,
    resetMessages: PropTypes.func.isRequired,
    onRedeemGiftCard: PropTypes.func.isRequired,
    creditInfo: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      giftCode: ''
    };
  }

  setName = () => {
    if (this.props.profile.f_name && this.props.profile.l_name) {
      return `${this.props.profile.f_name} ${this.props.profile.l_name}`;
    }
    return this.props.profile.email.split('@')[0];
  };

  redeemGiftCard = () => {
    this.props.onRedeemGiftCard(this.state.giftCode);
  };

  renderOrders = () => {
    const { orders } = this.props;
    if (!orders.isLoaded || orders.isEmpty) {
      return null;
    }
    return (
      <div>
        <h1 className={s.title}>RECENT ORDERS</h1>
        <OrderHistory orders={this.props.orders} />
      </div>
    );
  };

  renderStoreCreditAmount = () => {
    const { creditInfo } = this.props;
    if (!creditInfo.isLoaded || creditInfo.totalAmount === 0) {
      return (
        <h2 className={s.storecreditamount}>{"You don't have any store credit"}</h2>
      );
    }
    return (
      <h2 className={s.storecreditamount}>
        Your total store credit amount: <em>{ accounting.formatMoney(creditInfo.totalAmount) }</em>
      </h2>
    );
  }

  render() {
    const addresses = {
      shippAddress: this.props.addresses.shipping,
      billAddress: this.props.addresses.billing
    };
    return (
      <section className={s.page}>
        <Subnav
          isLogged={this.props.loggedIn}
          onLogout={this.props.onLogout}
          breadcrumbs={this.props.breadcrumbs}
          resetMessages={this.props.resetMessages}
        />
        <ErrorDisplay messages={this.props.messages} isError={this.props.isError} />
        <ContentWrapper>
          <div className={s.dashboard}>
            <h1 className={s.title}>YOUR ACCOUNT</h1>
            <p className={s.intro}>
             Hello <b>{this.setName()}</b>&nbsp;
             (not {this.setName()}?
             <a href="/" className={s.actions} onClick={this.props.onLogout}> Sign out</a>).
             From your account dashboard you can view your recent orders, manage your
             shipping and billing addresses and
              <Link className={s.actions} to="/my-account/edit-account" > edit your password and account details </Link>.
            </p>
            {this.renderOrders()}
            <Addresses {...addresses} />
            <h1 className={s.title}>MY STORE CREDIT</h1>
            {this.renderStoreCreditAmount()}
            <div className={s.giftcardform}>
              <h2 className={s.giftcardform_title}>
                Do you have a gift card? Redeem it here for store credit.
              </h2>
              <input
                type="text"
                placeholder="Enter gift card code"
                className={s.giftcardform_input}
                value={this.state.giftCode}
                onChange={(event) => {
                  this.setState({ giftCode: event.target.value });
                }}
              />
              <button
                className={s.giftcardform_submit}
                onClick={this.redeemGiftCard}
              >
                Redeem
              </button>
            </div>
          </div>
        </ContentWrapper>
      </section>
    );
  }
}

export default withStyles(s)(Dashboard);
