import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../Profile.css';
// Components
import Subnav from '../../../../components/Subnav';
import ContentWrapper from '../../../../components/ContentWrapper';
import EditPasswordForm from '../../../../components/Forms/EditPasswordForm';
import ErrorDisplay from '../../../../components/ErrorDisplay';

class Password extends Component {

  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    onLogout: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    onUpdatePassword: PropTypes.func.isRequired,
    messages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired,
    resetMessages: PropTypes.func.isRequired,
    breadcrumbs: PropTypes.array
  };

  render() {
    return (
      <section className={s.page}>
        <Subnav
          isLogged={this.props.loggedIn}
          onLogout={this.props.onLogout}
          breadcrumbs={this.props.breadcrumbs}
          resetMessages={this.props.resetMessages}
        />
        <ErrorDisplay messages={this.props.messages} isError={this.props.isError} />
        <ContentWrapper tabsClass="hide">
          <EditPasswordForm
            profile={this.props.profile}
            onUpdatePassword={this.props.onUpdatePassword}
          />
        </ContentWrapper>
      </section>
    );
  }
}

export default withStyles(s)(Password);
