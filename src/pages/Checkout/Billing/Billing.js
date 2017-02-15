import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Billing.css';
// Components
import Subnav from '../../../components/Subnav';
import CtaInfo from '../../../components/CartCta/CtaInfo';
import ErrorDisplay from '../../../components/ErrorDisplay';
import ContentWrapper from '../../../components/ContentWrapper';
// Forms and inputs
import GiftCardInput from '../../../components/GiftCardInput/GiftCardInput';
import LoginInput from '../../../components/LoginInput/LoginInput';
import AddressList from '../../../components/Forms/AddressList';
import AddressForm from '../../../components/Forms/AddressForm';

class Billing extends React.Component {

  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    onLogin: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
    handleGiftcard: PropTypes.func.isRequired,
    couponClass: PropTypes.string.isRequired,
    handleLogin: PropTypes.func.isRequired,
    loginClass: PropTypes.string.isRequired,
    clickTab: PropTypes.func.isRequired,
    isActive: PropTypes.string.isRequired,
    messages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired,
    applyPromoCode: PropTypes.func.isRequired,
    contentTabs: PropTypes.array.isRequired,
    address: PropTypes.number.isRequired,
    addresses: PropTypes.array.isRequired,
    emailAddress: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onFormCancel: PropTypes.func.isRequired,
    showCancel: PropTypes.bool.isRequired,
    content: PropTypes.string.isRequired,
    breadcrumbs: PropTypes.array.isRequire,
  };

  getContent = () => {
    if (this.props.content === 'form') {
      const address = {
        firstname: '',
        lastname: '',
        company: '',
        phone: '',
        address1: '',
        address2: '',
        city: '',
        state_id: 0,
        zipcode: '',
      };
      const showEmailPhone = true;
      return (
        <AddressForm
          formTitle={'Create Address'}
          formSubtitle={'Fulfill your details'}
          showEmailPhone={showEmailPhone}
          buttonText={'save address'}
          selectClass={'checkoutselect'}
          emailAddress={this.props.emailAddress}
          address={address}
          onSubmit={this.props.onFormSubmit}
          onCancel={this.props.onFormCancel}
        />
      );
    }
    const showCancel = false;
    return (
      <AddressList
        formTitle="Billing Address"
        formSubtitle="Set the billing address"
        buttonText="Proceed"
        address={this.props.address}
        addresses={this.props.addresses}
        onSubmit={this.props.onSubmit}
        onCreate={this.props.onCreate}
        showCancel={showCancel}
      />
    );
  };

  render() {
    return (
      <section className={s.page}>
        <Subnav
          isLogged={this.props.loggedIn}
          onLogout={this.props.onLogout}
          breadcrumbs={this.props.breadcrumbs}
        />
        <ErrorDisplay
          messages={this.props.messages}
          isError={this.props.isError}
        />
        <CtaInfo
          loggedIn={this.props.loggedIn}
          toggleGiftcard={this.props.handleGiftcard}
          toggleLogin={this.props.handleLogin}
          infoClass="infocheckout"
        />
        <section>
          <div className={s.giftCardwrpr}>
            <GiftCardInput
              toggleGiftcard={this.props.handleGiftcard}
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
        <ContentWrapper
          tabs={this.props.contentTabs}
          tabsClass="show"
          clickTab={this.props.clickTab}
          isActive={this.props.isActive}
        >
          { this.getContent() }
        </ContentWrapper>
      </section>
    );
  }
}

export default withStyles(s)(Billing);
