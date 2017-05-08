import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './PromoCodeInput.css';

class PromoCodeInput extends Component {
  static propTypes = {
    updateCart: PropTypes.func.isRequired,
    applyPromoCode: PropTypes.func.isRequired,
    getCart: PropTypes.func.isRequired,
    cartItems: PropTypes.object.isRequired,
    setMessage: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      coupon_code: ''
    };
  }

  onSubmit = (event) => {
    const paranthesesReg = /\((.*)\)/;
    event.preventDefault();
    if (this.props.cartItems.cart.adjustments.length !== 0) {
      const messages = [`Sorry, promotional code "${this.props.cartItems.cart.adjustments[0].label.match(paranthesesReg)[1]}" has
        already been applied and cannot be used in conjunction with other promotional codes`];
      this.props.setMessage({
        isError: true,
        messages
      });
      window.scrollTo(0, 0);
    } else {
      this.props.applyPromoCode(this.state.coupon_code, this.props.getCart);
    }
  }

  handlePromoCode = (event) => {
    event.preventDefault();
    /* TODO: add validation */
    this.setState({
      coupon_code: event.target.value
    });
  }

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
      </div>
    );
  }
}

export default withStyles(s)(PromoCodeInput);
