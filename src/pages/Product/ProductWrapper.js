import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Product from './Product';
// Actions
import setHeaderProps from '../../actions/page';
import { addToCart } from '../../actions/order';
import { getProduct, getRecs } from '../../actions/catalog';

const mapStateToProps = ((state) => (
  {
    recsGrid: state.catalog.recsGrid,
    product: state.catalog.product,
  }
));
const mapDispatchToProps = ((dispatch) => (
  {
    setHeaderProps: (props) => dispatch(setHeaderProps(props)),
    addToCart: (item) => dispatch(addToCart(item)),
    getRecs: () => dispatch(getRecs()),
    getProduct: (slug) => dispatch(getProduct(slug)),
  }
));
class ProductWrapper extends React.Component {

  static propTypes = {
    setHeaderProps: PropTypes.func.isRequired,
    addToCart: PropTypes.func.isRequired,
    getRecs: PropTypes.func.isRequired,
    getProduct: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    recsGrid: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
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
      this.props.getProduct();
    }
    if (!this.props.recsGrid.isLoaded) {
      this.props.getRecs();
    }
    this.setVariantId();
  }

  setVariantId = () => {
    let variantid = null;
    if (this.props.product.isLoaded) {
      if (this.props.product.has_variants) {
        if (this.props.product.option_types.length > 1) {
          const optionOne = this.props.product.variants[0].option_values[0].id;
          const optionTwo = this.props.product.variants[0].option_values[1].id;
          variantid = this.getVariant(optionOne, optionTwo);
        } else {
          variantid = this.props.product.variants[0].id;
        }
      } else {
        variantid = this.props.product.master.id;
      }
    }
    this.setState({
      variant_id: variantid,
    });
  }

  getVariant = () => {
    let id = null;
    this.props.product.variants.map((item) => {
      if ((item.option_values[0].id === one) &&
        (item.option_values[1].id === two)) {
        id = item.id;
      }
      return id;
    });
    return id;
  }

  selectVariant = (event) => {
    this.setState({
      variant_id: parseInt(event.target.value, 10),
    });
  }

  selectVariants = (one, two) => {
    const variantid = this.getVariant(one, two);
    this.setState({
      variant_id: variantid,
    });
  }

  subQuantity = () => {
    let value = this.state.quantity;
    if (value >= 2) {
      value -= 1;
      this.setState({
        quantity: value,
      });
    }
  }

  addQuantity = () => {
    let value = this.state.quantity;
    value += 1;
    this.setState({
      quantity: value,
    });
  }

  addToCart = (event) => {
    event.preventDefault();
    if (this.state.variant_id === null) {
      console.log('ERRORR - PLEASE SELECT A VARIANT');
      return;
    }
    const data = {
      id: this.state.variant_id,
      quantity: this.state.quantity,
    };
    this.props.addToCart(data);
  }

  render() {
    console.log('client');
    return (
      <Product
        product={this.props.product}
        gridRecs={this.porps.gridRecs}
        addToCart={this.addToCart}
        addQuantity={this.addQuantity}
        subQuantity={this.subQuantity}
        selectVariant={this.selectVariant}
        selectVariants={this.selectVariants}
        quantity={this.state.quantity}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductWrapper);

