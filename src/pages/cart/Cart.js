import React from 'react';
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

class Cart extends React.Component {
  static propTypes = {
    cartItems: React.PropTypes.object.isRequired,
    logged: React.PropTypes.bool.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      showCouponFields: false,
      className: 'hide',
    };
  }

  onLogout = () => {
    fetch('/api/logout', {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
    })
    .then((resp) => (resp.json()))
    .then((json) => this.handleLogout(json));
  }

  handleGiftcard = (e) => {
    e.preventDefault();
    this.setState({
      showCouponFields: !this.state.showCouponFields,
      className: !this.state.showCouponFields ? 'show' : 'hide',
    });
  }


  render() {
    const cart = this.props.cartItems;
    // @TODO - LOADING STATE
    if (!cart.isLoaded) {
      return null;
    }
    // @TODO - EMPTY CART (send the id of the last removed product)
    if (cart.isEmpty) {
      return (
        <EmptyCart />
      );
    }
    return (
      <div className={s.cartpage}>
        <Subnav isLogged={this.props.logged} onLogout={this.onLogout} />
        <CartCta toggleGiftcard={this.handleGiftcard} />
        <ContentWrapper wrprClass={'cartwrpr'} contentClass={'contentwrpr'}>
          <div className={s.cartcontentwrpr}>
            <article className={s.cartbody}>
              <div>
                <GiftCardInput
                  toggleGiftcard={this.handleGiftcard}
                  infoClass={this.state.className}
                />
                <Title text={'Your Cart'} classname={'title'} />
                <h3 className={s.cartsubtitle}>
                  {cart.total_quantity} items in your cart
                </h3>
                <ProductsTable cart={cart} />
                <PromoCodeInput />
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
