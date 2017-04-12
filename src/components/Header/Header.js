import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.css';
import Navigation from '../Navigation';
import Minicart from '../Minicart';

class Header extends React.Component {
  static propTypes = {
    headerClass: PropTypes.string.isRequired,
    activeSlug: PropTypes.string.isRequired,
    cartItems: PropTypes.object.isRequired,
    menuOpen: PropTypes.string.isRequired,
    mobileNavOpen: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      headerClass: '',
      stickyClass: '',
      cartClass: 'hide',
      cartCountStick: false
    };
  }

  componentDidMount = () => {
    window.addEventListener('scroll', this.headerScroll);
  };

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.headerScroll);
  };

  onHoverStart = () => {
    if (window.innerWidth > 1000) {
      clearTimeout(this.timeOut);
      this.setState({
        headerClass: 'enabled'
      });
    }
  };

  onHoverEnd = () => {
    if (window.innerWidth > 1000) {
      this.timeOut = setTimeout(() => {
        this.setState({
          headerClass: '',
          stickyCls: ''
        });
      }, 200);
    }
  };

  headerScroll = () => {
    if (window.outerWidth > 960) {
      let stickyClass = '';
      let cartCountStick = false;
      const posCur = window.scrollY;
      const heroSpacerH = window.innerHeight;
      // scroll down
      if ((posCur < this.posWas) && (posCur >= heroSpacerH)) {
        stickyClass = 'sticky';
      } else {
        if (posCur > heroSpacerH) {
          stickyClass = 'hideheader';
        }
        if (posCur < 300) {
          stickyClass = '';
        }
      }
      cartCountStick = posCur >= 570;

      this.posWas = posCur;
      this.setState({ stickyClass, cartCountStick });
    }
  };

  cartHover = (event) => {
    let cartClass = 'hide';
    if (event.type === 'mouseenter') {
      cartClass = 'show';
    }
    this.setState({ cartClass });
  };

  render() {
    const { isLoaded, isEmpty, cart } = this.props.cartItems;
    let quantity = 0;
    if (!isEmpty && isLoaded) { quantity = cart.line_items.length; }
    if (!isLoaded) {
      return null;
    }
    return (
      <header
        className={cx(
          s.header,
          s[this.props.headerClass],
          s[this.state.headerClass],
          s[this.state.stickyClass],
        )}
        onMouseEnter={this.onHoverStart}
        onMouseLeave={this.onHoverEnd}
      >
        <Link className={s.logocontainer} to="/">
          <div className={s.logo} />
        </Link>
        <Navigation activeSlug={this.props.activeSlug} navClass={'navigation'} />
        <Link
          className={cx(s.openbtn, s[this.props.menuOpen])}
          onClick={this.props.mobileNavOpen}
          to="#"
        >
          <i className={s.menuicon} />
        </Link>
        <div className={cx(s.cartholder, s[this.props.menuOpen], this.state.cartCountStick ? s.fixed : '')}>
          <div className={s.carticon} onMouseEnter={this.cartHover} onMouseLeave={this.cartHover}>
            <Link className={s.cartquantity} to="/cart"><span className={s.quantity}>{quantity}</span></Link>
            <Minicart cartItems={this.props.cartItems} cartClass={this.state.cartClass} />
          </div>
          <span className={s.cartdivider}>|</span>
        </div>
      </header>
    );
  }
}

export default withStyles(s)(Header);
