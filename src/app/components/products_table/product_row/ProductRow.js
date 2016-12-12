import React from "react";
import "./product_row.scss";

class ProductRow extends React.Component {

    static propTypes = {
        cart: React.PropTypes.object.isRequired
    }

    constructor(props){
        super(props);
    }

    render() {
        const item = this.props.cart;
        return(
            <tr className="cart-item">
                <td className="product-name">
                    <img
                      src={item.variant.images[0].large_url}
                      width="200"
                      height="200"
                    />
                    <a href="#">
                        {item.variant.name}
                    </a>
                </td>
                <td className="product-price">
                    <span className="amount">
                        {item.variant.price} $
                    </span>
                </td>
                <td className="product-quantity">
                    <div className="quantity">
                        <input type="button"
                          value="-"
                          className="minus" />
                        <input type="number"
                          step="1"
                          min="1"
                          max="9"
                          value="1"
                          title="Qty"
                          className="qty-text" size="4" />
                        <input type="button"
                          value="+"
                          className="plus" />
                    </div>
                </td>
                <td className="product-subtotal">
                    <span className="amount">
                        ${ (parseFloat(item.variant.price) *
                        parseFloat(item.quantity)).
                        toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}
                    </span>
                </td>
                <td className="product-remove">
                    <a href="#"
                      className="remove"
                      title="Remove this item">
                        ×
                    </a>
                </td>
            </tr>
        );
    }
}
export default ProductRow;