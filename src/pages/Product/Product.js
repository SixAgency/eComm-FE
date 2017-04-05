import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import renderHTML from 'react-render-html';
import cx from 'classnames';
import accounting from 'accounting';

import s from './Product.css';
// Components
import RelatedProducts from '../../components/RelatedProducts';
import AddToCart from '../../components/AddToCart';
import imagePlaceholder from './image_placeholder_large.png';
import EmbeddedVideo from '../../components/EmbeddedVideo';
import ProductTab from '../../components/ProductTab';

class Product extends Component {

  static propTypes = {
    product: PropTypes.object.isRequired,
    onAddToCart: PropTypes.func.isRequired,
    properties: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      tabs: {
        description: true,
        details: false,
        info: false,
        reviews: false
      }
    };
  }

  getPrice = (calcReduced = false) => {
    const { product } = this.props.product;
    if (product.classifications[0].taxon.name === 'Gifts') {
      return `${accounting.formatMoney(product.price)} - ${accounting.formatMoney(product.variants.slice(-1)[0].price)}`;
    }
    if (calcReduced) {
      const { sale, price } = product;
      return parseFloat(price) - (parseFloat(price) * (sale / 100));
    }
    return accounting.formatMoney(product.price);
  }

  isTabOpen = (tabName) => this.state.tabs[tabName];

  openTab = (tabName) => {
    const { tabs } = this.state;
    Object.keys(tabs).forEach((key) => {
      tabs[key] = key === tabName;
    });
    this.setState({ tabs });
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
    const properties = this.props.properties;
    const variants = this.props.product.product.variants;
    console.log('VARIANTS', variants);

    return (
      <div className={s.page}>
        <div className={s.left}>
          <div className={s.container}>
            <img
              className={s.pimage}
              src={image}
              alt={product.name}
            />
            {product.is_sale &&
              <div className={s.salebadge}>SALE!</div>
            }
            <RelatedProducts gridRecs={product.recs} addToCart={this.props.onAddToCart} />
          </div>
        </div>
        <div className={s.right}>
          <div className={s.content}>
            <div className={s.summary}>
              <div className={s.summarytop}>
                <div className={s.video} />
                <nav className={cx(s.breadcrumb, properties.video ? s.videomargin : '')}>
                  <Link className={s.innerlink} to="/">Shop</Link>
                  <span className={s.divider}>&gt;</span>
                  <Link className={s.innerlink} to={`/product-category/${categorySlug}`}>{categoryName}</Link>
                  <span className={s.divider}>&gt;</span>
                  {product.name}
                </nav>
                <h1 className={s.pname}>{product.name}</h1>
                {properties.titleNote && <p className={s.nametext}>{properties.titleNote}</p>}
                {properties.bulkPrices.map((price, index) => (
                  <div key={index}>
                    {price && <p className={s.nametext}>{price}</p>}
                  </div>
                ))}
                <div className={s.price}>
                  <span className={product.is_sale ? s.old : ''}>
                    {this.getPrice()}
                  </span>
                  {product.is_sale &&
                    <span className={s.current}>{accounting.formatMoney(this.getPrice(true))}</span>
                  }
                  {
                    properties.priceNote &&
                    <span className={s.pricetext}>{properties.priceNote}</span>
                  }
                  {properties.video && <EmbeddedVideo embeddedCode={properties.video} /> }
                </div>
              </div>
              <AddToCart onSubmit={this.props.onAddToCart} product={this.props.product} />
              <div className={s.summarymiddle}>
                <ProductTab
                  title="Description" open={this.isTabOpen('description')}
                  onClick={() => this.openTab('description')}
                >
                  <div className={s.summaryparagraph}>{renderHTML(product.description)}</div>
                </ProductTab>
                {properties.details &&
                  <ProductTab
                    title="Details" open={this.isTabOpen('details')}
                    onClick={() => this.openTab('details')}
                  >
                    <p className={s.summaryparagraph}><b>{renderHTML(properties.details)}</b></p>
                  </ProductTab>
                }
                {properties.additionalInfo &&
                  <ProductTab
                    title="Additional Information" open={this.isTabOpen('info')}
                    onClick={() => this.openTab('info')}
                  >
                    <table className={s.summarytable}>
                      <tbody>
                        {properties.weight &&
                          <tr>
                            <td>
                              Weight
                            </td>
                            <td>
                              {properties.weight}
                            </td>
                          </tr>
                        }
                        {properties.dimensions &&
                          <tr>
                            <td>
                              Dimensions
                            </td>
                            <td>
                              {properties.dimensions}
                            </td>
                          </tr>
                        }
                        {variants.length > 0 &&
                          <tr>
                            <td>
                              Options
                            </td>
                            <td>
                              {variants.map((item, index) => (
                                <span key={index}>
                                  {index > 0 ? ', ' : ''}{item.option_values[0].presentation}
                                </span>
                              ))}
                            </td>
                          </tr>
                        }
                      </tbody>
                    </table>
                  </ProductTab>
                }
                <ProductTab
                  title="Reviews (0)" open={this.isTabOpen('reviews')}
                  onClick={() => this.openTab('reviews')}
                >
                  {product.reviews &&
                    <p className={s.summaryparagraph}>{product.reviews}</p>
                  }
                </ProductTab>
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
