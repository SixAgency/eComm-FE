import React, { PropTypes } from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './GiftCardInput.css';


class GiftCardInput extends React.Component {
  static propTypes = {
    showGiftCardForm: PropTypes.bool.isRequired,
    redeemGiftCard: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      coupon_code: ''
    };
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.redeemGiftCard(this.state.coupon_code);
  };

  handleGiftCard = (event) => {
    this.setState({
      coupon_code: event.target.value
    });
  };

  render() {
    const className = this.props.showGiftCardForm ? 'show' : 'hide';
    return (
      <div className={s.giftCardwrpr}>
        <form className={cx(s.gcform, s[className])}>
          <p className={s.gcrow}>
            <input
              type="text"
              name="coupon-code"
              className={s.couponinput}
              placeholder="Gift card code"
              id="giftcard-code"
              onChange={this.handleGiftCard}
            />
            <input
              type="submit"
              className={s.couponsubmit}
              value="Apply gift card"
              onClick={this.onSubmit}
            />
          </p>
        </form>
      </div>
    );
  }
}

export default withStyles(s)(GiftCardInput);
