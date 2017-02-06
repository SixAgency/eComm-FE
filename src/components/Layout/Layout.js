import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import LayoutContent from './LayoutContent';
import { getCart } from '../../actions/order';
import { checkLogin } from '../../actions/user';
import checkoutNext from '../../actions/checkout';

const mapStateToProps = ((state) => (
  {
    headerProps: state.page.headerProps,
    showLoader: state.page.showLoader,
    cartItems: state.cart.cartItems,
    // layoutStyles: state.page.layoutStyles,
  })
);
const mapDispatchToProps = ((dispatch) => (
  {
    getCart: () => dispatch(getCart()),
    checkLogin: () => dispatch(checkLogin()),
    checkoutNext: () => dispatch(checkoutNext()),
  }
));
class Layout extends React.Component {

  static propTypes = {
    getCart: PropTypes.func.isRequired,
    headerProps: PropTypes.object.isRequired,
    cartItems: PropTypes.object.isRequired,
    checkLogin: PropTypes.func.isRequired,
    showLoader: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    checkoutNext: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      menuOpen: '',
    };
  }

  componentWillMount = () => {
    this.props.checkLogin();
    if (this.props.cartItems.isLoaded) {
      console.log('isLoaded');
    } else {
      this.props.getCart();
    }
  }

  toCheckout = () => {
    const cart = this.props.cartItems.cart;
    if (cart.state === 'cart') {
      this.props.checkoutNext();
    }
    browserHistory.push('/checkout');
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
    const { headerClass, activeSlug } = this.props.headerProps;
    return (
      <LayoutContent
        headerClass={headerClass}
        activeSlug={activeSlug}
        cartItems={this.props.cartItems}
        mobileNavOpen={this.mobileNavOpen}
        mobileNavClose={this.mobileNavClose}
        menuOpen={this.state.menuOpen}
        layoutStyles={{ opacity: 1 }}
        showLoader={this.props.showLoader}
        toCheckout={this.toCheckout}
      >{this.props.children}</LayoutContent>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
