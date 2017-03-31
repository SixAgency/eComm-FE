import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import Product from './Product';

// Actions
import { setHeaderProps, resetMessages, toggleLoader } from '../../actions/page';
import { addToCart } from '../../actions/order';
import { getProduct } from '../../actions/catalog';

const mapStateToProps = ((state) => (
  {
    product: state.catalog.product,
  }
));

const mapDispatchToProps = ((dispatch) => (
  {
    setHeaderProps: (props) => dispatch(setHeaderProps(props)),
    toggleLoader: (props) => dispatch(toggleLoader(props)),
    addToCart: (item) => dispatch(addToCart(item)),
    getProduct: (slug) => dispatch(getProduct(slug)),
    resetMessages: () => dispatch(resetMessages()),
  }
));

class ProductWrapper extends Component {

  static propTypes = {
    setHeaderProps: PropTypes.func.isRequired,
    toggleLoader: PropTypes.func.isRequired,
    addToCart: PropTypes.func.isRequired,
    getProduct: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      variant_id: null,
    };
  }

  componentWillMount = () => {
    const props = {
      headerClass: 'colored',
      activeSlug: this.props.params.slug.indexOf('mentoring') >= 0 ? '/product/mentoring-program-day' : '/',
    };
    this.props.setHeaderProps(props);
    if (!this.props.product.isLoaded) {
      this.props.getProduct(this.props.params.slug);
    } else if (this.props.product.product.slug !== this.props.params.slug) {
      this.props.getProduct(this.props.params.slug);
    }
  }

  componentDidMount = () => {
    console.log('did');
    const { isLoaded } = this.props.product;
    if (isLoaded && this.props.product.product.slug === this.props.params.slug) {
      setTimeout(() => {
        this.props.toggleLoader(false);
      }, 500);
    }
  }

  componentWillReceiveProps = (nextProps) => {
    console.log('next');
    console.log(nextProps);
    if (this.props.params.slug !== nextProps.params.slug) {
      this.props.toggleLoader(true);
      this.props.getProduct(nextProps.params.slug);
    } else {
      const { isLoaded } = nextProps.product;
      const currentId = this.props.product.product.id;
      const nextId = nextProps.product.product.id;
      if (isLoaded && currentId !== nextId) {
        const props = {
          headerClass: 'colored',
          activeSlug: nextProps.params.slug.indexOf('mentoring') >= 0 ? '/product/mentoring-program-day' : '/',
        };
        this.props.setHeaderProps(props);
        setTimeout(() => {
          this.props.toggleLoader(false);
        }, 250);
      }
    }
  }

  componentWillUnmount = () => {
    console.log('remove');
    this.props.toggleLoader(true);
  }

  getProperty = (properties, property) => properties.find((prop) => (prop.property_name === property));

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
        this.getPropertyFlag(bulkPrice1) ? bulkPrice1.value : '',,
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
  }

  render() {
    if (!this.props.product.isLoaded) {
      return null;
    }
    document.title = `${this.props.product.product.name || 'Shop'} - krissorbie`;
    return (
      <Product
        product={this.props.product}
        onAddToCart={this.props.addToCart}
        properties={this.getProperties()}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductWrapper);

