import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './PromoCodeInput.css';

import { containsGiftCard } from '../../utils/utils';

class PromoCodeInput extends Component {
  static propTypes = {
    updateCart: PropTypes.func.isRequired,
    applyPromoCode: PropTypes.func.isRequired,
    getCart: PropTypes.func.isRequired,
    cartItems: PropTypes.object.isRequired,
    setMessage: PropTypes.func.isRequired,
    isError: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {
      coupon_code: ''
    };
  }

  onSubmit = (event) => {
    event.preventDefault();
    if (this.props.cartItems.cart.adjustments.length !== 0) {
      const messages = ['Only one promotional code can be used on this order.'];
      this.props.setMessage({
        isError: true,
        messages
      });
      window.scrollTo(0, 0);
    } else {
      this.props.applyPromoCode(this.state.coupon_code, () => {
        this.props.getCart(false, () => {
          if (!this.props.isError) {
            this.props.updateCart();
          }
        });
      });
    }
  };

  handlePromoCode = (event) => {
    event.preventDefault();
    /* TODO: add validation */
    this.setState({
      coupon_code: event.target.value
    });
  };

  render() {
    return (
      <div className={s.pcodecontainer}>
        <div className={cx(s.pcodebody, s.clearfix)}>
          <input
            name="coupon-code"
            className={s.inputtext}
            id="coupon-code"
            placeholder="Promotional Code"
            onChange={this.handlePromoCode}
          />
          <input
            type="submit"
            className={s.couponbtn}
            name="apply-coupon"
            value="Promotional Code"
            onClick={this.onSubmit}
          />
          <input
            type="button"
            className={cx(s.couponbtn, s.updatebtn)}
            id="update-button"
            name="update-cart"
            value="Update Cart"
            onClick={this.props.updateCart}
          />
        </div>
        {containsGiftCard(this.props.cartItems.cart) &&
          <span className={s.giftcardmsg}>
            If you have a promo code be sure to purchase your E-gift cards separately from other items as discounts
            will not apply when E-gift cards are in the cart.
          </span>
        }
      </div>
    );
  }
}

export default withStyles(s)(PromoCodeInput);
