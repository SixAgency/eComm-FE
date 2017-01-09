import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Dashboard.css';
import Subnav from '../../../components/Subnav';
import ContentWrapper from '../../../components/ContentWrapper';
import Link from '../../../components/Link';

class Dashboard extends React.Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    userName: PropTypes.string.isRequired,
    onLogout: PropTypes.func.isRequired,
  }

  render() {
    return (
      <section className={s.page}>
        <Subnav isLogged={this.props.loggedIn} onLogout={this.props.onLogout} />
        <ContentWrapper>
          <div className={s.dashboard}>
            <h1 className={s.title}>YOUR ACCOUNT</h1>
            <p className={s.intro}>
             Hello <b>{this.props.userName}</b> (not user?
             <a href="/" className={s.actions} onClick={this.props.onLogout}> Sign out</a>).
             From your account dashboard you can view your recent orders, manage your
             shipping and billing addresses and
              <Link className={s.actions} to="/my-account/edit-account" > edit your password and account details </Link>.
            </p>
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
                <p className={s.optiontext}> Please set up your billing address </p>
              </div>
              <div className={s.addresseswrpr}>
                <Link
                  className={s.options}
                  to="/my-account/edit-address/shipping"
                >
                Edit shipping address
                </Link>
                <p className={s.optiontext}> Please set up your shipping address </p>
              </div>
            </div>
          </div>
        </ContentWrapper>
      </section>
    );
  }
}

export default withStyles(s)(Dashboard);
