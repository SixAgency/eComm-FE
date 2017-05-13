import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Profile.css';
// Components
import Subnav from '../../../components/Subnav';
import ContentWrapper from '../../../components/ContentWrapper';
import EditAccountForm from '../../../components/Forms/EditAccountForm';
import ErrorDisplay from '../../../components/ErrorDisplay';

class Edit extends Component {

  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    onLogout: PropTypes.func.isRequired,
    breadcrumbs: PropTypes.array,
    profile: PropTypes.object.isRequired,
    onUpdateProfile: PropTypes.func.isRequired,
    messages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired,
    forwardTo: PropTypes.func.isRequired
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
        <ErrorDisplay messages={this.props.messages} isError={this.props.isError} />
        <ContentWrapper tabsClass="hide">
          <EditAccountForm
            profile={this.props.profile}
            onUpdateProfile={this.props.onUpdateProfile}
          />
        </ContentWrapper>
      </section>
    );
  }
}

export default withStyles(s)(Edit);
