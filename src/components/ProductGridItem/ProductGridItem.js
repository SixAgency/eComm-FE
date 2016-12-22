import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './ProductGridItem.css';
import Link from '../Link';

class ProductGridItem extends React.Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
  }

  render() {
    const product = this.props.product;

    return (
      <div className={s.productgrid}>
        <Link className={s.plink} to={`/product/${product.slug}`}>
          <img className={s.pimage} src={product.master.images[0].large_url} alt={product.name} />
        </Link>
        <div className={s.itemhover}>
          <div className={s.itemmeta}>
            <Link className={s.plink} to={`/product/${product.slug}`}>
              <span className={s.pprice}>{product.display_price}–{product.display_price}</span>
              <h2 className={s.pname}>{product.name}</h2>
              <h5 className={s.pcat}>GIFTS</h5>
            </Link>
            <div className={s.buttons}>
              <Link className={cx(s.button, s.view)} to={`/product/${product.slug}`}>View</Link>
              <Link className={cx(s.button, s.select)} to={`/product/${product.slug}`}>Select amount</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(ProductGridItem);
