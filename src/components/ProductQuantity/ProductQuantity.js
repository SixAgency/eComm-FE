import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './ProductQuantity.css';

class ProductQuantity extends React.Component {

  static propTypes = {
    sizingClass: PropTypes.string,
    addQuantity: PropTypes.func.isRequired,
    subQuantity: PropTypes.func.isRequired,
    quantity: PropTypes.number.isRequired
  };

  render() {
    return (
      <div className={cx(s.quantity, s[this.props.sizingClass])}>
        <input
          className={cx(s.input, s.minus)}
          type="button"
          defaultValue="-"
          size="4"
          onClick={this.props.subQuantity}
        />
        <input
          className={cx(s.input, s.text)}
          type="number"
          step="1"
          min="1"
          max="99"
          name="quantity"
          value={this.props.quantity}
          onChange={() => {}}
          title="Qty"
          size="4"
        />
        <input
          className={cx(s.input, s.plus)}
          type="button"
          defaultValue="+"
          onClick={this.props.addQuantity}
        />
      </div>
    );
  }
}

export default withStyles(s)(ProductQuantity);
