import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Review.css';
// Forms and inputs
import ReviewOrder from '../../../components/Forms/Checkout/ReviewOrder';

class Review extends Component {
  render() {
    return (<ReviewOrder {...this.props} />);
  }
}

export default withStyles(s)(Review);
