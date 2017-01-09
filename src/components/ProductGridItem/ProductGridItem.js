import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './ProductGridItem.css';
import Link from '../Link';
import ProductAction from './ProductAction';

class ProductGridItem extends React.Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
    priceclass: PropTypes.string,
    nameclass: PropTypes.string,
    catclass: PropTypes.string,
  }

  addToCart = () => {
    console.log('added to cart');
  }

  handleText = () => {
    const product = this.props.product;

    if (product.has_variants) {
      return {
        text: (product.classifications[0].taxon.name === 'Gifts' ? 'Select Amount' : 'Select Options'),
        link: `/product/${product.slug}`,
      };
    }
    return {
      text: 'Buy',
      link: '/cart',
      action: this.addToCart,
    };
  }

  handlePricing = () => {
    const product = this.props.product;
    if (product.classifications[0].taxon.name === 'Gifts') {
      return `${product.display_price} - ${product.variants.slice(-1)[0].price}`;
    }
    return product.display_price;
  }

  render() {
    const product = this.props.product;
    const actionProperties = this.handleText();
    const price = this.handlePricing();
    return (
      <div className={s.productgrid}>
        <Link className={s.plink} to={`/product/${product.slug}`}>
          <img className={s.pimage} src={product.master.images[0].large_url} alt={product.name} />
        </Link>
        <div className={s.itemhover}>
          <div className={s.itemmeta}>
            <Link className={s.plink} to={`/product/${product.slug}`}>
              <span className={cx(s.pprice, s[this.props.priceclass])}>
                {price}
              </span>
              <h2 className={cx(s.pname, s[this.props.nameclass])}>{product.name}</h2>
              <h5 className={cx(s.pcat, s[this.props.catclass])}>
                {this.props.product.classifications[0].taxon.name}
              </h5>
            </Link>
            <div className={s.buttons}>
              <Link className={cx(s.button, s.view)} to={`/product/${product.slug}`}>View</Link>
              <ProductAction
                text={actionProperties.text}
                link={actionProperties.link}
                action={actionProperties.action}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(ProductGridItem);
