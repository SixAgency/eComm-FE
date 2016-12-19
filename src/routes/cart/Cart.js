import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Cart.css';

class Cart extends React.Component {
  render() {
    return (
      <div className={s.root}>HOME</div>
    );
  }
}

export default withStyles(s)(Cart);
