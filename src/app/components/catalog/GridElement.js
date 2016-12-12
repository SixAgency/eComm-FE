import React from "react";
import { Link } from "react-router";

class GridElement extends React.Component {

    static propTypes = {
        product: React.PropTypes.object.isRequired
    }

    render() {
        const product = this.props.product;
        const p_slug = "/product/"+product.slug;
        return (
            <div className="grid-elem-wrapper">
                <Link to={p_slug}>
                    <img
                      className="grid-image"
                      src={product.master.images[0].large_url}
                    />
                </Link>
                <div className="item-hover">
                    <Link to={p_slug} />
                    <div className="item-meta">
                        <Link to={p_slug}>
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
                          to={p_slug}
                          className="button view-button"
                        >
                            View
                        </Link>
                        <Link
                          to={p_slug}
                          className="button"
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