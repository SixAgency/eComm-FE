import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Subnav.css';

class Subnav extends React.Component {
  static propTypes = {
    isLogged: PropTypes.bool.isRequired,
    onLogout: PropTypes.func.isRequired,
  }

  static defaultProps = {
    onLogout: () => (true),
  }

  getSubNavItems = () => {
    if (this.props.isLogged) {
      return [
        {
          title: 'My Account',
          link: '/my-account',
          action: () => (true),
        },
        {
          title: 'Edit Account',
          link: '/my-account/edit-account',
          action: () => (true),
        },
        {
          title: 'Logout',
          link: '/my-account',
          action: this.props.onLogout,
        },
      ];
    }
    return [
      {
        title: 'Login / Register',
        link: '/my-account',
        action: () => (true),
      },
    ];
  };

  render() {
    const subNavItem = this.getSubNavItems();
    return (
      <section className={s.subnav}>
        <nav className={s.breadcrumbs}>
          <Link to="/" className={s.innerlink}>Shop</Link>
          <span className={s.divider}>/</span>
          My Account
        </nav>
        <ul className={s.subnavlist}>
          {subNavItem.map((v, k) => (
            <li key={k} className={s.subnavitem}>
              <Link to={v.link} onClick={v.action} className={s.innerlink}>{v.title}</Link>
            </li>
          ))}
        </ul>
      </section>
    );
  }
}

export default withStyles(s)(Subnav);
