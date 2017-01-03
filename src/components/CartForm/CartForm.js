import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './CartForm.css';
import ShippingCalculator from './ShippingCalculator';

class CartForm extends React.Component {
  static propTypes = {
    cart: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      showCalculator: false,
      className: 'hide',
    };
  }

  toggleCalculator = (e) => {
    e.preventDefault();
    this.setState({
      showCalculator: !this.state.showCalculator,
      className: !this.state.showCalculator ? 'show' : 'hide',
    });
  }

  render() {
    const cart = this.props.cart;
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
                    <h2 className={s.calctitle}>
                      <a
                        href=""
                        className="shipping-calc-btn"
                        onClick={this.toggleCalculator}
                      >
                          Calculate Shipping
                      </a>
                    </h2>
                    <h3 className={s.csubtitles}>
                        Based on your location
                    </h3>
                    <ShippingCalculator
                      visibility={this.state.className}
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
          <div className={s.paypal}>
              &nbsp;
          </div>
          <p className={s.gotocheckout}>
            <input
              type="submit"
              className={s.checkoutbtn}
              name="proceed"
              value="Proceed to Checkout"
            />
          </p>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(CartForm);
