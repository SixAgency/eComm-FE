import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ProductsTable.css';
import ProductRow from './ProductRow';

class ProductsTable extends React.Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    removeItem: PropTypes.func.isRequired,
    updateQuantity: PropTypes.func.isRequired,
    cartItems: PropTypes.object.isRequired,
    toggleLoader: PropTypes.func.isRequired
  };

  render() {
    return (
      <form
        onSubmit={(e) => { e.preventDefault(); }}
        className={s.prodtablewrpr}
      >
        <table
          className={s.shopcarttable}
          cellSpacing="0"
        >
          <thead>
            <tr>
              <th className={s.prodname}>
                Product
              </th>
              <th className={s.prodprice}>
                Price
              </th>
              <th className={s.prodqty}>
                Quantity
              </th>
              <th className={s.prodsubt}>
                Total
              </th>
              <th className={s.prodremove}>
                &nbsp;
              </th>
            </tr>
          </thead>
          <tbody>
            { this.props.items.map((item, index) => (
              <ProductRow
                item={item}
                key={index}
                removeItem={this.props.removeItem}
                updateQuantity={this.props.updateQuantity}
                cartItems={this.props.cartItems}
                toggleLoader={this.props.toggleLoader}
              />
              ),
            )}
          </tbody>
        </table>
      </form>
    );
  }
}

export default withStyles(s)(ProductsTable);
