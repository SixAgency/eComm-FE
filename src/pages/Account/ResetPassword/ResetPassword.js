import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ResetPassword.css';
// Components
import Subnav from '../../../components/Subnav';
import ContentWrapper from '../../../components/ContentWrapper';
import ResetPasswordInputs from '../../../components/Forms/ResetPasswordInputs';
import ErrorDisplay from '../../../components/ErrorDisplay';

class ResetPassword extends React.Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    messages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired,
    resetMessages: PropTypes.func.isRequired
  }

  render() {
    return (
      <section className={s.page}>
        <Subnav isLogged={this.props.loggedIn} />
        <ErrorDisplay
          messages={this.props.messages}
          isError={this.props.isError}
        />
        <ContentWrapper tabsClass={'hide'}>
          <ResetPasswordInputs
            formTitle={'reset password'}
            formSubtitle={'Please enter a new password'}
            buttonText={'submit'}
            onSubmit={this.props.onSubmit}
            resetMessages={this.props.resetMessages}
          />
        </ContentWrapper>
      </section>
    );
  }
}

export default withStyles(s)(ResetPassword);
