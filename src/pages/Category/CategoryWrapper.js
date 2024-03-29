import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import capitalize from 'lodash.capitalize';

import Category from './Category';
// Actions
import { setHeaderProps, resetMessages, toggleLoader, setMessage } from '../../actions/page';
import { getProductsInCategory, getProduct } from '../../actions/catalog';
import { addToCart } from '../../actions/order';

const mapStateToProps = ((state) => (
  {
    categoryItems: state.catalog.categoryItems,
    messages: state.page.messages,
    isError: state.page.isError,
    cartItems: state.cart.cartItems,
    isPending: state.page.isPending
  }
));

const mapDispatchToProps = ((dispatch) => (
  {
    setHeaderProps: (props) => dispatch(setHeaderProps(props)),
    toggleLoader: (toggle, image) => dispatch(toggleLoader(toggle, image)),
    getProductsInCategory: (slug) => dispatch(getProductsInCategory(slug)),
    addToCart: (item) => dispatch(addToCart(item)),
    resetMessages: () => dispatch(resetMessages()),
    setMessage: (message) => dispatch(setMessage(message)),
    getProduct: (slug) => dispatch(getProduct(slug))
  }
));

class CategoryWrapper extends React.Component {

  static propTypes = {
    categoryItems: PropTypes.object.isRequired,
    cartItems: PropTypes.object.isRequired,
    toggleLoader: PropTypes.func.isRequired,
    getProductsInCategory: PropTypes.func.isRequired,
    setHeaderProps: PropTypes.func.isRequired,
    addToCart: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    messages: PropTypes.array.isRequired,
    resetMessages: PropTypes.func.isRequired,
    isError: PropTypes.bool.isRequired,
    isPending: PropTypes.bool.isRequired,
    setMessage: PropTypes.func.isRequired,
    getProduct: PropTypes.func.isRequired
  };

  componentWillMount = () => {
    const props = {
      headerClass: 'default',
      activeSlug: '/'
    };
    this.props.setHeaderProps(props);
    if (this.props.categoryItems.isLoaded) {
      console.log(this.props.categoryItems);
    } else {
      this.props.getProductsInCategory(this.props.params.slug);
    }
    if (this.props.categoryItems.slug !== this.props.params.slug) {
      this.props.getProductsInCategory(this.props.params.slug);
    }
  };

  componentDidMount = () => {
    const { isLoaded } = this.props.categoryItems;
    if (isLoaded && !this.props.isPending) {
      setTimeout(() => {
        this.props.toggleLoader(false);
      }, 500);
    }
  };

  componentWillReceiveProps = (nextProps) => {
    if (this.props.params.slug !== nextProps.params.slug) {
      this.props.toggleLoader(true);
      this.props.getProductsInCategory(this.props.params.slug);
    } else {
      const { isLoaded } = nextProps.categoryItems;
      if (isLoaded && !nextProps.isPending) {
        setTimeout(() => {
          this.props.toggleLoader(false);
        }, 250);
      }
    }
  };

  componentWillUnmount = () => {
    this.props.toggleLoader(true);
    this.props.resetMessages();
  };

  render() {
    document.title = `${capitalize(this.props.params.slug)} Archives - krissorbie`;
    if (this.props.categoryItems.isLoaded && this.props.cartItems.isLoaded) {
      return (
        <Category
          gridItems={this.props.categoryItems}
          cartItems={this.props.cartItems}
          addToCart={this.props.addToCart}
          messages={this.props.messages}
          isError={this.props.isError}
          toggleLoader={this.props.toggleLoader}
          setMessage={this.props.setMessage}
          getProduct={this.props.getProduct}
        />
      );
    }
    return null;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryWrapper);
