import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './LostPassword.css';
// Components
import Subnav from '../../../components/Subnav';
import ContentWrapper from '../../../components/ContentWrapper';
import LostPasswordInputs from '../../../components/Forms/LostPasswordInputs';
import ErrorDisplay from '../../../components/ErrorDisplay';

class LostPassword extends React.Component {

  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    onLogout: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    messages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired,
    forwardTo: PropTypes.func.isRequired,
    breadcrumbs: PropTypes.array
  };

  render() {
    return (
      <section className={s.page}>
        <Subnav
          isLogged={this.props.loggedIn}
          onLogout={this.props.onLogout}
          breadcrumbs={this.props.breadcrumbs}
          forwardTo={this.props.forwardTo}
        />
        <ErrorDisplay
          messages={this.props.messages}
          isError={this.props.isError}
        />
        <ContentWrapper tabsClass={'hide'}>
          <LostPasswordInputs
            formTitle={'lost password'}
            formSubtitle={'Lost your password? Please enter your email address to receive a reset password link via email.'}
            buttonText={'Reset Password'}
            onSubmit={this.props.onSubmit}
          />
        </ContentWrapper>
      </section>
    );
  }
}

export default withStyles(s)(LostPassword);
