import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Tables.css';
import { STATES } from '../../constants/AppConsts';


class ReviewOrderTbl extends React.Component {
  static propTypes = {
    cart: PropTypes.object.isRequired,
    billingAddress: PropTypes.object.isRequired,
    shippingAddress: PropTypes.object.isRequired
  };

  getStateName = (id) => {
    const selected = STATES.find((state) => (state.id === id));
    const abbr = typeof selected !== 'undefined' ? selected.abbr : '';
    return abbr;
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
    const cart = this.props.cart;
    const shipments = cart.shipments;
    const adjustments = cart.adjustments;
    const shipping = typeof this.props.shippingAddress !== 'undefined' ? this.props.shippingAddress : '';
    const billing = typeof this.props.billingAddress !== 'undefined' ? this.props.billingAddress : '';
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
            {cart.line_items.map((item, index) => (
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
                <span className={s.amount}>${cart.item_total}</span>
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
                <span className={s.total}>${cart.total}</span>
              </td>
            </tr>
            <tr>
              <td className={cx(s.td, s.tdbig, s.shipaddr)}>
                <span className={s.shippaddress}>Shipping address</span>
                {this.listAddress(shipping)}
                <a
                  className={s.changebilling}
                  href=""
                  onClick={this.handleShipping}
                >
                  Change
                </a>
              </td>
              <td className={cx(s.td, s.tdsmall, s.billaddr)}>
                <span className={s.billaddress}>Billing address</span>
                {this.listAddress(billing)}
                <a
                  className={s.changeshipping}
                  href=""
                  onClick={this.handleBilling}
                >
                  Change
                </a>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}

export default withStyles(s)(ReviewOrderTbl);
