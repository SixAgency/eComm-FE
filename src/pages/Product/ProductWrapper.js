import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import Product from './Product';

// Actions
import {
  setHeaderProps,
  resetMessages,
  toggleLoader,
  setMessage
} from '../../actions/page';
import { addToCart } from '../../actions/order';
import { getProduct, addProductReview } from '../../actions/catalog';

const mapStateToProps = ((state) => (
  {
    product: state.catalog.product,
    cartItems: state.cart.cartItems,
    messages: state.page.messages,
    isError: state.page.isError,
    isCartPending: state.cart.isCartPending,
    isPending: state.page.isPending,
    isFetching: state.catalog.isFetching,
    isFetched: (
      !state.catalog.isFetching &&
      !state.page.isPending &&
      !state.cart.isCartPending &&
      state.catalog.product.isLoaded &&
      state.cart.cartItems.isLoaded
    )
  }
));

const mapDispatchToProps = ((dispatch) => (
  {
    setHeaderProps: (props) => dispatch(setHeaderProps(props)),
    toggleLoader: (toggle, image) => dispatch(toggleLoader(toggle, image)),
    addToCart: (item) => dispatch(addToCart(item)),
    getProduct: (slug) => dispatch(getProduct(slug)),
    resetMessages: () => dispatch(resetMessages()),
    setMessage: (message) => dispatch(setMessage(message)),
    addProductReview: (id, review, callback) => dispatch(addProductReview(id, review, callback))
  }
));

class ProductWrapper extends Component {

  static propTypes = {
    setHeaderProps: PropTypes.func.isRequired,
    toggleLoader: PropTypes.func.isRequired,
    addToCart: PropTypes.func.isRequired,
    getProduct: PropTypes.func.isRequired,
    addProductReview: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    cartItems: PropTypes.object.isRequired,
    setMessage: PropTypes.func.isRequired,
    resetMessages: PropTypes.func.isRequired,
    messages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired,
    isFetched: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      variant_id: null,
      pdpTabs: {
        description: true,
        details: false,
        info: false
      }
    };
  }

  componentWillMount = () => {
    this.setHeaderProps(this.props);
  };

  componentDidMount = () => {
    const { product } = this.props.product;
    if (product.slug !== this.props.params.slug) {
      this.props.getProduct(this.props.params.slug);
    } else if (this.props.isFetched) {
      setTimeout(() => {
        this.props.resetMessages();
        this.props.toggleLoader(false);
      }, 500);
    }
  };

  componentWillReceiveProps = (nextProps) => {
    const { product } = nextProps.product;
    if (nextProps.isFetched && product.slug === nextProps.params.slug) {
      this.setState({
        pdpTabs: {
          description: true,
          details: false,
          info: false
        }
      }, () => setTimeout(() => {
        this.props.toggleLoader(false);
      }, 250));
    } else {
      this.props.toggleLoader(true);
    }
  };

  componentWillUnmount = () => {
    this.props.toggleLoader(true);
    this.props.resetMessages();
  };

  setHeaderProps = (props) => {
    const headerProps = {
      headerClass: 'colored',
      activeSlug: props.params.slug.indexOf('mentoring') >= 0 ? '/product/mentoring-program-day' : '/'
    };
    this.props.setHeaderProps(headerProps);
  };

  getProperty = (properties, property) => properties.find(
    (prop) => (prop.property_name === property)
  );

  getPropertyFlag = (object) => typeof object !== 'undefined' && object.value !== '';

  getProperties = () => {
    const titleNote = this.getProperty(this.props.product.product.product_properties, 'title_note');
    const video = this.getProperty(this.props.product.product.product_properties, 'embedded_video');
    const bulkPrice1 = this.getProperty(this.props.product.product.product_properties, 'bulk_price1');
    const bulkPrice2 = this.getProperty(this.props.product.product.product_properties, 'bulk_price2');
    const bulkPrice3 = this.getProperty(this.props.product.product.product_properties, 'bulk_price3');
    const bulkPrice4 = this.getProperty(this.props.product.product.product_properties, 'bulk_price4');
    const priceNote = this.getProperty(this.props.product.product.product_properties, 'price_note');
    const details = this.getProperty(this.props.product.product.product_properties, 'details');
    const additionalInfo = this.getProperty(this.props.product.product.product_properties, 'additional_information');
    const weight = this.getProperty(this.props.product.product.product_properties, 'weight');
    const dimensions = this.getProperty(this.props.product.product.product_properties, 'dimensions');
    return {
      titleNote: this.getPropertyFlag(titleNote) ? titleNote.value : '',
      video: this.getPropertyFlag(video) ? video.value : '',
      bulkPrices: [
        this.getPropertyFlag(bulkPrice1) ? bulkPrice1.value : '',
        this.getPropertyFlag(bulkPrice2) ? bulkPrice2.value : '',
        this.getPropertyFlag(bulkPrice3) ? bulkPrice3.value : '',
        this.getPropertyFlag(bulkPrice4) ? bulkPrice4.value : ''
      ],
      priceNote: this.getPropertyFlag(priceNote) ? priceNote.value : '',
      details: this.getPropertyFlag(details) ? details.value : '',
      additionalInfo: this.getPropertyFlag(additionalInfo) ? additionalInfo.value : '',
      weight: this.getPropertyFlag(weight) ? weight.value : '',
      dimensions: this.getPropertyFlag(dimensions) ? dimensions.value : ''
    };
  };

  openTab = (tabName) => {
    const { pdpTabs } = this.state;
    Object.keys(pdpTabs).forEach((key) => {
      pdpTabs[key] = key === tabName;
    });
    this.setState({ pdpTabs });
  };

  render() {
    const {
      product,
      cartItems,
      messages
    } = this.props;
    if (this.props.isFetched) {
      document.title = `${product.product.name || 'Shop'} - krissorbie`;
      return (
        <Product
          cartItems={cartItems.cart.line_items}
          setMessage={this.props.setMessage}
          product={this.props.product}
          onAddToCart={this.props.addToCart}
          properties={this.getProperties()}
          addProductReview={this.props.addProductReview}
          messages={messages}
          isError={this.props.isError}
          resetMessages={this.props.resetMessages}
          toggleLoader={this.props.toggleLoader}
          getProduct={this.props.getProduct}
          tabs={this.state.pdpTabs}
          openTab={this.openTab}
        />
      );
    }
    return null;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductWrapper);

