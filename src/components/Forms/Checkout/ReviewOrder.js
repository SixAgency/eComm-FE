import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './../Forms.css';
import ReviewOrderTbl from '../../Tables/ReviewOrderTbl';

class ReviewOrder extends React.Component {
  static propTypes = {
    cartItems: PropTypes.object.isRequired,
    checkoutPayPal: PropTypes.func.isRequired,
    checkoutSquare: PropTypes.func.isRequired,
    isPaypal: PropTypes.bool.isRequired
  };

  listPayment = () => {
    if (this.props.isPaypal) {
      return (
        <div className={s.paymentcontainer}>
          <ul>
            <li className={s.paymentmethod}>
              <span
                className={cx(s.paytitle, s.active)}
              >
                PayPal Express Checkout
              </span>
            </li>
          </ul>
          <div className={cx(s.buttonwrapper, s.buttonwrapper3)}>
            <p className={s.paymessage}>
              After clicking on Place Order wait for the confirmation
              screen to appear. Do not click on back or any other buttons during this process.
            </p>
            <input className={s.submit} type="button" value="Place Order" onClick={this.props.checkoutPayPal} />
            <input className={s.cancelorder} type="button" value="Cancel" />
          </div>
        </div>
      );
    }
    return (
      <div className={s.paymentcontainer}>
        <ul>
          <li className={s.paymentmethod}>
            <span
              className={cx(s.paytitle, s.active)}
            >
              Credit Cart
            </span>
            <span className={s.active}>
              <fieldset className={s.paymentfields}>
                <p>Pay with your credit card via Stripe.</p>
              </fieldset>
            </span>
          </li>
        </ul>
        <div className={cx(s.buttonwrapper, s.buttonwrapper3)}>
          <p className={s.paymessage}>
            After clicking on Continue to Payment
            you will see a pop up from our payment
            processor. Enter your credit card here
            and click on the blue bar containing
            the amount of your purchase.
            After you see the green checkmark,
            wait for the confirmation screen to appear.
            Do not click on back or any other buttons
            during this process.
          </p>
          <input className={s.submit} type="button" value="Continue to Payment" onClick={this.props.checkoutSquare} />
        </div>
      </div>
    );
  };

  render() {
    const { cart, isLoaded, isEmpty } = this.props.cartItems;
    if (!isLoaded && isEmpty) {
      return null;
    }
    return (
      <div className={s.cformcontent}>
        <h1 className={s.title}>Review your order</h1>
        <h2 className={s.subtitle}>{cart.line_items.length} items in your cart</h2>
        <ReviewOrderTbl
          cart={cart}
          cartItems={this.props.cartItems}
        />
        {this.listPayment()}
      </div>
    );
  }
}

export default withStyles(s)(ReviewOrder);
