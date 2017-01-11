import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Layout.css';
import Header from '../Header';
import Footer from '../Footer';
import MobileNavigation from '../MobileNavigation';

class LayoutContent extends React.Component {

  static propTypes = {
    headerClass: PropTypes.string.isRequired,
    activeSlug: PropTypes.string.isRequired,
    cartItems: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
    styles: PropTypes.object.isRequired,
    mobileNavOpen: PropTypes.func.isRequired,
    mobileNavClose: PropTypes.func.isRequired,
    menuOpen: PropTypes.string.isRequired,
  };

  static defaultProps = {
    styles: { opacity: 0 },
    menuOpen: '',
  }

  render() {
    return (
      <div className={s.layout} style={this.props.styles}>
        <div className={cx(s.pagewrapper, s[this.props.menuOpen])}>
          <Header
            headerClass={this.props.headerClass}
            activeSlug={this.props.activeSlug}
            cartItems={this.props.cartItems}
            menuOpen={this.props.menuOpen}
            mobileNavOpen={this.props.mobileNavOpen}
          />
          {this.props.children}
          <Footer />
        </div>
        <MobileNavigation
          menuOpen={this.props.menuOpen}
          mobileNavClose={this.props.mobileNavClose}
          activeSlug={this.props.activeSlug}
          navClass={'mobilenavigation'}
        />
      </div>
    );
  }
}

export default withStyles(s)(LayoutContent);
