import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Grid.css';
import ProductGridItem from '../ProductGridItem';

class Grid extends React.Component {
  static propTypes = {
    gridClass: PropTypes.string.isRequired,
    gridItems: PropTypes.object.isRequired,
    addToCart: PropTypes.func.isRequired,
    priceclass: PropTypes.string,
    nameclass: PropTypes.string,
    catclass: PropTypes.string,
    buttonclass: PropTypes.string
  }
  render() {
    const { isLoaded, products } = this.props.gridItems;
    if (!isLoaded) {
      return null;
    }
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
                buttonclass={this.props.buttonclass}
                addToCart={this.props.addToCart}
              />
            </li>
          ))}
        </ul>
      </section>
    );
  }
}

export default withStyles(s)(Grid);
