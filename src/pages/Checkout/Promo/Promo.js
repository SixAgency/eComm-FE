import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Promo.css';
// Forms and inputs
import PromoForm from '../../../components/Forms/Checkout/PromoForm';


class Promo extends React.Component {

  static propTypes = {
    applyPromoCode: PropTypes.func.isRequired,
    onProceed: PropTypes.func.isRequired,
    getCart: PropTypes.func.isRequired,
    cartItems: PropTypes.object.isRequired,
    setMessage: PropTypes.func.isRequired
  };

  render() {
    return (<PromoForm
      onSubmit={this.props.applyPromoCode}
      onProceed={this.props.onProceed}
      getCart={this.props.getCart}
      cartItems={this.props.cartItems}
      setMessage={this.props.setMessage}
    />
    );
  }
}

export default withStyles(s)(Promo);
