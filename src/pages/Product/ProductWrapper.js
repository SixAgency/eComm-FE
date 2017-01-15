import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Product from './Product';
// Actions
import setHeaderProps from '../../actions/page';
import { addToCart } from '../../actions/order';
import { getProduct, getProductRecs } from '../../actions/catalog';

const mapStateToProps = ((state) => (
  {
    gridRecs: state.catalog.gridRecs,
    product: state.catalog.product,
  }
));
const mapDispatchToProps = ((dispatch) => (
  {
    setHeaderProps: (props) => dispatch(setHeaderProps(props)),
    addToCart: (item) => dispatch(addToCart(item)),
    getProductRecs: () => dispatch(getProductRecs()),
    getProduct: (slug) => dispatch(getProduct(slug)),
  }
));
class ProductWrapper extends React.Component {

  static propTypes = {
    setHeaderProps: PropTypes.func.isRequired,
    addToCart: PropTypes.func.isRequired,
    getProductRecs: PropTypes.func.isRequired,
    getProduct: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    gridRecs: PropTypes.object.isRequired,
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
      activeSlug: '/',
    };
    this.props.setHeaderProps(props);
    if (!this.props.gridRecs.isLoaded) {
      this.props.getProductRecs();
    }
  }

  render() {
    const slug = this.props.params.slug;
    console.log(this.props.product.product);
    if (slug) {
      if (!this.props.product.isLoaded || this.props.product.product.slug !== slug) {
        this.props.getProduct(slug);
      }
    }
    return (
      <Product
        product={this.props.product}
        gridRecs={this.props.gridRecs}
        addToCart={this.props.addToCart}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductWrapper);

