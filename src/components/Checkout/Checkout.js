import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Checkout.css';
import Subnav from '../Subnav';
import ErrorDisplay from '../ErrorDisplay';
import ToggleLink from '../ToggleLink';
import LoginInput from '../LoginInput';
import ContentWrapper from '../ContentWrapper';
import { CHECKOUT_TABS } from '../../constants/AppConsts';

class Checkout extends React.Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
    state: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    breadcrumbs: PropTypes.array.isRequired,
    messages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired,
    forwardTo: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
    onLogin: PropTypes.func.isRequired,
    coveredByStoreCredit: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {
      showLoginForm: false
    };
  }

  /**
   * Set tab disabled attribute
   * @param button
   * @returns {boolean}
   */
  setDisabled = (button) => {
    const { state } = this.props;
    switch (button.id) {
      case 'shipping': {
        return false;
      }
      case 'billing': {
        return state === 'address';
      }
      case 'promo': {
        return ['address', 'delivery'].includes(state);
      }
      case 'review': {
        return ['address', 'delivery'].includes(state);
      }
      default: {
        return true;
      }
    }
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
          forwardTo={this.props.forwardTo}
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
        </section>
        <section>
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
          cartState={this.props.state}
          coveredByStoreCredit={this.props.coveredByStoreCredit}
        >
          {children}
        </ContentWrapper>
      </section>
    );
  }
}

export default withStyles(s)(Checkout);
