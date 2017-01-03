import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Forms.css';
import { SHIPPING_STATES } from '../../constants/AppConsts';

class BillingForm extends React.Component {

  static propTypes = {
    formTitle: PropTypes.string,
    formSubtitle: PropTypes.string,
    showEmailPhone: PropTypes.string,
    buttonText: PropTypes.string,
    selectClass: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      fname: '',
      lname: '',
      company: '',
      email: '',
      phone: '',
      country: '',
      address1: '',
      address2: '',
      town: '',
      state: '',
      zip: '',
    };
  }

  onFieldsUpdate = (e) => {
    switch (e.target.id) {
      case 'fname' : this.setState({ fname: e.target.value }); break;
      case 'lname' : this.setState({ lname: e.target.value }); break;
      case 'company' : this.setState({ company: e.target.value }); break;
      case 'email' : this.setState({ email: e.target.value }); break;
      case 'phone' : this.setState({ phone: e.target.value }); break;
      case 'address1' : this.setState({ address1: e.target.value }); break;
      case 'address2' : this.setState({ address2: e.target.value }); break;
      case 'town' : this.setState({ town: e.target.value }); break;
      case 'state' : this.setState({ state: e.target.value }); break;
      case 'zip' : this.setState({ zip: e.target.value }); break;
      default: // do nothing
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
  }

  render() {
    const selections = [...SHIPPING_STATES];
    return (
      <div className={s.cformcontent}>
        <h1 className={s.title}>{this.props.formTitle}</h1>
        <h2 className={s.subtitle}>{this.props.formSubtitle}</h2>
        <form className={cx(s.form)} onSubmit={this.onSubmit}>
          <div className={cx(s.inputwrapper, s.inputleft)}>
            <label
              className={s.label}
              htmlFor="fname"
            >
                First Name <abbr>*</abbr>
            </label>
            <input
              id="fname"
              type="text"
              name="fname"
              className={s.input}
              onChange={this.onFieldsUpdate}
            />
          </div>
          <div className={cx(s.inputwrapper, s.inputright)}>
            <label
              className={s.label}
              htmlFor="lname"
            >
              Last Name <abbr>*</abbr>
            </label>
            <input
              id="lname"
              type="text"
              name="lname"
              className={s.input}
              onChange={this.onFieldsUpdate}
            />
          </div>
          <div className={s.inputwrapper}>
            <label
              className={s.label}
              htmlFor="company"
            >
              Company Name
            </label>
            <input
              id="company"
              type="text"
              name="company"
              className={s.input}
              onChange={this.onFieldsUpdate}
            />
          </div>
          <div className={cx(s.inputwrapper, s.inputleft, s[this.props.showEmailPhone])}>
            <label
              className={s.label}
              htmlFor="email"
            >
              Email Address <abbr>*</abbr>
            </label>
            <input
              id="email"
              type="text"
              name="email"
              className={s.input}
              onChange={this.onFieldsUpdate}
            />
          </div>
          <div className={cx(s.inputwrapper, s.inputright, s[this.props.showEmailPhone])}>
            <label
              className={s.label}
              htmlFor="phone"
            >
              Phone <abbr>*</abbr>
            </label>
            <input
              id="phone"
              type="text"
              name="phone"
              className={s.input}
              onChange={this.onFieldsUpdate}
            />
          </div>
          <div className={s.inputwrapper}>
            <label
              className={s.label}
              htmlFor="country"
            >
              Country <abbr>*</abbr>
            </label>
            <strong>United States (US)</strong>
            <input
              id="country"
              type="hidden"
              name="country"
              className={s.input}
              onChange={this.onFieldsUpdate}
            />
          </div>
          <div className={s.inputwrapper}>
            <label
              className={s.label}
              htmlFor="address1"
            >
              Address
            </label>
            <input
              id="address1"
              type="text"
              placeholder="Street address"
              name="address1"
              className={s.input}
              onChange={this.onFieldsUpdate}
            />
            <input
              id="address2"
              type="text"
              placeholder="Apartment, suite, unit etc. (optional)"
              name="address2"
              className={s.input}
              onChange={this.onFieldsUpdate}
            />
          </div>
          <div className={s.inputwrapper}>
            <label
              className={s.label}
              htmlFor="town"
            >
              Town / City<abbr>*</abbr>
            </label>
            <input
              id="town"
              type="text"
              name="town"
              className={s.input}
              onChange={this.onFieldsUpdate}
            />
          </div>
          <div className={cx(s.inputwrapper, s.inputleft)}>
            <label
              className={s.label}
              htmlFor="state"
            >
              State <abbr>*</abbr>
            </label>
            <select
              name="state"
              id="state"
              className={s[this.props.selectClass]}
              onChange={this.onFieldsUpdate}
            >
              {selections.map((state, key) => (
                <option value={state.value} key={key}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>
          <div className={cx(s.inputwrapper, s.inputright)}>
            <label
              className={s.label}
              htmlFor="zip"
            >
              Zip <abbr>*</abbr>
            </label>
            <input
              id="zip"
              type="text"
              name="zip"
              className={s.input}
              onChange={this.onFieldsUpdate}
            />
          </div>
          <div className={s.buttonwrapper}>
            <input
              className={s.submit}
              type="submit"
              value={this.props.buttonText}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default withStyles(s)(BillingForm);
