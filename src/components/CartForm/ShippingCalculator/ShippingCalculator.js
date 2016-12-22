import React from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ShippingCalculator.css';

class ShippingCalculator extends React.Component {
  static propTypes = {
    visibility: React.PropTypes.string.isRequired,
  }

  render() {
    return (
      <section
        className={cx(s.calcform, s[this.props.visibility])}
      >
        <p className={s.calcrow}>
          <select
            className={s.shipcountry}
            id="calc-shipping-country"
            rel="calc_shipping_state"
          >
            <option value className={s.shipoptions}>
              Select a country...
            </option>
            <option value="US" className={s.shipoptions}>
              United States (US)
            </option>
          </select>
        </p>
        <p className={s.calcrow}>
          <input
            type="text"
            className={s.inputtext}
            placeholder="State / county"
            name="calc_shipping_state"
            id="calc_shipping_state"
          />
        </p>
        <p className={s.calcrow}>
          <input
            type="text"
            className={s.inputtext}
            placeholder="Postcode / Zip"
            name="calc_shipping_postcode"
            id="calc_shipping_postcode"
          />
        </p>
        <p className={s.submitcontainer}>
          <button
            type="submit"
            name="calc_shipping"
            value="1"
            className={s.calcbtn}
          >
            Update Totals
          </button>
        </p>
      </section>
    );
  }
}

export default withStyles(s)(ShippingCalculator);
