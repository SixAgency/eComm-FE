import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './RelatedProducts.css';
import Grid from '../Grid';

class RelatedProducts extends React.Component {
  static propTypes = {
    gridRecs: PropTypes.object.isRequired,
    addToCart: PropTypes.func.isRequired,
    cartItems: PropTypes.array.isRequired,
    setMessage: PropTypes.func
  };

  render() {
    if (!this.props.gridRecs.isLoaded || this.props.gridRecs.isEmpty) {
      return null;
    }
    return (
      <div className={s.relatedwrpr}>
        <h2 className={s.relatedtitle}>You may also like...</h2>
        <Grid
          gridClass="productsgrid"
          gridItems={this.props.gridRecs}
          priceclass="rprice"
          nameclass="rname"
          catclass="rcat"
          cartItems={this.props.cartItems}
          addToCart={this.props.addToCart}
          setMessage={this.props.setMessage}
          buttonclass="rbutton"
        />
      </div>
    );
  }
}

export default withStyles(s)(RelatedProducts);
