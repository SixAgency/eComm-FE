import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Cart.css';
import CtaInfo from '../../components/CartCta/CtaInfo';
import Title from '../../components/Text/Title';
import ProductsTable from '../../components/ProductsTable/ProductsTable';
import PromoCodeInput from '../../components/PromoCodeInput/PromoCodeInput';
import CartForm from '../../components/CartForm/CartForm';
import GiftCardInput from '../../components/GiftCardInput/GiftCardInput';
import LoginInput from '../../components/LoginInput/LoginInput';
import Subnav from '../../components/Subnav';
import ContentWrapper from '../../components/ContentWrapper';
import EmptyCart from '../../components/EmptyCart';
import ErrorDisplay from '../../components/ErrorDisplay';

class Cart extends Component {
  static propTypes = {
    onLogout: PropTypes.func.isRequired,
    onLogin: PropTypes.func.isRequired,
    handleLogin: PropTypes.func.isRequired,
    handleGiftCard: PropTypes.func.isRequired,
    couponClass: PropTypes.string.isRequired,
    loginClass: PropTypes.string.isRequired,
    removeItem: PropTypes.func.isRequired,
    cartItems: PropTypes.object.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    messages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired,
    updateCart: PropTypes.func.isRequired,
    updateQuantity: PropTypes.func.isRequired,
    applyPromoCode: PropTypes.func.isRequired,
    paypalObj: PropTypes.object.isRequired,
    checkoutPayPal: PropTypes.func.isRequired,
    checkoutNext: PropTypes.func.isRequired,
    toggleLoader: PropTypes.func.isRequired,
    breadcrumbs: PropTypes.array,
    calculateShipping: PropTypes.func.isRequired
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
        />
      );
    }
    return (
      <div className={s.cartpage}>
        <Subnav
          isLogged={this.props.loggedIn}
          onLogout={this.props.onLogout}
          breadcrumbs={this.props.breadcrumbs}
        />
        <ErrorDisplay messages={this.props.messages} isError={this.props.isError} />
        <CtaInfo
          loggedIn={this.props.loggedIn}
          toggleGiftcard={this.props.handleGiftCard}
          toggleLogin={this.props.handleLogin}
          infoClass="infocheckout"
        />
        <section>
          <div className={s.giftCardwrpr}>
            <GiftCardInput
              toggleGiftcard={this.props.handleGiftCard}
              infoClass={this.props.couponClass}
              applyPromoCode={this.props.applyPromoCode}
            />
          </div>
          {!this.props.loggedIn &&
          <div className={s.loginwrpr}>
            <LoginInput
              onLogin={this.props.onLogin}
              toggleLogin={this.props.handleLogin}
              infoClass={this.props.loginClass}
              handleError={this.handleError}
            />
          </div>
          }
        </section>
        <ContentWrapper wrprClass={'cartwrpr'} contentClass={'contentwrpr'}>
          <div className={s.cartcontentwrpr}>
            <article className={s.cartbody}>
              <div>
                <Title text={'Your Cart'} classname={'title'} />
                <h3 className={s.cartsubtitle}>
                  {cart.line_items.length} {cartText} in your cart
                </h3>
                <ProductsTable
                  items={cart.line_items}
                  removeItem={this.props.removeItem}
                  updateQuantity={this.props.updateQuantity}
                  cartItems={this.props.cartItems}
                />
                <PromoCodeInput
                  updateCart={this.props.updateCart}
                  applyPromoCode={this.props.applyPromoCode}
                />
                <CartForm
                  cart={cart}
                  loggedIn={this.props.loggedIn}
                  paypalObj={this.props.paypalObj}
                  checkoutPayPal={this.props.checkoutPayPal}
                  checkoutNext={this.props.checkoutNext}
                  toggleLoader={this.props.toggleLoader}
                  calculateShipping={this.props.calculateShipping}
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
