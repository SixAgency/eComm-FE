import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Forms.css';
import AddressSelect from './AddressSelect';

class AddressList extends React.Component {
  static propTypes = {
    formTitle: PropTypes.string.isRequired,
    formSubtitle: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
    address: PropTypes.number.isRequired,
    addresses: PropTypes.array.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div className={s.cformcontent}>
        <h1 className={s.title}>{this.props.formTitle}</h1>
        <h2 className={s.subtitle}>{this.props.formSubtitle}</h2>
        <form className={cx(s.form, s.addresses)} onSubmit={this.props.onSubmit}>
          <AddressSelect
            addresses={this.props.addresses}
            onSelect={this.props.onSelect}
            onCreate={this.props.onCreate}
            address={this.props.address}
          />
          <div className={s.buttonwrapper}>
            <input className={s.submit} type="submit" value={this.props.buttonText} />
            <input
              className={cx(s.submit, s.cancel)}
              type="button"
              value="Cancel"
              onClick={this.props.onCancel}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default withStyles(s)(AddressList);
