import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ProductsTable.css';
import ProductRow from './ProductRow';

class ProductsTable extends React.Component {
  static propTypes = {
    cart: React.PropTypes.object.isRequired,
  }

  render() {
    const cart = this.props.cart;
    return (
      <form
        method="post"
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
            { cart.line_items.map((item, index) => (<ProductRow cart={item} key={index} />),
            )}
          </tbody>
        </table>
      </form>
    );
  }
}

export default withStyles(s)(ProductsTable);
