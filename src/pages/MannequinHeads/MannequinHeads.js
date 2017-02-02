import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './MannequinHeads.css';

import Grid from '../../components/Grid';

class MannequinHeads extends Component {
  static propTypes = {
    products: PropTypes.array.isRequired,
    addToCart: PropTypes.func.isRequired,
  }

  render() {
    const { products } = this.props;
    return (
      <div className={s.mannequinheadspage}>
        <div className={s.pagewrapper}>
          <h2 className={s.title}>ks Mannequin Heads</h2>
          <Grid
            gridClass="productsgrid"
            gridItems={{ products, isLoaded: true }}
            addToCart={this.props.addToCart}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(MannequinHeads);
