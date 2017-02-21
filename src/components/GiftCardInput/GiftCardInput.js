import React, { PropTypes } from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './GiftCardInput.css';


class GiftCardInput extends React.Component {
  static propTypes = {
    toggleGiftcard: PropTypes.func.isRequired,
    infoClass: PropTypes.string.isRequired,
    applyPromoCode: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      coupon_code: ''
    };
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.applyPromoCode(this.state.coupon_code);
  }

  handlePromoCode = (event) => {
    this.setState({
      coupon_code: event.target.value
    });
  }

  render() {
    return (
      <form
        className={cx(s.gcform, s[this.props.infoClass])}
        method="post"
      >
        <p className={s.gcrow}>
          <input
            type="text"
            name="coupon-code"
            className={s.couponinput}
            placeholder="Gift card code"
            id="giftcard-code"
            onChange={this.handlePromoCode}
          />
          <input
            type="submit"
            className={s.couponsubmit}
            value="Apply gift card"
            onClick={this.onSubmit}
          />
        </p>
      </form>
    );
  }
}

export default withStyles(s)(GiftCardInput);
