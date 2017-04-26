import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './MannequinHeads.css';

import Grid from '../../components/Grid';
import ErrorDisplay from '../../components/ErrorDisplay';

class MannequinHeads extends Component {
  static propTypes = {
    products: PropTypes.object.isRequired,
    addToCart: PropTypes.func.isRequired,
    cartItems: PropTypes.object.isRequired,
    setMessage: PropTypes.func.isRequired,
    messages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired
  };

  render() {
    if (this.props.products.isLoaded && this.props.cartItems.isLoaded) {
      return (
        <div className={s.mannequinheadspage}>
          <ErrorDisplay messages={this.props.messages} isError={this.props.isError} />
          <div className={s.pagewrapper}>
            <h2 className={s.title}>ks Mannequin Heads</h2>
            <Grid
              gridClass="mannequingrid"
              gridItems={this.props.products}
              addToCart={this.props.addToCart}
              cartItems={this.props.cartItems.cart.line_items}
              setMessage={this.props.setMessage}
              isError={this.props.isError}
            />
          </div>
        </div>
      );
    }
    return null;
  }
}

export default withStyles(s)(MannequinHeads);
