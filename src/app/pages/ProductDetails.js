import React from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import { getProduct } from "../actions/commonActions";

const mapDispatchToProps = ((dispatch) => {
    return {
        getProduct: (q) => dispatch(getProduct(q))
    };
});

const mapStateToProps = ((state) => {
    return { product: state.product };
});

class ProductDetails extends React.Component {
    static propTypes = {
        getProduct: React.PropTypes.func.isRequired,
        params: React.PropTypes.object.isRequired,
        product: React.PropTypes.object
    }
    componentWillMount = () => {
        this.props.getProduct(this.props.params.productSlug);
    }

    formSubmit = (event) => {
        event.preventDefault();
    }

    setValue = () => {
        return null;
    }

    render() {
        const product = this.props.product;
        if (product === null ) {
            return null;
        }
        return (
            <div className="product-details-wrapper">
                <div className="product-details-left">
                    <div className="product-image-container">
                        <img
                          className="product-image"
                          src={product.master.images[0].large_url}
                        />
                    </div>
                </div>
                <div className="product-details-right">
                    <div className="product-content">
                        <div className="summary-wrapper">
                            <div className="summary-top">
                                <div className="video" />
                                <nav className="breadcrumb">
                                    <Link to="/">Shop</Link>
                                    <span>&gt;</span>
                                    <Link to="/">
                                        {product.classifications[0].taxon.name}
                                    </Link>
                                    <span>&gt;</span>
                                    {product.name}
                                </nav>
                                <h1 className="title">{product.name}</h1>
                                <div className="price">
                                    <span
                                      className="old-price"
                                    >
                                        {product.display_price}
                                    </span>
                                    <span
                                      className="current-price"
                                    >
                                        {product.display_price}
                                    </span>
                                </div>
                            </div>
                            <form className="cart" onSubmit={this.formSubmit} >
                                <div className="variant-wrapper">
                                    <h3
                                      className="variant-name"
                                    >
                                        Size
                                        <abbr
                                          className="required"
                                          title="required"
                                        >
                                            *
                                        </abbr>
                                    </h3>
                                    <select
                                      className="variant-select"
                                      name="sizes"
                                    >
                                        <option
                                          value="round-small-x2-1"
                                        >
                                            Round Small (x2)
                                        </option>
                                        <option
                                          value="round-medium-2"
                                        >
                                            Round Medium
                                        </option>
                                        <option
                                          value="round-large-3"
                                        >
                                            Round Large
                                        </option>
                                        <option
                                          value="long-4"
                                        >
                                            Long
                                        </option>
                                    </select>
                                </div>
                                <div className="quantity">
                                    <input
                                      type="button"
                                      defaultValue="-"
                                      className="minus"
                                    />
                                    <input
                                      type="number"
                                      step="1"
                                      min="1"
                                      max="10"
                                      name="quantity"
                                      value="1"
                                      title="Qty"
                                      className="input-text qty text"
                                      size="4"
                                      onChange={this.setValue}
                                    />
                                    <input
                                      type="button"
                                      defaultValue="+"
                                      className="plus"
                                    />
                                </div>
                                <button
                                  type="submit"
                                  className="add-to-cart"
                                >
                                    Add to cart
                                </button>
                            </form>
                            <div className="summary-middle">
                                <div className="summary-tab opened">
                                    <h3>Description</h3>
                                    <div className="content">
                                        <p>{product.description}</p>
                                    </div>
                                </div>
                                <div className="summary-tab closed">
                                    <h3>Reviews (0)</h3>
                                    <div className="content">
                                        <p>{product.reviews}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="summary-bottom">
                                <span className="sku_wrapper">
                                    SKU:&nbsp;{product.master.sku}
                                </span>
                                <span className="category_wrapper">
                                    Category:&nbsp;
                                    <Link to="/" className="category">
                                        {product.classifications[0].taxon.name}
                                    </Link>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);