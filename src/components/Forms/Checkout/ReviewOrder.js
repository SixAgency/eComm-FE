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
    checkoutSquare: PropTypes.func.isRequired,
    confirmOrder: PropTypes.func.isRequired,
    isStoreCredit: PropTypes.bool.isRequired,
    canUseStoreCredit: PropTypes.bool.isRequired,
    toggleUseCredits: PropTypes.func.isRequired
  };

  listPayment = () => {
    const {
      cartItems: {
        cart
      },
      isStoreCredit
    } = this.props;
    const coveredByStoreCredit = (isStoreCredit && cart.covered_by_store_credit);
    if ((cart.state === 'confirm') || coveredByStoreCredit) {
      return this.renderSubmitButton();
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
        <div className={s.paymentbuttons}>
          <input
            className={s.submit}
            type="button" value="Credit Card"
            onClick={this.props.checkoutSquare}
          />
        </div>
      </div>
    );
  };

  listPaymentTop = () => {
    const {
      cartItems: {
        cart
      },
      isStoreCredit
    } = this.props;
    const coveredByStoreCredit = (isStoreCredit && cart.covered_by_store_credit);
    if (cart.state === 'confirm' || coveredByStoreCredit) {
      return this.renderSubmitButton();
    }
    return (
      <div className={s.paymentbuttons}>
        <input
          className={s.submit}
          type="button" value="Credit Card"
          onClick={this.props.checkoutSquare}
        />
      </div>
    );
  }

  renderSubmitButton = () => (
    (
      <div className={s.paymentcontainer}>
        <div className={cx(s.buttonwrapper, s.buttonwrapper3)}>
          <p className={s.paymessage}>
            After clicking on Place Order wait for the confirmation
            screen to appear. Do not click on back or any other buttons during this process.
          </p>
          <input className={s.submit} type="button" value="Place Order" onClick={this.props.confirmOrder} />
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
    const title = cart.state === 'payment' ? 'Select payment' : 'Place your order';
    return (
      <div className={s.cformcontent}>
        <h1 className={s.title}>{title}</h1>
        <h2 className={s.subtitle}>{cart.line_items.length} items in your cart</h2>
        <div className={s.paymenttop}>
          {this.listPaymentTop()}
        </div>
        <ReviewOrderTbl
          cart={cart}
          cartItems={this.props.cartItems}
          isStoreCredit={isStoreCredit}
          canUseStoreCredit={this.props.canUseStoreCredit}
          toggleUseCredits={this.props.toggleUseCredits}
        />
        {this.listPayment()}
      </div>
    );
  }
}

export default withStyles(s)(ReviewOrder);
