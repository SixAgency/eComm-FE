import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Minicart.css';
import imagePlaceholder from './image_placeholder_small.png';

class Minicart extends React.Component {
  static propTypes = {
    cartItems: PropTypes.object.isRequired,
    cartClass: PropTypes.string.isRequired,
  }

  render = () => {
    const { isLoaded, isEmpty, cart } = this.props.cartItems;
    if (!isLoaded) {
      return null;
    }
    if (isEmpty) {
      return (
        <div className={cx(s.minicart, s[this.props.cartClass])}>
          <div className={s.cartcontent}>
            <p className={s.carttitle}>
              <span className={s.count}>0</span> items in your cart
            </p>
          </div>
        </div>
      );
    }
    return (
      <div className={cx(s.minicart, s[this.props.cartClass])}>
        <div className={s.cartcontent}>
          <p className={s.carttitle}>
            <span className={s.count}>{cart.total_quantity}</span> items in your cart
          </p>
          <div>
            <ul className={s.cartlist}>
              { cart.line_items.map((item) => {
                const productImages = item.variant.images;
                let image = imagePlaceholder;
                if (productImages.length > 0 && productImages[0].small_url) {
                  image = productImages[0].small_url;
                }
                return (
                  <li className={s.cartitem} key={item.id}>
                    <Link className={s.plink} to={`product/${item.variant.slug}`}>
                      <img
                        className={s.pimage}
                        src={image}
                        alt={item.variant.name}
                      />
                      <span className={s.pname}>{item.variant.name}</span>
                      <span className={s.pprice}>
                        Price: <span>{item.display_amount}</span>
                      </span>
                      <span className={s.pquantity}>Quantity: {item.quantity}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <p className={s.total}>
              <strong>Subtotal:</strong>
              <span className={s.amount}>{cart.display_item_total}</span>
            </p>
            <p className={s.buttons}>
              <Link to="/cart" className={cx(s.button, s.view)}>View Cart</Link>
              <Link to="/checkout" className={cx(s.button, s.checkout)}>Checkout</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Minicart);
