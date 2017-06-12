import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import accounting from 'accounting';

import s from './GiftCardSelector.css';

class GiftCardSelector extends Component {
  static propTypes = {
    variants: PropTypes.array.isRequired,
    onAddToCart: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      isFormValid: false,
      showForm: false,
      selectedVariant: 0,
      details: {
        recipient_email: '',
        recipient_name: '',
        gift_message: ''
      },
      invalidFields: []
    };
  }

  handleChange = (event) => {
    const variant = parseInt(event.target.value, 10);
    this.setState({
      selectedVariant: variant,
      showForm: variant !== 0
    });
  }

  closeForm = (event) => {
    event.preventDefault();
    this.setState({
      isFormValid: false,
      showForm: false,
      selectedVariant: 0,
      details: {
        recipient_email: '',
        recipient_name: '',
        gift_message: ''
      },
      invalidFields: []
    });
  }

  updateDetails = (field, event) => {
    const value = event.target.value;
    const { details } = this.state;
    details[field] = value;
    this.setState({ details });
  }

  addGiftToCart = (event) => {
    event.preventDefault();
    const {
      details: {
        recipient_email,
        recipient_name
      }
    } = this.state;
    const emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z0-9]{2,5}$/i;
    let isValid = true;
    const invalidFields = [];
    if (recipient_name.length === 0) {
      isValid = false;
      invalidFields.push('recipient_name');
    }
    if (recipient_email.length === 0 || !emailRegex.test(recipient_email)) {
      isValid = false;
      invalidFields.push('recipient_email');
    }
    if (isValid) {
      const payload = {
        id: this.state.selectedVariant,
        quantity: 1,
        options: {
          gift_card_details: {
            ...this.state.details
          }
        }
      };
      this.props.onAddToCart(payload);
    } else {
      this.setState({
        isFormValid: false,
        invalidFields
      });
    }
  }

  render() {
    const { variants } = this.props;
    const {
      selectedVariant,
      showForm,
      details: {
        recipient_email,
        recipient_name,
        gift_message
      },
      isFormValid,
      invalidFields
    } = this.state;

    return (
      <div className={cx(s.variants, showForm ? s.formopen : '')}>
        <h3 className={s.vname}>Choose Amount</h3>
        <select className={s.vselect} name="sizes" onChange={this.handleChange} value={selectedVariant}>
          <option value={0} key="">Choose an amount</option>
          { variants.map((item) => (
            <option value={item.id} key={item.id}>
              {accounting.formatMoney(item.option_values[0].presentation)}
            </option>)
          )}
        </select>
        <div className={cx(s.giftcardform, showForm ? s.visible : '')}>
          <p className={s.giftcardform_title}>
            Your gift card will be sent to the recipient on the same day of purchase.
          </p>
          <div className={s.giftcardform_details}>
            <p className={s.giftcardform_details_title}>Gift card details</p>
            <label htmlFor="recipient_email">Recipient's email*</label>
            <input
              type="email"
              id="recipient_email"
              value={recipient_email}
              onChange={(event) => {
                this.updateDetails('recipient_email', event);
              }}
            />
            {!isFormValid && invalidFields.includes('recipient_email') &&
              <p className={s.validationerror}>Please enter a valid email address</p>
            }
            <label htmlFor="recipient_name">Your name*</label>
            <input
              type="text"
              id="recipient_name"
              value={recipient_name}
              onChange={(event) => {
                this.updateDetails('recipient_name', event);
              }}
            />
            {!isFormValid && invalidFields.includes('recipient_name') &&
              <p className={s.validationerror}>Please enter your name</p>
            }
            <label htmlFor="gift_message">Message</label>
            <textarea
              id="gift_message"
              rows="5"
              placeholder="Your message..."
              value={gift_message}
              onChange={(event) => {
                this.updateDetails('gift_message', event);
              }}
            />
            <button
              className={s.giftcardform_details_addtocart}
              onClick={this.addGiftToCart}
            >
              ADD TO CART
            </button>
            <button onClick={this.closeForm}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(GiftCardSelector);
