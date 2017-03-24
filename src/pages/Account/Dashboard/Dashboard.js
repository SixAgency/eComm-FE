import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
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
    resetMessages: PropTypes.func.isRequired
  };

  setName = () => {
    if (this.props.profile.f_name && this.props.profile.l_name) {
      return `${this.props.profile.f_name} ${this.props.profile.l_name}`;
    }
    return this.props.profile.email.split('@')[0];
  };

  checkOrders = () => {
    const orders = this.props.orders;
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

  render() {
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

            {this.checkOrders()}
            <Addresses {...this.props.addresses} />
          </div>
        </ContentWrapper>
      </section>
    );
  }
}

export default withStyles(s)(Dashboard);
