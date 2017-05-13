import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Billing.css';
import f from '../../../components/Forms/Forms.css';

// Constants
import {
  CHECKOUT_BILLING,
  CHECKOUT_BILLING_FIELDS,
  STATES
} from '../../../constants/FormConsts';

// Forms and inputs
import Form from '../../../components/Forms/Form';
import FormFields from '../../../components/Forms/FormField';

class Billing extends React.Component {

  static propTypes = {
    showForm: PropTypes.bool.isRequired,
    editMode: PropTypes.bool.isRequired,
    toggleContent: PropTypes.func.isRequired,
    address: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    showCancel: PropTypes.bool.isRequired,
    onFieldChange: PropTypes.func.isRequired
  };

  getContent = () => {
    const { showForm, editMode } = this.props;
    if (editMode || showForm) {
      return 'form';
    }
    return 'same';
  };

  render() {
    const {
      formTitle,
      formSubtitle,
      buttonText
    } = CHECKOUT_BILLING;
    return (
      <Form
        formTitle={formTitle}
        formSubtitle={formSubtitle}
        buttonText={buttonText}
        onSubmit={this.props.onSubmit}
        showCancel={this.props.showCancel}
        onCancel={this.props.onCancel}
      >
        <div>
          {!this.props.editMode && <div className={cx(f.inputwrapper, f[this.getContent()])}>
            <label className={f.label} htmlFor="changeaddress">
              &nbsp;Use a different billing address?&nbsp;&nbsp;&nbsp;
              <input
                id="sameas"
                className={f.checkbox}
                name="sameas"
                type="checkbox"
                onChange={this.props.toggleContent}
              />
            </label>
          </div>}
          <div className={s[`addressform_${this.getContent()}`]}>
            {CHECKOUT_BILLING_FIELDS.map((v, k) => (
              <FormFields
                key={k}
                elem={v}
                value={this.props.address[v.value]}
                onChange={this.props.onFieldChange}
                options={STATES}
              />
            ))}
          </div>
          {/* Keep here until we figure the functionality */}
          <div className={f.inputwrapper}>
            <label className={f.label} htmlFor="notes">Order Notes</label>
            <textarea
              id="notes"
              name="notes"
              rows="2"
              cols="5"
              className={f.textarea}
              placeholder="Notes about your order, e.g. special notes for delivery."
              onChange={(event) => this.props.onFieldChange('notes', event.target.value)}
            />
          </div>
        </div>
      </Form>
    );
  }
}

export default withStyles(s, f)(Billing);
