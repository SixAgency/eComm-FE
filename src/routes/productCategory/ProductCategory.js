import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ProductCategory.css';
import HeroBanner from '../../components/HeroBanner';
import Grid from '../../components/Grid';
import homeBanner from './home_banner.jpg';

class ProductCategory extends React.Component {
  static propTypes = {
    products: React.PropTypes.array.isRequired,
  }
  render() {
    const products = this.props.products;
    const bottomText = { subtitle: 'Shop Now' };
    return (
      <section className={s.page}>
        <HeroBanner
          heroClass={'homebanner'}
          heroBanner={homeBanner}
          bottomText={bottomText}
        />
        <Grid
          gridClass={'productsgrid'}
          gridItems={products}
        />
      </section>
    );
  }
}

export default withStyles(s)(ProductCategory);
