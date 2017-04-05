import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import accounting from 'accounting';

import s from './CartForm.css';
import ShippingCalculator from './ShippingCalculator';
import PayPalButton from '../PayPalButton';

let shippingMethod = '';

class CartForm extends Component {
  static propTypes = {
    cart: PropTypes.object.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    paypalObj: PropTypes.object.isRequired,
    checkoutPayPal: PropTypes.func.isRequired,
    proceedToCheckout: PropTypes.func.isRequired,
    toggleLoader: PropTypes.func.isRequired,
    calculateShipping: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      showCalculator: false,
      className: 'hide'
    };
  }

  componentWillUpdate(nextProps) {
    const updatedCart = nextProps.cart;
    if (updatedCart.shipments.length > 0) {
      console.log('all good', updatedCart.shipments[0].selected_shipping_rate.name);
      shippingMethod = `Ground (${updatedCart.shipments[0].selected_shipping_rate.name}): 
        ${accounting.formatMoney(updatedCart.shipments[0].selected_shipping_rate.cost)}`;
    } else {
      console.log('CART', this.props.cart);
      shippingMethod = 'Shipping costs will be calculate once you have provided your address.';
    }
  }

  render() {
    if (!this.props.paypalObj.isLoaded) {
      return null;
    }
    const { cart } = this.props;
    return (
      <div className={s.cformwrpr}>
        <div className={s.cformcontents}>
          <div className={s.ctotals}>
            <h2 className={s.ctitle}>
              Cart Totals
            </h2>
            <h3 className={s.csubtitles}>
              You are ordering {cart.total_quantity} items
            </h3>
            <table className={s.ctotalscontents}>
              <tbody>
                <tr className={s.csubtotals}>
                  <th className="table-heads">Subtotal</th>
                  <td className={cx(s.ammout, s.data)}>
                    {accounting.formatMoney(
                      parseFloat(cart.item_total) + parseFloat(cart.adjustment_total)
                    )}
                  </td>
                </tr>
                <tr className={s.csubtotals}>
                  <th className="table-heads" />
                  <td className={cx(s.ammout, s.data)}>
                    <small>
                      Note: Products may ship from various
                      locations
                    </small>
                  </td>
                </tr>
                <tr className={s.shipping}>
                  <th className="table-heads">Shipping</th>
                  <td className="data">
                    <p>
                      {shippingMethod}
                    </p>
                    <h2 className={s.calctitle}>Calculate Shipping</h2>
                    <ShippingCalculator
                      calculateShipping={this.props.calculateShipping}
                    />
                  </td>
                </tr>
                <tr className={s.csubtotals}>
                  <th className="table-heads">New York State Tax</th>
                  <td className={cx(s.totalprice, s.data)}>
                    <strong>
                      <span className="amount">
                        TBA {/* TODO: add correct value here and check visibility */}
                      </span>
                    </strong>
                  </td>
                </tr>
                <tr className={s.ordertotal}>
                  <th className="table-heads">Total</th>
                  <td className={cx(s.totalprice, s.data)}>
                    <strong>
                      <span className="amount">
                        {accounting.formatMoney(cart.order_total_after_store_credit)}
                      </span>
                    </strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={s.message}>
            Note: Shipping and taxes are estimated and will be updated during
            checkout based on your billing and shipping information.
          </p>
          <PayPalButton
            paypalObj={this.props.paypalObj}
            cart={this.props.cart}
            checkoutPayPal={this.props.checkoutPayPal}
            toggleLoader={this.props.toggleLoader}
          />
          <p className={s.message}>
            Please note that you will be re-directed to the Paypal website to complete
            your purchase.
          </p>
          <p className={s.gotocheckout}>
            <button className={s.checkoutbtn} onClick={this.props.proceedToCheckout}>
              Proceed to Checkout
            </button>
          </p>
          <p className={s.message}>
            Complete your purchase with your Krissorbie.com account or as a guest.
          </p>
          {!this.props.loggedIn &&
            <div>
              <p className={s.message}>
                To set up an account, please click on the link below
              </p>
              <p className={s.login}>
                <Link to="/my-account">
                  Login / Register
                </Link>
              </p>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default withStyles(s)(CartForm);
