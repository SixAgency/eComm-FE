import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Forms.css';

class AddressSelect extends React.Component {

  static propTypes = {
    addresses: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
    addressId: PropTypes.number.isRequired,
    onBottomButtonClick: PropTypes.func,
    showBottomButton: PropTypes.bool,
    bottomButtonText: PropTypes.string,
    selectClass: PropTypes.string
  };

  static defaultProps = {
    showBottomButton: true,
    bottomButtonText: 'Add another address'
  };

  getActive = (id) => (this.props.addressId === id);

  render() {
    return (
      <div className={s[this.props.selectClass]}>
        { this.props.addresses.map((value, key) => (
          <div className={cx(s.radiowrapper, s.selectwrapper)} key={key}>
            <input
              id={value.id}
              value={value.id}
              type="radio"
              name="addresses"
              className={s.radio}
              checked={this.getActive(value.id)}
              onChange={this.props.onSelect}
            />
            <label htmlFor={value.id} className={s.labelselect}>
              {value.firstname} {value.lastname}<br />
              {value.address1} {value.address2}<br />
              {value.city}, {value.state_id}, {value.zipcode}<br />
              {value.phone}
            </label>
          </div>
        ))}
        { this.props.showBottomButton && <div className={s.buttonwrapper}>
          <input
            className={s.submitadd}
            type="button"
            value={this.props.bottomButtonText}
            onClick={this.props.onBottomButtonClick}
          />
        </div>}
      </div>
    );
  }
}

export default withStyles(s)(AddressSelect);
