import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Grid.css';
import ProductGridItem from '../ProductGridItem';

class Grid extends React.Component {
  static propTypes = {
    gridClass: PropTypes.string.isRequired,
    gridItems: PropTypes.array.isRequired,
    priceclass: PropTypes.string,
    nameclass: PropTypes.string,
    catclass: PropTypes.string,
  }

  render() {
    const products = this.props.gridItems;

    return (
      <section className={cx(s.grid, s[this.props.gridClass])}>
        <ul className={s.gridwrapper}>
          {products.map((v, k) => (
            <li key={k} className={s.gridthree}>
              <ProductGridItem
                product={v}
                priceclass={this.props.priceclass}
                nameclass={this.props.nameclass}
                catclass={this.props.catclass}
              />
            </li>
          ))}
        </ul>
      </section>
    );
  }
}

export default withStyles(s)(Grid);
