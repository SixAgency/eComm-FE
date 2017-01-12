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
    loggedIn: PropTypes.bool.isRequired,
    onLogout: PropTypes.func.isRequired,
    handleGiftcard: PropTypes.func.isRequired,
    couponClass: PropTypes.string.isRequired,
    clickTab: PropTypes.func.isRequired,
    content: PropTypes.string.isRequired,
  }

  getChildren = () => {
    const content = this.props.content;
    if (content === 'shipping') {
      return <ShippingAddress />;
    } else if (content === 'promocode') {
      return <PromoCode />;
    } else if (content === 'review') {
      return <ReviewOrder cartItems={this.props.cartItems} />;
    }
    return (
      <BillingForm
        formTitle={'billing address'}
        formSubtitle={'Fill in your details'}
        buttonText={'proceed'}
        selectClass={'checkoutselect'}
      />
    );
  }

  render() {
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
        <Subnav isLogged={this.props.loggedIn} onLogout={this.props.onLogout} />
        <CtaInfo toggleGiftcard={this.props.handleGiftcard} infoClass={'infocheckout'} />
        <section>
          <GiftCardInput
            toggleGiftcard={this.props.handleGiftcard}
            infoClass={this.props.couponClass}
          />
          <ContentWrapper tabs={contentTabs} tabsClass={'show'} clickTab={this.props.clickTab} isActive={this.props.content}>
            {this.getChildren()}
          </ContentWrapper>
        </section>
      </section>
    );
  }
}

export default withStyles(s)(Checkout);
