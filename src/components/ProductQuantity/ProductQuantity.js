import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './ProductQuantity.css';

class ProductQuantity extends React.Component {

  static propTypes = {
    sizingClass: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      inputValue: '1',
    };
  }

  subtract = () => {
    let value = parseInt(this.state.inputValue, 10);
    if (value >= 2 && value <= 10) {
      value -= 1;
      this.setState({
        inputValue: value,
      });
    }
  }

  add = () => {
    let value = parseInt(this.state.inputValue, 10);
    if (value >= 1 && value < 10) {
      value += 1;
      this.setState({
        inputValue: value,
      });
    }
  }

  render() {
    return (
      <div className={cx(s.quantity, s[this.props.sizingClass])}>
        <input
          className={cx(s.input, s.minus)}
          type="button"
          defaultValue="-"
          size="4"
          onClick={this.subtract}
          onChange={() => {}}
        />
        <input
          className={cx(s.input, s.text)}
          type="number"
          step="1"
          min="1"
          max="10"
          name="quantity"
          value={this.state.inputValue}
          onChange={() => {}}
          title="Qty"
          size="4"
        />
        <input
          className={cx(s.input, s.plus)}
          type="button"
          defaultValue="+"
          onClick={this.add}
          onChange={() => {}}
        />
      </div>
    );
  }
}

export default withStyles(s)(ProductQuantity);
