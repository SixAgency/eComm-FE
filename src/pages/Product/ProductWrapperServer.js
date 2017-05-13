import React, { PropTypes, Component } from 'react';
import Product from './Product';

class ProductWrapper extends Component {

  static propTypes = {
    product: PropTypes.object.isRequired,
    cartItems: PropTypes.object.isRequired
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

  render() {
    const { isLoaded } = this.props.product;
    const pdpTabs = {
      description: true,
      details: false,
      info: false
    };
    if (!isLoaded) {
      return null;
    }
    return (
      <Product
        cartItems={this.props.cartItems.cart.line_items}
        setMessage={() => (true)}
        product={this.props.product}
        onAddToCart={() => (true)}
        properties={this.getProperties()}
        addProductReview={() => (true)}
        messages={[]}
        isError={this.props.product.isError}
        resetMessages={() => (true)}
        toggleLoader={() => (true)}
        getProduct={() => (true)}
        tabs={pdpTabs}
        openTab={() => (true)}
      />
    );
  }
}

export default ProductWrapper;
