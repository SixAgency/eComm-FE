import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Shipping.css';
import f from '../../../components/Forms/Forms.css';

// Constants
import {
  CHECKOUT_SHIPPING,
  CHECKOUT_SHIPPING_FIELDS,
  STATES
} from '../../../constants/FormConsts';

// Forms and inputs
import Form from '../../../components/Forms/Form';
import FormFields from '../../../components/Forms/FormField';
import AddressSelect from '../../../components/Forms/AddressSelect';

class Shipping extends React.Component {

  static propTypes = {
    content: PropTypes.string.isRequired,
    toggleContent: PropTypes.func.isRequired,
    emailAddress: PropTypes.string.isRequired,
    selectedAddress: PropTypes.number.isRequired,
    addresses: PropTypes.array.isRequired,
    onSubmit: PropTypes.func.isRequired,
    showCancel: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
    const {
      selectedAddress,
      emailAddress
    } = props;
    this.state = {
      addressId: selectedAddress,
      firstname: '',
      lastname: '',
      company: '',
      email: emailAddress,
      phone: '',
      address1: '',
      address2: '',
      city: '',
      state: 0,
      country: 232,
      zipcode: '',
      notes: ''
    };
  }

  /**
   * Form submit handler
   * @param event
   */
  onSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    this.props.onSubmit(this.state);
  };

  /**
   * (Input, Select) field change handler
   * @param key
   * @param value
   */
  onFieldChange = (key, value) => {
    const obj = {};
    obj[key] = value;
    this.setState(obj);
  };

  /**
   * Address list select handler
   * @param event
   */
  onSelect = (event) => {
    this.setState({
      addressId: parseInt(event.target.value, 10)
    });
  };

  render() {
    const {
      formTitle,
      formSubtitle,
      buttonText,
      bottomButtonText
    } = CHECKOUT_SHIPPING;
    const {
      addresses,
      content,
      toggleContent,
      showCancel
    } = this.props;
    return (
      <Form
        formTitle={formTitle}
        formSubtitle={formSubtitle}
        buttonText={buttonText}
        onSubmit={this.onSubmit}
        showCancel={showCancel}
        onCancel={toggleContent}
      >
        <div>
          <div className={f.inputwrapper}>
            <label className={f.label} htmlFor="changeaddress">
              &nbsp;Ship to a different address?&nbsp;&nbsp;&nbsp;
              <input
                id="sameas"
                className={f.checkbox}
                name="sameas"
                type="checkbox"
                onChange={toggleContent}
              />
            </label>
          </div>
          <div className={s[`addresslist_${content}`]}>
            <AddressSelect
              addresses={addresses}
              addressId={this.state.addressId}
              onSelect={this.onSelect}
              onBottomButtonClick={toggleContent}
              showBottomButton={content === 'list'}
              bottomButtonText={bottomButtonText}
              selectClass="mt20"
            />
          </div>
          <div className={s[`addressform_${content}`]}>
            {CHECKOUT_SHIPPING_FIELDS.map((v, k) => (
              <FormFields
                key={k}
                elem={v}
                value={this.state[v.value]}
                onChange={this.onFieldChange}
                options={STATES}
              />
            ))}
          </div>
          {/* Keep here until we figure the functionality */}
          <div className={f.inputwrapper}>
            <label className={f.label} htmlFor="notes">Order Notes</label>
            <textarea
              id="notes"
              name="notes"
              rows="2"
              cols="5"
              className={f.textarea}
              placeholder="Notes about your order, e.g. special notes for delivery."
              onChange={(event) => this.onFieldChange('notes', event.target.value)}
            />
          </div>
        </div>
      </Form>
    );
  }
}

export default withStyles(s, f)(Shipping);
