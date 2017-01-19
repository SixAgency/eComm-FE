import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Product.css';
import RelatedProducts from '../../components/RelatedProducts';
import AddToCart from '../../components/AddToCart';
import imagePlaceholder from './image_placeholder_large.png';

class Product extends React.Component {

  static propTypes = {
    product: PropTypes.object.isRequired,
    addToCart: PropTypes.func.isRequired,
  }

  render() {
    const { isLoaded, product } = this.props.product;
    if (!isLoaded) {
      return null;
    }
    let image = imagePlaceholder;
    const productImages = product.master.images;
    if (productImages.length > 0 && productImages[0].large_url) {
      image = productImages[0].large_url;
    }
    return (
      <div className={s.page}>
        <div className={s.left}>
          <div className={s.container}>
            <img
              className={s.pimage}
              src={image}
              alt={product.name}
            />
            <RelatedProducts gridRecs={product.recs} addToCart={this.props.addToCart} />
          </div>
        </div>
        <div className={s.right}>
          <div className={s.content}>
            <div className={s.summary}>
              <div className={s.summarytop}>
                <div className={s.video} />
                <nav className={s.breadcrumb}>
                  <Link className={s.innerlink} to="/">Shop</Link>
                  <span className={s.divider}>&gt;</span>
                  <Link className={s.innerlink} to={`/product-category/${product.slug}`}>{product.classifications[0].taxon.name}</Link>
                  <span className={s.divider}>&gt;</span>
                  {product.name}
                </nav>
                <h1 className={s.pname}>{product.name}</h1>
                <div className={s.price}>
                  <span className={s.old}>{product.display_price}</span>
                  <span className={s.current}>{product.display_price}</span>
                </div>
              </div>
              <AddToCart onSubmit={this.props.addToCart} product={this.props.product} />
              <div className={s.summarymiddle}>
                <div className={cx(s.summarytab, s.summaryopen)}>
                  <h3 className={s.summarytitle}>Description</h3>
                  <div className={s.summarycontent}>
                    <p className={s.summaryparagraph}>{product.description}</p>
                  </div>
                </div>
                <div className={cx(s.summarytab, s.summaryclosed)}>
                  <h3 className={s.summarytitle}>Reviews (0)</h3>
                  <div className={s.summarycontent}>
                    <p className={s.summaryparagraph}>{product.reviews}</p>
                  </div>
                </div>
              </div>
              <div className={s.summarybottom}>
                <span className={s.sku}>SKU:&nbsp;{product.master.sku}</span>
                <span className={s.category}>Category:&nbsp;
                  <Link to={`/product-category/${product.slug}`} className={s.categorylink}>{product.classifications[0].taxon.name}</Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Product);
