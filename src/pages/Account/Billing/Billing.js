import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Billing.css';
// Constants
import {
  ACCOUNT_BILLING,
  ACCOUNT_ADDRESS_FIELDS,
  STATES
} from '../../../constants/FormConsts';

// Components
import Subnav from '../../../components/Subnav';
import ContentWrapper from '../../../components/ContentWrapper';
import Form from '../../../components/Forms/Form';
import FormFields from '../../../components/Forms/FormField';
import ErrorDisplay from '../../../components/ErrorDisplay';

class Billing extends React.Component {

  static propTypes = {
    address: PropTypes.object.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    onLogout: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onFieldChange: PropTypes.func.isRequired,
    messages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired,
    forwardTo: PropTypes.func.isRequired,
    breadcrumbs: PropTypes.array
  };

  render() {
    const {
      formTitle,
      formSubtitle,
      buttonText,
      showCancel
    } = ACCOUNT_BILLING;
    return (
      <section className={s.page}>
        <Subnav
          isLogged={this.props.loggedIn}
          onLogout={this.props.onLogout}
          breadcrumbs={this.props.breadcrumbs}
          forwardTo={this.props.forwardTo}
        />
        <ErrorDisplay messages={this.props.messages} isError={this.props.isError} />
        <ContentWrapper tabsClass={'hide'}>
          <Form
            formTitle={formTitle}
            formSubtitle={formSubtitle}
            buttonText={buttonText}
            onSubmit={this.props.onSubmit}
            onCancel={this.props.onCancel}
            showCancel={showCancel}
          >
            <div>
              {ACCOUNT_ADDRESS_FIELDS.map((v, k) => (
                <FormFields
                  key={k}
                  elem={v}
                  value={this.props.address[v.value]}
                  onChange={this.props.onFieldChange}
                  options={STATES}
                />
              ))}
            </div>
          </Form>
        </ContentWrapper>
      </section>
    );
  }
}

export default withStyles(s)(Billing);
