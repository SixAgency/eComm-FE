import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './../Forms.css';

import { containsGiftCard } from '../../../utils/utils';

class PromoCode extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onProceed: PropTypes.func.isRequired,
    getCart: PropTypes.func.isRequired,
    cartItems: PropTypes.object.isRequired,
    setMessage: PropTypes.func.isRequired
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
      this.props.onSubmit(this.state.coupon_code, this.props.getCart);
    }
  };

  handlePromoCode = (event) => {
    this.setState({
      coupon_code: event.target.value
    });
  };

  render() {
    return (
      <div className={s.cformcontent}>
        <h1 className={cx(s.title, s.titlemobile)}>Promotional Code</h1>
        <h2 className={s.subtitle}>Forgot about your promotion?</h2>
        <form className={cx(s.form, s.form2)}>
          <div className={s.inputwrapper}>
            <input
              id="username"
              type="text"
              name="username"
              className={s.input}
              onChange={this.handlePromoCode}
              placeholder="Promotional Code"
            />
            {containsGiftCard(this.props.cartItems.cart) &&
              <span className={s.giftcardmsg}>
                If you have a promo code be sure to purchase your E-gift cards separately from other items
                as discounts will not apply when E-gift cards are in the cart.
              </span>
            }
          </div>
          <div className={s.buttonwrapper}>
            <input
              className={cx(s.submit, s.pcodebtnmobile)}
              type="submit"
              value="Apply promotional code"
              onClick={this.onSubmit}
            />
          </div>
          <div className={s.buttonwrapper}>
            <button className={cx(s.submit)} type="button" onClick={this.props.onProceed}>Proceed</button>
          </div>
        </form>
      </div>
    );
  }
}

export default withStyles(s)(PromoCode);
