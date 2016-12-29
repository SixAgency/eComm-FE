import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Forms.css';

class ShippingInputs extends React.Component {
  render() {
    return (
      <div className={s.sformcontent}>
        <div className={cx(s.inputwrapper, s.inputleft)}>
          <label className={s.label} htmlFor="fname">First Name <abbr>*</abbr></label>
          <input id="fname" type="text" name="fname" className={s.input} onChange={this.onFieldsUpdate} />
        </div>
        <div className={cx(s.inputwrapper, s.inputright)}>
          <label className={s.label} htmlFor="lname">Last Name <abbr>*</abbr></label>
          <input id="lname" type="text" name="lname" className={s.input} onChange={this.onFieldsUpdate} />
        </div>
        <div className={s.inputwrapper}>
          <label className={s.label} htmlFor="company">Company Name</label>
          <input id="company" type="text" name="company" className={s.input} onChange={this.onFieldsUpdate} />
        </div>
        <div className={cx(s.inputwrapper, s.inputleft)}>
          <label className={s.label} htmlFor="email">Email Address <abbr>*</abbr></label>
          <input id="email" type="text" name="email" className={s.input} onChange={this.onFieldsUpdate} />
        </div>
        <div className={cx(s.inputwrapper, s.inputright)}>
          <label className={s.label} htmlFor="phone">Phone <abbr>*</abbr></label>
          <input id="phone" type="text" name="phone" className={s.input} onChange={this.onFieldsUpdate} />
        </div>
        <div className={s.inputwrapper}>
          <label className={s.label} htmlFor="country">Country <abbr>*</abbr></label>
          <strong>United States (US)</strong>
          <input id="country" type="hidden" name="country" className={s.input} onChange={this.onFieldsUpdate} />
        </div>
        <div className={s.inputwrapper}>
          <label className={s.label} htmlFor="address1">Address</label>
          <input id="address1" type="text" placeholder="Street address" name="address1" className={s.input} onChange={this.onFieldsUpdate} />
          <input id="address2" type="text" placeholder="Apartment, suite, unit etc. (optional)" name="address2" className={s.input} onChange={this.onFieldsUpdate} />
        </div>
        <div className={s.inputwrapper}>
          <label className={s.label} htmlFor="town">Town / City<abbr>*</abbr></label>
          <input id="town" type="text" name="town" className={s.input} onChange={this.onFieldsUpdate} />
        </div>
        <div className={cx(s.inputwrapper, s.inputleft)}>
          <label className={s.label} htmlFor="state">State <abbr>*</abbr></label>
          <input id="state" type="text" name="state" className={s.input} onChange={this.onFieldsUpdate} />
        </div>
        <div className={cx(s.inputwrapper, s.inputright)}>
          <label className={s.label} htmlFor="zip">Zip <abbr>*</abbr></label>
          <input id="zip" type="text" name="zip" className={s.input} onChange={this.onFieldsUpdate} />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(ShippingInputs);
