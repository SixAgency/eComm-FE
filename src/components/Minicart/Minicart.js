import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import accounting from 'accounting';

import s from './Minicart.css';
import imagePlaceholder from './image_placeholder_small.png';

class Minicart extends React.Component {
  static propTypes = {
    cartItems: PropTypes.object.isRequired,
    cartClass: PropTypes.string.isRequired
  }

  getPrice = (item) => {
    const { variant } = item;
    // sale information is on the variant
    if (variant.is_sale) {
      const { sale, price } = variant;
      return parseFloat(price) - (parseFloat(price) * (sale / 100));
    }
    return variant.price;
  }

  brokenImage = (event) => {
    const img = event.target;
    img.src = imagePlaceholder;
  }

  render = () => {
    const { isLoaded, isEmpty, cart } = this.props.cartItems;
    const cartText = `item${cart.line_items && cart.line_items.length !== 1 ? 's' : ''}`;
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
            <span className={s.count}>{cart.line_items.length}</span> {cartText} in your cart
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
                        onError={this.brokenImage}
                      />
                      <span className={s.pname}>{item.variant.name}</span>
                      <span className={s.pprice}>
                        Price: <span>{accounting.formatMoney(this.getPrice(item))}</span>
                      </span>
                      <span className={s.pquantity}>Quantity: {item.quantity}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <p className={s.total}>
              <strong>Subtotal:</strong>
              <span className={s.amount}>{accounting.formatMoney(cart.total)}</span>
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
