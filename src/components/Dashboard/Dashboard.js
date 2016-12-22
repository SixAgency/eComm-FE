import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Dashboard.css';

class Dashboard extends React.Component {
  static propTypes = {
    userName: PropTypes.string.isRequired,
  }

  render() {
    return (
      <div className={s.dashboard}>
        <h1 className={s.title}>YOUR ACCOUNT</h1>
        <p className={s.intro}>
         Hello <b>{this.props.userName}</b> (not account? <span>Sign out</span>).
         From your account dashboard you can view your recent orders, manage your
         shipping and billing addresses and <span>edit your password and account details</span>.
        </p>
        <h1 className={s.title}>MY ADDRESSES</h1>
        <p className={s.info}>The following addresses will be used on the checkout page.</p>
      </div>
    );
  }
}

export default withStyles(s)(Dashboard);
