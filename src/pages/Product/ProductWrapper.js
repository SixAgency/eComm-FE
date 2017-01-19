import React, { PropTypes } from 'react';
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
class ProductWrapper extends React.Component {

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
      activeSlug: '/',
    };
    this.props.setHeaderProps(props);
    if (!this.props.product.isLoaded) {
      this.props.getProduct(this.props.params.slug);
    }
  }

  componentDidMount = () => {
    console.log('did');
    const { isLoaded } = this.props.product;
    if (isLoaded) {
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

  render() {
    if (!this.props.product.isLoaded) {
      return null;
    }
    return (
      <Product
        product={this.props.product}
        addToCart={this.props.addToCart}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductWrapper);

