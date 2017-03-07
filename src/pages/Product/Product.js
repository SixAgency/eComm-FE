import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import renderHTML from 'react-render-html';
import cx from 'classnames';
import s from './Product.css';
// Components
import RelatedProducts from '../../components/RelatedProducts';
import AddToCart from '../../components/AddToCart';
import imagePlaceholder from './image_placeholder_large.png';
import EmbeddedVideo from '../../components/EmbeddedVideo';

class Product extends Component {

  static propTypes = {
    product: PropTypes.object.isRequired,
    onAddToCart: PropTypes.func.isRequired
  };

  getVideoProperty = (properties) => properties.find((prop) => (prop.property_name === 'embedded_video'));

  setVideoFlag = (videoObj) => {
    if (typeof videoObj !== 'undefined') {
      if (videoObj.value !== '') {
        return true;
      }
    }
    return false;
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
    const categorySlug = product.classifications[0].taxon.permalink.split('/').pop();
    const categoryName = product.classifications[0].taxon.name;
    const videoObj = this.getVideoProperty(this.props.product.product.product_properties);
    const videoFlag = this.setVideoFlag(videoObj);
    const videoClass = videoFlag ? 'videomargin' : '';
    return (
      <div className={s.page}>
        <div className={s.left}>
          <div className={s.container}>
            <img
              className={s.pimage}
              src={image}
              alt={product.name}
            />
            <RelatedProducts gridRecs={product.recs} addToCart={this.props.onAddToCart} />
          </div>
        </div>
        <div className={s.right}>
          <div className={s.content}>
            <div className={s.summary}>
              <div className={s.summarytop}>
                <div className={s.video} />
                <nav className={cx(s.breadcrumb, s[videoClass])}>
                  <Link className={s.innerlink} to="/">Shop</Link>
                  <span className={s.divider}>&gt;</span>
                  <Link className={s.innerlink} to={`/product-category/${categorySlug}`}>{categoryName}</Link>
                  <span className={s.divider}>&gt;</span>
                  {product.name}
                </nav>
                <h1 className={s.pname}>{product.name}</h1>
                <div className={s.price}>
                  <span className={s.current}>{product.display_price}</span>
                  { (videoFlag) ? <EmbeddedVideo videoObj={videoObj} /> : '' }
                </div>
              </div>
              <AddToCart onSubmit={this.props.onAddToCart} product={this.props.product} />
              <div className={s.summarymiddle}>
                <div className={cx(s.summarytab, s.summaryopen)}>
                  <h3 className={s.summarytitle}>Description</h3>
                  <div className={s.summarycontent}>
                    <p className={s.summaryparagraph}>{renderHTML(product.description)}</p>
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
                  <Link to={`/product-category/${categorySlug}`} className={s.categorylink}>{categoryName}</Link>
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
