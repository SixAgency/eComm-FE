import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './../Forms.css';

class PromoCode extends React.Component {
  static propTypes = {
    nextCheckout: PropTypes.func.isRequired,
  }

  onSubmit = (e) => {
    e.preventDefault();
  }

  nextCheckout = () => {
    this.props.nextCheckout();
  }

  render() {
    return (
      <div className={s.cformcontent}>
        <h1 className={s.title}>Promotional Code</h1>
        <h2 className={s.subtitle}>Forgot about your promotion?</h2>
        <form className={cx(s.form, s.form2)} onSubmit={this.onSubmit}>
          <div className={s.inputwrapper}>
            <input
              id="username"
              type="text"
              name="username"
              className={s.input}
              onChange={this.onUserChange}
              placeholder="Promotional Code"
            />
          </div>
          <div className={s.buttonwrapper}>
            <input className={cx(s.submit, s.pcodebtn)} type="submit" value="Apply promotional code" />
          </div>
        </form>
        <div className={s.buttonwrapper}>
          <button className={cx(s.submit)} onClick={this.nextCheckout}>Proceed</button>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(PromoCode);
