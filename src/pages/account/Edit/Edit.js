import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Edit.css';
// Components
import Subnav from '../../../components/Subnav';
import ContentWrapper from '../../../components/ContentWrapper';
import EditAccountForm from '../../../components/Forms/EditAccountForm';

class Edit extends React.Component {

  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    onLogout: PropTypes.func.isRequired,
  }

  render() {
    return (
      <section className={s.page}>
        <Subnav isLogged={this.props.loggedIn} onLogout={this.props.onLogout} />
        <ContentWrapper tabsClass={'hide'}>
          <EditAccountForm />
        </ContentWrapper>
      </section>
    );
  }
}

export default withStyles(s)(Edit);
