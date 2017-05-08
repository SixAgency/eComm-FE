import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Grid.css';
import ProductGridItem from '../ProductGridItem';

class Grid extends Component {
  static propTypes = {
    gridClass: PropTypes.string.isRequired,
    gridItems: PropTypes.object.isRequired,
    addToCart: PropTypes.func.isRequired,
    setMessage: PropTypes.func,
    priceclass: PropTypes.string,
    nameclass: PropTypes.string,
    catclass: PropTypes.string,
    cartItems: PropTypes.array,
    buttonclass: PropTypes.string,
    toggleLoader: PropTypes.func.isRequired
  };

  render() {
    const { isLoaded, products } = this.props.gridItems;
    if (!isLoaded) {
      return null;
    }
    return (
      <section className={cx(s.grid, s[this.props.gridClass])}>
        <ul className={s.gridwrapper}>
          {products.map((value, key) => (
            <li key={key} className={s.gridthree}>
              <ProductGridItem
                product={value}
                priceclass={this.props.priceclass}
                nameclass={this.props.nameclass}
                catclass={this.props.catclass}
                buttonclass={this.props.buttonclass}
                addToCart={this.props.addToCart}
                cartItems={this.props.cartItems}
                setMessage={this.props.setMessage}
                toggleLoader={this.props.toggleLoader}
              />
            </li>
          ))}
        </ul>
      </section>
    );
  }
}

export default withStyles(s)(Grid);
