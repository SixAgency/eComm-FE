import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SquarePayment.css';

class SquarePayment extends Component {

  onSubmit = (e) => {
    e.preventDefault();
    paymentForm.requestCardNonce();
    return false;
  }

  componentWillMount = () => {
    paymentForm.build();
  }

  render() {
    let cardNonce;
    const paymentForm = new SqPaymentForm({
      applicationId: '#{square_application_id}',
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
        cardNonceResponseReceived: (errors, nonce, cardData) => {
          if (errors) {
            let errorHtml = '';
            for (let i = 0; i < errors.length; i++) {
              errorHtml += `<li> ${errors[i].message} </li>`;
            }
            document.getElementById('card-errors').innerHTML = errorHtml;
            document.getElementById('submit').disabled = false;
          } else {
            document.getElementById('card-errors').innerHTML = '';
            chargeCardWithNonce(nonce);
          }
        },
        unsupportedBrowserDetected: () => {
          console.log('alert the buyer');
        }
      }
    });

    const chargeCardWithNonce = function (nonce) {
      const productId = document.getElementById('product_id').value;
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const streetAddress1 = document.getElementById('street_address_1').value;
      const streetAddress2 = document.getElementById('street_address_2').value;
      const city = document.getElementById('city').value;
      const state = document.getElementById('state').value;
      const zip = document.getElementById('zip').value;

      const http = new XMLHttpRequest();
      const url = '/charges/charge_card';
      const params = `product_id= ${productId}
      '&name='${name}
      '&email='${email}
      '&nonce='${nonce}
      '&street_address_1='${streetAddress1}
      '&street_address_2='${streetAddress2}
      '&city='${city}
      '&state='${state}
      '&zip='${zip}`;

      http.open('POST', url, true);
      http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      http.setRequestHeader('X-CSRF-Token', '<%= form_authenticity_token %>');

      http.onreadystatechange = function () {
        if (http.readyState === 4 && http.status === 200) {
          const data = JSON.parse(http.responseText);
          if (data.status === 200) {
            document.getElementById('successNotification').style.display = 'block';
            document.getElementById('payment-form').style.display = 'none';
            window.scrollTo(0, 0);
          } else if (data.status === 400) {
            const errorHtml = '';
            for (let i = 0; i < data.errors.length; i++) {
              errorHtml += `<li>${data.errors[i].detail}</li>`;
            }
            document.getElementById('card-errors').innerHTML = errorHtml;
            document.getElementById('submit').disabled = false;
          }
        }
      };
      http.send(params);
    };

    return (
      <div>
        <form id="payment-form" action="#" onSubmit={this.onSubmit}>
          <label htmlFor="product_id">Choose your Golden Gate replica</label>
          <select id="product_id" name="product_id">
            <option value="001">$1 Paper Origami 1:10,000 scale model (11 inch) </option>
            <option value="002">$49 Plastic 1:5000 scale model (22 inch)</option>
            <option value="003">$5000 Metal &amp; Concrete 1:1000 scale replica (9 feet)</option>
          </select>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
          />
          <h3> Shipping Address </h3>
          <label htmlFor="street_address_1">Street</label>
          <input
            type="text"
            id="street_address_1"
            name="street_address_1"
            placeholder="Address Line 1"
          />
          <label htmlFor="street_address_2">Street</label>
          <input
            type="text"
            id="street_address_2"
            name="street_address_2"
            placeholder="Address Line 2"
          />
          <label htmlFor="city">City</label>
          <input type="text" id="city" name="city" placeholder="City" />
          <label htmlFor="state">State</label>
          <select id="state" name="state">
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
          <label htmlFor="zip">Zip</label>
          <input type="text" id="zip" name="zip" placeholder="Zip" />
          <div id="card-errors" />
          <div>
            <p>Card Number</p>
            <div id="sq-card-number" />
          </div>
          <div>
            <p>CVV</p>
            <div id="sq-cvv" />
          </div>
          <div>
            <p>Expiration Date</p>
            <div id="sq-expiration-date" />
          </div>
          <div>
            <p>Postal Code</p>
            <div id="sq-postal-code" />
          </div>
          <div>
            <input type="submit" id="submit" value="Buy Now" />
          </div>
        </form>
      </div>
    );
  }
}

export default withStyles(s)(SquarePayment);
