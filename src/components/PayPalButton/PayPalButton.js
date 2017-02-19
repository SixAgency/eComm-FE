import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './PayPalButton.css';

const braintree = require('braintree-web');

class PayPalButton extends Component {

  static propTypes = {
    paypalObj: PropTypes.object.isRequired,
    checkoutPayPal: PropTypes.func.isRequired,
    cart: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      initialized: false,
      checkout: null
    };
  }

  componentDidMount = () => {
    if (!this.state.initialized && !this.props.paypalObj.isEmpty) {
      this.setState({
        initialized: true
      }, () => {
        braintree.client.create({
          authorization: this.props.paypalObj.tokens.client_token
        }, (clientErr, clientInstance) => {
          braintree.paypal.create({
            client: clientInstance
          }, (err, paypalInstance) => {
            this.setState({
              checkout: paypalInstance
            });
          });
        });
      });
    }
  };

  onSubmit = () => {
    const paypalInstance = this.state.checkout;
    paypalInstance.tokenize({
      flow: 'checkout', // Required
      amount: this.props.cart.total, // Required
      currency: 'USD', // Required
      locale: 'en_US',
      enableShippingAddress: false
    }, (err, tokenizationPayload) => {
      if (!err) {
        const data = this.setRequestData(tokenizationPayload);
        this.props.checkoutPayPal(data);
      }
    });
  };

  setRequestData = (payload) => {
    const data = {
      order: {
        line_items_attributes: this.formatLineItems(),
        coupon_code: '',
        email: payload.details.email
      },
      paypal: {
        payment_method_id: this.props.paypalObj.tokens.payment_method_id.toString(),
        payment_method_nonce: payload.nonce
      },
      checkout: 'true'
    };

    return data;
  };

  formatLineItems = () => {
    const data = {};
    this.props.cart.line_items.forEach((value, key) => {
      data[key] = {
        quantity: value.quantity.toString(),
        id: value.variant.id.toString()
      };
    });
    return data;
  };

  render() {
    if (!this.state.initialized) {
      return null;
    }
    return (
      <button className={s.paypal} onClick={this.onSubmit} />
    );
  }
}

export default withStyles(s)(PayPalButton);
