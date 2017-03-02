import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './CartForm.css';
import ShippingCalculator from './ShippingCalculator';
import PayPalButton from '../PayPalButton';

class CartForm extends Component {
  static propTypes = {
    cart: PropTypes.object.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    paypalObj: PropTypes.object.isRequired,
    checkoutPayPal: PropTypes.func.isRequired,
    checkoutNext: PropTypes.func.isRequired,
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

  proceedToCheckout = (e) => {
    e.preventDefault();
    this.props.checkoutNext(this.props.cart.state);
  };

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
                      ${cart.total}
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
                        Shipping costs will be calculated
                        once you have provided your address.
                    </p>
                    <h2 className={s.calctitle}>Calculate Shipping</h2>
                    <ShippingCalculator
                      calculateShipping={this.props.calculateShipping}
                    />
                  </td>
                </tr>
                <tr className={s.ordertotal}>
                  <th className="table-heads">Total</th>
                  <td className={cx(s.totalprice, s.data)}>
                    <strong>
                      <span className="amount">
                          ${cart.total}
                      </span>
                    </strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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
            <button className={s.checkoutbtn} onClick={this.proceedToCheckout}>
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
