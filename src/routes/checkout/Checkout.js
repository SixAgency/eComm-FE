import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Checkout.css';
// Components
import Subnav from '../../components/Subnav';
import CtaInfo from '../../components/CartCta/CtaInfo';
import ContentWrapper from '../../components/ContentWrapper';
import GiftCardInput from '../../components/GiftCardInput/GiftCardInput';
// Forms and inputs
import BillingForm from '../../components/Forms/BillingForm';
import ShippingAddress from '../../components/Forms/CheckoutSteps/ShippingAddress';
import PromoCode from '../../components/Forms/CheckoutSteps/PromoCode';
import ReviewOrder from '../../components/Forms/CheckoutSteps/ReviewOrder';


class Checkout extends React.Component {

  static propTypes = {
    cartItems: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      content: 'billing',
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


  getChildren = (state) => {
    if (state === 'shipping') {
      return <ShippingAddress />;
    } else if (state === 'promocode') {
      return <PromoCode />;
    } else if (state === 'review') {
      return <ReviewOrder cartItems={this.props.cartItems} />;
    }
    return <BillingForm />;
  }

  clickTab = (e) => {
    e.preventDefault();
    this.setState({
      content: e.target.id,
    });
  }

  handleGiftcard = (e) => {
    e.preventDefault();
    this.setState({
      showCouponFields: !this.state.showCouponFields,
      className: !this.state.showCouponFields ? 'show' : 'hide',
    });
  }

  render() {
    /* remove */
    const logged = true;
    const contentTabs = [
      {
        name: 'Billing Address',
        title: 'Billing Address',
        cname: 'billing',
        id: 'billing',
      },
      {
        name: 'Shipping Address',
        title: 'Shipping Address',
        cname: 'shipping',
        id: 'shipping',
      },
      {
        name: 'Apply Promotional Code',
        title: 'Apply Promotional Code',
        cname: 'promocode',
        id: 'promocode',
      },
      {
        name: 'Review Order',
        title: 'Review Order',
        cname: 'review',
        id: 'review',
      },
    ];
    return (
      <section className={s.page}>
        <Subnav isLogged={logged} onLogout={this.onLogout} />
        <CtaInfo toggleGiftcard={this.handleGiftcard} infoClass={'infocheckout'} />
        <section>
          <GiftCardInput
            toggleGiftcard={this.handleGiftcard}
            infoClass={this.state.className}
          />
          <ContentWrapper tabs={contentTabs} tabsClass={'show'} clickTab={this.clickTab} isActive={this.state.content}>
            {this.getChildren(this.state.content)}
          </ContentWrapper>
        </section>
      </section>
    );
  }
}

export default withStyles(s)(Checkout);
