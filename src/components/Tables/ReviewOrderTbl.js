import React, { PropTypes, PureComponent } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import accounting from 'accounting';

import s from './Tables.css';
import { STATES } from '../../constants/AppConsts';

class ReviewOrderTbl extends PureComponent {
  static propTypes = {
    cart: PropTypes.object.isRequired,
    cartItems: PropTypes.object.isRequired,
    isPayPal: PropTypes.bool.isRequired
  };

  getStateName = (id) => {
    const selected = STATES.find((state) => (state.id === id));
    return typeof selected !== 'undefined' ? selected.abbr : '';
  }

  handleShipping = (e) => {
    e.preventDefault();
  };

  handleBilling = (e) => {
    e.preventDefault();
  };

  listAddress = (data) => {
    const stateName = this.getStateName(data.state_id);
    return (
      <address className={s.optiontext}>
        <span className={s.block}>{data.firstname} {data.lastname}</span>
        <span className={s.block}>{data.company}</span>
        <span className={s.block}>{data.address1}</span>
        <span className={s.block}>{data.city}, {stateName}, {data.zipcode}</span>
      </address>
    );
  }

  render() {
    const {
      cart: {
        shipments,
        adjustments,
        line_items,
        item_total,
        total,
        adjustment_total
      },
      cartItems
    } = this.props;

    const subTotal = parseFloat(item_total) + parseFloat(adjustment_total);

    return (
      <div className={s.tablewrpr}>
        <table className={s.table}>
          <thead>
            <tr>
              <th className={s.tableheads}>PRODUCT</th>
              <th className={s.tableheads}>TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {line_items.map((item, index) => (
              <tr key={index}>
                <td className={cx(s.td, s.tdbig, s.pname)}>
                  {item.variant.name}&nbsp;
                  <strong className={s.qty}>× {item.quantity}</strong>
                </td>
                <td className={cx(s.td, s.tdsmall, s.ptotal)}>
                  ${item.total}
                </td>
              </tr>
              ),
            )}
          </tbody>
          <tfoot className={s.infocontainer}>
            <tr>
              <td className={cx(s.td, s.tdbig, s.psubtotal)}>Subtotal</td>
              <td className={cx(s.td, s.tdsmall)}>
                <span className={s.amount}>
                  {accounting.formatMoney(subTotal)}
                </span>
              </td>
            </tr>
            {shipments.map((ship, index) => (
              <tr key={index}>
                <td className={cx(s.td, s.tdbig, s.pshipping)}>
                  Shipping {index > 0 ? index + 1 : ''}
                </td>
                <td className={cx(s.td, s.tdsmall, s.flatrate)}>
                  {ship.shipping_rates[0].name}:
                  <span className={s.amount}>${ship.shipping_rates[0].cost}</span>
                  {/*<p className={s.shippingcontents}>*/}
                    {/*{ship.manifest.map((item) => (*/}
                      {/*<small>{item.variant.name} x{item.quantity}</small>*/}
                      {/*),*/}
                    {/*)}*/}
                  {/*</p>*/}
                </td>
              </tr>
              ),
            )}
            {adjustments.map((adjust, key) => (
              <tr key={key} >
                <td className={cx(s.td, s.tdbig, s.pshipping)}>
                  {adjust.label}
                </td>
                <td className={cx(s.td, s.tdsmall, s.flatrate)}>
                  ${adjust.amount}
                </td>
              </tr>
              ),
            )}
            <tr>
              <td className={cx(s.td, s.tdbig, s.ptotal2)}>Total</td>
              <td className={cx(s.td, s.tdsmall)}>
                <span className={s.total}>${total}</span>
              </td>
            </tr>
            <tr>
              <td className={cx(s.td, s.tdbig, s.shipaddr)}>
                <span className={s.shippaddress}>Shipping address</span>
                {this.listAddress(cartItems.cart.ship_address)}
                {!this.props.isPayPal && <a
                  className={s.changebilling}
                  href=""
                  onClick={this.handleShipping}
                >
                  Change
                </a>}
              </td>
              <td className={cx(s.td, s.tdsmall, s.billaddr)}>
                <span className={s.billaddress}>Billing address</span>
                {this.listAddress(cartItems.cart.bill_address)}
                {!this.props.isPayPal && <a
                  className={s.changeshipping}
                  href=""
                  onClick={this.handleBilling}
                >
                  Change
                </a>}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}

export default withStyles(s)(ReviewOrderTbl);
