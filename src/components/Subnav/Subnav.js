import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Subnav.css';

class Subnav extends React.Component {
  static propTypes = {
    isLogged: PropTypes.bool.isRequired,
    onLogout: PropTypes.func.isRequired,
    forwardTo: PropTypes.func.isRequired,
    breadcrumbs: PropTypes.array
  };

  static defaultProps = {
    breadcrumbs: []
  };

  getSubNavItems = () => {
    if (this.props.isLogged) {
      return [
        {
          title: 'My Account',
          action: () => this.props.forwardTo('my-account/dashboard')
        },
        {
          title: 'Edit Account',
          action: () => this.props.forwardTo('my-account/edit-account')
        },
        {
          title: 'E-Gift Card',
          action: () => this.props.forwardTo('my-account/giftcard')
        },
        {
          title: 'Logout',
          action: this.props.onLogout
        }
      ];
    }
    return [
      {
        title: 'Login / Register',
        action: () => this.props.forwardTo('my-account')
      }
    ];
  };

  render() {
    const subNavItem = this.getSubNavItems();
    const { breadcrumbs } = this.props;
    const breadcrumbsCount = breadcrumbs.length;
    return (
      <section className={s.subnav}>
        {breadcrumbsCount > 0 ?
          <nav className={s.breadcrumbs}>
            {this.props.breadcrumbs.map((item, index) => {
              if (item.url && index < breadcrumbsCount - 1) {
                return (
                  <span key={index}>
                    <Link to={item.url} className={s.innerlink}>{item.label}</Link>
                    <span className={s.divider}>/</span>
                  </span>
                );
              }
              return item.label;
            })}
          </nav> : null
        }
        <ul className={s.subnavlist}>
          {subNavItem.map((v, k) => (
            <li key={k} className={s.subnavitem}>
              <Link onClick={v.action} className={s.innerlink}>{v.title}</Link>
            </li>
          ))}
        </ul>
      </section>
    );
  }
}

export default withStyles(s)(Subnav);
