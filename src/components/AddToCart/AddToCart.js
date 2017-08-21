import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AddToCart.css';
// Components
import ProductQuantity from '../ProductQuantity';
import SingleVariant from '../SingleVariant';
import MultiVariant from '../MultiVariant';
import GiftCardSelector from '../SingleVariant/GiftCardSelector';
// Helpers
import { checkQuantities } from '../../helpers/quantity';

class CartCta extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    cartItems: PropTypes.array.isRequired,
    setMessage: PropTypes.func.isRequired,
    quantity: PropTypes.number.isRequired,
    updateQuantity: PropTypes.func.isRequired,
    addQuantity: PropTypes.func.isRequired,
    subQuantity: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      variant_id: null
    };
  }

  componentDidMount = () => {
    const { product } = this.props.product;
    this.setState({
      variant_id: product.has_variants ? product.variants[0].id : product.master.id
    });
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
            selected={this.state.variant_id}
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
            price={Number(product.price)}
            selected={this.state.variant_id}
            quantity={this.props.quantity}
          />
        );
      }
    }
    return null;
  };

  updateQuantity = (value) => {
    this.props.updateQuantity(value);
  }

  addToCart = (e) => {
    e.preventDefault();
    const { product } = this.props.product;
    const variantId = product.has_variants ? this.state.variant_id : product.master.id;
    const quantity = this.props.quantity;
    const { cartItems } = this.props;
    const productImages = product.master.images;
    const data = {
      id: variantId,
      quantity,
      image: productImages.length ? productImages[0].large_url : null
    };
    const flag = checkQuantities({
      id: product.id,
      quantity,
      items: cartItems
    });
    if (!flag) {
      const messages = this.props.product.product.max_quantity_allowed_in_cart === 0 ?
      [
        "We're sorry but the product is not available at the moment."
      ]
      :
      [
        `You may only purchase a maximum of
         ${product.max_quantity_allowed_in_cart}
         ${product.name}s at one time.`
      ];
      this.props.setMessage({
        isError: true,
        messages
      });
    } else {
      this.props.onSubmit(data);
    }
  };

  render() {
    const { product } = this.props.product;
    const category = product.classifications.length > 0 ? product.classifications[0].taxon.name : '';
    return (
      <form
        className={s.cartform}
        onSubmit={this.addToCart}
      >
        { this.getVariant() }
        {
          category !== 'Gifts' &&
            [
              <ProductQuantity
                key="quantity1"
                sizingClass="quantitybig"
                quantity={this.props.quantity}
                addQuantity={this.props.addQuantity}
                subQuantity={this.props.subQuantity}
                maxQuantity={product.max_quantity_allowed_in_cart}
                updateQuantity={this.updateQuantity}
              />,
              <button type="submit" className={s.addtocart} key="button1">Add to cart</button>
            ]
        }
      </form>
    );
  }
}

export default withStyles(s)(CartCta);
