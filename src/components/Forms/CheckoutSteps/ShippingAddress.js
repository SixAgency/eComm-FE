import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import AddressInputs from './../AddressInputs';
import s from './../Forms.css';

class ShippingAddress extends React.Component {
  static propTypes = {
    formTitle: PropTypes.string,
    formSubtitle: PropTypes.string,
    emailAddress: PropTypes.string,
    selectClass: PropTypes.string,
    shippingAddress: PropTypes.object.isRequired,
    nextCheckout: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      formClass: 'hideForm',
      notes: '',
      fname: this.props.shippingAddress.firstname,
      lname: this.props.shippingAddress.lastname,
      company: this.props.shippingAddress.company,
      email: this.props.emailAddress,
      phone: this.props.shippingAddress.phone,
      address1: this.props.shippingAddress.address1,
      address2: this.props.shippingAddress.address2,
      city: this.props.shippingAddress.city,
      state: this.props.shippingAddress.state_id,
      zip: this.props.shippingAddress.zipcode,
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
      case 'city' : this.setState({ city: e.target.value }); break;
      case 'state' : this.setState({ state: e.target.value }); break;
      case 'zip' : this.setState({ zip: e.target.value }); break;
      case 'createaccount' : this.setState({ createaccount: e.target.checked }); break;
      case 'password' : this.setState({ password: e.target.value }); break;
      default: // do nothing
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.formClass !== 'hideForm') {
      const shippingAddress = {
        firstname: this.state.fname,
        lastname: this.state.lname,
        company: this.state.company || '',
        phone: this.state.phone,
        address1: this.state.address1,
        address2: this.state.address2 || '',
        city: this.state.city,
        state_id: this.state.state,
        zipcode: this.state.zip,
        country_id: 232,
      };
      this.props.nextCheckout(shippingAddress);
    } else {
      this.props.nextCheckout();
    }
  }

  onToggleChange = (e) => {
    this.setState({
      formClass: e.target.checked ? 'showForm' : 'hideForm',
    });
  }

  handleNotes = (e) => {
    this.setState({
      notes: e.target.value,
    });
  }

  render() {
    return (
      <div>
        <h1 className={s.title}>{this.props.formTitle}</h1>
        <h2 className={s.subtitle}>{this.props.formSubtitle}</h2>
        <form className={cx(s.form)} onSubmit={this.onSubmit}>
          <div className={s.inputwrapper}>
            <label className={s.label} htmlFor="changeaddress">
              &nbsp;Ship to a different address?&nbsp;&nbsp;&nbsp;
              <input id="changeaddress" className={s.checkbox} name="changeaddress" type="checkbox" onChange={this.onToggleChange} />
            </label>
          </div>
          <div className={s[this.state.formClass]}>
            <AddressInputs
              firstName={this.state.fname || ''}
              lastName={this.state.lname || ''}
              company={this.state.company || ''}
              emailAddress={this.state.email || ''}
              phoneNumber={this.state.phone || ''}
              address1={this.state.address1 || ''}
              address2={this.state.address2 || ''}
              city={this.state.city || ''}
              state={this.state.state || 0}
              zip={this.state.zip || ''}
              onFirstNameUpdate={this.onFieldsUpdate}
              onLastNameUpdate={this.onFieldsUpdate}
              onCompanyUpdate={this.onFieldsUpdate}
              onPhoneNumberUpdate={this.onFieldsUpdate}
              onAddressOneUpdate={this.onFieldsUpdate}
              onAddressTwoUpdate={this.onFieldsUpdate}
              onCityUpdate={this.onFieldsUpdate}
              onStateUpdate={this.onFieldsUpdate}
              onZipUpdate={this.onFieldsUpdate}
              onEmailUpdate={this.onFieldsUpdate}
              showEmailPhone
              disableEmail={false}
              selectClass={this.props.selectClass}
            />
          </div>
          <div className={s.inputwrapper}>
            <label className={s.label} htmlFor="notes">Order Notes</label>
            <textarea
              id="notes"
              rows="2"
              cols="5"
              className={s.textarea}
              placeholder="Notes about your order, e.g. special notes for delivery."
              onChange={this.handleNotes}
            />
          </div>
          <div className={s.buttonwrapper}>
            <input className={s.submit} type="submit" value="Proceed" />
          </div>
        </form>
      </div>
    );
  }
}

export default withStyles(s)(ShippingAddress);
