import React from "react";
import "./products_table.scss";
import ProductRow from "./product_row/ProductRow";

class ProductsTable extends React.Component {

    static propTypes = {
        cart: React.PropTypes.object.isRequired
    }

    constructor(props){
        super(props);
    }

    render() {
        const cart = this.props.cart;
        return (
            <form method="post"
              className="products-table-wrapper"
            >
                <table
                  className="shop-cart-table"
                  cellSpacing="0"
                >
                    <thead>
                        <tr>
                            <th className="product-name">
                                Product
                            </th>
                            <th className="product-price">
                                Price
                            </th>
                            <th className="product-quantity">
                                Quantity
                            </th>
                            <th className="product-subtotal">
                                Total
                            </th>
                            <th className="product-remove">
                                &nbsp;
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        { cart.line_items.map( (item) => {
                            return (
                                <ProductRow cart={item} />
                            );
                        })}
                    </tbody>
                </table>
            </form>
        );
    }
}

export default ProductsTable;