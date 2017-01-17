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
    onLogout: PropTypes.func.isRequired,
    onRegister: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired,
    isError: PropTypes.bool.isRequired,
  }

  handleError = (flag, data) => {
    if(flag === true ){
      return data;
    }
    return '';
  }

  // handleErrorDisplay = () => {
  //   frontEndError = this.handleError();
  //   if( this.state.message != null ) {
  //     return(
  //       <ErrorDisplay
  //         message={this.props.message}
  //         isError={this.props.isError}
  //         loggedIn={this.props.loggedIn}
  //       />
  //     )
  //   }else if(frontEndError != ''){
  //     return(
  //       <ErrorDisplay
  //         message={frontEndError}
  //         isError
  //         loggedIn={this.props.loggedIn}
  //       />
  //     )
  //   }
  //   return '';
  // }

  handleErrorDisplay = () => {
    frontEndError = this.handleError();
    console.log(frontEndError);
  }

  getChildren = (state) => {
    if (state === 'bregister') {
      return <RegForm onRegister={this.props.onRegister} />;
    }
    return <LoginForm onLogin={this.props.onLogin} handleError={this.handleError} />;
  }

  render() {
    return (
      <section className={s.page}>
        <Subnav isLogged={this.props.loggedIn} onLogout={this.props.onLogout} />
          <ErrorDisplay
            message={this.props.message}
            isError={this.props.isError}
            loggedIn={this.props.loggedIn}
          />
          {this.handleErrorDisplay}
        <ContentWrapper
          tabs={this.props.contentTabs}
          tabsClass={'show'}
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
