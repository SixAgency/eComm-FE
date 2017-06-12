import React, { PropTypes, PureComponent } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Link } from 'react-router';
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
    checkoutSquare: PropTypes.func.isRequired,
    confirmOrder: PropTypes.func.isRequired,
    isPayPal: PropTypes.bool.isRequired,
    isStoreCredit: PropTypes.bool.isRequired,
    canUseStoreCredit: PropTypes.bool.isRequired,
    toggleUseCredits: PropTypes.func.isRequired,
    checkoutReset: PropTypes.func.isRequired
  };

  listPayment = () => {
    const {
      cartItems: {
        cart
      },
      isStoreCredit
    } = this.props;
    const coveredByStoreCredit = (isStoreCredit && cart.covered_by_store_credit);
    if (this.props.isPayPal) {
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
            <input className={s.submit} type="button" value="Place Order" onClick={this.props.confirmOrder} />
            <input className={s.cancelorder} onClick={this.props.checkoutReset} type="button" value="Cancel" />
          </div>
        </div>
      );
    }
    if ((cart.state === 'confirm') || coveredByStoreCredit) {
      return this.renderSubmitButton(coveredByStoreCredit);
    }
    return (
      <div className={s.paymentcontainer}>
        {isStoreCredit && calculateBalance(this.props.cartItems) > 0 &&
          <p className={s.paymessage}>
            The remaining balance of&nbsp;
            <strong>{accounting.formatMoney(calculateBalance(this.props.cartItems))}</strong>
            &nbsp;will be charged to your selected payment method.
          </p>
        }
        <ul>
          <li className={s.paymentmethod}>
            <span className={s.active}>
              <fieldset className={s.paymentfields}>
                <Link
                  className={s.paymentLink}
                  onClick={this.props.checkoutSquare}
                >
                  Pay with your credit card via Square.
                </Link>
              </fieldset>
            </span>
          </li>
        </ul>
        <div className={cx(s.buttonwrapper, s.buttonwrapper3)}>
          <input
            className={cx(s.cancelorder, s.cancelnewline, s.paymentLink)}
            onClick={this.props.checkoutReset}
            type="button"
            value="Use PayPal Account"
          />
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
                Credit Card via Square
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
          <input className={s.cancelorder} onClick={this.props.checkoutReset} type="button" value="Cancel" />
        </div>
      </div>
    )
  );

  render() {
    const {
      cartItems: {
        cart,
        isLoaded,
        isEmpty
      },
      isStoreCredit
    } = this.props;
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
          isStoreCredit={isStoreCredit}
          canUseStoreCredit={this.props.canUseStoreCredit}
          toggleUseCredits={this.props.toggleUseCredits}
        />
        { this.listPayment() }
      </div>
    );
  }
}

export default withStyles(s)(ReviewOrder);
