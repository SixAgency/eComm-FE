import React, { PropTypes, Component } from 'react';
import { Link, browserHistory } from 'react-router';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import accounting from 'accounting';

import s from './ProductGridItem.css';

// Components
import ProductAction from './ProductAction';
import imagePlaceholder from './image_placeholder_large.png';
// Helpers
import checkQuantities from '../../helpers/quantity';

class ProductGridItem extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
    addToCart: PropTypes.func.isRequired,
    setMessage: PropTypes.func,
    cartItems: PropTypes.array,
    priceclass: PropTypes.string,
    nameclass: PropTypes.string,
    catclass: PropTypes.string,
    buttonclass: PropTypes.string
  };

  getPrice = (calcReduced = false) => {
    const { product } = this.props;
    if (product.classifications.length !== 0 && product.classifications[0].taxon.name === 'Gifts') {
      return `${accounting.formatMoney(product.price)} - ${accounting.formatMoney(product.variants.slice(-1)[0].price)}`;
    }
    if (calcReduced) {
      const { sale, price } = product;
      return parseFloat(price) - (parseFloat(price) * (sale / 100));
    }
    return accounting.formatMoney(product.price);
  };


  addToCart = (event) => {
    event.preventDefault();
    const data = {
      id: this.props.product.master.id,
      quantity: 1
    };
    const flag = checkQuantities({
      ...data,
      items: this.props.cartItems
    });
    if (!flag) {
      const messages = this.props.product.max_quantity_allowed_in_cart === 0 ?
      [
        "We're sorry but the product is not available at the moment."
      ]
      :
      [
        `You may only purchase a maximum
         ${this.props.product.max_quantity_allowed_in_cart}
         ${this.props.product.name} at one time`
      ];
      this.props.setMessage({
        isError: true,
        messages
      });
      window.scrollTo(0, 0);
    } else {
      this.props.addToCart(data);
    }
  };

  handleText = () => {
    const product = this.props.product;

    if (product.has_variants) {
      return {
        text: (product.classifications[0].taxon.name === 'Gifts' ? 'Select Amount' : 'Select Options'),
        link: `/product/${product.slug}`
      };
    }
    return {
      text: 'Buy',
      link: '/cart',
      action: this.addToCart
    };
  };

  handleViewProduct = (product) => {
    browserHistory.push(`/product/${product.slug}`);
  }

  render() {
    const product = this.props.product;
    const actionProperties = this.handleText();
    const price = this.getPrice();
    const productImages = product.master.images;
    let image = imagePlaceholder;
    if (productImages.length > 0 && productImages[0].large_url) {
      image = productImages[0].large_url;
    }
    return (
      <div className={s.productgrid}>
        <Link className={s.plink} to={`/product/${product.slug}`}>
          <img className={s.pimage} src={image} alt={product.name} />
          {product.is_sale &&
            <div className={s.salebadge}>SALE!</div>
          }
        </Link>
        <div className={s.itemhover}>
          <div className={s.itemmeta}>
            <Link className={s.plink} to={`/product/${product.slug}`}>
              <span className={cx(s.pprice, s[this.props.priceclass], product.is_sale ? s.poriginalprice : '')}>
                {price}
              </span>
              {product.is_sale &&
                <span
                  className={cx(s.pprice, s[this.props.priceclass])}
                >
                  {accounting.formatMoney(this.getPrice(true))}
                </span>
              }
              <h2 className={cx(s.pname, s[this.props.nameclass])}>{product.name}</h2>
              <h5 className={cx(s.pcat, s[this.props.catclass])}>
                { this.props.product.classifications.length !== 0 ?
                  this.props.product.classifications[0].taxon.name :
                  'N/A'
                }
              </h5>
            </Link>
            <div className={s.buttons}>
              <Link
                className={cx(s.button, s.view, s[this.props.buttonclass])}
                onClick={() => { this.handleViewProduct(product); }}
              >
                View
              </Link>
              <ProductAction
                text={actionProperties.text}
                link={actionProperties.link}
                action={actionProperties.action}
                buttonclass={this.props.buttonclass}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(ProductGridItem);
