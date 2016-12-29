import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './../Forms.css';

class PromoCode extends React.Component {
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
              onChange={this.onUserChange}
              placeholder="Promotional Code"
            />
          </div>
          <div className={s.buttonwrapper}>
            <input className={cx(s.submit, s.pcodebtn)} type="submit" value="Apply promotional code" />
          </div>
          <div className={s.buttonwrapper}>
            <input className={cx(s.submit)} type="submit" value="Proceed" />
          </div>
        </form>
      </div>
    );
  }
}

export default withStyles(s)(PromoCode);
