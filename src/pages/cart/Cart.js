import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Cart.css';
import CartCta from '../../components/CartCta/CartCta';
import Title from '../../components/Text/Title';
import ProductsTable from '../../components/ProductsTable/ProductsTable';
import PromoCodeInput from '../../components/PromoCodeInput/PromoCodeInput';
import CartForm from '../../components/CartForm/CartForm';
import GiftCardInput from '../../components/GiftCardInput/GiftCardInput';

class Cart extends React.Component {
  static propTypes = {
    cartItems: React.PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true,
      showCouponFields: false,
      className: 'hide',
    };
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
    // @TODO - EMPTY CART
    if (cart.isEmpty) {
      return (
        <section className={s.cartpage}>
          Cart is Empty
        </section>
      );
    }
    return (
      <div className={s.cartpage}>
        <CartCta toggleGiftcard={this.handleGiftcard} />
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
      </div>
    );
  }
}

export default withStyles(s)(Cart);
