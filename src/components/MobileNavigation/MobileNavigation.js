import React, { PropTypes } from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './MobileNavigation.css';
import Link from '../Link';
import Navigation from '../Navigation';
import SocialMedia from '../SocialMedia';

class MobileNavigation extends React.Component {
  static propTypes = {
    activeSlug: PropTypes.string.isRequired,
    menuOpen: PropTypes.string.isRequired,
    mobileNavClose: PropTypes.func.isRequired,
    navClass: PropTypes.string.isRequired,
  }

  render() {
    return (
      <div className={cx(s.mobilenav, s[this.props.menuOpen])}>
        <Navigation
          activeSlug={this.props.activeSlug}
          navClass={this.props.navClass}
          menuOpen={this.props.menuOpen}
        />
        <Link to="#" className={s.closebtn} onClick={this.props.mobileNavClose} >
          <span className={s.hr} />
          <span className={s.vr} />
        </Link>
        <SocialMedia socialClass={'socialmobile'} />
      </div>
    );
  }
}

export default withStyles(s)(MobileNavigation);
