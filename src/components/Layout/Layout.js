import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Layout.css';
import Header from '../Header';
import Footer from '../Footer';
import MobileNavigation from '../MobileNavigation';

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
      cart: this.props.cartItems,
      opacity: { opacity: 0 },
    };
  }

  componentDidMount = () => {
    this.setState({
      opacity: { opacity: 1 },
    });
  }

  mobileNavOpen = (event) => {
    event.preventDefault();
    this.setState({
      menuOpen: 'menuopen',
    });
  }
  mobileNavClose = (event) => {
    event.preventDefault();
    this.setState({
      menuOpen: '',
    });
  }

  render() {
    return (
      <div className={s.layout} style={this.state.opacity}>
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
      </div>
    );
  }
}

export default withStyles(s)(Layout);
