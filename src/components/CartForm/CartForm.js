import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import accounting from 'accounting';

import s from './CartForm.css';
import ShippingCalculator from './ShippingCalculator';
import PayPalButton from '../PayPalButton';

class CartForm extends Component {
  static propTypes = {
    cart: PropTypes.object.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    paypalObj: PropTypes.object.isRequired,
    checkoutPayPal: PropTypes.func.isRequired,
    proceedToCheckout: PropTypes.func.isRequired,
    toggleLoader: PropTypes.func.isRequired,
    calculateShipping: PropTypes.func.isRequired,
    showShippingCalculator: PropTypes.bool.isRequired,
    removePromoCode: PropTypes.func.isRequired
  };

  getItemTotal = () => {
    const cart = this.props.cart;
    let total = parseFloat(cart.item_total) + parseFloat(cart.adjustment_total);
    total -= parseFloat(cart.additional_tax_total);
    cart.adjustments.forEach((adj) => {
      if (adj.label.indexOf('Promotion') !== -1) {
        total -= parseFloat(adj.amount);
      }
    });
    return total;
  };

  parseShippingTaxes = () => {
    const { cart } = this.props;
    const ups = [];
    const flatRate = [];
    cart.shipments.forEach((a) => {
      const shippingRate = a.selected_shipping_rate;
      if (shippingRate !== null && shippingRate.name === 'Flate rate') {
        flatRate.push(shippingRate.cost);
      } else if (shippingRate !== null && shippingRate.name === 'Ground (UPS)') {
        ups.push(shippingRate.cost);
      }
    });
    return { ups, flatRate };
  };

  render() {
    if (!this.props.paypalObj.isLoaded) {
      return null;
    }
    const { cart } = this.props;
    const taxes = this.parseShippingTaxes();
    let flatRate = 0;
    let ups = 0;
    let showIndexes = false;
    if (taxes && taxes.flatRate.length !== 0) {
      flatRate = taxes.flatRate[0];
    }
    if (taxes && taxes.ups.length !== 0) {
      ups = taxes.ups[0];
    }
    if (ups !== 0 && flatRate !== 0) {
      showIndexes = true;
    }
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
                    {accounting.formatMoney(this.getItemTotal())}
                  </td>
                </tr>
                {cart.adjustments.map((adjust, key) => (
                  <tr key={key} className={s.csubtotals}>
                    <th className="table-heads">{adjust.label}</th>
                    <td className={cx(s.ammout, s.data)}>-{accounting.formatMoney(-adjust.amount)}
                      <Link
                        className={s.removetext}
                        onClick={this.props.removePromoCode}
                      > [Remove]</Link>
                    </td>
                  </tr>
                ))}
                <tr className={s.csubtotals}>
                  <th className="table-heads" />
                  <td className={cx(s.ammout, s.data)}>
                    <small>
                      Note: Products may ship from various
                      locations
                    </small>
                  </td>
                </tr>
                {flatRate !== 0 &&  <tr className={s.shipping}>
                  <th className="table-heads">
                    Shipping
                  </th>
                  <td className="data">
                    <p>
                      Flat Rate
                      : {accounting.formatMoney(flatRate)}
                    </p>
                  </td>
                </tr>}
                {ups !== 0 &&  <tr className={s.shipping}>
                  <th className="table-heads">
                    Shipping {showIndexes ? '2' : ''}
                  </th>
                  <td className="data">
                    <p>
                      Ground (UPS)
                      : {accounting.formatMoney(ups)}
                    </p>
                  </td>
                </tr>}
                <tr className={s.shippingcalculator}>
                  <th className="table-heads" />
                  <td className="data">
                    {this.props.showShippingCalculator && <div>
                      <h2 className={s.calctitle}>Calculate Shipping</h2>
                      <ShippingCalculator
                        calculateShipping={this.props.calculateShipping}
                        toggleLoader={this.props.toggleLoader}
                      />
                    </div>}
                  </td>
                </tr>
                {cart.tax_total > 0 && <tr className={s.csubtotals}>
                  <th className="table-heads">Tax</th>
                  <td className={cx(s.totalprice, s.data)}>
                    <strong>
                      <span className="amount">
                        {accounting.formatMoney(cart.tax_total)}
                      </span>
                    </strong>
                  </td>
                </tr>}
                <tr className={s.ordertotal}>
                  <th className="table-heads">Total</th>
                  <td className={cx(s.totalprice, s.data)}>
                    <strong>
                      <span className="amount">
                        {accounting.formatMoney(cart.total)}
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
