import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import BasePageComponent from '../../BasePageComponent';
import GiftCard from './GiftCard';

// Action
import { onLogout, onLogin, onRegister, redeemGiftCard, getStoreCredit } from '../../../actions/user';
import { setHeaderProps, resetMessages, toggleLoader, setPending } from '../../../actions/page';
import { forwardTo } from '../../../actions/handler';

const mapStateToProps = ((state) => (
  {
    loggedIn: state.user.loggedIn,
    messages: state.page.messages,
    isError: state.page.isError,
    creditInfo: state.user.creditInfo,
    isFetched: (
      !state.page.isPending &&
      state.user.creditInfo.isLoaded
    )
  }
));

const mapDispatchToProps = ((dispatch) => (
  {
    setHeaderProps: (props) => dispatch(setHeaderProps(props)),
    toggleLoader: (toggle) => dispatch(toggleLoader(toggle)),
    resetMessages: () => dispatch(resetMessages()),
    onLogout: (data) => dispatch(onLogout(data)),
    onLogin: (data, redirect) => dispatch(onLogin(data, redirect)),
    onRegister: (data, redirect) => dispatch(onRegister(data, redirect)),
    getStoreCredit: () => dispatch(getStoreCredit()),
    redeemGiftCard: (code) => dispatch(redeemGiftCard(code)),
    setPending: (status) => dispatch(setPending(status))
  }
));

class GiftCardWrapper extends BasePageComponent {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    onLogin: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
    onRegister: PropTypes.func.isRequired,
    setHeaderProps: PropTypes.func.isRequired,
    toggleLoader: PropTypes.func.isRequired,
    resetMessages: PropTypes.func.isRequired,
    redeemGiftCard: PropTypes.func.isRequired,
    setPending: PropTypes.func.isRequired,
    creditInfo: PropTypes.object.isRequired,
    isError: PropTypes.bool.isRequired,
    isFetched: PropTypes.bool.isRequired,
    route: PropTypes.object
  };

  componentWillMount = () => {
    const props = {
      headerClass: 'colored',
      activeSlug: '/my-account'
    };
    this.props.setHeaderProps(props);
  };

  componentDidMount = () => {
    window.scrollTo(0, 0);
    this.props.getStoreCredit();
  };

  componentWillUnmount = () => {
    console.log('remove');
    this.props.resetMessages();
    this.props.toggleLoader(true);
  };

  componentWillReceiveProps = (nextProps) => {
    const { loggedIn } = this.props;
    if (nextProps.isFetched) {
      setTimeout(() => {
        this.props.toggleLoader(false);
      }, 250);
    } else {
      if (loggedIn !== nextProps.loggedIn) {
        this.props.getStoreCredit();
      }
      this.props.toggleLoader(true);
    }
  };

  onLogin = (data) => {
    this.props.setPending(true);
    this.props.resetMessages();
    setTimeout(() => {
      window.scrollTo(0, 0);
      this.props.onLogin(data, true);
    }, 250);
  };

  onRegister = (data) => {
    this.props.setPending(true);
    this.props.resetMessages();
    setTimeout(() => {
      window.scrollTo(0, 0);
      this.props.onRegister(data, true);
    }, 250);
  };

  onRedeemGiftCard = (code) => {
    this.props.toggleLoader(true);
    setTimeout(() => {
      window.scrollTo(0, 0);
      this.props.redeemGiftCard(code);
    }, 250);
  }

  render() {
    return (
      <GiftCard
        loggedIn={this.props.loggedIn}
        creditInfo={this.props.creditInfo}
        onLogout={this.props.onLogout}
        onLogin={this.onLogin}
        onRegister={this.onRegister}
        redeemGiftCard={this.onRedeemGiftCard}
        messages={this.props.messages}
        isError={this.props.isError}
        breadcrumbs={this.props.route.breadcrumbs}
        forwardTo={forwardTo}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GiftCardWrapper);
