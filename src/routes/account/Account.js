import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Account.css';
import Subnav from '../../components/Subnav';
import ContentWrapper from '../../components/ContentWrapper';
// Forms
import LoginForm from '../../components/Forms/LoginForm';
import RegForm from '../../components/Forms/RegForm';

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: 'blogin',
    };
  }

  getChildren = (state) => {
    if (state === 'bregister') {
      return <RegForm />;
    }
    return <LoginForm />;
  };

  clickTab = (event) => {
    event.preventDefault();
    this.setState({
      content: event.target.title,
    });
  }

  render() {
    const contentTabs = [
      {
        name: 'Login',
        title: 'blogin',
        cname: 'login',
      },
      {
        name: 'Register',
        title: 'bregister',
        cname: 'register',
      },
    ];
    return (
      <section className={s.page}>
        <Subnav />
        <ContentWrapper tabs={contentTabs} tabsClass={'show'} clickTab={this.clickTab} isActive={this.state.content}>
          {this.getChildren(this.state.content)}
        </ContentWrapper>
      </section>
    );
  }
}

export default withStyles(s)(Account);
