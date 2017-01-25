import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Cart.css';
import CartCta from '../../components/CartCta/CartCta';
import Title from '../../components/Text/Title';
import ProductsTable from '../../components/ProductsTable/ProductsTable';
import PromoCodeInput from '../../components/PromoCodeInput/PromoCodeInput';
import CartForm from '../../components/CartForm/CartForm';
import GiftCardInput from '../../components/GiftCardInput/GiftCardInput';
import Subnav from '../../components/Subnav';
import ContentWrapper from '../../components/ContentWrapper';
import EmptyCart from '../../components/EmptyCart';

class Cart extends Component {
  static propTypes = {
    onLogout: PropTypes.func.isRequired,
    handleGiftCard: PropTypes.func.isRequired,
    removeItem: PropTypes.func.isRequired,
    cartItems: PropTypes.object.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    couponClass: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    isError: PropTypes.bool.isRequired,
    updateCart: PropTypes.func.isRequired,
    updateQuantity: PropTypes.func.isRequired,
  }

  render() {
    const { isLoaded, isEmpty, cart } = this.props.cartItems;

    if (!isLoaded) {
      return null;
    }
    if (isEmpty) {
      return (
        <EmptyCart
          message={this.props.message}
          isError={this.props.isError}
        />
      );
    }
    return (
      <div className={s.cartpage}>
        <Subnav isLogged={this.props.loggedIn} onLogout={this.props.onLogout} />
        <CartCta
          toggleGiftcard={this.props.handleGiftCard}
          message={this.props.message}
          isError={this.props.isError}
        />
        <ContentWrapper wrprClass={'cartwrpr'} contentClass={'contentwrpr'}>
          <div className={s.cartcontentwrpr}>
            <article className={s.cartbody}>
              <div>
                <GiftCardInput
                  toggleGiftcard={this.props.handleGiftCard}
                  infoClass={this.props.couponClass}
                />
                <Title text={'Your Cart'} classname={'title'} />
                <h3 className={s.cartsubtitle}>
                  {cart.total_quantity} items in your cart
                </h3>
                <ProductsTable
                  items={cart.line_items}
                  removeItem={this.props.removeItem}
                  updateQuantity={this.props.updateQuantity}
                  cartItems={this.props.cartItems}
                />
                <PromoCodeInput updateCart={this.props.updateCart} />
                <CartForm cart={cart} />
              </div>
            </article>
          </div>
        </ContentWrapper>
      </div>
    );
  }
}

export default withStyles(s)(Cart);
