import React, { PropTypes, PureComponent } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import accounting from 'accounting';

import s from '../Forms.css';
import ReviewOrderTbl from '../../Tables/ReviewOrderTbl';
import {
  calculateBalance
} from '../../../utils/utils';

class ReviewOrder extends PureComponent {
  static propTypes = {
    cartItems: PropTypes.object.isRequired,
    checkoutPayPal: PropTypes.func.isRequired,
    checkoutSquare: PropTypes.func.isRequired,
    confirmOrder: PropTypes.func.isRequired,
    isPayPal: PropTypes.bool.isRequired,
    toggleUseCredits: PropTypes.func.isRequired,
    useCredits: PropTypes.bool.isRequired,
    checkoutReset: PropTypes.func.isRequired
  };

  listPayment = () => {
    const {
      cartItems: {
        cart
      },
      useCredits
    } = this.props;
    console.log('STATE', cart.state);
    if (cart.state === 'confirm') {
      return this.renderSubmitButton();
    } else if (this.props.isPayPal) {
      return (
        <div className={s.paymentcontainer}>
          {useCredits && calculateBalance(this.props.cartItems) > 0 &&
            <p className={s.paymessage}>
              The remaining balance of
              <strong>accounting.formatMoney(calculateBalance(this.props.cartItems))</strong>
              will be charged to your selected payment method.
            </p>
          }
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
            <input className={s.cancelorder} onClick={this.props.checkoutReset} type="button" value="Cancel" />
          </div>
        </div>
      );
    }
    return (
      <div className={s.paymentcontainer}>
        {useCredits && calculateBalance(this.props.cartItems) > 0 &&
          <p className={s.paymessage}>
            The remaining balance of&nbsp;
            <strong>{accounting.formatMoney(calculateBalance(this.props.cartItems))}</strong>
            &nbsp;will be charged to your selected payment method.
          </p>
        }
        <ul>
          <li className={s.paymentmethod}>
            <span
              className={cx(s.paytitle, s.active)}
            >
              Credit Card
            </span>
            <span className={s.active}>
              <fieldset className={s.paymentfields}>
                <p>Pay with your credit card via Square.</p>
              </fieldset>
            </span>
          </li>
        </ul>
        <div className={cx(s.buttonwrapper, s.buttonwrapper3)}>
          <p className={s.paymessage}>
            After clicking on Continue to Payment
            you will see a pop up from our payment
            processor. Enter your credit card here
            and click on the green button.
          </p>
          <input className={s.submit} type="button" value="Continue to Payment" onClick={this.props.checkoutSquare} />
          <input className={cx(s.cancelorder, s.cancelnewline)} onClick={this.props.checkoutReset} type="button" value="Use a different payment method" />
        </div>
      </div>
    );
  };

  renderSubmitButton = (hidePaymentMethod = false) => (
    (
      <div className={s.paymentcontainer}>
        {!hidePaymentMethod &&
          <ul>
            <li className={s.paymentmethod}>
              <span
                className={cx(s.paytitle, s.active)}
              >
                Credit Cart via Square
              </span>
            </li>
          </ul>
        }
        <div className={cx(s.buttonwrapper, s.buttonwrapper3)}>
          <p className={s.paymessage}>
            After clicking on Place Order wait for the confirmation
            screen to appear. Do not click on back or any other buttons during this process.
          </p>
          <input className={s.submit} type="button" value="Place Order" onClick={this.props.confirmOrder} />
          <input className={s.cancelorder} type="button" value="Cancel" />
        </div>
      </div>
    )
  )

  render() {
    const {
      cartItems: {
        cart,
        isLoaded,
        isEmpty
      },
      useCredits
    } = this.props;
    const { covered_by_store_credit } = cart;
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
          isPayPal={this.props.isPayPal}
          toggleUseCredits={this.props.toggleUseCredits}
          useCredits={useCredits}
        />
        {(useCredits && covered_by_store_credit) ? this.renderSubmitButton(true) : this.listPayment()}
      </div>
    );
  }
}

export default withStyles(s)(ReviewOrder);
