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
    this.props.onSubmit();
  }

  render() {
    return (
      <div className={s.cformcontent}>
        <h1 className={s.title}>{this.props.formTitle}</h1>
        <h2 className={s.subtitle}>{this.props.formSubtitle}</h2>
        <form className={cx(s.form)} onSubmit={this.onSubmit}>
          <AddressInputs
            onFieldsUpdate={this.onFieldsUpdate}
            showEmailPhone={this.props.showEmailPhone}
            selectClass={this.props.selectClass}
          />
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

export default withStyles(s)(AddressForm);
