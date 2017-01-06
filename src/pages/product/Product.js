import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Product.css';
import Link from '../../components/Link';
import RelatedProducts from '../../components/RelatedProducts';
import ProductQuantity from '../../components/ProductQuantity';

class Product extends React.Component {

  static propTypes = {
    product: PropTypes.object.isRequired,
    products: PropTypes.object.isRequired,
  }

  onSubmit = (event) => {
    event.preventDefault();
  }

  render() {
    const product = this.props.product;

    return (
      <div className={s.page}>
        <div className={s.left}>
          <div className={s.container}>
            <img
              className={s.pimage}
              src={product.master.images[0].large_url}
              alt={product.name}
            />
            <RelatedProducts products={this.props.products} />
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
                  <Link className={s.innerlink} to="/product-category">{product.classifications[0].taxon.name}</Link>
                  <span className={s.divider}>&gt;</span>
                  {product.name}
                </nav>
                <h1 className={s.pname}>{product.name}</h1>
                <div className={s.price}>
                  <span className={s.old}>{product.display_price}</span>
                  <span className={s.current}>{product.display_price}</span>
                </div>
              </div>
              <form className={s.cartform} onSubmit={this.formSubmit} >
                <div className={s.variants}>
                  <h3 className={s.vname}>Size<abbr className={s.required} title="required">*</abbr></h3>
                  <select className={s.vselect} name="sizes">
                    <option value="round-small-x2-1">Round Small (x2)</option>
                    <option value="round-medium-2">Round Medium</option>
                    <option value="round-large-3">Round Large</option>
                    <option value="long-4">Long</option>
                  </select>
                </div>
                <ProductQuantity sizingClass={'quantitybig'} />
                <button type="submit" className={s.addtocart}>Add to cart</button>
              </form>
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
                  <Link to="/" className={s.categorylink}>{product.classifications[0].taxon.name}</Link>
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
