import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import axios from 'axios';
import s from './SquarePayment.css';

const { SqPaymentForm } = global;

class SquarePayment extends Component {

  constructor(props) {
    super(props);
    this.state = {
      is_payment_success: false, // for showing #successNotification div
      is_processing: false, // for disabling payment button
      card_errors: [],
      shipping: {
        zip: '10001'
      }
    };
  }

  componentDidMount = () => {
    this.paymentForm = new SqPaymentForm({
      applicationId: 'sandbox-sq0idp-zZJC4qFxIk0LYgwAKygtWQ',
      inputClass: 'sq-input',
      inputStyles: [
        {
          fontSize: '14px',
          padding: '7px 12px',
          backgroundColor: 'transparent'
        }
      ],
      cardNumber: {
        elementId: 'sq-card-number',
        placeholder: '0000 0000 0000 0000'
      },
      cvv: {
        elementId: 'sq-cvv',
        placeholder: 'CVV'
      },
      expirationDate: {
        elementId: 'sq-expiration-date',
        placeholder: 'MM/YY'
      },
      postalCode: {
        elementId: 'sq-postal-code',
        placeholder: '94110'
      },
      callbacks: {
        cardNonceResponseReceived: (errors, nonce) => {
          if (errors) {
            this.setState({
              is_processing: false,
              card_errors: errors
            });
          } else {
            this.setState({
              card_errors: []
            });
            console.log('NONCE', nonce);
          }
        }
      }
    });
    this.paymentForm.build();
  }

  chargeCardWithNonce = (nonce) => {
    console.log('charging card with nonce');
    const url = '/charges/charge_card';
    const data = {
      nonce,
      zip: this.state.shipping.zip
    };
    console.log(data);

    axios.post(url, data, (result) => {
      if (result.status === 200) {
        this.setState({ is_payment_success: true });
      } else if (result.status === 400) {
        const errors = [];
        for (let i = 0; i < result.errors.length; i += 1) {
          errors.push({ message: result.errors[i].detail });
        }
        this.setState({ card_errors: errors });
      }
      this.setState({ is_processing: false });
    });
  }

  handleSubmit = () => {
    this.setState({
      is_processing: true
    });
    this.paymentForm.requestCardNonce();
  }

  render() {
    if (this.state.is_payment_success === true) {
      return (
        <div id="successNotification">
          Card Charged Successfully!
        </div>
      );
    }
    return (
      <div>
        <div>
          <div id="card-errors">{/* cardErrorNodes */}</div>
          <div>
            <label htmlFor="sq-card-number">Card Number</label>
            <input id="sq-card-number" onChange={this.handleCardNbChange} />
          </div>
          <div>
            <label htmlFor="sq-cvv">CVV</label>
            <input id="sq-cvv" onChange={this.handleCvvChange} />
          </div>
          <div>
            <label htmlFor="sq-expiration-date">Expiration Date</label>
            <input id="sq-expiration-date" onChange={this.handleExpirationChange} />
          </div>
          <div>
            <label htmlFor="sq-postal-code">Postal Code</label>
            <input id="sq-postal-code" onChange={this.handlePCodeChange} />
          </div>
        </div>
        <div>
          <input
            type="submit"
            id="submit"
            value="Buy Now"
            className="btn btn-primary"
            onClick={this.handleSubmit}
            disabled={this.state.is_processing}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(SquarePayment);
