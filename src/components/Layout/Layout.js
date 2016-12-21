import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Layout.css';
import Header from '../Header';
import Footer from '../Footer';
import MobileNavigation from '../MobileNavigation';
import Loader from '../Loader';

class Layout extends React.Component {

  static propTypes = {
    headerClass: PropTypes.string.isRequired,
    activeSlug: PropTypes.string.isRequired,
    cartItems: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
    loaderClass: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      menuOpen: '',
    };
  }

  mobileNavOpen = () => {
    this.setState({
      menuOpen: 'menuopen',
    });
  }
  mobileNavClose = () => {
    this.setState({
      menuOpen: '',
    });
  }

  render() {
    return (
      <div className={s.layout}>
        <div className={cx(s.pagewrapper, s[this.state.menuOpen])}>
          <Header
            headerClass={this.props.headerClass}
            activeSlug={this.props.activeSlug}
            cartItems={this.props.cartItems}
            menuOpen={this.state.menuOpen}
            mobileNavOpen={this.mobileNavOpen}
          />
          {this.props.children}
          <Footer />
        </div>
        <MobileNavigation
          menuOpen={this.state.menuOpen}
          mobileNavClose={this.mobileNavClose}
          activeSlug={this.props.activeSlug}
          navClass={'mobilenavigation'}
        />
        <Loader loaderClass={this.props.loaderClass} />
      </div>
    );
  }
}

export default withStyles(s)(Layout);
