import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ProductsTable.css';
import ProductRow from './ProductRow';

class ProductsTable extends React.Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    removeItem: PropTypes.func.isRequired,
    addQuantity: PropTypes.func.isRequired,
    subQuantity: PropTypes.func.isRequired,
  }

  render() {
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
            { this.props.items.map((item, index) => (
              <ProductRow
                item={item}
                key={index}
                subQuantity={this.props.subQuantity}
                addQuantity={this.props.addQuantity}
                removeItem={this.props.removeItem}
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
