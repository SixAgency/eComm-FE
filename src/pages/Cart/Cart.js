import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Cart.css';
import Title from '../../components/Text/Title';
import ProductsTable from '../../components/ProductsTable';
import PromoCodeInput from '../../components/PromoCodeInput';
import CartForm from '../../components/CartForm/CartForm';
import Subnav from '../../components/Subnav';
import ContentWrapper from '../../components/ContentWrapper';
import EmptyCart from '../../components/EmptyCart';
import ErrorDisplay from '../../components/ErrorDisplay';

class Cart extends Component {
  static propTypes = {
    onLogout: PropTypes.func.isRequired,
    removeItem: PropTypes.func.isRequired,
    cartItems: PropTypes.object.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    messages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired,
    updateCart: PropTypes.func.isRequired,
    updateQuantity: PropTypes.func.isRequired,
    applyPromoCode: PropTypes.func.isRequired,
    removePromoCode: PropTypes.func.isRequired,
    proceedToCheckout: PropTypes.func.isRequired,
    toggleLoader: PropTypes.func.isRequired,
    breadcrumbs: PropTypes.array,
    calculateShipping: PropTypes.func.isRequired,
    getCart: PropTypes.func.isRequired,
    setMessage: PropTypes.func.isRequired,
    showShippingCalculator: PropTypes.bool.isRequired,
    forwardTo: PropTypes.func.isRequired,
    shippingState: PropTypes.string.isRequired,
    shippingZip: PropTypes.string.isRequired,
    updateShippingState: PropTypes.func.isRequired,
    updateShippingZip: PropTypes.func.isRequired
  };

  render() {
    const { isLoaded, isEmpty, cart } = this.props.cartItems;
    const cartText = `item${cart.line_items && cart.line_items.length !== 1 ? 's' : ''}`;
    if (!isLoaded) {
      return null;
    }
    if (isEmpty) {
      return (
        <EmptyCart
          messages={this.props.messages}
          isError={this.props.isError}
          loggedIn={this.props.loggedIn}
          breadcrumbs={this.props.breadcrumbs}
          onLogout={this.props.onLogout}
          forwardTo={this.props.forwardTo}
        />
      );
    }
    return (
      <div className={s.cartpage}>
        <Subnav
          isLogged={this.props.loggedIn}
          onLogout={this.props.onLogout}
          breadcrumbs={this.props.breadcrumbs}
          forwardTo={this.props.forwardTo}
        />
        <ErrorDisplay messages={this.props.messages} isError={this.props.isError} />
        <ContentWrapper wrprClass="cartwrpr" contentClass="contentwrpr">
          <div className={s.cartcontentwrpr}>
            <article className={s.cartbody}>
              <div>
                <Title text="Your Cart" classname="title" />
                <h3 className={s.cartsubtitle}>
                  {cart.line_items.length} {cartText} in your cart
                </h3>
                <ProductsTable
                  items={cart.line_items}
                  removeItem={this.props.removeItem}
                  updateQuantity={this.props.updateQuantity}
                  cartItems={this.props.cartItems}
                  toggleLoader={this.props.toggleLoader}
                />
                <PromoCodeInput
                  updateCart={this.props.updateCart}
                  applyPromoCode={this.props.applyPromoCode}
                  getCart={this.props.getCart}
                  cartItems={this.props.cartItems}
                  setMessage={this.props.setMessage}
                  isError={this.props.isError}
                />
                <CartForm
                  cart={cart}
                  loggedIn={this.props.loggedIn}
                  proceedToCheckout={this.props.proceedToCheckout}
                  toggleLoader={this.props.toggleLoader}
                  removePromoCode={this.props.removePromoCode}
                  calculateShipping={this.props.calculateShipping}
                  showShippingCalculator={this.props.showShippingCalculator}
                  shippingState={this.props.shippingState}
                  shippingZip={this.props.shippingZip}
                  updateShippingState={this.props.updateShippingState}
                  updateShippingZip={this.props.updateShippingZip}
                />
              </div>
            </article>
          </div>
        </ContentWrapper>
      </div>
    );
  }
}

export default withStyles(s)(Cart);
