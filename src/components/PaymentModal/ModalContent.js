import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from '../Forms/Forms.css';

import config from '../../client_config';

const { Stripe } = global;

class ModalContent extends Component {

  static propTypes = {
    onCancel: PropTypes.func.isRequired,
    onNonceReceived: PropTypes.func.isRequired,
    bill_address: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      is_processing: false, // for disabling payment button
      errors: {
        name: [],
        card: []
      },
      nonce_received: false
    };
  }

  componentDidMount = () => {
    this.stripe = Stripe(config[process.env.NODE_ENV].stripe.key);
    this.card = this.stripe.elements().create('card', {
      iconStyle: 'solid',
      hidePostalCode: true,
      style: {
        base: {
          iconColor: '#8898AA',
          color: '#000000',
          lineHeight: '42px',
          fontWeight: 300,
          fontFamily: 'Georgia, Times, serif',
          fontSize: '12px',

          '::placeholder': {
            color: '#8898AA'
          }
        },
        invalid: {
          iconColor: '#e85746',
          color: '#e85746'
        }
      },
      classes: {
        focus: 'is-focused',
        empty: 'is-empty'
      }
    });
    this.card.mount('#card-element');
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      is_processing: true
    });
    const name = event.currentTarget.querySelector('input[name=name]').value;
    if (name) {
      const extraDetails = {
        name: event.currentTarget.querySelector('input[name=name]').value,
        address_line1: this.props.bill_address.address1,
        address_line2: this.props.bill_address.address2,
        address_city: this.props.bill_address.city,
        address_state: this.props.bill_address.state_text,
        address_zip: this.props.bill_address.zipcode,
        address_country: 'United States'
      };
      this.stripe.createToken(this.card, extraDetails).then((result) => {
        if (result.error) {
          this.setState({
            is_processing: false,
            errors: {
              name: [],
              card: [result.error.message]
            }
          });
        } else {
          this.setState({
            is_processing: false,
            errors: {
              name: [],
              card: []
            }
          });
          this.props.onNonceReceived(result.token);
        }
      });
    } else {
      this.setState({
        is_processing: false,
        errors: {
          ...this.state.errors,
          name: ['Name on Card field is required.']
        }
      });
    }
  };

  render() {
    return (
      <div className={s.paymentmodal}>
        <div className={s.formwrapper}>
          <h1 className={s.title}>Payment</h1>
          <h2 className={s.subtitle}>Please enter your details</h2>
          <form
            onSubmit={this.handleSubmit}
            id="form-card"
          >
            <div className={s.inputwrapper}>
              <label htmlFor="name" className={s.label}>Name on Card*</label>
              <input id="name" name="name" type="text" className={s.input} />
              <div className={s.errors}>
                {this.state.errors.name.map((value, key) => (
                  <span className={s.error} key={key}>{value}</span>
                ))}
              </div>
            </div>
            <div className={s.inputwrapper}>
              <label htmlFor="card-element" className={s.label}>Card Details*</label>
              <div id="card-element" className={s.card_element} />
              <div className={s.errors}>
                {this.state.errors.card.map((value, key) => (
                  <span className={s.error} key={key}>{value}</span>
                ))}
              </div>
            </div>
            <div className={cx(s.buttonwrapper, s.buttonwrapper3)}>
              <input
                type="submit"
                id="submit"
                value="Continue"
                className={s.submit}
                disabled={this.state.is_processing}
              />
              <input
                type="button"
                value="Cancel"
                className={cx(s.submit, s.cancel)}
                disabled={this.state.is_processing}
                onClick={this.props.onCancel}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(ModalContent);
