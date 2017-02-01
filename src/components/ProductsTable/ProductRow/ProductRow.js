import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ProductRow.css';
import ProductQuantity from '../../../components/ProductQuantity';
import imagePlaceholder from './image_placeholder_small.png';

class ProductRow extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    removeItem: PropTypes.func.isRequired,
    updateQuantity: PropTypes.func.isRequired,
    cartItems: PropTypes.object.isRequired,
  }

  removeItem = () => {
    this.props.removeItem({ id: this.props.item.id, name: this.props.item.variant.name });
  }

  addQuantity = () => {
    const updatedCartItems = this.props.cartItems.cart.line_items.map((item) => (
      item.id === this.props.item.id ? { ...item, quantity: this.props.item.quantity + 1 } : item
    ));
    this.props.updateQuantity(updatedCartItems);
  }

  subQuantity = () => {
    const updatedCartItems = this.props.cartItems.cart.line_items.map((item) => (
      item.id === this.props.item.id ? { ...item, quantity: this.props.item.quantity - 1 } : item
    ));
    this.props.updateQuantity(updatedCartItems);
  }

  render() {
    const item = this.props.item;
    let image = imagePlaceholder;
    const productImages = item.variant.images;
    if (productImages.length > 0 && productImages[0].small_url) {
      image = productImages[0].small_url;
    }
    const slug = `/product/${item.variant.slug}`;
    return (
      <tr className={s.cartitem}>
        <td className={s.productname}>
          <img
            src={image}
            width="200"
            height="200"
            alt="product"
          />
          <Link to={slug}>
            {item.variant.name}
          </Link>
          {item.variant.option_values &&
            <p className={s.productvariant}>
              {item.variant.option_values.map((opt, index) => (
                <span key={`variant-${index}`}>{opt.option_type_presentation}: <strong>{opt.presentation}</strong> </span>
              ))}
            </p>
          }
        </td>
        <td className={s.productprice}>
          <span className={s.priceamount}>
            {item.single_display_amount}
          </span>
        </td>
        <td className={s.productquantity}>
          <ProductQuantity
            sizingClass={'quantitysmall'}
            addQuantity={this.addQuantity}
            subQuantity={this.subQuantity}
            quantity={item.quantity}
          />
        </td>
        <td className={s.prodsubtotal}>
          <span className={s.samount}>
            {item.display_amount}
          </span>
        </td>
        <td className={s.prodremove}>
          <Link
            to="/cart"
            className={s.remove}
            title="Remove this item"
            onClick={this.removeItem}
          >
            ×
          </Link>
        </td>
      </tr>
    );
  }
}

export default withStyles(s)(ProductRow);
