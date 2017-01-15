import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import LayoutContent from './LayoutContent';
import { getCart } from '../../actions/order';
import { checkLogin } from '../../actions/user';

const mapStateToProps = ((state) => (
  {
    headerProps: state.page.headerProps,
    cartItems: state.cart.cartItems,
  })
);
const mapDispatchToProps = ((dispatch) => (
  {
    getCart: () => dispatch(getCart()),
    checkLogin: () => dispatch(checkLogin()),
  }
));
class Layout extends React.Component {

  static propTypes = {
    getCart: PropTypes.func.isRequired,
    headerProps: PropTypes.object.isRequired,
    cartItems: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
  };

  // static defaultProps = {
  //   cartItems: { isLoaded: false, isEmpty: true, cart: {} },
  // }

  constructor(props) {
    super(props);
    this.state = {
      menuOpen: '',
      styles: { opacity: 0 },
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

  componentDidMount = () => {
    this.setState({
      styles: { opacity: 1 },
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
    const { headerClass, activeSlug } = this.props.headerProps;
    console.log(this.props.cartItems);
    return (
      <LayoutContent
        headerClass={headerClass}
        activeSlug={activeSlug}
        cartItems={this.props.cartItems}
        mobileNavOpen={this.mobileNavOpen}
        mobileNavClose={this.mobileNavClose}
        menuOpen={this.state.menuOpen}
        styles={this.state.styles}
      >{this.props.children}</LayoutContent>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
