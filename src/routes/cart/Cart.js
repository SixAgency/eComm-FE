import React from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Cart.css';
import CartCta from '../../components/CartCta/CartCta';
import Title from '../../components/Text/Title';
import ProductsTable from '../../components/ProductsTable/ProductsTable';
import PromoCodeInput from '../../components/PromoCodeInput/PromoCodeInput';
import CartForm from '../../components/CartForm/CartForm';

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

  // doesn't work on first click
  handleGiftcard = (e) => {
    e.preventDefault();
    this.setState({
      showCouponFields: !this.state.showCouponFields,
      className: this.state.showCouponFields ? 'show' : 'hide',
    });
  }

  render() {
    const cart = this.props.cartItems;
    return (
      <div className={s.cartpage}>
        <CartCta toggleGiftcard={this.handleGiftcard} />
        <div className={s.cartcontentwrpr}>
          <article className={s.cartbody}>
            <div>
              <form
                className={cx(s.gcform, s[this.state.className])}
                method="post"
              >
                <p className={s.gcrow}>
                  <input
                    type="text"
                    name="coupon-code"
                    className={s.couponinput}
                    placeholder="Gift card code"
                    id="giftcard-code"
                  />
                  <input
                    type="submit"
                    className={s.couponsubmit}
                    value="Apply gift card"
                  />
                </p>
              </form>
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
