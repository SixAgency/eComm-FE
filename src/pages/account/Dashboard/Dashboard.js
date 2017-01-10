import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Dashboard.css';
import Subnav from '../../../components/Subnav';
import ContentWrapper from '../../../components/ContentWrapper';
import Link from '../../../components/Link';
import Addresses from '../../../components/Addresses';

class Dashboard extends React.Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    userName: PropTypes.string.isRequired,
    onLogout: PropTypes.func.isRequired,
    addresses: PropTypes.object.isRequired,
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
            <Addresses {...this.props.addresses} />
          </div>
        </ContentWrapper>
      </section>
    );
  }
}

export default withStyles(s)(Dashboard);