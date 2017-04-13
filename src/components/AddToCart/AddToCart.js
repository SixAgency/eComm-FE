import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AddToCart.css';
// Components
import ProductQuantity from '../ProductQuantity';
import SingleVariant from '../SingleVariant';
import MultiVariant from '../MultiVariant';
import GiftCardSelector from '../SingleVariant/GiftCardSelector';
// Helpers
import checkQuantities from '../../helpers/quantity';

class CartCta extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    cartItems: PropTypes.array.isRequired,
    setMessage: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      variant_id: null
    };
  }

  componentWillMount = () => {
    const { product, isLoaded } = this.props.product;
    if (isLoaded) {
      if (!product.has_variants) {
        this.setState({
          variant_id: product.master.id
        });
      }
    }
  };

  setVariant = (variant) => {
    this.setState({
      variant_id: variant
    });
  };

  getVariant = () => {
    const { product } = this.props.product;
    if (product.has_variants) {
      if (product.option_types.length > 1) {
        return (
          <MultiVariant
            variants={product.variants}
            action={this.setVariant}
          />
        );
      }
      if (product.option_types.length > 0) {
        if (product.classifications[0].taxon.name === 'Gifts') {
          return (
            <GiftCardSelector
              variants={product.variants}
              onAddToCart={this.props.onSubmit}
            />
          );
        }
        return (
          <SingleVariant
            variants={product.variants}
            action={this.setVariant}
            price={product.price}
          />
        );
      }
    }
    return null;
  };

  subQuantity = () => {
    let value = this.state.quantity;
    if (value >= 2) {
      value -= 1;
      this.setState({
        quantity: value
      });
    }
  };

  addQuantity = () => {
    let value = this.state.quantity;
    const maxValue = this.props.product.product.max_quantity_allowed_in_cart;
    if (value < maxValue) {
      value += 1;
    }
    this.setState({
      quantity: value
    });
  };

  addToCart = (e) => {
    e.preventDefault();
    const variantId = this.state.variant_id;
    const quantity = this.state.quantity;
    const { cartItems } = this.props;
    if (variantId === null) {
      return;
    }
    const data = {
      id: variantId,
      quantity
    };
    const flag = checkQuantities({
      ...data,
      items: cartItems
    });
    if (!flag) {
      this.props.setMessage({
        isError: true,
        messages: [
          `You may only purchase a maximum
           ${this.props.product.product.max_quantity_allowed_in_cart}
           ${this.props.product.product.name} at one time`
        ]
      });
    } else {
      this.props.onSubmit(data);
    }
  };

  render() {
    const { product } = this.props.product;
    return (
      <form
        className={s.cartform}
        onSubmit={this.addToCart}
      >
        { this.getVariant() }
        {
          product.classifications[0].taxon.name !== 'Gifts' &&
            [
              <ProductQuantity
                sizingClass="quantitybig"
                quantity={this.state.quantity}
                addQuantity={this.addQuantity}
                subQuantity={this.subQuantity}
              />,
              <button type="submit" className={s.addtocart}>Add to cart</button>
            ]
        }
      </form>
    );
  }
}

export default withStyles(s)(CartCta);
