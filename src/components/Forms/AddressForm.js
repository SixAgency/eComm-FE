import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Forms.css';
import AddressInputs from './AddressInputs';

class AddressForm extends React.Component {

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    formTitle: PropTypes.string.isRequired,
    formSubtitle: PropTypes.string.isRequired,
    showEmailPhone: PropTypes.bool.isRequired,
    buttonText: PropTypes.string.isRequired,
    onCancel: PropTypes.func,
    emailAddress: PropTypes.string,
    selectClass: PropTypes.string,
    showCancel: PropTypes.bool,
    address: PropTypes.object,
    emailDisabled: PropTypes.bool
  };

  static defaultProps = {
    showCancel: true
  };

  constructor(props) {
    super(props);
    this.state = {
      firstname: this.props.address.firstname,
      lastname: this.props.address.lastname,
      company: this.props.address.company,
      phone: this.props.address.phone,
      country_id: 232, /* US - always */
      address1: this.props.address.address1,
      address2: this.props.address.address2,
      city: this.props.address.city,
      state_id: this.props.address.state_id,
      zipcode: this.props.address.zipcode,
      email: this.props.emailAddress
    };
  }

  onFirstNameUpdate = (event) => {
    this.setState({
      firstname: event.target.value
    });
  };

  onLastNameUpdate = (event) => {
    this.setState({
      lastname: event.target.value
    });
  };

  onCompanyUpdate = (event) => {
    this.setState({
      company: event.target.value
    });
  };

  onPhoneNumberUpdate = (event) => {
    this.setState({
      phone: event.target.value.replace(/[^0-9()-\s]/g, '')
    });
  };

  onAddressOneUpdate = (event) => {
    this.setState({
      address1: event.target.value
    });
  };

  onAddressTwoUpdate = (event) => {
    this.setState({
      address2: event.target.value
    });
  };

  onCityUpdate = (event) => {
    this.setState({
      city: event.target.value
    });
  };

  onStateUpdate = (event) => {
    this.setState({
      state_id: parseInt(event.target.value, 10)
    });
  };

  onZipUpdate = (event) => {
    this.setState({
      zipcode: event.target.value.replace(/[^0-9]/g, '')
    });
  };

  onEmailUpdate = (event) => {
    this.setState({
      email: event.target.value
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state);
  };

  onCancel = (e) => {
    e.preventDefault();
    this.props.onCancel();
  };

  render() {
    return (
      <div className={s.cformcontent}>
        <h1 className={s.title}>{this.props.formTitle}</h1>
        <h2 className={s.subtitle}>{this.props.formSubtitle}</h2>
        <form className={cx(s.form)} onSubmit={this.onSubmit}>
          <AddressInputs
            firstName={this.state.firstname}
            lastName={this.state.lastname}
            company={this.state.company}
            emailAddress={this.state.email}
            phoneNumber={this.state.phone}
            address1={this.state.address1}
            address2={this.state.address2}
            city={this.state.city}
            state={this.state.state_id}
            zip={this.state.zipcode}
            onFirstNameUpdate={this.onFirstNameUpdate}
            onLastNameUpdate={this.onLastNameUpdate}
            onCompanyUpdate={this.onCompanyUpdate}
            onPhoneNumberUpdate={this.onPhoneNumberUpdate}
            onAddressOneUpdate={this.onAddressOneUpdate}
            onAddressTwoUpdate={this.onAddressTwoUpdate}
            onCityUpdate={this.onCityUpdate}
            onStateUpdate={this.onStateUpdate}
            onZipUpdate={this.onZipUpdate}
            onEmailUpdate={this.onEmailUpdate}
            emailDisabled={this.props.emailDisabled}
            showEmailPhone={this.props.showEmailPhone}
            selectClass={this.props.selectClass}
          />
          <div className={s.buttonwrapper}>
            <input
              className={s.submit}
              type="submit"
              value={this.props.buttonText}
            />
            { this.props.showCancel && <input
              className={cx(s.submit, s.cancel)}
              type="button"
              value="Cancel"
              onClick={this.onCancel}
            /> }
          </div>
        </form>
      </div>
    );
  }
}

export default withStyles(s)(AddressForm);
