import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ProductRow.css';

class ProductRow extends React.Component {
  static propTypes = {
    cart: React.PropTypes.object.isRequired,
  }

  render() {
    const cart = this.props.cart;
    return (
      <tr className={s.cartitem}>
        <td className={s.productname}>
          <img
            src={cart.variant.images[0].large_url}
            width="200"
            height="200"
            alt="product"
          />
          <a href="">
            {cart.variant.name}
          </a>
        </td>
        <td className={s.productprice}>
          <span className={s.priceamount}>
            {cart.variant.price} $
          </span>
        </td>
        <td className={s.productquantity}>
          <div className={s.quantity}>
            <input
              type="button"
              value="-"
              className={s.minus}
            />
            <input
              type="number"
              step="1"
              min="1"
              max="9"
              value="1"
              title="Qty"
              className={s.qtytext} size="4"
            />
            <input
              type="button"
              value="+"
              className={s.plus}
            />
          </div>
        </td>
        <td className={s.prodsubtotal}>
          <span className={s.samount}>
              ${cart.total}
          </span>
        </td>
        <td className={s.prodremove}>
          <a
            href=""
            className={s.remove}
            title="Remove this item"
          >
            ×
          </a>
        </td>
      </tr>
    );
  }
}

export default withStyles(s)(ProductRow);
