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

  // Set validity flag for displaying information (helper)
  setValidFlag = (object) => typeof object !== 'undefined' && object.value !== '';

  // Check property existence (helper)
  getProperty = (properties, property) => properties.find((prop) => (prop.property_name === property));

  getPropertyVariants = (properties, property) => properties[0].hasOwnProperty(property) ? properties[0][property] : '';

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

    // Handle Product Video
    const videoObj = this.getProperty(this.props.product.product.product_properties, 'embedded_video');
    const videoFlag = this.setValidFlag(videoObj);
    const videoClass = videoFlag ? 'videomargin' : '';

    // Handle additional text below product name
    const textObj = this.getProperty(this.props.product.product.product_properties, 'title_note');
    const textFlag = this.setValidFlag(textObj);

    // Handle Bulk prices below product name
    const bulkPrice1Obj = this.getProperty(this.props.product.product.product_properties, 'bulk_price1');
    const bulkPrice2Obj = this.getProperty(this.props.product.product.product_properties, 'bulk_price2');
    const bulkPrice3Obj = this.getProperty(this.props.product.product.product_properties, 'bulk_price3');
    const bulkPrice4Obj = this.getProperty(this.props.product.product.product_properties, 'bulk_price4');
    const bulkPrice1Flag = this.setValidFlag(bulkPrice1Obj);
    const bulkPrice2Flag = this.setValidFlag(bulkPrice2Obj);
    const bulkPrice3Flag = this.setValidFlag(bulkPrice3Obj);
    const bulkPrice4Flag = this.setValidFlag(bulkPrice4Obj);

    // Handle Price note
    const priceNoteObj = this.getProperty(this.props.product.product.product_properties, 'price_note');
    const priceFlag = this.setValidFlag(priceNoteObj);

    // Handle Details
    const detailsObj = this.getProperty(this.props.product.product.product_properties, 'details');
    const detailsFlag = this.setValidFlag(detailsObj);

    // Handle Additional Information
    const additionalInfoObj = this.getProperty(this.props.product.product.product_properties, 'additional_information');
    const additionalInfoFlag = this.setValidFlag(additionalInfoObj);
    const weightObj = this.getProperty(this.props.product.product.product_properties, 'weight');
    const weightFlag = this.setValidFlag(weightObj);
    const dimensionsObj = this.getProperty(this.props.product.product.product_properties, 'dimensions');
    const dimensionsFlag = this.setValidFlag(dimensionsObj);
    const variants = this.props.product.product.variants;

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
                {textFlag && <p className={s.nametext}>{textObj.value}</p>}
                {bulkPrice1Flag && <p className={s.nametext}>{bulkPrice1Obj.value}</p>}
                {bulkPrice2Flag && <p className={s.nametext}>{bulkPrice2Obj.value}</p>}
                {bulkPrice3Flag && <p className={s.nametext}>{bulkPrice3Obj.value}</p>}
                {bulkPrice4Flag && <p className={s.nametext}>{bulkPrice4Obj.value}</p>}
                <div className={s.price}>
                  <span className={s.current}>{product.display_price}</span>
                  {priceFlag && <span className={s.pricetext}>{priceNoteObj.value}</span>}
                  { videoFlag && <EmbeddedVideo embeddedCode={videoObj.value} /> }
                </div>
              </div>
              <AddToCart onSubmit={this.props.onAddToCart} product={this.props.product} />
              <div className={s.summarymiddle}>
                <div className={cx(s.summarytab, s.summaryopen)}>
                  <h3
                    className={s.summarytitle}
                  >
                    Description
                  </h3>
                  <div className={s.summarycontent}>
                    <div className={s.summaryparagraph}>{renderHTML(product.description)}</div>
                  </div>
                </div>
                {detailsFlag &&
                  <div className={cx(s.summarytab, s.summaryopen)}>
                    <h3
                      className={s.summarytitle}
                    >
                      Details
                    </h3>
                    <div className={s.summarycontent}>
                      <p className={s.summaryparagraph}><b>{renderHTML(detailsObj.value)}</b></p>
                    </div>
                  </div>
                }
                {additionalInfoFlag &&
                  <div className={cx(s.summarytab, s.summaryopen)}>
                    <h3
                      className={s.summarytitle}
                    >
                      Additional Information
                    </h3>
                    <div className={s.summarycontent}>
                      <table className={s.summarytable}>
                        <tbody>
                          {weightFlag &&
                            <tr>
                              <td>
                                Weight
                              </td>
                              <td>
                                {weightObj.value}
                              </td>
                            </tr>
                          }
                          {dimensionsFlag &&
                            <tr>
                              <td>
                                Dimensions
                              </td>
                              <td>
                                {dimensionsObj.value}
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
                    </div>
                  </div>
                }
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
