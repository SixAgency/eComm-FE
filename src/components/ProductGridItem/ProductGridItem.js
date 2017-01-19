import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './ProductGridItem.css';
import ProductAction from './ProductAction';
import imagePlaceholder from './image_placeholder.png';

class ProductGridItem extends React.Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
    addToCart: PropTypes.func.isRequired,
    priceclass: PropTypes.string,
    nameclass: PropTypes.string,
    catclass: PropTypes.string,
  }

  addToCart = (event) => {
    event.preventDefault();

    const data = {
      id: this.props.product.master.id,
      quantity: 1,
    };

    this.props.addToCart(data);
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
    const productImages = product.master.images;
    let image = imagePlaceholder;
    if (productImages.length > 0 && productImages[0].large_url) {
      image = productImages[0].large_url;
    }
    return (
      <div className={s.productgrid}>
        <Link className={s.plink} to={`/product/${product.slug}`}>
          <img className={s.pimage} src={image} alt={product.name} />
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
