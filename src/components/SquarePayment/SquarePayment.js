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
      product: {
        id: '001'
      },
      user: {
        name: 'my name',
        email: 'test@test.com'
      },
      shipping: {
        address1: 'adresa 1',
        address2: 'adresa 2',
        city: 'whateve',
        state: 'AZ',
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
            this.chargeCardWithNonce(nonce);
          }
        }
      }
    });
    this.paymentForm.build();
  }

  handleIdChange = (e) => {
    this.setState({
      product: {
        id: e.target.value
      }
    });
  }

  handleNameChange = (e) => {
    this.setState({
      user: {
        name: e.target.value
      }
    });
  }

  handleEmailChange = (e) => {
    this.setState({
      user: {
        email: e.target.value
      }
    });
  }

  handleAddress1Change = (e) => {
    this.setState({
      shipping: {
        address1: e.target.value
      }
    });
  }

  handleAddress2Change = (e) => {
    this.setState({
      shipping: {
        address1: e.target.value
      }
    });
  }

  handleCityChange = (e) => {
    this.setState({
      shipping: {
        city: e.target.value
      }
    });
  }

  handleStateChange = (e) => {
    this.setState({
      shipping: {
        state: e.target.value
      }
    });
  }

  handleZipChange = (e) => {
    this.setState({
      shipping: {
        zip: e.target.value
      }
    });
  }

  handleCardNbChange = (e) => { console.log(e.target.value); }
  handleCvvChange = (e) => { console.log(e.target.value); }
  handleExpirationChange = (e) => { console.log(e.target.value); }
  handlePCodeChange = (e) => { console.log(e.target.value); }

  chargeCardWithNonce = (nonce) => {
    console.log('charging card with nonce');
    const url = '/charges/charge_card';
    const data = {
      nonce,
      product_id: this.state.product.id,
      name: this.state.user.name,
      email: this.state.user.email,
      street_address_1: this.state.shipping.address1,
      street_address_2: this.state.shipping.address2,
      city: this.state.shipping.city,
      state: this.state.shipping.state,
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
          <label
            htmlFor="product_id"
          >Choose your Golden Gate replica</label>
          <select
            id="product_id"
            defaultValue={this.state.product.id}
            onChange={this.handleIdChange}
          >
            <option value="001">$1 Paper Origami 1:10,000 scale model (11 inch) </option>
            <option value="002">$49 Plastic 1:5000 scale model (22 inch)</option>
            <option value="003">$5000 Metal &amp; Concrete 1:1000 scale replica (9 feet)</option>
          </select>
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Name"
            defaultValue={this.state.user.name}
            onChange={this.handleNameChange}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            defaultValue={this.state.user.email}
            onChange={this.handleEmailChange}
          />
        </div>
        <div>
          <h3>Shipping Address</h3>
          <label htmlFor="street_address_1">Street</label>
          <input
            type="text"
            id="street_address_1"
            placeholder="Address Line 1"
            defaultValue={this.state.shipping.address1}
            onChange={this.handleAddress1Change}
          />
          <label htmlFor="street_address_2">Street</label>
          <input
            type="text"
            id="street_address_2"
            placeholder="Address Line 2"
            defaultValue={this.state.shipping.address2}
            onChange={this.handleAddress2Change}
          />
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            placeholder="City"
            defaultValue={this.state.shipping.city}
            onChange={this.handleCityChange}
          />
          <label htmlFor="state">State</label>
          <select
            id="state"
            defaultValue={this.state.shipping.state}
            onChange={this.handleStateChange}
          >
            <option value="" />
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="DC">District of Columbia</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="IA">Iowa</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="ME">Maine</option>
            <option value="MD">Maryland</option>
            <option value="MA">Massachusetts</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MS">Mississippi</option>
            <option value="MO">Missouri</option>
            <option value="MT">Montana</option>
            <option value="NE">Nebraska</option>
            <option value="NV">Nevada</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NY">New York</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VT">Vermont</option>
            <option value="VA">Virginia</option>
            <option value="WA">Washington</option>
            <option value="WV">West Virginia</option>
            <option value="WI">Wisconsin</option>
            <option value="WY">Wyoming</option>
          </select>
        </div>
        <label htmlFor="zip">Zip</label>
        <input
          type="text"
          id="zip"
          placeholder="Zip"
          defaultValue={this.state.shipping.zip}
          onChange={this.handleZipChange}
        />
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
