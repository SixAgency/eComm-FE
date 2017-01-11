import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Product.css';
import Link from '../../components/Link';
import RelatedProducts from '../../components/RelatedProducts';
import ProductQuantity from '../../components/ProductQuantity';
import SingleVariant from '../../components/SingleVariant';
import MultiVariant from '../../components/MultiVariant';

class Product extends React.Component {

  static propTypes = {
    product: PropTypes.object.isRequired,
    products: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      variant_id: null,
    };
  }

  componentWillMount = () => {
    let variantId = null;
    if (!this.props.product.has_variants) {
      variantId = this.props.product.master.id;
    }
    if (this.props.product.has_variants && this.props.product.option_types.length === 1) {
      variantId = this.props.product.variants[0].id;
    }
    if (this.props.product.has_variants && this.props.product.option_types.length === 2) {
      const optionOne = this.props.product.variants[0].option_values[0].id;
      const optionTwo = this.props.product.variants[0].option_values[1].id;
      variantId = this.getVariantId(optionOne, optionTwo);
    }
    this.setState({
      variant_id: variantId,
    });
  }

  getVariantId = (one, two) => {
    let id = null;
    this.props.product.variants.map((item) => {
      if ((item.option_values[0].id === one) &&
        (item.option_values[1].id === two)) {
        id = item.id;
      }
      return id;
    });
    return id;
  }
  // onSubmit = (event) => {
  //   event.preventDefault();
  //   const id = this.handleId;
  //   const qty = this.handleQuantity;
  //   console.log(id, qty);
  // }

  // handleQuantity = (event) => {
  //   this.
  // }

  handleId = (event) => {
    this.setState({
      variant_id: parseInt(event.target.value, 10),
    });
  }

  substract = () => {
    let value = this.state.quantity;
    if (value >= 2) {
      value -= 1;
      this.setState({
        quantity: value,
      });
    }
  }

  add = () => {
    let value = this.state.quantity;
    value += 1;
    this.setState({
      quantity: value,
    });
  }

  handleSuccess = (data) => {
    window.location.href = '/cart';
  }

  addToCart = (event) => {
    event.preventDefault();
    if (this.state.variant_id === null) {
      console.log('ERRORR - PLEASE SELECT A VARIANT');
      return;
    }
    const data = {
      id: this.state.variant_id,
      quantity: this.state.quantity,
    };

    fetch('/api/addtocart', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
    })
    .then((resp) => (resp.json()))
    .then((json) => this.handleSuccess(json));
  }

  render() {
    console.log(this.state.quantity);
    const product = this.props.product;
    // const selectHeadline = product.option_types[0].presentation;
    console.log(this.state.variant_id);
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
              <form className={s.cartform} onSubmit={this.addToCart} >
                <SingleVariant
                  variants={product.variants}
                  hasVariants={product.has_variants}
                  handleId={this.handleId}
                />
                {/* <MultiVariant
                  variants={product.variants}
                  hasVariants={product.has_variants}
                  getVariantId={this.getVariantId}
                /> */}
                <ProductQuantity
                  sizingClass={'quantitybig'}
                  quantity={this.state.quantity}
                  addQuantity={this.add}
                  substractQuantity={this.substract}
                />
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
