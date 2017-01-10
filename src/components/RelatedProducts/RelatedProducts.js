import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './RelatedProducts.css';
import Grid from '../Grid';

class RelatedProducts extends React.Component {
  static propTypes = {
    products: PropTypes.array.isRequired,
  }

  render() {
    const products = this.props.products.slice(0, 3);

    return (
      <div className={s.relatedwrpr}>
        <h2 className={s.relatedtitle}>You may also like...</h2>
        <Grid
          gridClass={'productsgrid'}
          gridItems={products}
          priceclass={'rprice'}
          nameclass={'rname'}
          catclass={'rcat'}
        />
      </div>
    );
  }
}

export default withStyles(s)(RelatedProducts);
