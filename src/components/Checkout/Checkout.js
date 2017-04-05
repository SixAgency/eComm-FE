import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Checkout.css';
import Subnav from '../Subnav';
import ErrorDisplay from '../ErrorDisplay';
import ToggleLink from '../ToggleLink';
import GiftCardInput from '../GiftCardInput';
import LoginInput from '../LoginInput';
import ContentWrapper from '../ContentWrapper';
import { CHECKOUT_TABS } from '../../constants/AppConsts';

class Checkout extends React.Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
    state: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    isPayPal: PropTypes.bool.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    breadcrumbs: PropTypes.array.isRequired,
    messages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired,
    forwardTo: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
    onLogin: PropTypes.func.isRequired,
    applyPromoCode: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      showGiftCardForm: false,
      showLoginForm: false
    };
  }

  /**
   * Set tab disabled attribute
   * @param button
   * @returns {boolean}
   */
  setDisabled = (button) => {
    const { content, state, isPayPal } = this.props;
    if (button.id !== content) {
      if (['promo', 'review'].includes(button.id) && ['payment', 'confirm'].includes(state)) {
        return false;
      }
      return !(['promo', 'review'].includes(button.id) && state === 'delivery' && isPayPal);
    }
    return false;
  };

  /**
   * Tab click event handler
   * @param event
   */
  clickTab = (event) => {
    event.preventDefault();
    if (!event.target.disabled) {
      this.props.forwardTo(`checkout/${event.target.id}`);
    }
  };

  /**
   * Gift cart handler
   * @param event
   */
  toggleGiftCardForm = (event) => {
    event.preventDefault();
    this.setState({ showGiftCardForm: !this.state.showGiftCardForm });
  };

  /**
   * Login cart handler
   * @param event
   */
  toggleLoginForm = (event) => {
    event.preventDefault();
    this.setState({ showLoginForm: !this.state.showLoginForm });
  };

  render() {
    const {
      content,
      children,
      loggedIn,
      onLogout,
      onLogin,
      applyPromoCode,
      breadcrumbs,
      messages,
      isError

    } = this.props;
    const showContentTabs = true;
    return (
      <section className={s.page}>
        <Subnav
          isLogged={loggedIn}
          onLogout={onLogout}
          breadcrumbs={breadcrumbs}
        />
        <ErrorDisplay
          messages={messages}
          isError={isError}
        />
        <section>
          {!loggedIn && <ToggleLink
            preText="Returning customer?"
            linkText="Click here to login"
            toggleForm={this.toggleLoginForm}
          />}
          <ToggleLink
            preText="Do you have a gift card?"
            linkText="Click here to enter your code"
            toggleForm={this.toggleGiftCardForm}
          />
        </section>
        <section>
          <GiftCardInput
            showGiftCardForm={this.state.showGiftCardForm}
            applyPromoCode={applyPromoCode}
          />
          {!loggedIn && <LoginInput
            onLogin={onLogin}
            showLoginForm={this.state.showLoginForm}
          />}
        </section>
        <ContentWrapper
          showContentTabs={showContentTabs}
          tabs={CHECKOUT_TABS}
          activeTab={content}
          clickTab={this.clickTab}
          setDisabled={this.setDisabled}
        >
          {children}
        </ContentWrapper>
      </section>
    );
  }
}

export default withStyles(s)(Checkout);
