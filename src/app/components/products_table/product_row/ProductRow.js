import React from "react";
import "./product_row.scss";

class ProductRow extends React.Component {
    render() {
        let basePath = 'https://krissorbie.com/wp-content/uploads/';
        let prodPath = '2015/12/product_combo-960x960-300x300-200x200.png';
        let fullPath = basePath + prodPath;
        return(
            <tr className="cart-item">
                <td className="product-name">
                    <img
                      src={fullPath}
                      width="200"
                      height="200"
                    />
                    <a href="#">
                        Brush and Comb Set
                    </a>
                </td>
                <td className="product-price">
                    <span className="amount">
                        $18.00
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
                        $18.00
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