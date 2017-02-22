import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Account.css';
import Subnav from '../../../components/Subnav';
import ContentWrapper from '../../../components/ContentWrapper';

// Forms
import LoginForm from '../../../components/Forms/LoginForm';
import RegForm from '../../../components/Forms/RegForm';

import ErrorDisplay from '../../../components/ErrorDisplay';

class Account extends React.Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    content: PropTypes.string.isRequired,
    clickTab: PropTypes.func.isRequired,
    onLogin: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
    onRegister: PropTypes.func.isRequired,
    messages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired
  };

  getChildren = (state) => {
    if (state === 'bregister') {
      return <RegForm onRegister={this.props.onRegister} />;
    }
    return <LoginForm onLogin={this.props.onLogin} />;
  };

  render() {
    const contentTabs = [
      {
        name: 'Login',
        title: 'Login',
        cname: 'login',
        id: 'blogin'
      },
      {
        name: 'Register',
        title: 'Register',
        cname: 'register',
        id: 'bregister'
      }
    ];
    return (
      <section className={s.page}>
        <Subnav isLogged={this.props.loggedIn} onLogout={this.props.onLogout} />
        <ErrorDisplay
          messages={this.props.messages}
          isError={this.props.isError}
        />
        <ContentWrapper
          tabs={contentTabs}
          tabsClass="account"
          clickTab={this.props.clickTab}
          isActive={this.props.content}
        >
          {this.getChildren(this.props.content)}
        </ContentWrapper>
      </section>
    );
  }
}

export default withStyles(s)(Account);
