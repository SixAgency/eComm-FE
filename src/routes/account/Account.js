import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Account.css';
import fetch from '../../core/fetch';
import Subnav from '../../components/Subnav';
import ContentWrapper from '../../components/ContentWrapper';
// Forms
import LoginForm from '../../components/Forms/LoginForm';
import RegForm from '../../components/Forms/RegForm';
import Dashboard from '../../components/Dashboard';

/* @TODO - Refactor - Use Redux */
class Account extends React.Component {
  static propTypes = {
    logged: PropTypes.bool.isRequired,
    username: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      content: 'blogin',
      logged: this.props.logged,
      username: this.props.username,
    };
  }

  onRegister = (data) => {
    fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
    })
    .then((resp) => (resp.json()))
    .then((json) => this.handleAuth(json));
  }

  onLogin = (data) => {
    fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
    })
    .then((resp) => (resp.json()))
    .then((json) => this.handleAuth(json));
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
    if (this.state.logged) {
      return <Dashboard userName={this.state.username} />;
    }
    if (state === 'bregister') {
      return <RegForm onRegister={this.onRegister} />;
    }
    return <LoginForm onLogin={this.onLogin} />;
  }
  handleLogout = (data) => {
    if (data.error) {
      this.setState({
        isError: true,
        error: data.error,
      });
    } else {
      this.setState({
        logged: false,
        username: '',
      });
    }
  }
  handleAuth = (data) => {
    if (data.error) {
      this.setState({
        isError: true,
        error: data.error,
      });
    } else {
      this.setState({
        logged: true,
        username: data.username,
      });
    }
  }

  clickTab = (event) => {
    event.preventDefault();
    this.setState({
      content: event.target.title,
    });
  }

  render() {
    const contentTabs = this.state.logged ? [] : [
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
        <Subnav isLogged={this.state.logged} onLogout={this.onLogout} />
        <ContentWrapper tabs={contentTabs} tabsClass={'show'} clickTab={this.clickTab} isActive={this.state.content}>
          {this.getChildren(this.state.content)}
        </ContentWrapper>
      </section>
    );
  }
}

export default withStyles(s)(Account);
