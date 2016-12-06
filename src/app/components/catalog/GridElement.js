import React from "react";
import { Link } from "react-router";
import "./grid_element.scss";

class GridElement extends React.Component {

    static propTypes = {
        product: React.PropTypes.object.isRequired
    }

    render() {
        const product = this.props.product;
        return (
            <div className="grid-elem-wrapper">
                <Link to={product.slug}>
                    <img
                      className="grid-image"
                      src={product.master.images[0].large_url}
                    />
                </Link>
                <div className="item-hover">
                    <Link to={product.slug} />
                    <div className="item-meta">
                        <Link to={product.slug}>
                            <span className="price">
                                <span className="amount">
                                    {product.display_price}
                                </span>–<span className="amount">
                                    {product.display_price}
                                </span>
                            </span>
                            <h2 className="item-title">{product.name}</h2>
                            <h5 className="item-cat">GIFTS</h5>
                        </Link>
                        <Link
                          to={product.slug}
                          className="view-button"
                        >
                            View
                        </Link>
                        <Link
                          to={product.slug}
                          className="select-amount"
                        >
                            Select amount
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default GridElement;