import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Account.css';
import Subnav from '../../../components/Subnav';
import ContentWrapper from '../../../components/ContentWrapper';
import ErrorDisplay from '../../../components/ErrorDisplay';
import { ACCOUNT_TABS } from '../../../constants/AppConsts';

// Forms
import LoginForm from '../../../components/Forms/LoginForm';
import RegForm from '../../../components/Forms/RegForm';

class Account extends React.Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    activeTab: PropTypes.string.isRequired,
    clickTab: PropTypes.func.isRequired,
    onLogin: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
    onRegister: PropTypes.func.isRequired,
    messages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired,
    breadcrumbs: PropTypes.array,
    forwardTo: PropTypes.func.isRequired
  };

  getChildren = () => {
    const { activeTab } = this.props;
    if (activeTab === 'bregister') {
      return <RegForm onRegister={this.props.onRegister} />;
    }
    return <LoginForm onLogin={this.props.onLogin} isError={this.props.isError} />;
  };

  render() {
    const {
      loggedIn,
      onLogout,
      breadcrumbs,
      forwardTo,
      messages,
      isError,
      clickTab,
      activeTab
    } = this.props;
    const showContentTabs = true;
    return (
      <section className={s.page}>
        <Subnav
          isLogged={loggedIn}
          onLogout={onLogout}
          breadcrumbs={breadcrumbs}
          forwardTo={forwardTo}
        />
        <ErrorDisplay
          messages={messages}
          isError={isError}
        />
        <ContentWrapper
          tabs={ACCOUNT_TABS}
          clickTab={clickTab}
          activeTab={activeTab}
          showContentTabs={showContentTabs}
        >
          {this.getChildren()}
        </ContentWrapper>
      </section>
    );
  }
}

export default withStyles(s)(Account);
