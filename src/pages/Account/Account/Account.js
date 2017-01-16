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
    contentTabs: PropTypes.array.isRequired,
    clickTab: PropTypes.func.isRequired,
    onLogin: PropTypes.func.isRequired,
    onRegister: PropTypes.func.isRequired,
  }

  getChildren = (state) => {
    if (state === 'bregister') {
      return <RegForm onRegister={this.props.onRegister} />;
    }
    return <LoginForm onLogin={this.props.onLogin} />;
  }

  render() {
    return (
      <section className={s.page}>
        <Subnav isLogged={this.props.loggedIn} />
        <ContentWrapper tabs={this.props.contentTabs} tabsClass={'show'} clickTab={this.props.clickTab} isActive={this.props.content}>
          {this.getChildren(this.props.content)}
        </ContentWrapper>
      </section>
    );
  }
}

export default withStyles(s)(Account);
