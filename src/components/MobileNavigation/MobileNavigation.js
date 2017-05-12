import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './MobileNavigation.css';
import Navigation from '../Navigation';
import SocialMedia from '../SocialMedia';

class MobileNavigation extends Component {
  static propTypes = {
    activeSlug: PropTypes.string.isRequired,
    menuOpen: PropTypes.string.isRequired,
    mobileNavClose: PropTypes.func.isRequired,
    navClass: PropTypes.string.isRequired,
    getProduct: PropTypes.func.isRequired,
    toggleLoader: PropTypes.func.isRequired
  };

  componentDidMount = () => {
    window.addEventListener('resize', () => { this.setHeight(); });
  };

  setHeight = () => {
    const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    document.getElementById('mobilenav').style.height = `${vh}px`;
  };

  render() {
    return (
      <div id="mobilenav" className={cx(s.mobilenav, s[this.props.menuOpen])}>
        <Navigation
          activeSlug={this.props.activeSlug}
          navClass={this.props.navClass}
          menuOpen={this.props.menuOpen}
          getProduct={this.props.getProduct}
          toggleLoader={this.props.toggleLoader}
          isMobile
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
