import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './PromoCodeInput.css';

class PromoCodeInput extends Component {
  static propTypes = {
    updateCart: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div className={s.pcodecontainer}>
        <div className={cx(s.pcodebody, s.clearfix)}>
          <input
            name="coupon-code"
            className={s.inputtext}
            id="coupon-code"
            placeholder="Promotional Code"
          />
          <input
            type="submit"
            className={s.couponbtn}
            name="apply-coupon"
            value="Promotional Code"
          />
          <input
            type="button"
            className={cx(s.couponbtn, s.updatebtn)}
            id="update-button"
            name="update-cart"
            value="Update Cart"
            onClick={this.props.updateCart}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(PromoCodeInput);
