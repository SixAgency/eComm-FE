import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './../Forms.css';

class PromoCode extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onProceed: PropTypes.func.isRequired,
    getCart: PropTypes.func.isRequired,
    cartItems: PropTypes.object.isRequired,
    setMessage: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      coupon_code: ''
    };
  }

  onSubmit = (event) => {
    const paranthesesReg = /\((.*)\)/;
    event.preventDefault();
    if (this.props.cartItems.cart.adjustments.length !== 0) {
      const messages = [`Sorry, promotional code "${this.props.cartItems.cart.adjustments[0].label.match(paranthesesReg)[1]}" has
        already been applied and cannot be used in conjunction with other promotional codes`];
      this.props.setMessage({
        isError: true,
        messages
      });
      window.scrollTo(0, 0);
    } else {
      this.props.onSubmit(this.state.coupon_code, this.props.getCart);
    }
  };

  handlePromoCode = (event) => {
    this.setState({
      coupon_code: event.target.value
    });
  };

  render() {
    return (
      <div className={s.cformcontent}>
        <h1 className={cx(s.title, s.titlemobile)}>Promotional Code</h1>
        <h2 className={s.subtitle}>Forgot about your promotion?</h2>
        <form className={cx(s.form, s.form2)}>
          <div className={s.inputwrapper}>
            <input
              id="username"
              type="text"
              name="username"
              className={s.input}
              onChange={this.handlePromoCode}
              placeholder="Promotional Code"
            />
          </div>
          <div className={s.buttonwrapper}>
            <input
              className={cx(s.submit, s.pcodebtnmobile)}
              type="submit"
              value="Apply promotional code"
              onClick={this.onSubmit}
            />
          </div>
          <div className={s.buttonwrapper}>
            <button className={cx(s.submit)} type="button" onClick={this.props.onProceed}>Proceed</button>
          </div>
        </form>
      </div>
    );
  }
}

export default withStyles(s)(PromoCode);
