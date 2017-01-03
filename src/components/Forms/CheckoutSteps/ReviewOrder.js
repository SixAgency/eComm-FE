import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './../Forms.css';
import ReviewOrderTbl from '../../Tables/ReviewOrderTbl';

class ReviewOrder extends React.Component {
  static propTypes = {
    cartItems: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      showCardClass: 'show',
      showPPClass: 'hide',
      cardTitleClass: 'active',
      ppTitleClass: '',
    };
  }

  clickCard = (e) => {
    e.preventDefault();
    this.setState({
      showCardClass: 'show',
      showPPClass: 'hide',
      cardTitleClass: 'active',
      ppTitleClass: '',
    });
  }

  clickPaypal = (e) => {
    e.preventDefault(e);
    this.setState({
      showPPClass: 'show',
      showCardClass: 'hide',
      ppTitleClass: 'active',
      cardTitleClass: '',
    });
  }

  render() {
    const cart = this.props.cartItems;
    return (
      <div className={s.cformcontent}>
        <h1 className={s.title}>Review your order</h1>
        <h2 className={s.subtitle}>{cart.total_quantity} items in your cart</h2>
        <ReviewOrderTbl cart={cart} />
        <div className={s.paymentcontainer}>
          <ul>
            <li className={s.paymentmethod}>
              <button
                className={cx(s.paytitle, s[this.state.cardTitleClass])}
                onClick={this.clickCard}
              >
                Credit Card (Stripe)
              </button>
              <div className={s[this.state.showCardClass]}>
                <fieldset className={s.paymentfields}>
                  <p>Pay with your credit card via Stripe.</p>
                </fieldset>
              </div>
            </li>
            <li className={s.paymentmethod}>
              <button
                className={cx(s.paytitle, s[this.state.ppTitleClass])}
                onClick={this.clickPaypal}
              >
                PayPal Express Checkout
              </button>
              <div className={s[this.state.showPPClass]}>
                <fieldset className={s.paymentfields}>
                  <p>
                    Pay using either your PayPal account or credit card.
                    All credit card payments will be processed by PayPal.
                  </p>
                </fieldset>
              </div>
            </li>
          </ul>
          <div className={s.buttonwrapper}>
            <input className={s.submit} type="submit" value="Continue to Payment" />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(ReviewOrder);
