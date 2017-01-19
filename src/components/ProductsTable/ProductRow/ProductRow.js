import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ProductRow.css';
import ProductQuantity from '../../../components/ProductQuantity';

class ProductRow extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    removeItem: PropTypes.func.isRequired,
    addQuantity: PropTypes.func.isRequired,
    subQuantity: PropTypes.func.isRequired,
  }

  removeItem = () => {
    this.props.removeItem({ id: this.props.item.id, name: this.props.item.variant.name });
  }

  addQuantity = () => {
    this.props.addQuantity(this.props.item.quantity);
  }

  subQuantity = () => {
    this.props.subQuantity(this.props.item.quantity);
  }

  render() {
    const item = this.props.item;
    let image = '';
    if (item.variant.images.length > 0) {
      image = item.variant.images[0].small_url;
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
