import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './../Forms.css';

class PromoCode extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onProceed: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      coupon_code: '',
    };
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.coupon_code);
  };

  handlePromoCode = (event) => {
    this.setState({
      coupon_code: event.target.value,
    });
  };

  render() {
    return (
      <div className={s.cformcontent}>
        <h1 className={s.title}>Promotional Code</h1>
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
              className={cx(s.submit, s.pcodebtn)}
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
