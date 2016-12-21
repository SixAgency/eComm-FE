import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Subnav.css';
import Link from '../Link';

class Subnav extends React.Component {
  getSubNavItems = () => ([{
    title: 'Login / Register',
    link: '/my-account',
    action: () => (true),
  }]);

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
